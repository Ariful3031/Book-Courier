import React from 'react'
import useAuth from '../../../Components/Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

export default function AddBook() {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    //  console.log(user)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const handleAddBook = (data) => {
        // console.log(data)
        const addBookInfo = {
            ...data,
            createAt: new Date(),
            rating: 4.5
        }
        axiosSecure.post('/books', addBookInfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log('after saveing book in database', res.data)
                    toast.success('Your add book successfully!')
                    reset();
                }
            })


    }
    return (
        <div className='px-10'>

            <h1 className='text-4xl font-bold my-5 dark:text-white text-black text-center'>Add a new book</h1>

            <form className='dark:bg-white px-8 py-5' onSubmit={handleSubmit(handleAddBook)}>
                <fieldset className="fieldset">
                    <div className='grid grid-cols-2 gap-10'>
                        {/* leftSide */}
                        <div className='flex flex-col'>
                            {/* Book Name */}
                            <label className="label font-semibold text-black mt-2 text-xl">Book Name</label>
                            <input type="text" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('bookName', { required: true })} placeholder="Type book name" />
                            {errors.bookName?.type === "required" && <p className='text-red-500'>name is required.</p>
                            }
                            {/* book Photo/ Image  */}
                            <label className="label font-semibold text-black mt-2 text-xl">Book Photo Url</label>
                            <input type="url" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('bookUrl', { required: true })} placeholder="Type book image url" />
                            {errors.bookUrl?.type === "required" && <p className='text-red-500'>Photo is required.</p>
                            }

                            {/* email */}
                            <label className="label font-semibold text-black mt-2 text-xl">Email</label>
                            <input type="email" defaultValue={user?.email} readOnly className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('email', { required: true })} placeholder="Email" />
                            {errors.creatorEmail?.type === "required" && <p className='text-red-500'>Email is required.</p>
                            }
                            {/* Category */}
                            <label className="label text-black font-semibold mt-2 text-xl">Category</label>
                            <select
                                {...register('category', { required: true })}
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
                            {errors.category?.type === "required" && <p className='text-red-500'>category is required.</p>
                            }
                            {/* Language */}
                            <label className="label font-semibold text-black mt-2 text-xl">Language</label>
                            <input type="text" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('language', { required: true })} placeholder="Type book Language" />
                            {errors.language?.type === "required" && <p className='text-red-500'>Language is required.</p>
                            }

                        </div>


                        {/* right side */}
                        <div className='flex flex-col'>
                            {/* Writer Name */}
                            <label className="label font-semibold text-black mt-2 text-xl">Writer Name</label>
                            <input type="text" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('writerName', { required: true })} placeholder="Type writer name" />
                            {errors.writerName?.type === "required" && <p className='text-red-500'>name is required.</p>
                            }

                            {/*writer  Photo/ Image  */}
                            <label className="label font-semibold text-black mt-2 text-xl">Writer Photo Url</label>
                            <input type="url" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('writerUrl', { required: true })} placeholder="Type writer image url" />
                            {errors.writerUrl?.type === "required" && <p className='text-red-500'>Photo is required.</p>
                            }
                            {/* Price */}
                            <label className="label font-semibold text-black mt-2 text-xl">Price</label>
                            <input type="number" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" {...register('price', { required: true })} placeholder="Type price" />
                            {errors.price?.type === "required" && <p className='text-red-500'>name is required.</p>
                            }

                            {/* Status */}
                            <label className="label text-black font-semibold mt-2 text-xl">Status</label>
                            <select
                                {...register('publishStatus', { required: true })}
                                className="select w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1"
                            >
                                <option value="" disabled>Pick a Status</option>
                                <option value="Unpublished">Unpublished</option>
                                <option value="Published">Published</option>

                            </select>
                            {errors.publishStatus?.type === "required" && <p className='text-red-500'>Status is required.</p>
                            }
                        </div>
                    </div>

                    {/* description */}
                    <label className="label font-semibold text-black mt-2 text-xl">Description</label>
                    <textarea className="textarea textarea-bordered w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200 mt-1" rows={3} {...register('description', { required: true })} placeholder="Type book description" />
                    {errors.description?.type === "required" && <p className='text-red-500'>Description is required.</p>
                    }
                </fieldset>
                {/* button */}
                <button className='btn border-none bg-[#23BE0A] text-white px-5 py-2 rounded-lg'>Add Book</button>
            </form>

        </div>
    )
}
