import React, { useEffect, useState } from 'react'
import BooksCard from '../HomePage/Bookscard';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

export default function AllBooks() {
  const axiosSecure = useAxiosSecure();

  const [AllBooks, setAllBooks] = useState([]);
  // console.log(AllBooks)

  useEffect(() => {
    const getData = async () => {
      const result = await axiosSecure('/books')
      // console.log(result.data)
      setAllBooks(result.data)
    }
    getData();
  }, [axiosSecure])

  return (
    <div>
      <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>All Books</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {
          AllBooks.map(book => <BooksCard key={book._id} book={book}></BooksCard>)
        }
      </div>
    </div>

  )
}
