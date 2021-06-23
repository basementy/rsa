const bigInt = require("big-integer");
const helpers = require("./helpers");

/** Given a keysize, it will generate the public key and the private key, and will return the public exponent too */
function generateEncryptionKeys(keysize) {
  const publicExponent = bigInt(65537);

  let firstRandomPrime;
  let secondRandomPrime;
  let totient;

  do {
    firstRandomPrime = helpers.generateRandomPrime(keysize / 2);
    secondRandomPrime = helpers.generateRandomPrime(keysize / 2);

    totient = bigInt.lcm(firstRandomPrime.prev(), secondRandomPrime.prev());
  } while (
    bigInt.gcd(publicExponent, totient).notEquals(1) ||
    firstRandomPrime
      .minus(secondRandomPrime)
      .abs()
      .shiftRight(keysize / 2 - 100)
      .isZero()
  );

  return {
    publicExponent,
    publicKey: firstRandomPrime.multiply(secondRandomPrime),
    privateKey: publicExponent.modInv(totient),
  };
}

/** Given the message, the public key and the public exponent, it will return the encrypted message */
function encryptMessage(encodedMsg, publicKey, publicExponent) {
  return bigInt(encodedMsg).modPow(publicExponent, publicKey);
}

/** Given the encryped message, the private key and the public key, it will return the decrypted message */
function decryptMessage(encryptedMsg, privateKey, publicKey) {
  return bigInt(encryptedMsg).modPow(privateKey, publicKey);
}

/** If the message was a string, it will convert the message string to the utf-8 encoding */
function encodeMessage(messageString) {
  const messageCodes = messageString
    .split("")
    .map((char) => char.charCodeAt())
    .join("");

  return bigInt(messageCodes);
}

/** If the message was originally a string, it will revert the encoded message from utf-8 to string */
function decodeMessage(messageCode) {
  const stringifiedCode = messageCode.toString();

  let string = "";

  for (
    let currentPosition = 0;
    currentPosition < stringifiedCode.length;
    currentPosition += 2
  ) {
    let substringNumber = Number(stringifiedCode.substr(currentPosition, 2));

    if (substringNumber <= 30) {
      string += String.fromCharCode(
        Number(stringifiedCode.substr(currentPosition, 3))
      );

      currentPosition++;
    } else {
      string += String.fromCharCode(substringNumber);
    }
  }

  return string;
}

module.exports = {
  generateEncryptionKeys,
  encryptMessage,
  decryptMessage,
  encodeMessage,
  decodeMessage,
};
