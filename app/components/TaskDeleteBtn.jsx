

// =============== delete todo currently not in use ===============

"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';

const btnCss = "w-fit px-4 py-2 text-white text-sm rounded-md hover:scale-110 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 ease-in-out focus:outline-none";

const TaskDeleteBtn = ({id}) => {

  const router = useRouter();

  const deleteTask = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`/api/?id=${id}`);
      router.refresh();
      console.log("Response from API → ", res.data);
      // reloding the page with router
      // if(res.status === "ok")
      // hard reloade the page using windows
      window.location.reload();      
    } catch (error) {
      console.error("Error deleting task → ", error.response?.data || error.message);     
    }
  }
  
  return (
    <button onClick={() => deleteTask(id)}>Delete</button>
  )
}

export default TaskDeleteBtn