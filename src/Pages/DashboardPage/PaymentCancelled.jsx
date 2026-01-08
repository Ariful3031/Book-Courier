import React from 'react';
import { Link } from 'react-router';

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white text-gray-900">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your payment was cancelled. Please try again.
        </p>
        <Link
          to="/dashboard/my-orders"
          className="btn bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
