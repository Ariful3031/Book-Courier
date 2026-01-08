import React from 'react';
import useAuth from '../../Components/Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function BeALibrarian() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const handleLibrarian = (data) => {
    axiosSecure.post('/librarians', data)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Your application has been submitted. We will reach out to you within 60 days.",
            icon: "success"
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error"
        });
      });
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className='text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white transition-colors'>
        Be a Librarian
      </h1>

      <form onSubmit={handleSubmit(handleLibrarian)} className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="label font-semibold text-gray-900 dark:text-white">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              readOnly
              {...register('name', { required: true })}
              className="input w-full mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2"
            />
            {errors.name && <p className='text-red-500 mt-1'>Name is required.</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label font-semibold text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              readOnly
              {...register('email', { required: true })}
              className="input w-full mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2"
            />
            {errors.email && <p className='text-red-500 mt-1'>Email is required.</p>}
          </div>

          {/* Address */}
          <div>
            <label className="label font-semibold text-gray-900 dark:text-white">Address</label>
            <input
              type="text"
              {...register('address', { required: true })}
              placeholder="Your Address"
              className="input w-full mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2"
            />
            {errors.address && <p className='text-red-500 mt-1'>Address is required.</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="label font-semibold text-gray-900 dark:text-white">Phone Number</label>
            <input
              type="tel"
              {...register('phone', { required: true })}
              placeholder="Your Phone Number"
              className="input w-full mt-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2"
            />
            {errors.phone && <p className='text-red-500 mt-1'>Phone Number is required.</p>}
          </div>

        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button type="submit" className="btn bg-[#23BE0A] hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Apply Librarian
          </button>
        </div>

      </form>
    </section>
  )
}
