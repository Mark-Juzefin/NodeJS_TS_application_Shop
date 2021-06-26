import { Request, Response } from 'express';
import { Casheir } from './models';

const express = require('express');
const db = require('./db.ts');

const PORT = process.env.PORT || 8088;
const app = express();

app.use(express.json());

// getAllCasheirs
app.get('/casheir', async (req: Request, res: Response) => {
  const casheir = await db.query(
    `select casheir.firstname, casheir.lastname, casheir.age, shift.shiftname, casheir.yearsofexperience, shop.shopname
    from casheir
    left join shift on casheir.shiftid = shift.id
    left join shop on casheir.shopid = shop.id`,
  );

  res.json(casheir.rows);
});

// addNewCasheir
app.post('/casheir', async (req: Request, res: Response) => {
  const {
    firstname, lastname, age, shiftid, yearsofexperience, shopid,
  }: Casheir = req.body;

  if (!firstname && !lastname && !age && !shiftid && !yearsofexperience && !shopid) {
    res.status(400).send('invalid input data');
  }
  try {
    const casheir = await db.query(`
  insert into casheir (firstname, lastname, age, shiftid, yearsofexperience, shopid)
  values 
  ('${firstname}', '${lastname}', ${age}, ${shiftid}, ${yearsofexperience}, ${shopid})
  returning id`);

    res.json(casheir.rows);
  } catch (error) {
    res.status(400).send('invalid input data');
  }
});

app.listen(PORT, () => {
  console.log('Server do work!');
});
