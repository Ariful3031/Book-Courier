import React from 'react';

export default function BookOfTheWeek() {
    return (
        <section className="bg-green-50 dark:bg-gray-900 py-12 transition-colors">
            <div className="max-w-5xl mx-auto text-center px-4">
                {/* Heading */}
                <h2 className="text-4xl font-bold mt-10 mb-6 text-gray-900 dark:text-white transition-colors">
                    Book of the Week
                </h2>

                {/* Subtitle */}
                <p className="text-gray-700 dark:text-gray-300 text-center mb-8 transition-colors">
                    Discover the unique benefits and care tips for this special book!
                </p>

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 transition-colors">

                    {/* Book Image */}
                    <img
                        src="https://images.unsplash.com/photo-1516979187457-637abb4f9353"
                        alt="The Last Algorithm"
                        className="w-48 h-48 object-cover rounded-xl"
                    />

                    {/* Book Info */}
                    <div className="text-left md:text-left">
                        <h3 className="text-2xl font-semibold text-green-900 dark:text-green-400 mb-2 transition-colors">
                            The Last Algorithm
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 mb-2 transition-colors">
                            Thriller
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2 transition-colors">
                            Price: <span className="font-medium">600 $</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 transition-colors">
                            A wonderful book to brighten your home!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
