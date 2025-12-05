
import React from 'react'
import logoImg from '../../assets/screen book logo.png'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { FaFacebook, FaGithub, FaInstagramSquare } from 'react-icons/fa'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <div>
      <footer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-7 lg:grid-cols-6 gap-6 sm:gap-8 footer bg-neutral text-neutral-content p-10">
        <nav className='col-span-2 md:col-span-2 flex md:flex-col'>
          <Link to='/'><img className='w-15 h-15 rounded-full' src={logoImg} alt="" /></Link>
          <p>
            Your trusted marketplace for authentic local
            products. Discover the best deals from across
            Bangladesh.
          </p>
        </nav>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to='/books' className="link link-hover">All Books</Link>
          <Link to='/dashboard' className="link link-hover">Dashboard</Link>
          <Link to='/login' className="link link-hover">Login</Link>
          <Link to='/register' className="link link-hover">Register</Link>
        </nav>
        {/* <nav>
          <h6 className="footer-title">Categories</h6>
          <a className="link link-hover">Web Development</a>
          <a className="link link-hover">Multimedia</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
        </nav> */}
        <nav>
          <h6 className="footer-title">Social Links</h6>
          <div className='flex items-center gap-1'>
            <FaSquareXTwitter />
            <a className="link link-hover">Twitter</a>
          </div>
          <div className='flex items-center gap-1'>
            <FaInstagramSquare />
            <a className="link link-hover">Instagram</a>
          </div>
          <div className='flex items-center gap-1'>
            <FaFacebook />
            <a className="link link-hover">Facebook</a>
          </div>
          <div className='flex items-center gap-1'>
            <FaGithub />
            <a className="link link-hover">GitHub</a>
          </div>



        </nav>
        <nav>
          <h6 className="footer-title">Contact & Support</h6>
          <a className="link link-hover">support@Smartdeals.com</a>
          <a className="link link-hover">+880 123 456 789</a>
          <a className="link link-hover">123 Commerce Street, Dhaka, Bangladesh</a>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal text-center bg-neutral text-neutral-content justify-center items-center p-4">


        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>


      </footer>
    </div>
  )
}
