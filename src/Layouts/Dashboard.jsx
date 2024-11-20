import React, { useContext } from "react";
import NavBar from "../NavBar";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const{user}=useContext(AuthContext)
    console.log(user.photoURL)
  return (
    <div className="w-11/12 mx-auto">
      <NavBar />
      
      <h2 className="text-2xl font-semibold text-center ">Welcome {user.displayName     }</h2>
      <div className="md:w-6/12 max-w-sm mx-auto font-semibold card shadow-lg mt-5 p-5">
        <div className="flex justify-center my-2"><img className="w-24 h-24 border rounded-full" src={user.photoURL} alt="" /></div>
        <h2 className="text-center">Name : {user.displayName}</h2>
        <h2 className="text-center my-2">Email : {user.email}</h2>
        <Link className="flex justify-center btn btn-primary" to="/auth/update">Update User</Link>
      </div>
    </div>
  );
};

export default Dashboard;
