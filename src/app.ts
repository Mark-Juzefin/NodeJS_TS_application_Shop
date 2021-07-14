import { Request, Response } from 'express';
import { baseCasheir, CasheirInterface } from './models';

const express = require('express');
const { Casheir, Shift, Shop } = require('./models');

const { db } = require('./db.ts');
const { sequelize } = require('./db.ts');

const PORT = process.env.PORT || 8088;
const app = express();

app.use(express.json());

// getAllCasheirs
app.get('/casheir', async (req: Request, res: Response) => {
  const casheirs = await Casheir.findAll({
    attributes: ['firstName', 'lastName', 'age', 'shift.shiftName', 'yearsOfExperience', 'shop.shopName'],
    include: [{
      model: Shop,
      attributes: ['shopName'],
    }, {
      model: Shift,
      attributes: ['shiftName'],
    }],
  });

  res.json(casheirs);
});

// addNewCasheir
app.post('/casheir', async (req: Request, res: Response) => {
  const {
    firstName, lastName, age, shiftId, yearsOfExperience, shopId,
  }: baseCasheir = req.body;

  if (!firstName && !lastName && !age && !shiftId && !yearsOfExperience && !shopId) {
    res.status(400).send('invalid input data');
  }
  try {
    const casheir = await Casheir.create({
      firstName,
      lastName,
      age,
      shiftId,
      shopId,
      yearsOfExperience,
    });

    res.json(casheir);
  } catch (error) {
    res.status(400).send(error);
  }
});

// updateCasheir
app.put('/casheir', async (req: Request, res: Response) => {
  const {
    id, firstName, lastName, age, shiftId, yearsOfExperience, shopId,
  }: CasheirInterface = req.body;

  if (!id && !firstName && !lastName && !age && !shiftId && !yearsOfExperience && !shopId) {
    res.status(400).send('invalid input data');
  }

  try {
    const [numberOfAffectedRows, affectedRows] = await Casheir.update({
      firstName,
      lastName,
      age,
      shiftId,
      shopId,
      yearsOfExperience,
    }, {
      where: { id },
      returning: true, // needed for affectedRows to be populated
      plain: true, // makes sure that the returned instances are just plain objects
    });

    res.json({ numberOfAffectedRows, affectedRows });
  } catch (error) {
    res.status(400).send(error);
  }
});

// DeleteCasheirs
app.delete('/casheir/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numAffectedRows = await Casheir.destroy({
      where: {
        id,
      },
    });
    if (numAffectedRows !== 0) {
      res.json('success');
    } else {
      res.status(400).send('this value does not exist');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, async () => {
  console.log('Server do work!');
});
