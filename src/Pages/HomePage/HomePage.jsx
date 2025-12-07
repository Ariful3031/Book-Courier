import React from 'react'
import Banner from './Banner'
import LatestBook from './LatestBook'
import Coverage from './Coverage'
import WhyChooseUs from './WhyChooseUs'

export default function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <LatestBook></LatestBook>
      <Coverage></Coverage>
      <WhyChooseUs></WhyChooseUs>
    </div>
  )
}
