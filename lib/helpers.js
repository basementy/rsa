const bigInt = require("big-integer");

/** Based on the given bits it will return a random prime number */
function generateRandomPrime(bits) {
  const min = bigInt.one.shiftLeft(bits - 1);
  const max = bigInt.one.shiftLeft(bits).prev();

  while (true) {
    let randomNumber = bigInt.randBetween(min, max);

    if (randomNumber.isProbablePrime(256)) {
      return randomNumber;
    }
  }
}

module.exports = {
  generateRandomPrime,
};
