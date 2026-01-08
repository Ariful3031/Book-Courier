import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

export default function PaymentSuccess() {
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    });
                })
                .catch(err => console.error(err));
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white text-gray-900">
                    Payment Successful!
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Transaction ID:</strong> {paymentInfo.transactionId || 'Loading...'}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    <strong>Order Tracking ID:</strong> {paymentInfo.trackingId || 'Loading...'}
                </p>
                <Link
                    to="/dashboard/my-orders"
                    className="btn bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg transition-colors"
                >
                    Go to My Orders
                </Link>
            </div>
        </div>
    );
}
