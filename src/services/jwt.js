const jwt = require('jsonwebtoken');

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '1d' });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
