

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Autoplay } from 'swiper/modules';

export default function Banner() {
    const [books, setBooks] = useState([]);
    console.log(books)
    useEffect(() => {
        fetch("/data.json")
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])
    return (
        <div className="my-5">
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                centeredSlides={true}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
            >
                {
                    books.map(book => <SwiperSlide>
                        <div className='p-5 bg-[#F0FDF4] dark:bg-[#121F5E] h-[470px] rounded-lg flex flex-col'>
                            <img className='w-full h-[250px] rounded-lg object-cover' src={book.image_URL} alt="" />
                            <h2 className='text-xl font-semibold my-1 dark:text-white'>{book.title}</h2>
                            <h4 className=' my-2 flex-grow overflow-hidden dark:text-white'>{book.description}</h4>

                            <Link to='/books' className='btn bg-[#23BE0A] text-white w-full py-2 mt-3 rounded-lg'>All Books</Link>

                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
}







// import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel'


// export default function Banner() {
//   return (
//    <div className='mt-8'>
//             <Carousel className=''
//             autoPlay={true}
//             infiniteLoop={true}
//             >
//                 <div className='w-full bg-red-500 h-[50vh]'>
//                     <h1>bannerImg1</h1>
//                     {/* <img className='' src={bannerImg1} /> */}
//                     {/* <div className='flex gap-5 items-center absolute top-112 left-23 '>
//                         <div className='flex gap-1 items-center'>
//                             <div className='-gap-1 bg-primary px-5 py-1 rounded-2xl'>
//                                 <button>Track Your Parcel</button>
//                             </div>
//                             <div className='text-3xl'>
//                                 <BsFillArrowUpRightCircleFill />
//                             </div>
//                         </div>
//                         <button className='btn'>Be A Rider</button>
//                     </div> */}

//                 </div>
//                 <div className='w-full bg-green-500 h-[50vh]'>
//                     {/* <img src={bannerImg2} /> */}
//                     <h1>bannerImg2</h1>

//                 </div>
//                 <div className='w-full bg-yellow-500 h-[50vh]'>
//                     {/* <img src={bannerImg3} /> */}
//                       <h1>bannerImg3</h1>

//                 </div>
//                 <div className='w-full bg-black h-[50vh]'>
//                     {/* <img src={bannerImg3} /> */}
//                       <h1>bannerImg4</h1>

//                 </div>
//             </Carousel>
//         </div>
//   )
// }
