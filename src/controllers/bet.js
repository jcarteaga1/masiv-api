const crypto = require('crypto');
const { BetModel } = require('../models/bet');
const { RouletteModel } = require('../models/roulette');

const createBet = async (req, res) => {
  try {
    const body = {
      id: crypto.randomUUID(),
      ...req.body,
      userId: String(req.user),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const isOpen = await RouletteModel.isOpen(`roulette-${body.rouletteId}`);
    const reply = await BetModel.create(body, isOpen);
    if (!reply) {
      res.status(500).send({ message: 'Error to create bet' });
    }

    res.status(200).json({ message: 'bet created' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createBet };
