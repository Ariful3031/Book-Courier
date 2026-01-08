import React from 'react';
import Banner from './Banner';
import LatestBook from './LatestBook';
import Coverage from './Coverage';
import WhyChooseUs from './WhyChooseUs';
import BookOfTheWeek from './BookOfTheWeek';

export default function HomePage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Banner Section */}
      <div className="transition-colors">
        <Banner />
      </div>

      {/* Latest Books Section */}
      <div className="transition-colors">
        <LatestBook />
      </div>

      {/* Coverage Section */}
      <div className="transition-colors">
        <Coverage />
      </div>

      {/* Book of the Week Section */}
      <div className="transition-colors">
        <BookOfTheWeek />
      </div>

      {/* Why Choose Us Section */}
      <div className="transition-colors">
        <WhyChooseUs />
      </div>
    </div>
  );
}
