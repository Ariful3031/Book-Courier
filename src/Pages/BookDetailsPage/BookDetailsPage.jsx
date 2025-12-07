import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineStar } from 'react-icons/md'
import { useParams } from 'react-router'

export default function BookDetailsPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [book, setBook] = useState([])
    console.log(book)

    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/books/${id}`, {

        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setBook(data)

            })
    }, [id])
    const { image_URL, title,writer_image,writer,rating,description,publisher_name,publishDate,languese,price
 } = book;
 

    const handleRegistration = (data) => {
        console.log(data)
        reset();

        document.getElementById('my_modal_5').close();
    }
    return (

        <div className=' grid grid-cols-12 gap-5 dark:bg-yellow-500'>

            <div className='w-full h-[500px] p-5 col-span-5'>
                <img className='w-full h-full  border-none' src={image_URL} alt="" />
            </div>
            {/* right sight  */}
            <div className=' w-full col-span-7 p-5'>
                <h1 className='text-3xl font-semibold dark:text-white my-5'>{title}</h1>
                <div className='flex items-center gap-5'>
                    {/* writer image and name */}
                    <img className='w-15 h-15 rounded-full' src={writer_image} alt="" />
                    <h2 className='text-2xl font-medium dark:text-white'>{writer}</h2>
                </div>
                <div className='items-center mt-3 gap-2 inline-flex bg-[#00D390] px-2 rounded-lg dark:text-black '>
                    <div className='flex'>
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                    </div>
                    <p>{rating}</p>
                </div>
                <p className='text-xl mt-1 font-medium'>description:  </p>
                <span className='text-[16px]'>{description}</span>

                <p className='text-xl mt-1 font-medium'>publisherName: <span className='text-[16px]'>{publisher_name}</span></p>
                <p className='text-xl mt-1 font-medium'>First Publish : <span className='text-[16px]'>{publishDate}</span></p>
                <p className='text-xl mt-1 font-medium'>Languese: <span className='text-[16px]'>{languese}</span></p>
                <p className='text-xl mt-1 font-medium'>Price: <span className='text-[16px]'>{price}</span></p>
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-[#23BE0A] text-white dark:border-none px-3 rounded-lg">Order Now</button>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box dark:bg-white">


                        <form
                            onSubmit={handleSubmit(handleRegistration)}
                        >
                            <fieldset className="fieldset">
                                {/* Name */}
                                <label className="label font-semibold text-black">Name</label>
                                <input type="text" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('name', { required: true })} placeholder="Your Name" />
                                {errors.name?.type === "required" && <p className='text-red-500'>name is required.</p>
                                }
                                {/* Address */}
                                <label className="label font-semibold text-black">Address</label>
                                <input type="text" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('address', { required: true })} placeholder="Your address" />
                                {errors.name?.type === "required" && <p className='text-red-500'>address is required.</p>
                                }
                                {/* Phone Number */}
                                <label className="label font-semibold text-black">Phone Number</label>
                                <input type="number" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('Phone Number', { required: true })} placeholder="Your Phone Number" />
                                {errors.name?.type === "required" && <p className='text-red-500'>Phone Number is required.</p>
                                }

                                {/* email */}
                                <label className="label font-semibold text-black">Email</label>
                                <input type="email" className="input w-full dark:bg-white dark:text-black dark:border-2 dark:border-gray-200" {...register('email', { required: true })} placeholder="Email" />
                                {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
                                }
                                {/* button */}
                                <button className="btn bg-[#23BE0A] dark:border-none text-white px-3 rounded-lg">Place Order</button>
                            </fieldset>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn dark:border-none bg-red-500 text-white px-3 rounded-lg">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>

    )
}
