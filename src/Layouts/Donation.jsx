import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import DonationCard from "./DonationCard";



const Donation = () => {
    const [campains,setCampains]=useState([]);
    useEffect(()=>{
        fetch("data.json").
        then(res=>res.json()).
        then(data=>setCampains(data))
    },[])
    // console.log(campains)
  return (
    <div className="w-11/12 mx-auto">
      <NavBar />
      <h2 className="text-2xl font-bold text-center bg-base-200 py-5 mb-2">Our Donation Campaigns</h2>
      <div className="grid gap-3 grid-cols-3">
        {campains.map((campain)=>{
            return <DonationCard key={campain.id} card={campain} />
        })}
      </div>
    </div>
  );
};

export default Donation;
