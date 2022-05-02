const Joi = require('joi');
const { redisSet, redisGet } = require('../config/db');

const RouletteSchema = Joi.object({
  id: Joi.string().guid({
    version: ['uuidv4', 'uuidv5'],
  }),
  status: Joi.number().integer().min(0).max(1),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const RouletteModel = {
  create: async (body) => {
    const { value, error } = RouletteSchema.validate(body);
    if (error) throw error;
    const reply = await redisSet(value.id, value);

    return reply;
  },
  open: async (id) => {
    const roulette = await redisGet(id);
    if (!roulette) throw new Error('the roulette does not exist');
    roulette.status = 0;
    roulette.updatedAt = new Date();
    await redisSet(id, roulette);

    return roulette;
  },
};

module.exports = { RouletteModel };
