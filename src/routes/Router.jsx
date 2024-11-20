import {
    createBrowserRouter,
  } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import Donation from "../Layouts/Donation";
import Help from "../Layouts/Help";
import Dashboard from "../Layouts/Dashboard";
import DonationDetails from "../Layouts/DonationDetails";
import ErrorPage from "../Layouts/ErrorPage";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Layouts/Login";
import Register from "../Layouts/Register";
import PrivetRoute from "./Privetroute";
import Update from "../Layouts/Update";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
    },
    {
      path: "/donation",
      element: <Donation />,
    },
    {
        path:"/donation/:id",
        element:<PrivetRoute><DonationDetails /></PrivetRoute>,
        loader:({params})=>{
            return fetch(`../data_${params.id}.json`)
        }
    },
    {
      path: "/help",
      element: <Help />,
    },
    {
      path: "/auth",
      element:<AuthLayouts />,
      children:[
        {
            path: "/auth/login",
            element: <Login />, 
        },
        {
            path: "/auth/register",
            element: <Register />, 
        },
        {
            path: "/auth/update",
            element: <Update />, 
        },
      ]
    },
    {
      path: "/dashboard",
      element: <PrivetRoute><Dashboard /></PrivetRoute>,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);


export default router