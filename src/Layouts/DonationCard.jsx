import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const DonationCard = ({card}) => {
    const location=useLocation();
    // console.log(location)
  return (
    <div className="card bg-base-100  shadow-xl col-span-6 md:col-span-3 lg:col-span-2">
  <figure>
    <img className='h-[40vh] w-[70vh]'
      src={card.image}
      alt="Donation" />
  </figure>
  <div className="card-body p-2">
    <h2 className="card-title">{card.title}</h2>
    <p>{card.description}</p>
    <p>Division : {card.division}</p>
    <div className="card-actions justify-start">
      <NavLink to={`/donation/${card.id}`} className="btn btn-primary">Donate Now</NavLink>
    </div>
  </div>
</div>
  )
}

export default DonationCard