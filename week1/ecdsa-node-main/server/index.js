const express = require("express");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils")

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // Addresses
  "a8603cfa2d2e3ab952617b99529b1db0c54a3966": 100,// priv: add9f6fbcc1de35de534da9f6bedfda1dbf605013354bb6a1478e4c0bf874a85 , pub: 046e6758adfdcb26f02a6f3113c963b0b29ee5fb6f164806f1dc27dca6a5c5fceeaeba92e935b6a948b399526b2f1924d831a3ae6cf3819515af780803f45a7dd6
  "f35f701427ed570502a071cd72a73cc896c34371": 50, // priv: a2023c6a81156106b8a7a63e5123fb137ce08679a42b41bb0f6269a8d646af06 , pub: 0444ef5e5f0a58d146e3882458146a6df774b7e2a9ca0b10028bbfb2e7a5a8a425959e5204306af18a9c897741fbf77466a2fda14ddc315498d256873dc563797a
  "67c1863316e7b31211f50713ce51e82aa3d6de92": 75, // priv: b13a6ac04d17c1c25a9d7f6450bc0dec315b1931fcccb072c4ea6bc6ee32c80e , pub: 04531e90f0e89547e599828e16912d3b5faf588fb0ea723489da0adee638c0e1aa3515346f4cc6fc3df32ac77151471eb89f6ccc3d2e6adb42ad7a8be3e6306473
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender , recipient , amount , signature, recBit } = req.body;
  // got the sig 
  // got the tx info
  // need to: recover public key 
  // convert it to address
  console.log(signature)
  const bytes = utf8ToBytes(JSON.stringify({ sender, recipient, amount }));
  const msgHash = toHex(keccak256(bytes));
  const recoveredPublicKey = secp.recoverPublicKey(msgHash , signature , recBit , false)
  const address = keccak256(recoveredPublicKey.slice(1)).slice(-20);

  if(toHex(address) !== sender){
    throw new Error('Address doesnt match!')
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
