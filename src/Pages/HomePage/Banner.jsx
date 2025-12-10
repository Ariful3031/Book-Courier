
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Autoplay } from 'swiper/modules';

export default function Banner() {
    const [books, setBooks] = useState([]);
    // console.log(books)
    useEffect(() => {
        fetch("/data.json")
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])
    return (
        <div className="my-5">
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
                    0:{
                        slidesPerView :1,
                        spaceBetween :10,
                    },
                    540:{
                        slidesPerView :2,
                        spaceBetween :20,
                    },
                    1024:{
                        slidesPerView :3,
                        spaceBetween :20,
                    },
                    }}
            >
                {
                    books.map(book => <SwiperSlide>
                        <div className='p-5 w-full bg-[#F0FDF4]  h-[470px] dark:bg-[#121F5E] rounded-lg flex flex-col'>
                            <img className='w-full h-[250px] rounded-lg object-cover' src={book.bookUrl} alt="" />
                            <h2 className='text-xl font-semibold my-1 dark:text-white'>{book.bookName}</h2>
                            <h4 className=' my-2 flex-grow overflow-hidden dark:text-white'>{book.description}</h4>

                            <Link to='/books' className='btn bg-[#23BE0A] text-white w-full py-2 mt-3 rounded-lg'>All Books</Link>

                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
}


