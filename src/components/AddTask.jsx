import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const [count, setCount] = useState(0);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/alltask");
        setCount(response.data.length-1); // Get the total count for ordering
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const title = form.get("title").trim();
    const description = form.get("description").trim();
    const email = user.email;
    const titleDesc = { title, description };
    const timestamp = new Date().toISOString();
    const category = "To-Do";
    const position = count + 1; // Assigning order based on count

    if (title.length > 50) {
      Swal.fire("Error!", "Title cannot exceed 50 characters.", "error");
      return;
    }

    if (description.length > 200) {
      Swal.fire("Error!", "Description cannot exceed 200 characters.", "error");
      return;
    }

    const formData = { titleDesc, timestamp, category, email, position };

    try {
      const res = await axios.post(
        "http://localhost:5000/addnewtask",
        formData
      );
      if (res.data.acknowledged) {
        Swal.fire("Success!", "Task added successfully", "success");
        navigate("/");
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong!", "error");
    }

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
