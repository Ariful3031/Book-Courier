import React from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

export default function PaymentPage() {

    const { orderId } = useParams()
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: order } = useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const result = await axiosSecure.get(`/orders/${orderId}`)
            return result.data
        }
    })

    const handlePayment = async () => {
        const paymentInfo = {
            price: order.price,
            orderId: order._id,
            customer_email: order.email,
            orderName: order.bookTitle
        }

        const res = await axiosSecure.post('payment-checkout-session', paymentInfo)
        window.location.href = res.data.url;
        console.log(res.data)

    }
    if (isLoading) {
        return <div>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    return (
        <div>
            <h1>Please pay for : {order.bookTitle}</h1>
            <button onClick={handlePayment} className='btn'>pay</button>
        </div>
    )
}
