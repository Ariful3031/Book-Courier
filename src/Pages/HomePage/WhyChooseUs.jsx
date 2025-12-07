import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';

export default function WhyChooseUs() {
    return (
        <div className='mb-10'>
            <h1 className='text-4xl font-bold mt-10 mb-15 dark:text-white text-black text-center'>Why Choose Us</h1>

            <Swiper
                loop={true}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    540: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
            >

                <SwiperSlide>
                    <div className='border-2 border-gray-200 dark:border-none h-[310px] flex flex-col p-3 md:pb-5 w-full dark:bg-[#121F5E] rounded-xl'>
                        <div className='flex items-center justify-center text-2xl text-blue-600 my-2 w-full h-[200px] mx-auto'>
                            <img className='w-full h-full rounded-lg' src="https://png.pngtree.com/png-clipart/20250422/original/pngtree-on-time-delivery-every-time-png-image_20762480.png" alt="" />
                        </div>
                        <p className='text-2xl text-center font-semibold flex-grow overflow-hidden'>Fast & On-Time Delivery</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='border-2 border-gray-200 flex flex-col h-[310px] dark:border-none p-3 md:pb-5 w-full dark:bg-[#121F5E] rounded-xl'>
                        <div className='flex items-center justify-center text-2xl text-blue-600 my-2 w-full h-[200px] mx-auto'>
                            <img className=' w-full h-full rounded-lg' src="https://img.freepik.com/free-photo/medium-shot-man-talking-phone_23-2149035899.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                        </div>
                        <p className='text-2xl text-center font-semibold flex-grow overflow-hidden'>Low Delivery Charges</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='border-2 border-gray-200 dark:border-none h-[310px] flex flex-col p-3 md:pb-5 w-full dark:bg-[#121F5E] rounded-xl'>
                        <div className='flex items-center justify-center text-2xl text-blue-600 my-2 w-full h-[200px] mx-auto'>
                            <img className='w-full h-full rounded-lg' src="https://img.freepik.com/free-vector/people-addicted-smartphones-social-media-obsession-trendy-lifestyle-gadgets-abuse-contemporary-leisure-modern-generation-problem_335657-63.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                        </div>
                        <p className='text-2xl text-center font-semibold flex-grow overflow-hidden'>24/7 Customer Support</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='border-2 border-gray-200 dark:border-none h-[310px] flex flex-col p-3 md:pb-5 w-full dark:bg-[#121F5E] rounded-xl'>
                        <div className='flex items-center justify-center text-2xl text-blue-600 my-2 w-full h-[200px] mx-auto'>
                            <img className='w-full h-full rounded-lg' src="https://images.airdroid.com/2022/06/real-time-location-tracking.jpg" alt="" />
                        </div>
                        <p className='text-2xl text-center font-semibold flex-grow overflow-hidden'>Real-Time Tracking</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='border-2 border-gray-200 dark:border-none h-[310px] flex flex-col p-3 md:pb-5 w-full dark:bg-[#121F5E] rounded-xl'>
                        <div className='flex items-center justify-center text-2xl text-blue-600 my-2 w-full h-[200px] mx-auto'>
                            <img className='w-full h-full rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRepFjR_p3wlDxWpuGV8mYlVEELcydt82OG5Q&s" alt="" />
                        </div>
                        <p className='text-2xl text-center font-semibold flex-grow overflow-hidden'>Nationwide Coverage</p>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    )
}
