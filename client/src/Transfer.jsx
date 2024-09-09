import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const privKey = localStorage.getItem('edsca_pk')
      const hash = 'c78fb7b2e3c9c2e712beb3f0810da51cfd22c24f931002cf7b8fe9ec042de50c'
      const sign = secp256k1.sign(hash, privKey, {recovery: true})

      const data = await server.post(`send`, {
        amount: parseInt(sendAmount),
        hash,
        recipient,
        sender: address,
        signature: JSON.parse(JSON.stringify(sign, (key, value) => typeof value === 'bigint' ? value.toString() : value)),
      });
      setBalance(data.balance);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
