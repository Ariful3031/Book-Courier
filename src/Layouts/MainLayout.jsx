import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Header/Navbar'
import Footer from '../Components/Footer/Footer'


export default function MainLayout() {
  return (
    <div>
      <div className='bg-gray-50 dark:bg-gray-900 transition-colors sticky top-0 z-[1000]'>
        <Navbar></Navbar>
      </div>
      <div className='w-11/12 max-w-7xl mx-auto'>
        <Outlet></Outlet>
      </div>
      <div className=''>
        <Footer></Footer>
      </div>
    </div>



  )
}