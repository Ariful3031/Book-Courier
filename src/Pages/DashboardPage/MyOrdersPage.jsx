import React from 'react'
import useAuth from '../../Components/Hooks/useAuth'
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';



export default function MyOrdersPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ['myOrders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    }
  })



  const handleCancel = async (order) => {
    if (order.paymentStatus === 'paid') {
      return Swal.fire('You can not cancel Paid order!');
    }

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'To cancel this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/orders/cancel/${order._id}`);

      Swal.fire('Canceled!', 'Order successfully canceled', 'success');

      //  data refetch
      queryClient.invalidateQueries(['myOrders', user.email]);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
    }




  }

  const handlePayment = async (order) => {
    const paymentInfo = {
      price: order.price,
      orderId: order._id,
      customer_email: order.email,
      orderName: order.bookTitle
    }

    const res = await axiosSecure.post('payment-checkout-session', paymentInfo)
    window.location.assign(res.data.url);
    // window.location.href = res.data.url;
    // console.log(res.data)

  }
  // console.log(orders)
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
                    order.paymentStatus === 'paid' ? <span className='text-green-500'>Paid </span> : <span className='text-red-500'>Unpaid</span>

                  }
                </td>

                <td>
                  <p className={order.status === 'pending' ? 'text-yellow-500' : order.status === 'complete' ? 'text-green-500' : 'text-red-500'}>{order.status}</p>
                </td>
                <td>
                  {order.paymentStatus !== 'paid' && order.status !== 'canceled' && (
                    <button
                      onClick={() => handlePayment(order)}
                      className='btn bg-green-500 text-white'
                    >
                      Pay now
                    </button>
                  )}
                  {/* <button onClick={() => handleCancel(order)} className='btn bg-red-500 ml-2 text-white'>
                    cancel
                  </button> */}
                  {order.status !== 'canceled' && (
                    <button
                      onClick={() => handleCancel(order)}
                      className='btn bg-red-500 ml-2 text-white'
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>)
            }


          </tbody>
        </table>
      </div>
    </div>
  )
}
