import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DeatailsCard = ({ data }) => {
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you ! We will reach your destination soon")
    e.target.reset();
    // navigate("/")
  };

  return (
    <div className="w-11/12 mx-auto mt-1">
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <div className="flex justify-end m-1">
        <Link className="btn btn-primary" to="/donation">
          Go Back
        </Link>
      </div>
      <div className="flex justify-center items-center border-2 rounded-lg">
        <div className="card  bg-base-100  md:w-6/12 ">
          <figure className="px-10 pt-10">
            <img
              src={data.image}
              alt="Donation Poster"
              className="h-[50vh] w-full rounded-xl"
            />
          </figure>
          <div className="card-body items-start font-semibold  text-center">
            <h2 className="text-2xl text-center font-semibold">{data.title}</h2>
            <p>{data.description}</p>
            <p>Status : {data.status}</p>
            <p>Contact-Info :{data.contactInfo}</p>
            <p>Division : {data.division}</p>
          </div>
        </div>
      </div>

      {/* Donation Form Field */}

      <div className="border-2 mt-5">
        <h2 className="text-2xl text-center font-semibold">
          Donation Form Field
        </h2>
        <div className="flex justify-center">
          <div className="card bg-base-100 w-full max-w-lg ">
            <form onSubmit={handlesubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity of items</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="2 jackets, 3 blankets"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item type</span>
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="blanket, jacket, sweater"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pickup location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="House 12, Road 5, Dhanmondi, Dhaka"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Comment</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  name="comment"
                  placeholder=""
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DeatailsCard;
