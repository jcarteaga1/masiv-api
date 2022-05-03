const crypto = require('crypto');
const { BetModel } = require('../models/bet');

const createBet = async (req, res) => {
  try {
    const body = {
      id: crypto.randomUUID(),
      ...req.body,
      userId: String(req.user),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const reply = await BetModel.create(body);
    if (!reply) {
      res.status(500).send({ message: 'Error to create bet' });
    }

    res.status(200).json({ message: 'bet created' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createBet };
