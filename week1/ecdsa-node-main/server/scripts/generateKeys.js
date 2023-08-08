
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

for(let i = 0 ; i < 3 ; i++) {
    // random priv key
    privateKey = secp.utils.randomPrivateKey();
    // get public key from private key
    publicKey = secp.getPublicKey(privateKey , false);
    // get last 20 bytes from hash pf public key --> eth address
    const normalizedPK = publicKey.slice(1)
    const normalizedPKHash = keccak256(normalizedPK)
    const address = normalizedPKHash.slice(-20)
    console.log("Private key: " + toHex(privateKey))
    console.log("Public key: " + toHex(publicKey))
    console.log("Address: " + toHex(address))
}

