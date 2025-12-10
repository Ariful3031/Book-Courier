
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from "react-router";
import logoImg from '../../assets/screen book logo.png'
import useAuth from '../Hooks/useAuth';

export default function Navbar() {
    const { user,logout } = useAuth();

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

    useEffect(() => {
        const html = document.querySelector('html')
        html.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light")
    }

    const handleLogOut =()=>{
        logout()
        .then()
        .catch(error=>{
            console.log(error)
        })
    }

    const Links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/books'>Books</NavLink></li>
        <li><NavLink to='/request-delivery'>Request Delivery</NavLink></li>
        <li><NavLink to='/add-book'>Add A book</NavLink></li>
        {
            user && <>

            <li><NavLink to='/dashboard/my-orders'>My Dashboard</NavLink></li>
            

            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 z-[1000] shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            Links
                        }
                    </ul>
                </div>
                <Link to='/'> <img className="w-[100px] h-10 btn-ghost rounded-sm text-xl" src={logoImg} alt="" /></Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>
            <div className="navbar-end">
                <div className='mr-2'>
                    <input onChange={(e) => handleTheme(e.target.checked)} type="checkbox" className="toggle theme-controller" />
                </div>
                {
                    user ? <button onClick={handleLogOut} className='btn bg-[#23BE0A] text-white px-3 rounded-lg'>Log Out</button> : <Link to='/login' className="btn bg-[#23BE0A] text-white px-3 rounded-lg">Login</Link>
                }

            </div>
        </div>
    )
}
