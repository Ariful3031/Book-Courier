import React, { useEffect, useState } from 'react'

import BooksCard from './Bookscard';

export default function LatestBook() {
    const [latestBooks, setLatestBooks] = useState([]);
    console.log(latestBooks)

    useEffect(() => {
        fetch("/data.json")
            .then(res => res.json())
            .then(data => setLatestBooks(data))
    }, [])

    return (
        <div>
            <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>Latest Books</h1>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                    latestBooks.map(book => <BooksCard key={book._id} book={book}></BooksCard>)
                }
            </div>
        </div>
    )
}
