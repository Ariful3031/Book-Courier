import React from 'react'

export default function BookOfTheWeek() {
    return (
        <section className="bg-green-50 py-12">
            <div className="max-w-5xl mx-auto text-center px-4">
                <h2 className='text-4xl font-bold mt-10 mb-15 text-black text-center'>
                    book of the Week
                </h2>
                <p className="text-black text-center mb-8">
                    Discover the unique benefits and care tips for this special plant!
                </p>

                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
                    <img
                        src='https://images.unsplash.com/photo-1516979187457-637abb4f9353'
                        alt='The Last Algorithm'
                        className="w-48 h-48 object-cover rounded-xl"
                    />
                    <div className="text-left md:text-left">
                        <h3 className="text-2xl font-semibold text-green-900 mb-2">
                            The Last Algorithm
                        </h3>
                        <p className="text-gray-700 mb-2">Thriller</p>
                        <p className="text-gray-600 mb-2">
                            Price: <span className="font-medium">600 $</span>
                        </p>
                        <p className="text-gray-600">
                            A wonderful book to brighten your home!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
