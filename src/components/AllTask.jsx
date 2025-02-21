import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const AllTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);

  // Fetch tasks and categorize them
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/alltask");
        const fetchedTasks = response.data;

        setTasks(fetchedTasks);
        categorizeTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    // Real-time updates
    socket.on("taskAdded", (newTask) => {
      setTasks((prev) => [...prev, newTask]);
      categorizeTasks([...tasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      categorizeTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      categorizeTasks(tasks.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off("taskAdded");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  // Categorize tasks
  const categorizeTasks = (taskList) => {
    setTodoTasks(taskList.filter((task) => task.category === "To-Do"));
    setInProgressTasks(taskList.filter((task) => task.category === "In Progress"));
    setDoneTasks(taskList.filter((task) => task.category === "Done"));
  };

  // Drag-and-Drop Handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = async (e, newCategory) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.category === newCategory) return;

    try {
      // Remove task from old category and add to new category
      const updatedTasks = tasks.map((task) =>
        task._id === draggedTask._id ? { ...task, category: newCategory } : task
      );

      // Update backend
      await axios.put(`http://localhost:5000/taskscategoryupdate/${draggedTask._id}`, {
        category: newCategory,
      });

      // Update local state
      setTasks(updatedTasks);
      categorizeTasks(updatedTasks);
      Swal.fire("Updated!", "Task moved successfully.", "success");
    } catch (error) {
      console.error("Error moving task:", error.response?.data || error);
      Swal.fire("Error!", "Failed to move task.", "error");
    } finally {
      setDraggedTask(null);
    }
  };

  // Handle updating task details
  const handleUpdateDetails = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);

    const { value: formValues } = await Swal.fire({
      title: "Update Task",
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Task Title" value="${taskToUpdate?.titleDesc?.title}" />
        <textarea id="swal-description" class="swal2-textarea" placeholder="Task Description">${taskToUpdate?.titleDesc?.description}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => ({
        title: document.getElementById("swal-title").value.trim(),
        description: document.getElementById("swal-description").value.trim(),
      }),
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:5000/updatedetailstasks/${id}`, { titleDesc: formValues });
        const updatedTasks = tasks.map((task) =>
          task._id === id ? { ...task, titleDesc: formValues } : task
        );
        setTasks(updatedTasks);
        categorizeTasks(updatedTasks);
        Swal.fire("Updated!", "Task updated successfully.", "success");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Handle deleting task
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/tasks/${id}`);
          const updatedTasks = tasks.filter((task) => task._id !== id);
          setTasks(updatedTasks);
          categorizeTasks(updatedTasks);
          Swal.fire("Deleted!", "Task has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting task:", error);
        }
      }
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Task Management</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading tasks...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[{ name: "To-Do", tasks: todoTasks }, { name: "In Progress", tasks: inProgressTasks }, { name: "Done", tasks: doneTasks }].map(({ name, tasks }) => (
            <div
              key={name}
              className="bg-gray-100 p-4 rounded-lg min-h-[200px] transition-all hover:shadow-lg"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, name)}
            >
              <h2 className="text-xl font-bold mb-3 text-center text-purple-600">{name}</h2>
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 mb-4 shadow-md rounded-lg hover:scale-105 transition-all"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <p className="font-semibold text-lg">{task.titleDesc?.title}</p>
                  <p className="text-sm text-gray-600">{task.titleDesc?.description}</p>
                  <div className="md:flex justify-between mt-3">
                    <button
                      onClick={() => handleUpdateDetails(task._id)}
                      className="bg-blue-500 mb-1 w-full md:w-32 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-all"
                    >
                      Update Details
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 mb-1 w-full md:w-16 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTask;
