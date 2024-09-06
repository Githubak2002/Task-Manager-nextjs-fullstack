"use client";
import React, { useEffect, useState } from "react";
import { useCounterStore } from "@/lib/store";

const page = () => {

  const [popup,setPopup] = useState(false);

  const count = useCounterStore((state) => state.count);
  const incrementCount = useCounterStore((state) => state.increment);
  const decrementCount = useCounterStore((state) => state.decrement);
  const resetCount = useCounterStore((state) => state.reset);

  useEffect(() => {
    // console.log("Counter value → ", count);
    // console.log("State → ",);
  }, [count]);

  const resetHandler = () => {
    resetCount();
    setPopup(false);
  }

  return (
    <section className="flexCenter flex-col gap-y-5 px-4 h-[70vh]">

      {/* ====== Reset counter pop up ====== */}
      <main className={`fixed top-0 left-0 h-full w-full flex items-center justify-center bg-opacity-50 backdrop-blur-sm ${!popup ? 'hidden' : 'absolute'}`}>
        <div className="flexCenter flex-col py-10 px-14 border shadow-2xl border-black rounded-lg bg-white">
          <h2 className="text-2xl mt-2 mb-6"> Delete the task </h2>
          <div className="flex gap-x-5 w-full">
            <button 
              onClick={() => setPopup(false)}
             className=" rounded-md border-slate-700 border p-2 w- w-1/2">No</button>
            <button 
              onClick={resetHandler}
            className="rounded-md border-slate-700 border p-2 w-1/2">Delete</button>
          </div>
        </div>
      </main>


      <h1 className=" text-sm">
        Simple counter using{" "}
        <span className="font-bold gradient-text2"> ZUSTAND </span> State
        managment
      </h1>

      <main className="flexCenter my-6">
        <button
          onClick={incrementCount}
          className="border-slate-500 border p-2 w-10"
        >
          +
        </button>
        <h2 className="border-slate-500 border p-2 w-12 text-center font-bold">
          {count}
        </h2>
        <button
          onClick={decrementCount}
          className="border-slate-500 border p-2 w-10"
        >
          -
        </button>
      </main>

      {/* === reset === */}
      <button 
        // onClick={resetCount}
        className=""
        onClick={() => setPopup(true)}
      >
        Reset counter
      </button>

    </section>
  );
};

export default page;
