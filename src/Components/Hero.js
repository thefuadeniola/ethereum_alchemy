import React, { useEffect, useState } from 'react'
import ethereum from '../images/icons8-ethereum.svg'
import stopwatch from '../images/icons8-stopwatch-80.png'
import globe from '../images/icons8-globe-50.png'
import average from '../images/icons8-average-100.png'
import gas from '../images/icons8-gas-50.png'
import transactionIcon from '../images/icons8-transactions-64.png'

const Hero = ({blockNumber, price, historicPrice, transactions}) => {

    const [sum, setSum] = useState()

    function sumGasPrices(array) {
        return array?.reduce((sum, obj) => {
            // Check if gasPrice object exists and if it has a valid hex value
            if (obj.gasPrice && obj.gasPrice._hex) {
            // Convert the hex string to a number using parseInt with base 16
            const gasPriceInNumber = parseInt(obj.gasPrice._hex, 16);
            // Add it to the sum
            return (sum + gasPriceInNumber) / 1e9;
            }
            return sum/1e9;
        }, 0); // Initial sum value set to 0
    }

    useEffect(() => {
        setSum((sumGasPrices(transactions) / transactions?.length))
    }, [transactions])


  return (
    <div className='w-screen h-[50vh] bg-hero flex items-center justify-center'>
        <div className='w-4/5 bg-white h-[40vh] rounded-xl flex flex-row items-center justify-around p-6'>
            <div className='tab-1 h-full w-1/3 flex flex-col p-4'>
                <div className='h-1/2 first flex flex-row items-center gap-4'>
                    <img src={ethereum} alt='eth_logo' />
                    <div>
                        <h1 className='font-2xl font-semibold'>Current Ethereum Price</h1>
                        <h2 className='font-xl'>{price?.toFixed(3)}</h2>
                    </div>
                </div>
                <div className='h-1/2 flex flex-row items-center gap-4'>
                    <img src={average} alt='eth_logo' className='h-[50px]' />
                    <div>
                        <h1 className='font-2xl font-semibold'>Average Price (48h)</h1>
                        <h2 className='font-xl'>{((price + historicPrice) / 2)?.toFixed(3)}</h2>
                    </div>

                </div>
            </div>
            <div className='tab-2 h-full w-1/3 flex flex-col p-4'>
                <div className='h-1/2 first flex flex-row items-center gap-4'>
                    <img src={globe} alt='eth_logo' className='h-[50px]' />
                    <div>
                        <h1 className='font-2xl font-semibold'>Market Cap</h1>
                        <h2 className='font-xl'>$318,078,976,462.00</h2>
                    </div>
                </div>
                <div className='h-1/2 flex flex-row items-center gap-4'>
                    <img src={stopwatch} alt='eth_logo' className='h-[50px]' />
                    <div>
                        <h1 className='font-2xl font-semibold'>Last mined block</h1>
                        <h2 className='font-xl'>{blockNumber}</h2>
                    </div>

                </div>
            </div>
            <div className='tab-3 h-full w-1/3 flex flex-col p-4'>
                <div className='h-1/2 first flex flex-row items-center gap-4'>
                    <img src={transactionIcon} alt='eth_logo' className='h-[50px]' />
                    <div>
                        <h1 className='font-2xl font-semibold'>Transactions Count (last block)</h1>
                        <h2 className='font-xl'>{transactions?.length}</h2>
                    </div>
                </div>
                <div className='h-1/2 flex flex-row items-center gap-4'>
                    <img src={gas} alt='eth_logo' className='h-[50px]' />
                    <div>
                        <h1 className='font-2xl font-semibold'>Average Gas price</h1>
                        <h2 className='font-xl'>{sum?.toFixed(4)} Gwei</h2>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero