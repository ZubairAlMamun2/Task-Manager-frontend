import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import ErrorPage from "../components/ErrorPage";
import AddTask from "../components/AddTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    loader:()=>fetch(`http://localhost:5000/alltask`)
  },
  {
    path: "/addtask",
    element: <AddTask />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
