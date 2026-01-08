import React from 'react';
import img from '../../assets/about_img book image.svg';
import { GoCheck } from "react-icons/go";

export default function AboutPage() {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Heading */}
            <h1 className='text-4xl font-bold mt-10 mb-8 text-center text-gray-900 dark:text-white transition-colors'>
                Grow with BookCurior
            </h1>

            {/* Content Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>

                {/* Left Content */}
                <div className='space-y-4'>
                    <h3 className='text-lg font-medium text-gray-500 dark:text-gray-300'>About</h3>
                    <h2 className='text-3xl sm:text-4xl font-bold dark:text-white text-gray-900'>
                        We Provide The Best Quality Courier Services
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300'>
                        Book Courier is a leading courier service company in Bangladesh dedicated to delivering reliable and efficient e-commerce logistics solutions on time.
                    </p>

                    {/* Features */}
                    <div className='space-y-2 mt-4'>
                        {[
                            "Daily pickups, no limitations",
                            "Faster Payment Service",
                            "Cash on Delivery"
                        ].map((feature, index) => (
                            <div key={index} className='flex gap-2 items-center text-gray-900 dark:text-white'>
                                <GoCheck className='text-green-500' />
                                <p className='text-lg font-medium'>{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className='flex justify-center'>
                    <img src={img} alt="About BookCurior" className='w-full max-w-md object-contain' />
                </div>

            </div>
        </section>
    );
}
