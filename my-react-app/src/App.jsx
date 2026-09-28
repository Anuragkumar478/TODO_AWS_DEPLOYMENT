
import React, { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");

  const [todos, setTodos] = useState([]);

  // ================= GET TODOS =================
  const getTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/todoname"
      );

      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // ================= CREATE TODO =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/todoname",
        todo
      );

      alert("Todo created successfully");

      setTitle("");
      setDescription("");
      setPriority("");
      setStatus("pending");
      setDueDate("");

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE TODO =================
  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/todoname/${id}`
      );

      alert("Todo deleted");

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/todoname/${id}`,
        {
          status: newStatus,
        }
      );

      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= PRIORITY STYLE =================
  const getPriorityStyle = (priority) => {
    if (priority === "high") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "inprogress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold tracking-wide">
            TaskFlow
          </h1>

          <div className="text-sm text-slate-300">
            Todo Management System
          </div>

        </div>
      </nav>

      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-800">
            My Tasks
          </h2>

          <p className="text-slate-500 mt-1">
            Create, manage and track your daily tasks.
          </p>

        </div>


        {/* ================= CREATE TODO ================= */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-10">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-slate-800">
              Create New Task
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Add a new task to your todo list.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* TITLE + DESCRIPTION */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>


              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>

                <input
                  type="text"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

            </div>


            {/* PRIORITY + STATUS + DATE */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

              {/* PRIORITY */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Priority
                </label>

                <div className="flex gap-4">

                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="radio"
                      name="priority"
                      value="low"
                      checked={priority === "low"}
                      onChange={(e) =>
                        setPriority(e.target.value)
                      }
                    />

                    <span className="text-sm text-slate-600">
                      Low
                    </span>

                  </label>


                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="radio"
                      name="priority"
                      value="medium"
                      checked={priority === "medium"}
                      onChange={(e) =>
                        setPriority(e.target.value)
                      }
                    />

                    <span className="text-sm text-slate-600">
                      Medium
                    </span>

                  </label>


                  <label className="flex items-center gap-2 cursor-pointer">

                    <input
                      type="radio"
                      name="priority"
                      value="high"
                      checked={priority === "high"}
                      onChange={(e) =>
                        setPriority(e.target.value)
                      }
                    />

                    <span className="text-sm text-slate-600">
                      High
                    </span>

                  </label>

                </div>

              </div>


              {/* STATUS */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="inprogress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                </select>

              </div>


              {/* DATE */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>


            {/* BUTTON */}

            <div className="mt-6">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200 shadow-sm"
              >
                + Create Task
              </button>

            </div>

          </form>

        </div>


        {/* ================= TASK HEADER ================= */}

        <div className="flex justify-between items-center mb-5">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              All Tasks
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {todos.length} total task{todos.length !== 1 ? "s" : ""}
            </p>

          </div>

        </div>


        {/* ================= TODO LIST ================= */}

        {todos.length === 0 ? (

          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

            <div className="text-5xl mb-4">
              📋
            </div>

            <h3 className="text-xl font-semibold text-slate-700">
              No tasks yet
            </h3>

            <p className="text-slate-500 mt-2">
              Create your first task using the form above.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {todos.map((todo) => (

              <div
                key={todo._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 p-5"
              >

                {/* CARD HEADER */}

                <div className="flex justify-between items-start gap-3">

                  <h3 className="text-lg font-bold text-slate-800 break-words">
                    {todo.title}
                  </h3>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full capitalize whitespace-nowrap ${getPriorityStyle(
                      todo.priority
                    )}`}
                  >
                    {todo.priority || "No priority"}
                  </span>

                </div>


                {/* DESCRIPTION */}

                <p className="text-sm text-slate-500 mt-3 min-h-[40px]">
                  {todo.description}
                </p>


                {/* STATUS */}

                <div className="mt-4">

                  <span
                    className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full capitalize ${getStatusStyle(
                      todo.status
                    )}`}
                  >
                    {todo.status}
                  </span>

                </div>


                {/* DATE */}

                <div className="border-t border-slate-100 mt-5 pt-4">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-xs text-slate-400">
                        Due Date
                      </p>

                      <p className="text-sm font-medium text-slate-600 mt-1">

                        {todo.dueDate
                          ? new Date(
                              todo.dueDate
                            ).toLocaleDateString()
                          : "No due date"}

                      </p>

                    </div>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="flex gap-2 mt-5">

                  {todo.status !== "completed" && (

                    <button
                      onClick={() =>
                        updateStatus(
                          todo._id,
                          "completed"
                        )
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
                    >
                      ✓ Complete
                    </button>

                  )}

                  <button
                    onClick={() =>
                      deleteTodo(todo._id)
                    }
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium py-2.5 rounded-lg transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="text-center text-sm text-slate-400 py-8">

        Built with React + Node.js + MongoDB

      </footer>

    </div>
  );
}

export default App;

