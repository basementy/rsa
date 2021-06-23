const rsa = require("../lib/index");

const messageToEncrypt = "hello world";

const generatedKeys = rsa.generateEncryptionKeys(250);

console.log("Generated Keys");
console.log("Private Key:", generatedKeys.privateKey.toString());
console.log("Public Key:", generatedKeys.publicKey.toString());
console.log("Public Exponent:", generatedKeys.publicExponent.toString());
console.log();

const encodedMessage = rsa.encodeMessage(messageToEncrypt);

const encryptedMessage = rsa.encryptMessage(
  encodedMessage,
  generatedKeys.publicKey,
  generatedKeys.publicExponent
);

const decryptedMessage = rsa.decryptMessage(
  encryptedMessage,
  generatedKeys.privateKey,
  generatedKeys.publicKey
);

const decodedMessage = rsa.decodeMessage(decryptedMessage);

console.log("Message:", messageToEncrypt);
console.log("Encoded:", encodedMessage.toString());
console.log("Encrypted:", encryptedMessage.toString());
console.log("Decrypted:", decryptedMessage.toString());
console.log("Decoded:", decodedMessage.toString());
