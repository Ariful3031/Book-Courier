
import React from 'react'
import appErrorImg from '../../assets/App-Error.png'
import { Link } from 'react-router';

export default function ErrorElementPage() {
  return (
      <div className='py-20 text-center'>
            <img className='w-[400px] h-[350px] px-5 py-15 mx-auto' src={appErrorImg} alt="" />
            <h2 className='text-5xl font-semibold text-[#001931]'>OPPS!! book NOT FOUND</h2>
            <p className='text-xl text-[#627382] mt-2 mb-4'>The App you are requesting is not found on our system.  please try another apps</p>
            <Link to='/books'>
                <button className='btn bg-green-500 text-white'>Go Back!</button>
            </Link>

        </div>
  )
}
