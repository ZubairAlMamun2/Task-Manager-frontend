import React from 'react'

const ExtraSection = () => {
  return (
    <div className='grid grid-cols-2  border-none rounded-lg  gap-5'>
        {/* why you donate section */}
        <div className='col-span-2 md:col-span-2 bg-base-200 mt-5 p-5 card shadow-lg'>
            <h2 className='text-xl font-semibold text-center mb-2'>Photo Gallary</h2>
            <div className='grid gap-5 grid-cols-4'>
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2' src="https://i.ibb.co.com/X4jrMZm/dd-4.png" alt="" />
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2 ' src="https://i.ibb.co.com/XZPdkD7/dd-3.png" alt="" />
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2' src="https://i.ibb.co.com/jHbpwJw/dd-2.png" alt="" />
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2' src="https://i.ibb.co.com/W0LqqB2/dd-1.png" alt="" />
            </div>
        </div>
        <div className='col-span-2 md:col-span-2 bg-base-200 mt-5 p-5 card shadow-lg'>
            <h2 className='text-xl font-semibold text-center mb-2'>why you donate</h2>
            <p>People donate to help those in need, support meaningful causes, and make a positive impact on society. Donations foster compassion, reduce inequality, and empower communities. By sharing resources, individuals contribute to addressing pressing issues, such as poverty, education, and healthcare, promoting a sense of unity, purpose, and shared humanity.</p>
        </div>
        
    </div>
  )
}

export default ExtraSection