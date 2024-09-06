import Link from 'next/link'
import React from 'react'

const linkCSS = "transition-all md:hover:scale-110 md:hover:text-blue-500";

const page = () => {
  return (
    <section className='h-[70vh] flexCenter flex-col gap-y-4 px-4 '>
      
      <Link href="/taskmanager" className={linkCSS}>Taks Manager → </Link>
      <Link href="/counter" className={linkCSS}>Counter using ZUSTAND → </Link>
    </section>
  )
}

export default page
