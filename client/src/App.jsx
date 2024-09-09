import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import GenerateWallet from "./GenerateWallet";
//
function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("Generate wallet to start using this app")

  return (
    <div>
      <GenerateWallet setMessage={setMessage} />

      <div className="app">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
          message = {message}
        />
        <Transfer setBalance={setBalance} address={address} />
        {/* anytime we generate a wallet, we give it an initial balance of 100 */}
      </div>

    </div>
  );
}

export default App;
