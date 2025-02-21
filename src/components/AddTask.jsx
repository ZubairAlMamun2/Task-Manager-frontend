import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {


    const[count,setCount]=useState(0)
    useEffect(()=>{
        const fetchTasks = async () => {
            try {
              const response = await axios.get("http://localhost:5000/alltask");
              const fetchedTasks = response.data;
              setCount(fetchedTasks.length)
            } catch (error) {
              console.error("Error fetching tasks:", error.response?.data || error);
            }
          };
      
          fetchTasks();
    },[])
    


    const { user } = useContext(AuthContext);
    const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get("title").trim();
    const email = user.email;
    const description = form.get("description").trim();
    const titleDesc={title,description}
    const timestamp = new Date().toISOString();
    const category = "To-Do";
    const possition = count+1;

    if (title.length > 50) {
      Swal.fire({
        title: "Error!",
        text: "Title cannot exceed 50 characters.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    if (description.length > 200) {
      Swal.fire({
        title: "Error!",
        text: "Description cannot exceed 200 characters.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    const formData = {
      titleDesc,
      timestamp,
      category,
      email,
      possition
    };

    fetch(`http://localhost:5000/addnewtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Task added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate('/')
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });

    e.target.reset();
  };

  return (
    <div>
      <NavBar />
      <main className="min-h-screen flex justify-center items-center">
        <div className="card rounded-lg bg-base-100 w-full max-w-lg p-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Add New Task
          </h2>
          <form onSubmit={handleSubmit} className="card-body p-0">
            {/* Task Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-semibold">
                  Task Title (Max 50 characters)
                </span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter task title"
                className="input input-bordered"
                required
                maxLength="50"
              />
            </div>

            {/* Task Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm font-semibold">
                  Description (Max 200 characters)
                </span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder="Enter task description (optional)"
                maxLength="200"
              ></textarea>
            </div>


            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Add Task</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddTask;
