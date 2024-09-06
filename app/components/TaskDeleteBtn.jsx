// =============== delete todo currently not in use ===============

"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useStore } from '@/lib/store';

const btnCss = "w-fit px-4 py-2 text-white text-sm rounded-md hover:scale-110 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 ease-in-out focus:outline-none";
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;


const TaskDeleteBtn = ({id}) => {

  const router = useRouter();

  const removeTask = useStore((state) => state.removeTask);

  const deleteTaskHandler = async (id) => {
    // console.log("Id of task to be removed → ",id);
    try {
      // const res = await axios.delete(`/api/?id=${id}`);
      const res = await axios.delete(`${backend_url}/api/postdeletetask/?id=${id}`);
      console.log("Response from API → ", res.data);
      removeTask(id);
      // router.refresh();
      // reloding the page with router
      // if(res.status === "ok")
      // hard reloade the page using windows

      // window.location.reload();      
    } catch (error) {
      console.error("Error deleting task → ", error.response?.data || error.message);     
    }
  }
  
  return (
    <section className=''>
      <button onClick={() => deleteTaskHandler(id)}>Delete</button>
    
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

    </section>
  )
}

export default TaskDeleteBtn