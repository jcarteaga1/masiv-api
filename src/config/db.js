/* eslint-disable no-return-await */
const redis = require('redis');

const redisClient = redis.createClient();
redisClient.connect();

const redisGet = async function (key) {
  const reply = await redisClient.get(key);

  return JSON.parse(reply);
};

const redisGetAll = async function (type) {
  const repliesKeys = await redisClient.keys('*');
  const repliesValues = await Promise.all(
    repliesKeys.map(
      async (reply) => reply.includes(type) && (await redisGet(reply)),
    ),
  );
  const getOnlyTypeValues = repliesValues.filter((value) => value !== false);

  return getOnlyTypeValues;
};

const redisSet = async function (key, value, type) {
  const reply = await redisClient.set(`${type}-${key}`, JSON.stringify(value));

  return reply;
};

module.exports = {
  redisGet,
  redisSet,
  redisGetAll,
};
