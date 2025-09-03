import Categories from '@/components/ui/Categories'
import FeaturedGrid from '@/components/ui/FeaturedGrid'
import Hero from '@/components/ui/Hero'
import React from 'react'
import Footer from '../components/ui/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedGrid />
      <Footer/>
    </>
  )
}

export default Home