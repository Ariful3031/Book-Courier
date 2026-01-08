import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

export default function PaymentHistory() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        },
    });

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center dark:text-white text-gray-900">
                Payment History ({payments.length})
            </h1>

            {payments.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-300 mt-10 text-lg">
                    No payments found yet.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full min-w-[600px] md:min-w-full">
                        <thead className="bg-gray-200 dark:bg-gray-800">
                            <tr>
                                <th className="text-gray-900 dark:text-white">SL.</th>
                                <th className="text-gray-900 dark:text-white">Book Name</th>
                                <th className="text-gray-900 dark:text-white">Payment Id</th>
                                <th className="text-gray-900 dark:text-white">Amount</th>
                                <th className="text-gray-900 dark:text-white">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="dark:text-gray-200 text-gray-800">
                                    <th>{index + 1}</th>
                                    <td>{payment.orderName}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.paidAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
