const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { joiPassword } = require('joi-password');
const { redisSet, redisGetAll } = require('../config/db');

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
  login: async (body) => {
    const { username, password } = body;
    const allUsers = await redisGetAll('user');
    const findUser = allUsers.find((user) => user.username === username);
    if (!findUser) throw new Error('user does not exist');
    if (bcrypt.compareSync(password, findUser.password)) {
      throw new Error('Incorrect password');
    }
    const accessToken = jwt.sign({ id: findUser.id }, process.env.JWT_KEY);
    return { ...findUser, token: accessToken };
  },
};

module.exports = { UserModel };
