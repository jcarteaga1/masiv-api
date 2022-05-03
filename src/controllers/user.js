const crypto = require('crypto');
const { UserModel } = require('../models/user');

const createUser = async (req, res) => {
  try {
    const body = {
      id: crypto.randomUUID(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const reply = await UserModel.create(body);
    if (!reply) {
      res.status(500).send({ message: 'Error to create user' });
    }

    res.status(200).json({ message: `User ${body.username} created` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const reply = await UserModel.login(req.body);
    if (!reply) {
      res.status(500).send({ message: 'Error to create user' });
    }

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createUser, loginUser };
