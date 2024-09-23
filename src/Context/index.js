import React, { useContext, createContext } from 'react'
import { Alchemy, Network } from 'alchemy-sdk';
import axios from 'axios';

const StateContext = createContext();

function getDate48HoursAgo() {
    // Get the current date and time
    const currentDate = new Date();
  
    // Subtract 48 hours (48 * 60 * 60 * 1000 milliseconds)
    const pastDate = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
  
    // Format the date as YYYY-MM-DD
    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(pastDate.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}
  
  

export const StateContextProvider = ({ children }) => {
    const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(settings);

    const getLivePrices = async () =>{
        try {
            const result = await axios.get(
                'https://api.coinlayer.com/live?access_key=fe862edd82e3e3f61a09c071ae4b7a67&symbols=ETH',
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
        }
    }

    const getHistoricPrice =  async () =>{
        const twoDaysAgo = getDate48HoursAgo()
        try {
            const result = await axios.get(
                `https://api.coinlayer.com/${twoDaysAgo}?access_key=fe862edd82e3e3f61a09c071ae4b7a67&symbols=ETH`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            return result
        } catch (error) {
            console.log(error)
        }
    }

      
    const getLastBlocks = async () => {
        let blocks = []
        const data = await alchemy.core.getBlockNumber()
        for(let i=0; i<5; i++) {
            blocks.push(data - i)
        }
        return blocks;
    }

    const getLatestBlockTransactions = async (blockNumber) => {
       let data 
       data = await alchemy.core.getBlockWithTransactions(blockNumber)
       if(data && data.transactions.length === 0) {
        data = await alchemy.core.getBlockWithTransactions(blockNumber - 1)
       }
       return data.transactions;
    }
    const getLatestBlockMiners = async (blockNumber) => {
        let data
        let result = [] 
        data = await getLastBlocks()
        for(let i=0; i<data.length; i++){
            const {miner} = await alchemy.core.getBlockWithTransactions(data[i])
            result.push({block: data[i], miner: miner})
        }
        return result
    }
 

    const getTransactionDetails = async () => {
        
    }

    const getWalletTokens = async (address) => {
        const data = await alchemy.core.getTokenBalances(address)
        if(data) return data
    }

    return(
        <StateContext.Provider value={{ getLastBlocks, getLatestBlockTransactions, getTransactionDetails, getWalletTokens, getLivePrices, getHistoricPrice, getLatestBlockMiners }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);