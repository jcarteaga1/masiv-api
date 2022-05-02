/* eslint-disable no-return-await */
const redis = require('redis');

const redisClient = redis.createClient();
redisClient.connect();

const redisGet = async function (key) {
  const reply = await redisClient.get(key);

  return JSON.parse(reply);
};

const redisGetAll = async function () {
  const repliesKeys = await redisClient.keys('*');
  const repliesValues = await Promise.all(
    repliesKeys.map(async (reply) => await redisGet(reply)),
  );

  return repliesValues;
};

const redisSet = async function (key, value) {
  const reply = await redisClient.set(key, JSON.stringify(value));

  return reply;
};

module.exports = {
  redisGet,
  redisSet,
  redisGetAll,
};
