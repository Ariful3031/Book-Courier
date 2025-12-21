import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure'
import { useForm } from 'react-hook-form';
import useAuth from '../../../Components/Hooks/useAuth';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function UpdateBookPage() {
    // const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm()
    const [book, setBook] = useState([])
    // console.log(book)

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://book-courier-server-black.vercel.app/books/${id}`, {

        })
            .then(res => res.json())
            .then(data => {
                setBook(data)
                reset({
                    category: data.category,
                    publishStatus: data.publishStatus,
                });

            })
    }, [id])

    const handleUpdateBook = (data) => {
        console.log(data)

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
                        // console.log(res.data)
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `Your book successfully Update !`,
                                showConfirmButton: false,
                                icon: "success",
                                timer: 2000
                            });
                        }
                    })
                    .catch(err => {
                        toast.error(err)
                    })

            }
        });


        // console.log(udateData)
    }


    return (
        <div className='px-10'>

            <h1 className='text-4xl font-bold my-5 dark:text-white text-black text-center'>Update Your Book</h1>

            <form className='dark:bg-white px-8 py-5' onSubmit={handleSubmit(handleUpdateBook)}>
                <fieldset className="fieldset">
                    <div className='grid grid-cols-2 gap-10'>
                        {/* leftSide */}
                        <div className='flex flex-col'>
                            {/* Book Name */}
                            <label className="label font-semibold text-black mt-2 text-xl">Book Name</label>
                            <input type="text" defaultValue={book.bookName} className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('bookName')} placeholder="Type book name" />

                            {/* book Photo/ Image  */}
                            <label className="label font-semibold text-black mt-2 text-xl">Book Photo Url</label>
                            <input type="url" defaultValue={book.bookUrl} className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('bookUrl')} placeholder="Type book image url" />


                            {/* email */}
                            <label className="label font-semibold text-black mt-2 text-xl">Email</label>
                            <input type="email" defaultValue={book.email} readOnly className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('email')} placeholder="Email" />

                            {/* Category */}
                            <label className="label text-black font-semibold mt-2 text-xl">Category</label>
                            <select
                                {...register('category')}
                                className="select w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1"
                            >
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

                            {/* Language */}
                            <label className="label font-semibold text-black mt-2 text-xl">Language</label>
                            <input type="text" defaultValue={book.language} className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('language')} placeholder="Type book Language" />


                        </div>


                        {/* right side */}
                        <div className='flex flex-col'>
                            {/* Writer Name */}
                            <label className="label font-semibold text-black mt-2 text-xl">Writer Name</label>
                            <input type="text" defaultValue={book.writerName} className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('writerName')} placeholder="Type writer name" />


                            {/*writer  Photo/ Image  */}
                            <label className="label font-semibold text-black mt-2 text-xl">Writer Photo Url</label>
                            <input type="url" defaultValue={book.writerUrl} className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('writerUrl')} placeholder="Type writer image url" />

                            {/* Price */}
                            <label className="label font-semibold text-black mt-2 text-xl">Price</label>
                            <input type="number" defaultValue={book.price} className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('price')} placeholder="Type price" />


                            {/* Status */}
                            <label className="label text-black font-semibold mt-2 text-xl">Status</label>
                            <select
                                {...register('publishStatus')}
                                className="select w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1"
                            >
                                <option value="" disabled>Pick a Status</option>
                                <option value="Unpublished">Unpublished</option>
                                <option value="Published">Published</option>

                            </select>

                        </div>
                    </div>

                    {/* description */}
                    <label className="label font-semibold text-black mt-2 text-xl">Description</label>
                    <textarea defaultValue={book.description} className="textarea textarea-bordered w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" rows={3} {...register('description')} placeholder="Type book description" />

                </fieldset>
                {/* button */}
                <button className='btn border-none bg-[#23BE0A] text-white px-5 py-2 rounded-lg'>Update  Now</button>
            </form>

        </div>
    )
}
