import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Header/Navbar'
import Footer from '../Components/Footer/Footer'


export default function MainLayout() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}