import Categories from '@/components/ui/Categories'
import FeaturedGrid from '@/components/ui/FeaturedGrid'
import Hero from '@/components/ui/Hero'
import React from 'react'

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedGrid />
    </>
  )
}

export default Home