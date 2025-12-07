import React, { useEffect, useState } from 'react'
import BooksCard from '../HomePage/Bookscard';

export default function AllBooks() {

    const [AllBooks, setAllBooks] = useState([]);
      console.log(AllBooks)
  
      useEffect(() => {
          fetch("/data.json")
              .then(res => res.json())
              .then(data => setAllBooks(data))
      }, [])

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
