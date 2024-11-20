import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

const Update = () => {
    const{user,UpdateUserProfile}=useContext(AuthContext)
    const navigate=useNavigate();
    const handlesubmit=(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const photo=e.target.photo.value;
        UpdateUserProfile({displayName:name,photoURL:photo}).
        then(res=>navigate("/"))
    }
  return (
    <div>
         <h2 className="text-2xl font-semibold text-center ">Update Your Profile</h2>
      <div className="md:w-6/12 max-w-sm mx-auto font-semibold card shadow-lg mt-5 p-5">
        <form action="" onSubmit={handlesubmit}>
        <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="flex justify-center btn btn-primary">Update User</button>
          </div>
        </form>
  
      </div>
    </div>
  )
}

export default Update