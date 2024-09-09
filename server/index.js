const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1')

app.use(cors());
app.use(express.json());

const balances = {
  "0x1606b7a2ae0e1b37d47a8e310198de479e07b394": 100,
  "0x70a1015cc34259dedc1260da4eae6f3d50ee375c": 50,
  "0xb90bedf232bf645f5f1c293236a6d19c586b1a4a": 75,
  "0x96afb94b1f18ae18b840ea6a28ad5ed405a1c162": 80
};

const publicServer = [
  {
    address: "0x1606b7a2ae0e1b37d47a8e310198de479e07b394",
    publicKey: "03a829d15e0165d596ae44c550d8d49b6a4a1ec2bb4fe23ae4a933c4ba4091e18e",
    balance: 100
  },
  {
    address: "0x70a1015cc34259dedc1260da4eae6f3d50ee375c",
    publicKey: "0313012d90ab25f92a0d53687e97ba4723858f26852d439aabfcb20f45d52eada3",
    balance: 50
  },
  {
    address: "0xb90bedf232bf645f5f1c293236a6d19c586b1a4a",
    publicKey: "02e8832a338e2d9723e4dedafee7f712a601a8a6ed9d15433e4c5f8e21f27cb5dc",
    balance: 75
  },
  {
    address: "0x96afb94b1f18ae18b840ea6a28ad5ed405a1c162",
    publicKey: "0231ee7274d3298e1031ae371edfdb551ded1467cf0b30bb4a278274b0dc1a7abf",
    balance: 80
  }
]

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  let balance;
  for(let i=0; i<publicServer.length; i++) {
    if(publicServer[i].address == address) {
      balance = publicServer[i].balance
    }
  }
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { amount, hash, recipient, sender, signature } = req.body;
  signature.r = BigInt(signature.r);
	signature.s = BigInt(signature.s);

  const pubKey = publicServer.find(obj => obj.address === sender).publicKey
  console.log(pubKey)

  let serverValidation = false
  const isValid = secp.secp256k1.verify(signature, hash, pubKey)

  if(isValid) serverValidation = true

  const senderObject = publicServer.find(obj => obj.address === sender)
  const recipientObject = publicServer.find(obj => obj.address === recipient)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (senderObject.balance < amount) {
    res.status(400).send({ message: "Not enough funds" });
  } else if (!serverValidation) {
    res.status(400).send({ message: "Incorrect private key!" });
  }
  else {
    senderObject.balance -= amount;
    recipientObject.balance += amount
    res.send({ balance: senderObject.balance })
  }

});

app.post("/add", (req, res) => {
  const { address, publicKey } = req.body;

  const newWallet = {
    address, publicKey, balance: 100
  }
  
  publicServer.push(newWallet)
  res.send(publicServer[publicServer.length - 1])
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  const object = publicServer.find(obj => obj.address === address)

  if (!object.balance) {
    object.balance = 0;
  }
}
