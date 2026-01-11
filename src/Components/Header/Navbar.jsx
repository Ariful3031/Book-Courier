import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import logoImg from '../../assets/screen-book-logo.png';
import useAuth from '../Hooks/useAuth';
import { toast } from 'react-toastify';
import useRole from '../Hooks/useRole';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { role } = useRole();
    const defaultAvatar = "https://i.ibb.co/4pDNDk1/avatar.png";

    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");

    useEffect(() => {
        const html = document.querySelector('html');
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

    const handleLogOut = () => {
        logout().catch(error => toast.error(error.message));
    }

    const Links = <>
        <li><NavLink className='dark:text-white text-gray-900' to='/'>Home</NavLink></li>
        <li><NavLink className='dark:text-white text-gray-900' to='/books'>Books</NavLink></li>
        <li><NavLink className='dark:text-white text-gray-900' to='/about-us'>About Us</NavLink></li>

        {role.role !== 'librarian' && <li><NavLink className='dark:text-white text-gray-900' to='/be-librarian'>Apply Librarian</NavLink></li>}
        {role.role === 'librarian' && <li><NavLink className='dark:text-white text-gray-900' to='/add-book'>Add A Book</NavLink></li>}
        {user && <>

            <li><NavLink className='dark:text-white text-gray-900' to='/dashboard/my-orders'>My Dashboard</NavLink></li>
        </>}
    </>

    return (
        <div className="w-11/12 max-w-7xl mx-auto navbar px-0 ">

            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex="-1" className="menu menu-sm dropdown-content rounded-box dark:bg-gray-800 bg-white dark:text-white text-gray-900 z-50 mt-3 w-52 p-2 shadow">
                        {Links}
                    </ul>
                </div>
                <Link to='/'>
                    <img className="w-[100px] h-10 rounded-sm" src={logoImg} alt="Logo" />
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-3">

                {/* Theme Toggle */}
                <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    className="toggle toggle-sm theme-controller"
                />

                {/* User Profile / Login */}
                {user ? (
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost w-12 h-12 btn-circle avatar">
                                <img className='rounded-full' src={user?.photoURL || defaultAvatar} alt="Profile" />
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52 dark:bg-gray-800 bg-white dark:text-white text-gray-900 transition-colors">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/settings">Settings</Link></li>
                                <li><button onClick={handleLogOut} className="text-red-500">Logout</button></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Link to='/login' className="btn bg-[#23BE0A] hover:bg-green-600 text-white px-3 rounded-lg transition-colors">Login</Link>
                )}

            </div>
        </div>
    )
}
