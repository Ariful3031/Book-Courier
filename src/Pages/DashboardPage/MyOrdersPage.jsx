import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export default function MyOrdersPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: orders = [] } = useQuery({
    queryKey: ['myOrders', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (order) => {
    if (order.paymentStatus === 'paid') {
      return Swal.fire('You cannot cancel a Paid order!');
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
      queryClient.invalidateQueries(['myOrders', user.email]);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  const handlePayment = async (order) => {
    const paymentInfo = {
      price: order.price,
      orderId: order._id,
      customer_email: order.email,
      orderName: order.bookTitle,
    };

    const res = await axiosSecure.post('payment-checkout-session', paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h1 className="text-xl md:text-3xl font-bold mb-6 dark:text-white text-gray-900">
        All my orders: {orders.length}
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full min-w-[600px] md:min-w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th>SL.</th>
              <th>Book Name</th>
              <th>Order Date</th>
              <th>Payment Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <th>{index + 1}</th>
                <td>{order.bookTitle}</td>
                <td>{order.orderDate}</td>
                <td>
                  {order.paymentStatus === 'paid' ? (
                    <span className="text-green-500 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
                </td>
                <td>
                  <p
                    className={
                      order.status === 'pending'
                        ? 'text-yellow-500 font-medium'
                        : order.status === 'complete'
                          ? 'text-green-500 font-medium'
                          : 'text-red-500 font-medium'
                    }
                  >
                    {order.status}
                  </p>
                </td>
                <td className="flex flex-col md:flex-row gap-2">
                  {order.paymentStatus !== 'paid' && order.status !== 'canceled' && (
                    <button
                      onClick={() => handlePayment(order)}
                      className="btn bg-green-500 text-white w-full md:w-auto hover:bg-green-600 transition-colors"
                    >
                      Pay Now
                    </button>
                  )}
                  {order.status !== 'canceled' && (
                    <button
                      onClick={() => handleCancel(order)}
                      className="btn bg-red-500 text-white w-full md:w-auto hover:bg-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
