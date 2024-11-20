import React from 'react'
import NavBar from '../NavBar'
import Banner from '../components/Banner'
import About from '../components/About'
import Footer from '../Footer'


const HomeLayout = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <NavBar />
        <Banner />
        <About />
        <Footer />
    </div>
  )
}

export default HomeLayout