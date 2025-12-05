import React from 'react'
import Navbar from '../Header/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'

export default function HomeLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}
