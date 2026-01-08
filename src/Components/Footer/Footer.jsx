import React from 'react';
import logoImg from '../../assets/screen-book-logo.png';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaGithub, FaInstagramSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className=" bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">

      {/* Main Footer Grid */}
      <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-6 gap-6 sm:gap-8 p-10">

        {/* Logo & About */}
        <nav className='col-span-2 md:col-span-2 flex md:flex-col gap-4'>
          <Link to='/'>
            <img className='w-16 h-16 rounded-full' src={logoImg} alt="Logo" />
          </Link>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.
          </p>
        </nav>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title font-semibold mb-3 text-gray-900 dark:text-white">Quick Links</h6>
          <Link to='/books' className="block link-hover mb-1">All Books</Link>
          <Link to='/dashboard' className="block link-hover mb-1">Dashboard</Link>
          <Link to='/login' className="block link-hover mb-1">Login</Link>
          <Link to='/register' className="block link-hover mb-1">Register</Link>
        </nav>

        {/* Social Links */}
        <nav>
          <h6 className="footer-title font-semibold mb-3 text-gray-900 dark:text-white">Social Links</h6>
          <div className='flex items-center gap-2 mb-1'>
            <FaSquareXTwitter className='text-blue-500' />
            <a href="#" className="link link-hover">Twitter</a>
          </div>
          <div className='flex items-center gap-2 mb-1'>
            <FaInstagramSquare className='text-pink-500' />
            <a href="#" className="link link-hover">Instagram</a>
          </div>
          <div className='flex items-center gap-2 mb-1'>
            <FaFacebook className='text-blue-700' />
            <a href="#" className="link link-hover">Facebook</a>
          </div>
          <div className='flex items-center gap-2 mb-1'>
            <FaGithub className='text-gray-800 dark:text-gray-100' />
            <a href='https://github.com/Ariful3031/Book-Courier' className="link link-hover">GitHub</a>
          </div>
        </nav>

        {/* Contact & Support */}
        <nav>
          <h6 className="footer-title font-semibold mb-3 text-gray-900 dark:text-white">Contact & Support</h6>
          <a href="mailto:support@Smartdeals.com" className="block link link-hover mb-1">support@Smartdeals.com</a>
          <a href="tel:+880123456789" className="block link link-hover mb-1">+880 123 456 789</a>
          <a className="block link link-hover">123 Commerce Street, Dhaka, Bangladesh</a>
        </nav>

      </div>

      {/* Bottom Footer */}
    <div className='bg-gray-200 dark:bg-gray-800'>
        <div className="w-11/12 max-w-7xl mx-auto footer sm:footer-horizontal text-center  text-gray-700 dark:text-gray-300 justify-center items-center p-4 transition-colors">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </div>
    </div>

    </footer>
  );
}
