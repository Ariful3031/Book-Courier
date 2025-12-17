import React from 'react'
import useAuth from '../../Components/Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function BeALibrarian() {

  const { user } = useAuth();
  console.log(user)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const handleLibrarian = (data) => {
    // console.log(data)
    axiosSecure.post('/librarians', data)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "sussess",
            text: "Your application submitted. we will reach to you 60 days.",
            icon: "success"
          });
        }
      })

  }

  return (
    <div>

      <h1 className='text-4xl font-bold mt-5 mb-10 dark:text-white  text-black text-center'>Be a Librarian</h1>

      <form className='dark:bg-white px-8 py-5' onSubmit={handleSubmit(handleLibrarian)}
      >
        <fieldset className="fieldset grid grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="label font-semibold text-black mt-2 text-xl">Name</label>
            <input type="text" defaultValue={user?.displayName} readOnly className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('name', { required: true })} placeholder="Your Name" />
            {errors.name?.type === "required" && <p className='text-red-500'>name is required.</p>
            }
          </div>

          {/* email */}
          <div>
            <label className="label font-semibold text-black mt-2 text-xl">Email</label>
            <input type="email" defaultValue={user?.email} readOnly className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('email', { required: true })} placeholder="Email" />
            {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
            }
          </div>

          {/* Address */}
          <div>
            <label className="label font-semibold text-black mt-2 text-xl">Address</label>
            <input type="text" required className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('address', { required: true })} placeholder="Your address" />
            {errors.name?.type === "required" && <p className='text-red-500'>address is required.</p>
            }
          </div>
          {/* Phone Number */}
          <div>
            <label className="label font-semibold text-black mt-2 text-xl">Phone Number</label>
            <input type="number" required className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('Phone Number', { required: true })} placeholder="Your Phone Number" />
            {errors.name?.type === "required" && <p className='text-red-500'>Phone Number is required.</p>
            }
          </div>


          {/* button */}
          <button className="btn bg-[#23BE0A] dark:border-none text-white px-3 rounded-lg">Apply Librarian</button>
        </fieldset>
      </form>
    </div>
  )
}
