const secp = require('ethereum-cryptography/secp256k1.js')
const {toHex} = require('ethereum-cryptography/utils')
const {keccak256} = require('ethereum-cryptography/keccak')
const {utf8ToBytes} = require('ethereum-cryptography/utils')

const hash = keccak256(utf8ToBytes('send'))
console.log(toHex(hash))
// Private key: 155559a368e77fc557f591ba92672ada8e83e76b0addd9943fccb7956b46830d
// Public key: 03a829d15e0165d596ae44c550d8d49b6a4a1ec2bb4fe23ae4a933c4ba4091e18e
// Address: 0x1606b7a2ae0e1b37d47a8e310198de479e07b394

// Private key: f961d6a789027ed3f82d0064606c910e8bf9fbc9d176a37f38af0ebd9945b4b6
// Public key: 0313012d90ab25f92a0d53687e97ba4723858f26852d439aabfcb20f45d52eada3
// Address: 0x70a1015cc34259dedc1260da4eae6f3d50ee375c

// Private key: c9f8fd6b760cb87b7e86359ab4082c242492cd1f5c1a72223ba37fa72140f564
// Public key: 02e8832a338e2d9723e4dedafee7f712a601a8a6ed9d15433e4c5f8e21f27cb5dc
// Address: 0xb90bedf232bf645f5f1c293236a6d19c586b1a4a

// Private key: b65a87ba20fdf541f6c9f76d912cc057478ea96065d68756003570e13082be05
// Public key: 0231ee7274d3298e1031ae371edfdb551ded1467cf0b30bb4a278274b0dc1a7abf
// Address: 0x96afb94b1f18ae18b840ea6a28ad5ed405a1c162