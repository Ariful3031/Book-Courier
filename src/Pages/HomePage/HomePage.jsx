import React from 'react'
import Banner from './Banner'
import LatestBook from './LatestBook'
import Coverage from './Coverage'
import WhyChooseUs from './WhyChooseUs'
import BookOfTheWeek from './BookOfTheWeek'

export default function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <LatestBook></LatestBook>
      <Coverage></Coverage>
      <BookOfTheWeek></BookOfTheWeek>
      <WhyChooseUs></WhyChooseUs>
    </div>
  )
}
