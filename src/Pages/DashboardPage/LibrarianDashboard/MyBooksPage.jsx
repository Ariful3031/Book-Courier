import React from 'react'
import useAuth from '../../../Components/Hooks/useAuth';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

export default function MyBooksPage() {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: books = [] } = useQuery({
        queryKey: ['myBooks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books?email=${user.email}`);
            return res.data;
        }
    })

    return (
        <div className="p-5 dark:bg-gray-900 min-h-screen">

            <h1 className='text-3xl md:text-4xl font-bold mb-8 text-center text-black dark:text-white'>
                My Books ({books.length})
            </h1>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table w-full min-w-[600px] md:min-w-full">
                    <thead className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                        <tr>
                            <th className="text-sm md:text-base">SL</th>
                            <th className="text-sm md:text-base">Book</th>
                            <th className="text-sm md:text-base">Book Name</th>
                            <th className="text-sm md:text-base">Created At</th>
                            <th className="text-sm md:text-base">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="dark:text-gray-300 text-gray-800">
                        {
                            books.map((book, index) => (
                                <tr key={book._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="h-20 w-20 rounded-xl overflow-hidden">
                                                <img
                                                    className="object-cover w-full h-full"
                                                    src={book.bookUrl}
                                                    alt={book.bookName} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium dark:text-white">{book.bookName}</td>
                                    <td>{book.createAt}</td>
                                    <td>
                                        <Link
                                            to={`/dashboard/update-book/${book._id}`}
                                            className='btn bg-green-500 hover:bg-green-600 text-white'
                                        >
                                            Update
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
