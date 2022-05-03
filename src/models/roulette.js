const Joi = require('joi');
const { redisSet, redisGet, redisGetAll } = require('../config/db');
const { BetModel } = require('./bet');
const {
  getWinningColor,
  getWinningNumber,
} = require('../services/winningNumbers');

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
    const reply = await redisSet(value.id, value, 'roulette');

    return reply;
  },
  open: async (id) => {
    const roulette = await redisGet(`roulette-${id}`);
    if (!roulette) throw new Error('the roulette does not exist');
    roulette.status = 0;
    roulette.updatedAt = new Date();
    await redisSet(id, roulette, 'roulette');

    return roulette;
  },
  findAll: async (type) => {
    const roulette = await redisGetAll(type);
    if (!roulette) throw new Error('the roulette does not exist');

    return roulette;
  },
  find: async (id) => {
    const roulette = await redisGet(id);
    if (!roulette) throw new Error('the roulette does not exist');

    return roulette;
  },
  isOpen: async (id) => {
    const roulette = await redisGet(id);
    if (!roulette) throw new Error('the roulette does not exist');
    if (roulette.status === 0) {
      return true;
    }
    return false;
  },
  close: async (id) => {
    const roulette = await redisGet(`roulette-${id}`);
    if (!roulette) throw new Error('the roulette does not exist');
    roulette.status = 1;
    roulette.updatedAt = new Date();
    await redisSet(id, roulette, 'roulette');
    const bets = await BetModel.findAllByRoulette(roulette.id);
    const winNumber = getWinningNumber();
    const winColor = getWinningColor(winNumber);
    await BetModel.verifyWinners(bets, winNumber, winColor);
    await BetModel.disableBets(bets);

    return { roulette, winNumber };
  },
};

module.exports = { RouletteModel };
