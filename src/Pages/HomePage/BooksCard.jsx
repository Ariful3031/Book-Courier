import React from 'react';
import { IoLogoUsd } from 'react-icons/io';
import { MdOutlineStar } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function BooksCard({ book }) {
    return (
        <div className='p-5 bg-green-50 dark:bg-gray-800 rounded-lg flex flex-col transition-colors'>

            {/* Book Image */}
            <img
                className='w-full h-[250px] rounded-lg object-cover'
                src={book.bookUrl}
                alt={book.bookName}
            />

            {/* Book Name */}
            <h2 className='text-xl font-semibold mt-5 mb-2 flex-grow overflow-hidden text-gray-900 dark:text-white transition-colors'>
                {book.bookName}
            </h2>

            {/* Price and Rating */}
            <div className='flex justify-between gap-2'>

                {/* Price */}
                <div className='flex items-center gap-1 px-3 py-1 bg-amber-200 dark:bg-amber-600 dark:text-gray-900 rounded-xl'>
                    <h3 className='text-sm sm:text-base'>Price: {book.price}</h3>
                    <IoLogoUsd className='text-lg' />
                </div>

                {/* Rating */}
                <div className='flex items-center gap-2 bg-green-400 dark:bg-green-600 px-2 rounded-lg text-white dark:text-gray-100'>
                    <div className='flex gap-0.5'>
                        {[...Array(5)].map((_, i) => (
                            <MdOutlineStar key={i} className='text-yellow-300 dark:text-yellow-400' />
                        ))}
                    </div>
                    <p className='text-sm font-medium'>{book.rating}</p>
                </div>

            </div>

            {/* Book Details Button */}
            <Link
                to={`/book/details/${book._id}`}
                className='mt-3 w-full py-2 bg-green-600 dark:bg-green-500 text-white dark:text-gray-100 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 text-center font-semibold transition-colors'
            >
                Book Details
            </Link>
        </div>
    );
}
