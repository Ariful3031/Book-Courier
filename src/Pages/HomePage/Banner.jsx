import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export default function Banner() {
    const [books, setBooks] = useState([]);
    console.log(books)
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosSecure('/books?latest=true');
                setBooks(res.data || []);
            } catch (error) {
                console.error("Banner books load error:", error);
            }
        };
        getData();
    }, [axiosSecure]);

    return (

        <section className="relative w-full h-[75vh]">
            {books.length > 0 && (
                <Swiper
                    key={books.length}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    loop={books.length > 1}
                    autoplay={
                        books.length > 1
                            ? {
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }
                            : false
                    }
                    className="w-full h-full"
                >
                    {books.map((book) => (
                        <SwiperSlide key={book._id}>
                            {/* Background Image */}
                            <img
                                src={book.bookUrl}
                                alt={book.bookName}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
                                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">
                                    {book.bookName}
                                </h1>

                                <p className="mt-3 max-w-2xl text-sm sm:text-base md:text-xl line-clamp-2">
                                    {book.description}
                                </p>

                                {/* Button */}
                                <Link
                                    to="/books"
                                    className="mt-5 inline-block px-6 py-2 bg-[#23BE0A] hover:bg-green-600 transition rounded-lg font-semibold"
                                >
                                    All Books
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>

    );
}
