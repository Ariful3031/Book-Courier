import React from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineStar } from 'react-icons/md'

export default function BookDetailsPage() {
    const { register, handleSubmit, formState: { errors },reset } = useForm()

    const data = {
        "_id": "679a5e4fd1a1c001a0010012",
        "image_URL": "https://www.oreilly.com/covers/urn:orm:book:9781394263219/400w/",
        "title": "JavaScript Essentials",
        "writer": "Sarah Thompson",
        "price": 24.50,
        "description": "Fundamentals of JavaScript explained with real examples.",
        " publish_Date  ": "2022-11-05",
        "rating": 4.2,
        "category": "Programming"
    }

    const handleRegistration = (data) => {
        console.log(data)
        reset();
    }
    return (

        <div className=' grid grid-cols-12 gap-5 bg-gray-100'>

            <div className='w-full h-[500px] col-span-4'>
                <img className='w-full h-full  border-none' src="https://www.oreilly.com/covers/urn:orm:book:9781394263219/400w/" alt="" />
            </div>
            {/* right sight  */}
            <div className=' w-full col-span-8 p-5'>
                <h1 className='text-3xl font-semibold dark:text-white my-5'>JavaScript Essentials</h1>
                <div className='flex items-center gap-5'>
                    {/* writer image and name */}
                    <img className='w-15 h-15 rounded-full' src="https://thumbs.dreamstime.com/b/writer-work-handsome-young-sitting-table-writing-something-his-sketchpad-31869272.jpg" alt="" />
                    <h2 className='text-2xl font-medium dark:text-white'>Sarah Thompson</h2>
                </div>
                <div className='items-center mt-3 gap-2 inline-flex bg-[#00D390] px-2 rounded-lg dark:text-black '>
                    <div className='flex'>
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                        <MdOutlineStar />
                    </div>
                    <p>4.2</p>
                </div>
                <p className='text-xl mt-1 font-medium'>description:  </p>
                <span className='text-[16px]'>Fundamentals of JavaScript explained with real examples.</span>

                <p className='text-xl mt-1 font-medium'>publisherName: <span className='text-[16px]'>Ariful Islam</span></p>
                <p className='text-xl mt-1 font-medium'>First Publish : <span className='text-[16px]'>2022-11-05</span></p>
                <p className='text-xl mt-1 font-medium'>Languese: <span className='text-[16px]'>English</span></p>
                <p className='text-xl mt-1 font-medium'>Price: <span className='text-[16px]'>24.50 $</span></p>
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn bg-[#23BE0A] text-white px-3 rounded-lg">Order Now</button>

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">


                        <form
                            onSubmit={handleSubmit(handleRegistration)}
                        >
                            <fieldset className="fieldset">
                                {/* Name */}
                                <label className="label font-semibold text-black">Name</label>
                                <input type="text" className="input w-full" {...register('name', { required: true })} placeholder="Your Name" />
                                {errors.name?.type === "required" && <p className='text-red-500'>name is required.</p>
                                }
                                {/* Address */}
                                <label className="label font-semibold text-black">Address</label>
                                <input type="text" className="input w-full" {...register('address', { required: true })} placeholder="Your address" />
                                {errors.name?.type === "required" && <p className='text-red-500'>address is required.</p>
                                }
                                {/* Phone Number */}
                                <label className="label font-semibold text-black">Phone Number</label>
                                <input type="number" className="input w-full" {...register('Phone Number', { required: true })} placeholder="Your Phone Number" />
                                {errors.name?.type === "required" && <p className='text-red-500'>Phone Number is required.</p>
                                }

                                {/* email */}
                                <label className="label font-semibold text-black">Email</label>
                                <input type="email" className="input w-full" {...register('email', { required: true })} placeholder="Email" />
                                {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
                                }
                                {/* button */}
                                <button className="btn bg-[#23BE0A] text-white px-3 rounded-lg">Place Order</button>
                            </fieldset>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn bg-red-500 text-white px-3 rounded-lg">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>

    )
}
