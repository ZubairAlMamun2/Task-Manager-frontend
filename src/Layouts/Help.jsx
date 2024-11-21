import React from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'

const Help = () => {
  return (
    <div className='w-11/12 mx-auto '>
        <NavBar />
        <div className='min-h-[60vh]'>
        <div className='bg-base-200 border-none rounded-lg mt-5 p-5'>
      <h2 className='text-center text-2xl font-semibold mb-5' >How To Help</h2>
      <div>
        If you want to donate, Login our website first. Then go to the "Donation Campains" section and choose in which campains you want to donate after choose click "Donate Now" button. Fill the from and click submit button.. After submiting you will receive a toast message .. 
      </div>
    </div>
        </div>
        <Footer />
        </div>

  )
}

export default Help