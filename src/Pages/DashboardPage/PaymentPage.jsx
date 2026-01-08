
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function PaymentPage() {
    const { orderId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: order } = useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const result = await axiosSecure.get(`/orders/${orderId}`);
            return result.data;
        },
    });

    const handlePayment = async () => {
        const paymentInfo = {
            price: order.price,
            orderId: order._id,
            customer_email: order.email,
            orderName: order.bookTitle,
        };

        const res = await axiosSecure.post('payment-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-xs mr-1"></span>
                <span className="loading loading-bars loading-sm mr-1"></span>
                <span className="loading loading-bars loading-md mr-1"></span>
                <span className="loading loading-bars loading-lg mr-1"></span>
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white text-gray-900">
                    Payment for:
                </h1>
                <p className="text-lg md:text-xl font-semibold mb-6 dark:text-gray-200 text-gray-700">
                    {order.bookTitle}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Amount to pay: <span className="font-bold">${order.price}</span>
                </p>
                <button
                    onClick={handlePayment}
                    className="btn bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg transition-colors"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}

