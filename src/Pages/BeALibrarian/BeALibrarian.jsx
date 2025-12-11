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
      <h1>Be a Librarian </h1>

      <form onSubmit={handleSubmit(handleLibrarian)}
      >
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label font-semibold text-black">Name</label>
          <input type="text" defaultValue={user?.displayName} readOnly className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('name', { required: true })} placeholder="Your Name" />
          {errors.name?.type === "required" && <p className='text-red-500'>name is required.</p>
          }

          {/* email */}
          <label className="label font-semibold text-black">Email</label>
          <input type="email" defaultValue={user?.email} readOnly className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('email', { required: true })} placeholder="Email" />
          {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
          }

          {/* Address */}
          <label className="label font-semibold text-black">Address</label>
          <input type="text" required className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('address', { required: true })} placeholder="Your address" />
          {errors.name?.type === "required" && <p className='text-red-500'>address is required.</p>
          }
          {/* Phone Number */}
          <label className="label font-semibold text-black">Phone Number</label>
          <input type="number" required className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('Phone Number', { required: true })} placeholder="Your Phone Number" />
          {errors.name?.type === "required" && <p className='text-red-500'>Phone Number is required.</p>
          }


          {/* button */}
          <button className="btn bg-[#23BE0A] dark:border-none text-white px-3 rounded-lg">Apply Librarian</button>
        </fieldset>
      </form>
    </div>
  )
}
