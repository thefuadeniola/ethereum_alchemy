import React from 'react'
import logo from '../images/etherscan-logo.svg'

const Nav = ({latestBlock}) => {
  return (
    <nav className='h-[40px] flex flex-row justify-between items-center p-[2.5%]'>
        <div className='flex flex-row items-center gap-2'>
            <img src={logo} alt='etherscan logo' className='h-[30px]'/>
            <h2 className='text-[24px] text-primary-blue mt-[-2px] font-medium'>clone</h2>
        </div> 
        <div className='blockNumber flex items-center justify-center py-4 px-4'>
            <h2 className='text-primary-blue'>Latest block: <span className='font-semibold'>{latestBlock}</span></h2>
        </div>
    </nav>
  )
}

export default Nav