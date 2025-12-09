import React from 'react'
import useAuth from '../../Components/Hooks/useAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';

export default function PaymentHistory() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <h1 className='text-3xl'>Payment History : ( {payments.length} )</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Book Name</th>
                            <th>Payment Id</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) =>
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.orderName}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.paidAt}</td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    )
}
