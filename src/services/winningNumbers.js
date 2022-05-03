function getWinningNumber() {
  return Math.floor(Math.random() * (37 - 0)) + 0;
}

function getWinningColor(number) {
  if (number % 2 === 0) {
    return 0;
  }
  return 1;
}

module.exports = {
  getWinningNumber,
  getWinningColor,
};
