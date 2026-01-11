import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function UpdateBookPage() {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
    const [book, setBook] = useState([])
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://book-courier-server-black.vercel.app/books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data)
                reset({
                    category: data.category,
                    publishStatus: data.publishStatus,
                });
            })
    }, [id, reset])

    const handleUpdateBook = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: `To Update Your Book!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it !"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/books/${id}`, data)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `Your book successfully Updated!`,
                                showConfirmButton: false,
                                icon: "success",
                                timer: 2000
                            });
                        }
                    })
                    .catch(err => {
                        toast.error(err.message);
                    })
            }
        });
    }

    return (
        <div className='p-5 md:px-10 dark:bg-gray-900 min-h-screen'>

            <h1 className='text-3xl md:text-4xl font-bold my-5 text-center text-black dark:text-white'>Update Your Book</h1>

            <form
                className='bg-white dark:bg-gray-800 p-5 md:p-8 rounded-lg shadow-lg'
                onSubmit={handleSubmit(handleUpdateBook)}
            >
                <fieldset className="fieldset">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                        {/* Left Side */}
                        <div className='flex flex-col gap-3'>
                            <label className="label font-semibold text-black dark:text-white">Book Name</label>
                            <input type="text" defaultValue={book.bookName} className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('bookName')} placeholder="Book Name" />

                            <label className="label font-semibold text-black dark:text-white">Book Photo URL</label>
                            <input type="url" defaultValue={book.bookUrl} className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('bookUrl')} placeholder="Book Image URL" />

                            <label className="label font-semibold text-black dark:text-white">Email</label>
                            <input type="email" defaultValue={book.email} readOnly className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('email')} placeholder="Email" />

                            <label className="label font-semibold text-black dark:text-white">Category</label>
                            <select {...register('category')} className="select w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <option value="" disabled>Pick a Category</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Biography">Biography</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Drama">Drama</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Crime">Crime</option>
                                <option value="Historical">Historical</option>
                                <option value="Science Fiction">Science Fiction</option>
                            </select>

                            <label className="label font-semibold text-black dark:text-white">Language</label>
                            <input type="text" defaultValue={book.language} className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('language')} placeholder="Language" />
                        </div>

                        {/* Right Side */}
                        <div className='flex flex-col gap-3'>
                            <label className="label font-semibold text-black dark:text-white">Writer Name</label>
                            <input type="text" defaultValue={book.writerName} className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('writerName')} placeholder="Writer Name" />

                            <label className="label font-semibold text-black dark:text-white">Writer Photo URL</label>
                            <input type="url" defaultValue={book.writerUrl} className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('writerUrl')} placeholder="Writer Image URL" />

                            <label className="label font-semibold text-black dark:text-white">Price</label>
                            <input type="number" defaultValue={book.price} className="input w-full dark:bg-gray-700 dark:text-white dark:border-gray-600" {...register('price')} placeholder="Price" />

                            <label className="label font-semibold text-black dark:text-white">Status</label>
                            <select {...register('publishStatus')} className="select w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                                <option value="" disabled>Pick a Status</option>
                                <option value="Unpublished">Unpublished</option>
                                <option value="Published">Published</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <label className="label font-semibold text-black dark:text-white mt-4">Description</label>
                    <textarea
                        defaultValue={book.description}
                        className="textarea w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        rows={4}
                        {...register('description')}
                        placeholder="Book Description"
                    />
                </fieldset>

                {/* Submit Button */}
                <button className='btn mt-5 bg-[#23BE0A] hover:bg-green-600 text-white px-5 py-2 rounded-lg w-full md:w-auto'>
                    Update Now
                </button>
            </form>

        </div>
    )
}
