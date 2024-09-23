import React, {useState, useEffect} from 'react'
import { useStateContext } from '../Context';
import Hero from './Hero'
import Latest from './Latest';

const Landing = () => {
    const [ethDetails, setEthDetails] = useState()
    const [historicPrice, setHistoricPrice] = useState()
    const [transactions, setTransactions] = useState()
    const [blocks, setBlocks] = useState()
    const [blockNumber, setBlockNumber] = useState();

    const {getLastBlocks, getLivePrices, getHistoricPrice, getLatestBlockTransactions} = useStateContext();

    useEffect(()=>{
        const getBlocks = async () => {
          const data = await getLastBlocks()
          setBlocks(data)
          setBlockNumber(data[data.length - 1])
        }
    
        const getPrices = async () => {
          const {data} = await getLivePrices()
          setEthDetails(data.rates.ETH)
        }
    
        const getOldPrice = async () => {
          const {data} = await getHistoricPrice()
          setHistoricPrice(data.rates.ETH)
        }
    
        const getTransactions = async () => {
          const data = await getLatestBlockTransactions();
          setTransactions(data)
        }
    
        getBlocks()
        getPrices()
        getOldPrice()
        getTransactions()
      }, [getLastBlocks, getLivePrices, getHistoricPrice, getLatestBlockTransactions])
    
  return (
    <div className="App">
        <Hero blockNumber={blockNumber} price={ethDetails} historicPrice={historicPrice} transactions={transactions} />
        <Latest blocks={blocks} transactions={transactions}/>
    </div>

  )
}

export default Landing