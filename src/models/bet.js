/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { redisSet } = require('../config/db');

const BetSchema = Joi.object({
  id: Joi.string().guid({
    version: ['uuidv4', 'uuidv5'],
  }),
  number: Joi.number().integer().min(0).max(36).required(),
  color: Joi.number().integer().min(0).max(1).required(),
  credits: Joi.number().integer().min(0).max(10000).required(),
  rouletteId: Joi.string()
    .guid({
      version: ['uuidv4', 'uuidv5'],
    })
    .required(),
  userId: Joi.string()
    .guid({
      version: ['uuidv4', 'uuidv5'],
    })
    .required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const BetModel = {
  create: async (body) => {
    const { value, error } = BetSchema.validate(body);
    if (error) throw error;
    const reply = await redisSet(value.id, value, 'bet');

    return reply;
  },
};

module.exports = { BetModel };
