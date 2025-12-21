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
    // console.log(books)
    return (
        <div>

            <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>My Books : ({books.length})</h1>

            {/* card */}

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>book</th>
                            <th>Book Name</th>
                            <th>CreateAt</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) => <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="h-20 w-30 rounded-xl">
                                                <img
                                                    src={book.bookUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {book.bookName}
                                </td>
                                <td>{book.createAt}</td>

                                <td>
                                    <Link to={`/dashboard/update-book/${book._id}`} className='btn bg-green-500'>Update</Link>
                                </td>
                            </tr>)
                        }


                    </tbody>

                </table>
            </div>
            {/*  */}

        </div>



    )
}
