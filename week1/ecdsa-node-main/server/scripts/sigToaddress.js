const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


// function recoverPublicKey(msgHash: Uint8Array, signature: Uint8Array, recovery: number)