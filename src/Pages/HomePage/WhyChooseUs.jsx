import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css";

export default function WhyChooseUs() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-20 transition-colors">
            {/* Section Heading */}
            <h1 className='text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white transition-colors'>
                Why Choose Us
            </h1>

            {/* Swiper Slides */}
            <Swiper
                loop={true}
                grabCursor={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    540: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
            >
                {/* Slide Template */}
                {[
                    {
                        title: "Fast & On-Time Delivery",
                        img: "https://png.pngtree.com/png-clipart/20250422/original/pngtree-on-time-delivery-every-time-png-image_20762480.png"
                    },
                    {
                        title: "Low Delivery Charges",
                        img: "https://img.freepik.com/free-photo/medium-shot-man-talking-phone_23-2149035899.jpg?semt=ais_hybrid&w=740&q=80"
                    },
                    {
                        title: "24/7 Customer Support",
                        img: "https://img.freepik.com/free-vector/people-addicted-smartphones-social-media-obsession-trendy-lifestyle-gadgets-abuse-contemporary-leisure-modern-generation-problem_335657-63.jpg?semt=ais_hybrid&w=740&q=80"
                    },
                    {
                        title: "Real-Time Tracking",
                        img: "https://images.airdroid.com/2022/06/real-time-location-tracking.jpg"
                    },
                    {
                        title: "Nationwide Coverage",
                        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRepFjR_p3wlDxWpuGV8mYlVEELcydt82OG5Q&s"
                    },
                ].map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='h-[310px] flex flex-col p-3 md:pb-5 w-full bg-white dark:bg-[#121F5E] border-2 border-gray-200 dark:border-none rounded-xl transition-colors'>

                            {/* Image */}
                            <div className='flex items-center justify-center text-2xl my-2 w-full h-[200px] mx-auto'>
                                <img className='w-full h-full rounded-lg object-cover' src={item.img} alt={item.title} />
                            </div>

                            {/* Slide Title */}
                            <p className='text-2xl text-center font-semibold flex-grow text-gray-900 dark:text-white transition-colors'>
                                {item.title}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
