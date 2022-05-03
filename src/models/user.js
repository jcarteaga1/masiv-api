const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { joiPassword } = require('joi-password');
const { redisSet } = require('../config/db');

const UserSchema = Joi.object({
  id: Joi.string().guid({
    version: ['uuidv4', 'uuidv5'],
  }),
  username: Joi.string().required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
  credits: Joi.number().min(0).max(10000).required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const UserModel = {
  create: async (body) => {
    const { value, error } = UserSchema.validate(body);
    if (error) throw error;
    value.password = await bcrypt.hash(value.password, 10);
    const reply = await redisSet(value.id, value, 'user');

    return reply;
  },
};

module.exports = { UserModel };
