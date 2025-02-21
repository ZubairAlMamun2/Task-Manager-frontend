import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const NavBar = () => {
  const provider = new GoogleAuthProvider();
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, Logout } = useContext(AuthContext);
 // console.log(user);
  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        // console.log(res.user);
        setUser(res.user);
        setError("");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        // console.log(err);
        setError(err.message);
      });
  };
  return (
    <div className="navbar bg-base-200 px-8  broder-none rounded-b-lg mb-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div className="flex justify-center flex-col gap-3 font-semibold text-base">
              <NavLink to="/">Home</NavLink>
              {
                 user? (<><NavLink to="/addtask">Add Task</NavLink></>):(<button onClick={SignInWithGoogle}>Get Start</button>)
              }
            </div>
          </ul>
        </div>
        <h2 className="text-3xl font-bold">Task Manager</h2>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <div className="flex gap-3 items-center font-semibold text-base">
            <NavLink to="/">Home</NavLink>
            {
                 user? (<><NavLink to="/addtask">Add Task</NavLink></>):(<button onClick={SignInWithGoogle}>Get Start</button>)
              }
          </div>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button
            onClick={Logout}
            className="btn btn-primary text-base-100 px-3 py-1"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={SignInWithGoogle}
            className="btn btn-primary text-base-100 px-3 py-1 "
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
