import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from 'ethereum-cryptography/utils'
import { keccak256 } from "ethereum-cryptography/keccak"


function Wallet({ address, setAddress, balance, setBalance , privateKey , setPrivateKey }) {
  async function onChange(evt) {

    // get private key from input and translate to an address to look up funds
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp.getPublicKey(privateKey , false);
    // get last 20 bytes from hash pf public key --> eth address
    const normalizedPK = publicKey.slice(1)
    const normalizedPKHash = keccak256(normalizedPK)
    let address = normalizedPKHash.slice(-20)
    address = toHex(address)
    console.log(address)
    setAddress(address)

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your private key, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>

      <div>
        Derived Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
