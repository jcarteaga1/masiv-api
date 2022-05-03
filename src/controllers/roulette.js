const crypto = require('crypto');
const { RouletteModel } = require('../models/roulette');

const createRoulettes = async (req, res) => {
  try {
    const body = {
      id: crypto.randomUUID(),
      status: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const reply = await RouletteModel.create(body);
    if (!reply) {
      res.status(500).send({ message: 'Error to create roulette' });
    }

    res.status(200).json(body);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRoulettes = async (req, res) => {
  try {
    const roulettes = await RouletteModel.findAll('roulette');

    res.status(200).json(roulettes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const openRoulettes = async (req, res) => {
  try {
    const { id } = req.params;
    const roulette = await RouletteModel.open(id);
    if (!roulette) {
      res.status(500).send({ message: 'Error to open roulette' });
    }

    res.status(200).send({ message: `the ruolette ${roulette.id} is open` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const closeRoulettes = async (req, res) => {
  try {
    const { id } = req.params;
    const { roulette, winNumber } = await RouletteModel.close(id);
    if (!roulette) {
      res.status(500).send({ message: 'Error to open roulette' });
    }

    res.status(200).send({
      message: `the ruolette ${roulette.id} is closed, win number is ${winNumber}`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createRoulettes,
  getRoulettes,
  openRoulettes,
  closeRoulettes,
};
