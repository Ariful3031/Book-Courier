import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import BooksCard from './BooksCard';

export default function LatestBook() {
    const axiosSecure = useAxiosSecure();
    const [latestBooks, setLatestBooks] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await axiosSecure('/books?latest=true');
                setLatestBooks(result.data || []);
            } catch (error) {
                console.error("LatestBook fetch error:", error);
            }
        };
        getData();
    }, [axiosSecure]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 transition-colors px-4 sm:px-6 lg:px-20 py-10">
            {/* Section Heading */}
            <h1 className='text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white transition-colors'>
                Latest Books
            </h1>

            {/* Books Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    latestBooks.map(book => (
                        <BooksCard key={book._id} book={book} />
                    ))
                }
            </div>
        </section>
    );
}
