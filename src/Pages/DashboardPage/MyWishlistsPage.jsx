import React from 'react'
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BooksCard from '../HomePage/BooksCard';

export default function MyWishlistsPage() {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: Wishlists = [] } = useQuery({
        queryKey: ['myWishlists', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlists?userEmail=${user.email}`);
            return res.data;
        }
    })
    // console.log(Wishlists)
    return (
        <div>
            <h1 className='text-4xl font-bold my-5 dark:text-white text-black text-center'>My WihsLists :({Wishlists.length})</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                    Wishlists.map(book => <BooksCard key={book._id} book={book}></BooksCard>)
                }
            </div>

        </div>
    )
}
