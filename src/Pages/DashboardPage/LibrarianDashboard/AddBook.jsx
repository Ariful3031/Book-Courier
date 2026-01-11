import React from 'react'
import useAuth from '../../../Components/Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

export default function AddBook() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleAddBook = (data) => {
        const addBookInfo = {
            ...data,
            createAt: new Date(),
            rating: 4.5
        }
        axiosSecure.post('/books', addBookInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Your book added successfully!')
                    reset();
                }
            })
            .catch(err => toast.error(err.message))
    }

    return (
        <div className='p-5 md:px-10 min-h-screen dark:bg-gray-900'>

            <h1 className='text-3xl md:text-4xl font-bold my-5 text-center text-black dark:text-white'>Add a New Book</h1>

            <form className='bg-white dark:bg-gray-800 p-5 md:p-8 rounded-lg shadow-lg' onSubmit={handleSubmit(handleAddBook)}>
                <fieldset className="fieldset">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                        {/* Left Side */}
                        <div className='flex flex-col gap-3'>
                            <label className="label font-semibold text-black dark:text-white">Book Name</label>
                            <input type="text" className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('bookName', { required: true })} placeholder="Type book name" />
                            {errors.bookName && <p className='text-red-500'>Book name is required.</p>}

                            <label className="label font-semibold text-black dark:text-white">Book Photo URL</label>
                            <input type="url" className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('bookUrl', { required: true })} placeholder="Type book image URL" />
                            {errors.bookUrl && <p className='text-red-500'>Book image is required.</p>}

                            <label className="label font-semibold text-black dark:text-white">Email</label>
                            <input type="email" defaultValue={user?.email} readOnly className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('email', { required: true })} />
                        </div>

                        {/* Right Side */}
                        <div className='flex flex-col gap-3'>
                            <label className="label font-semibold text-black dark:text-white">Writer Name</label>
                            <input type="text" className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('writerName', { required: true })} placeholder="Type writer name" />
                            {errors.writerName && <p className='text-red-500'>Writer name is required.</p>}

                            <label className="label font-semibold text-black dark:text-white">Writer Photo URL</label>
                            <input type="url" className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('writerUrl', { required: true })} placeholder="Type writer image URL" />
                            {errors.writerUrl && <p className='text-red-500'>Writer photo is required.</p>}

                            <label className="label font-semibold text-black dark:text-white">Price</label>
                            <input type="number" className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('price', { required: true })} placeholder="Type price" />
                            {errors.price && <p className='text-red-500'>Price is required.</p>}

                            <label className="label font-semibold text-black dark:text-white">Status</label>
                            <select {...register('publishStatus', { required: true })} className="select w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <option value="" disabled>Pick a Status</option>
                                <option value="Unpublished">Unpublished</option>
                                <option value="Published">Published</option>
                            </select>
                            {errors.publishStatus && <p className='text-red-500'>Status is required.</p>}
                        </div>

                    </div>

                    {/* Description */}
                    <label className="label font-semibold text-black dark:text-white mt-4">Description</label>
                    <textarea className="textarea w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" rows={4} {...register('description', { required: true })} placeholder="Type book description" />
                    {errors.description && <p className='text-red-500'>Description is required.</p>}

                </fieldset>

                {/* Button */}
                <button className='btn mt-5 w-full md:w-auto bg-[#23BE0A] hover:bg-green-600 text-white px-5 py-2 rounded-lg'>
                    Add Book
                </button>

            </form>

        </div>
    )
}
