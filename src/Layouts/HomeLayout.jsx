import React from 'react'
import NavBar from '../NavBar'
import Banner from '../components/Banner'
import About from '../components/About'
import Footer from '../Footer'
import Works from '../components/Works'
import ExtraSection from '../components/ExtraSection'


const HomeLayout = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <NavBar />
        <Banner />
        <About />
        <Works />
        <ExtraSection />
        <Footer />
    </div>
  )
}

export default HomeLayout