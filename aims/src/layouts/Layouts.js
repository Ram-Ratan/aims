import React from 'react'
import Header from './header/Header'
import Navbar from './navbar/Navbar'

const Layouts = ({children}) => {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div className='ml-[224px] mt-4'>
        {children}
      </div>
    </div>
  )
}

export default Layouts