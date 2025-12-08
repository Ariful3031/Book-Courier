import React from 'react'
import useAuth from '../../Components/Hooks/useAuth'
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: ['myOrders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    }
  })
  console.log(orders)
  return (
    <div>
      <h1>All my orders: {orders.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL.</th>
              <th>Book Name</th>
              <th>Order date</th>
              <th>Payment Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              orders.map((order, index) => <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.bookTitle}</td>
                <td>{order.orderDate}</td>
                <td>
                  {
                  order.paymentStatus ==='paid'?  <span className='text-green-500'>Paid </span>: <span className='text-red-500'>Unpaid</span>
                   
                  }
                </td>

                <td>{
                order.status==="rejacted"? <span className='text-red-500'>Rejected</span> : <span className='text-yellow-600'>Pending</span>
                  }</td>
                <td>
                  <button className='btn bg-green-500 text-white'>
                    Pay now
                  </button>
                  <button className='btn bg-red-500 ml-2 text-white'>
                    cancel
                  </button>
                </td>
              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
  )
}
