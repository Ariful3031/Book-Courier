import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BooksCard from '../HomePage/BooksCard';

export default function MyWishlistsPage() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishlists = [] } = useQuery({
        queryKey: ['myWishlists', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlists?userEmail=${user.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <h1 className="text-4xl font-bold my-5 dark:text-white text-gray-900 text-center">
                My Wishlists ({wishlists.length})
            </h1>

            {wishlists.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-300 mt-10 text-xl">
                    Your wishlist is empty. Start adding some books!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5">
                    {wishlists.map((book) => (
                        <BooksCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
