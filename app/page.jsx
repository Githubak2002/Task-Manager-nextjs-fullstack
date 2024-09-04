"use client";
import axios from "axios";
import { useState, useEffect } from "react";
// import TaskDeleteBtn from "./components/TaskDeleteBtn";

const btnCss =
  "w-fit px-4 py-2 text-white text-sm rounded-md hover:scale-110 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 ease-in-out focus:outline-none";
const inputCss =
  "w-3/4 h-[36px] p-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#EDF2F7] focus:bg-transparent";

export default function Home() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [allTodo, setAllTodo] = useState([]);
  const [task, setTask] = useState("");

  const getAllTodos = async () => {
    try {
      const res = await axios.get(`${backend_url}/api/alltask`);
      setAllTodo(res.data.todos);
      console.log("All todos → ",res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backend_url}/api/postdeletetask`, {
        task,
      });
      console.log("Response from API: ", res.data);
      setTask("");
    } catch (error) {
      console.error(
        "Error submitting task:",
        error.response?.data || error.message
      );
    }
    getAllTodos();
  };

  const deleteTask = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${backend_url}/api/postdeletetask/?id=${id}`
      );
      // const res = await axios.delete(`/api/postdeletetask/?id=${id}`);
      console.log("Response from API → ", res.data);
      getAllTodos();
    } catch (error) {
      console.error(
        "Error deleting task → ",
        error.response?.data || error.message
      );
    }
    getAllTodos();
  };

  const deleteAllTask = async () => {
    try {
      const res = await axios.delete(`${backend_url}/api/deletealltasks`);
      // const res = await axios.delete("/api/deletealltasks");
      console.log("All tasks removed");
      console.log("Response from API → ", res.data);
    } catch (error) {
      console.error(
        "Error deleting all tasks → ",
        error.response?.data || error.message
      );
    }
    getAllTodos();
  };

  useEffect(() => {
    getAllTodos();
  }, []);
  
  return (
    <section className="min-h-[70vh]">
      {/* === pop up === */}
      {/* <main className="hidden top-0 left-0 h-full w-full flexCenter bg-opacity-50 backdrop-blur-sm">

        <div className="flexCenter flex-col p-4 border border-black rounded-">
          <h2 className="text-2xl"> Delete the task </h2>
          <div className="flex gap-x-5 ">
            <button className="">No</button>
            <button className="">Delete</button>
          </div>
        </div>
      </main> */}

      <h2 className="gradient-text2 font1 text-4xl text-center py-5 ">
        TASK MANAGER
      </h2>

      <form
        onSubmit={submitHandler}
        className="space-x-4 mx-auto max-w-[540px] px-3 text-sm flexCenter"
      >
        <input
          type="text"
          // name="task"
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your Task"
          className={inputCss}
        />

        <button type="submit" className={btnCss}>
          Add
        </button>
      </form>

      <main className="flexCenter flex-col mt-8 border-gray-300 border-2 rounded-lg px-3 py-7 md:mx-auto mx-3 max-w-[490px] ">
        {allTodo?.length !== 0 && (
          <h2 className="gradient-text text-lg font-bold pb-3">
            All your todos
          </h2>
        )}
        {allTodo.map((ele, i) => {
          return (
            <div
              key={i}
              className={`border-gray-300 ${
                allTodo.length == i - 1 ? "border-none" : "border-b"
              } ${
                i === allTodo.length - 1 ? "border-none" : "border-b"
              } px-3 py-3 flexBetween md:w-[460px] w-full mx-auto text-xs`}
            >
              <h2>{ele.task} </h2>
              {/* <TaskDeleteBtn id={ele._id} /> */}
              <button onClick={() => deleteTask(ele._id)}>Delete</button>
            </div>
          );
        })}
        {allTodo?.length !== 0 && (
          <button
            onClick={deleteAllTask}
            className="text-xs p-2 transition-all hover:text-red-500 border border-black hover:border-red-500 rounded-sm mt-5"
          >
            Delete All
          </button>
        )}
      </main>
    </section>
  );
}
