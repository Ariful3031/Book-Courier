import React from 'react'
import { IoLogoUsd } from 'react-icons/io';
import { MdOutlineStar } from 'react-icons/md';
import { Link } from 'react-router';

export default function BooksCard({ book }) {
    // console.log(book)
    return (
        <div className='p-5 bg-[#DCFCE7] rounded-lg flex flex-col'>
            <img className='w-full h-[250px] rounded-lg object-cover' src={book.bookUrl} alt="" />
            <h2 className='text-xl font-semibold mt-5 mb-2 flex-grow overflow-hidden dark:text-black'>{book.bookName}</h2>
            <div className='flex justify-between'>
                <div className='flex items-center px-3 py-1 bg-amber-200 rounded-xl dark:text-black'>
                    <h3 className=''>Price : {book.price}</h3>
                    <IoLogoUsd />
                </div>
                <div className='flex items-center gap-2 bg-[#00D390] px-2 rounded-lg dark:text-black '>
                    <div className='flex'>
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                    </div>
                    <p>{book.rating}</p>
                </div>
            </div>
            <Link to={`/book/details/${book._id}`} className='btn bg-[#23BE0A] text-white w-full py-2 border-none mt-3 rounded-lg'>Book Details</Link>

        </div>
    )
}
