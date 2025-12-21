import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import BooksCard from './BooksCard';

export default function LatestBook() {
    const axiosSecure = useAxiosSecure();
    const [latestBooks, setLatestBooks] = useState([]);
    // console.log(latestBooks)

  useEffect(() => {
      const getData = async () => {
        const result = await axiosSecure('/books?latest=true')
        // console.log(result.data)
        setLatestBooks(result.data)
      }
      getData();
    }, [axiosSecure])

    return (
        <div>
            <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>Latest Books</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    latestBooks.map(book => <BooksCard key={book._id} book={book}></BooksCard>)
                }
            </div>
        </div>
    )
}
