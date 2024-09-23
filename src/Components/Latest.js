import React, { useState, useEffect } from 'react'
import { useStateContext } from '../Context'

const Latest = ({transactions}) => {
    const { getLatestBlockMiners } = useStateContext();
    const [miners, setMiners] = useState();

    useEffect(()=>{
        const getMiners = async () => {
            const data = await getLatestBlockMiners()
            console.log(data)
            setMiners(data)
        }
        getMiners()
    }, [getLatestBlockMiners])

  return (
    <section className='w-full p-10 flex flex-row gap-10'>
        <div className='rounded-md w-1/3 py-5 latest h-fit'>
            <div className='h-[40px] px-4 pb-4 first'>
                <h2>Latest Blocks</h2>
            </div>
            {
                miners?.map((block) => {
                    return (
                        <div className='py-6 px-6 first flex flex-row items-center justify-between' key={block}>
                            <h2>Block <span className='text-[#0000ff] font-light underline'>{block.block}</span></h2>
                            <div className='max-w-sm'>
                                Miner:<span className='text-primary-blue font-light'>{block.miner.slice(0,8)}...</span>
                            </div>

                        </div>
    
                    )
                } )
            }
            <div className='px-6 pt-4 flex items-center justify-center text-xl font-semibold'>View all</div>
        </div>
        <div className='rounded-md w-2/3 py-5 latest'>
            <div className='h-[40px] px-4 pb-4 first'>
                <h2>Latest Transactions</h2>
            </div>
            {
                transactions?.slice(0,5).map((transaction, index) => (
                    <div className='py-6 px-6 first flex flex-row items-center justify-between' key={index}>
                        <h2>Transaction <span className='text-primary-blue font-light'>{transaction.hash.slice(0,8)}...</span></h2>
                        <div className='max-w-sm'>
                            From <span className='text-primary-blue font-light'>{transaction.from.slice(0,8)}...</span> <br />
                            To <span className='text-primary-blue font-light'>{transaction.to.slice(0,8)}...</span>
                        </div>
                        <div className='latest p-2 rounded-md font-semibold text-sm overflow-x-hidden w-[150px]'>
                            {parseInt(transaction?.value._hex)/1e18} eth
                        </div>

                    </div>
    
                ))
            }
            <div className='px-6 pt-4 flex items-center justify-center text-xl font-semibold'>View all</div>

        </div>
    </section>
  )
}

export default Latest