import React from 'react'
import error404Img from '../../assets/error-404.png'
import { Link } from 'react-router';
export default function ErrorPage404() {
    return (
        <div className='w-11/12 mx-auto bg-[#F1F5E8] text-center'>
            <div className='py-20'>
                <img className='w-[460px] h-[395px] px-5 py-15 mx-auto' src={error404Img} alt="" />
                <h2 className='text-5xl font-semibold text-[#001931]'>Oops, page not found!</h2>
                <p className='text-xl text-[#627382] mt-2 mb-4'>The page you are looking for is not available.</p>
                <Link to='/'>
                    <button className='btn bg-green-500'>Go Back Home!</button>
                </Link>

            </div>
        </div>
    )
}


