import React from 'react'
import { secp256k1 } from 'ethereum-cryptography/secp256k1.js'
import { toHex } from 'ethereum-cryptography/utils'
import { keccak256 } from 'ethereum-cryptography/keccak'
import server from './server'

const GenerateWallet = ({setMessage}) => {
  const generateWallet = async () => {
    const privateKey = secp256k1.utils.randomPrivateKey()
    const publicKey = secp256k1.getPublicKey(privateKey)
    const hashedAddress = keccak256(publicKey.slice(1))
    const address =  hashedAddress.slice(-20)

    try 
    {
    const data = await server.post(`add`, {
        address: `0x${toHex(address)}`,
        publicKey: toHex(publicKey),
    });

    localStorage.setItem('edsca_pk', toHex(privateKey))

    alert('Wallet Created')
    } catch (error) {
    console.log(error)
    }
    setMessage(`New wallet generated. Address: <i>0x${toHex(address)}</i>. <br />
    Public key: <i>${toHex(publicKey)}</i>. <br />
    Private key has been stored in localStorage and will be used to sign transactions`)

  }  

  return (
    <div>
        <button className="button styled__btn" onClick={generateWallet}>Generate Wallet</button>

    </div>
  )
}

export default GenerateWallet   