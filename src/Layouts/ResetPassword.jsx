import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";



const ResetPassword = () => {

    // const[]=useState("");
    const navigate=useNavigate();
    const {ResetUserPassword,resetEmail,SetresetEmail}=useContext(AuthContext);
    const handlechange=(e)=>{
        e.preventDefault()
        const email=e.target.value
        SetresetEmail(email)
        console.log(resetEmail)
    }
    console.log(resetEmail)


  const handlesubmit = (e) => {
    e.preventDefault()
    const email=e.target.email.value
   
    // console.log(email)
    ResetUserPassword(email).
    then((res)=>{
        const link = document.createElement('a');
        link.href = 'https://mail.google.com';
        link.target = '_blank'; // Open in a new tab (remove this line if you want to open in the same tab)
        link.rel = 'noopener noreferrer'; // For security
        link.click();
    }).catch((err)=>{
        console.log(err)
    })
  };
  return (
    <div className="flex justify-center min-h-[70vh] items-center">
      <div>
        <h2 className="text-2xl font-semibold text-center ">
          Reset Your Password
        </h2>
        <div className=" mx-auto font-semibold card shadow-lg mt-5 p-5">
          <form action="" onSubmit={handlesubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                value={resetEmail}
                onChange={handlechange}
                type="email"
                placeholder="Your Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="flex justify-center btn btn-primary">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
