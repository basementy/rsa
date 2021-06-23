const rsa = require("../lib/index");

const externalPrivateKey = "";
const externalPublicKey = "";
const externalEncryptedMessage = "";

const decryptedMessage = rsa.decryptMessage(
  externalEncryptedMessage,
  externalPrivateKey,
  externalPublicKey
);

const decodedMessage = rsa.decodeMessage(decryptedMessage);

console.log("Decrypted:", decryptedMessage.toString());
console.log("Decoded:", decodedMessage.toString());
