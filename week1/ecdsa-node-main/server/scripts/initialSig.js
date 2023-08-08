const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

pub = ["04323c22a8f20dc39977d5fa2c2887f6f91ca6943a2e9fbd86fc2b734d76c37ea835f5685a20bedf9aeb1453f89736d1bf3fe1fc1c10d7d45c28733a3a29212236", "04e9378e4af634edff11f64d96a6e19ea5a87a0260d9fb58c3d96124be1261c3768095ca6fe65f6e42903f89958903be1ee6896c21f756be26d6da02375207c028" , "0405dd7df13f192a54efe838eb202323aa9af5fa9326c1c99400e7ac9746969ca6ef638d780ee0212fac7e5055eb3b285d1424bce801d7c0c4b38cc272e705b669"]
priv = ["1742aaa776137c31ac6d952d26d355e6458ff9c786127241c7d67b772206116d", "dbb5e4858b64ddeefb92bd585d3e8558d1688e8a731f4e8b73e642b0670d7065" , "e08cf726835372250c18c9f61db46b9615a600b36ef89c9c3c2fb5b7863dbe85"]
addresses = ["1a013bddea14905ad78fa5346323ef51d32a5c6a"  , "37b03e052c2d9d12bd60a80443fc6b10c1db38ec" , "03c6021ae6cde24cb7d584fc77cda3511b0fa773"]

function hashMessage(message) {
    const msgToBytes = utf8ToBytes(message)
    const msgHash = keccak256(msgToBytes)
    return msgHash
}

async function signMessage(msg , n) {
    const msgHash = hashMessage(msg)
    const sig = secp.sign(msgHash , priv[n] , { recovered : true })
    return sig  
}

async function main(msg , n) {    
    initialSig = await signMessage(msg , n)
    msgHash = hashMessage(msg)
    const address = sigToAddress(msgHash , initialSig[0] , initialSig[1] )
    console.log("Message Hash: " + toHex(msgHash))
    console.log("Sig: " + toHex(initialSig[0]))
    console.log("Recovery bit: " + initialSig[1])
    console.log("Recovered address from sig: " + toHex(address)) 
    
}

// choose n wallet (0 , 1 ,2)
n = 1 
const msg = "Initial message to sing " + n
console.log("Wallet: " + n)
main(msg , n)

function sigToAddress(msgHash , signature , recoveryBit ) {
    const recoveredPublicKey = secp.recoverPublicKey(msgHash , signature , recoveryBit)
    const address = keccak256(recoveredPublicKey.slice(1)).slice(-20);
    return address
}
// function recoverPublicKey(msgHash: Uint8Array, signature: Uint8Array, recovery: number)