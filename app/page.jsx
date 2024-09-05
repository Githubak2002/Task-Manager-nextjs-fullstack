"use client";
export const dynamic = "force-dynamic";


import useSWR, { mutate } from "swr";
import axios from "axios";
import { useState } from "react";

// Fetcher function for SWR
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const { data, error, mutate: mutateTodos } = useSWR(`${backend_url}/api/alltask`, fetcher);
  const [task, setTask] = useState("");

  console.log("data fetched → ",data);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backend_url}/api/postdeletetask`, { task });
      console.log("posted new task")
      setTask("");
      // Revalidate the data after posting
      mutateTodos(); // This re-fetches the data
    } catch (error) {
      console.error(
        "Error submitting task:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${backend_url}/api/postdeletetask/?id=${id}`);
      console.log("removed task")
      // Revalidate the data after deleting a task
      mutateTodos(); // This re-fetches the data
    } catch (error) {
      console.error(
        "Error deleting task → ",
        error.response?.data || error.message
      );
    }
  };

  const deleteAllTask = async () => {
    try {
      await axios.delete(`${backend_url}/api/deletealltasks`);
      // Revalidate the data after deleting all tasks
      mutateTodos(); // This re-fetches the data
    } catch (error) {
      console.error(
        "Error deleting all tasks → ",
        error.response?.data || error.message
      );
    }
  };

  if (error) return <div>Error loading tasks</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section className="min-h-[70vh]">
      <h2 className="gradient-text2 font1 text-4xl text-center py-5 ">
        TASK MANAGER
      </h2>

      <form
        onSubmit={submitHandler}
        className="space-x-4 mx-auto max-w-[540px] px-3 text-sm flexCenter"
      >
        <input
          type="text"
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your Task"
          className="w-3/4 h-[36px] p-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#EDF2F7] focus:bg-transparent"
        />

        <button type="submit" className="w-fit px-4 py-2 text-white text-sm rounded-md hover:scale-110 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 ease-in-out focus:outline-none">
          Add
        </button>
      </form>

      <main className="flexCenter flex-col mt-8 border-gray-300 border-2 rounded-lg px-3 py-7 md:mx-auto mx-3 max-w-[490px] ">
        {data.todos.length !== 0 && (
          <h2 className="gradient-text text-lg font-bold pb-3">
            All your todos
          </h2>
        )}
        {data.todos.map((ele, i) => (
          <div
            key={ele._id}
            className={`border-gray-300 ${data.todos.length === i + 1 ? "border-none" : "border-b"} px-3 py-3 flexBetween md:w-[460px] w-full mx-auto text-xs`}
          >
            <h2>{ele.task} </h2>
            <button onClick={() => deleteTask(ele._id)}>Delete</button>
          </div>
        ))}
        {data.todos.length !== 0 && (
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
