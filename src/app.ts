const express = require('express');
const db = require('./db.ts');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log('Server do work!');
});

app.get('/', async (req:any, res:any) => {
  const listOfShops = await db.query('SELECT * FROM Shop');

  console.log(listOfShops);

  res.json(listOfShops);
});
