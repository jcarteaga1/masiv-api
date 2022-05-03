/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-await */
/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { redisSet, redisGetAll } = require('../config/db');
const { RouletteModel } = require('./roulette');
const { UserModel } = require('./user');

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
  active: Joi.boolean(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const BetModel = {
  create: async (body) => {
    const { value, error } = BetSchema.validate(body);
    if (error) throw error;
    const isOpen = await RouletteModel.isOpen(`roulette-${value.rouletteId}`);
    if (!isOpen) throw new Error('the roulette is closed');
    const hasCredits = await UserModel.verifyCredits(
      `user-${value.userId}`,
      value.credits,
    );
    if (!hasCredits) throw new Error('the user does not have enough credits');
    const reply = await redisSet(value.id, value, 'bet');
    await UserModel.updateCredits(`user-${value.userId}`, value.credits, 0);

    return reply;
  },
  findAllByRoulette: async (rouletteId) => {
    const allBets = await redisGetAll('bet');
    if (!allBets) throw new Error('no bets');
    const betsByRoulette = allBets.filter(
      (bet) => bet.rouletteId === rouletteId,
    );
    if (!betsByRoulette) throw new Error('no bets');

    return betsByRoulette;
  },
  verifyWinners: async (bets, winNumber, winColor) => {
    const betsWinNumber = bets.filter((bet) => bet.number === winNumber);
    betsWinNumber.forEach(
      async (bet) =>
        await UserModel.updateCredits(
          `user-${bet.userId}`,
          Math.floor(bet.credits * 5),
          1,
        ),
    );
    const betsWinColor = bets.filter((bet) => bet.color === winColor);
    betsWinColor.forEach(
      async (bet) =>
        await UserModel.updateCredits(
          `user-${bet.userId}`,
          Math.floor(bet.credits * 1.8),
          1,
        ),
    );
  },
};

module.exports = { BetModel };
