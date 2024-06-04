import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="bg-gradient-to-tl from-slate-950  via-slate-800 to-slate-950 w-full h-[36rem] flex lg:flex-row flex-col justify-between items-center text-white">
      
      <section className="lg:w-[50%] w-full h-full lg:mt-0 mt-32 flex flex-col lg:flex-row items-center ">
        <div className="w-full p-3">
          <h1 className="text-5xl font-bold mb-10">Turn Your Ideas into Reality with IdeaTracker+</h1>
          <p className="text-xl mb-10">Track your ideas effortlessly and let OpenAI help you expand them into actionable plans.</p>
          <Link  className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-2xl py-2 px-4 rounded" href="/register">
            Start Now
          </Link>
        </div>
      </section>

      <div style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/idea.jpeg")'}} className="w-[50%] h-[100%] hidden lg:block  bg-cover bg-center  mt-10 lg:mt-0">
          
      </div>
    </header>
  )
}
