import React from 'react'
import Header from './header/Header'
import Navbar from './navbar/Navbar'

const Layouts = ({children}) => {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div className='ml-[208px]'>
        {children}
      </div>
    </div>
  )
}

export default Layouts