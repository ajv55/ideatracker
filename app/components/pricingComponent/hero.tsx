import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <div className="bg-gradient-to-bl lg:h-[27rem] h-[32rem] from-slate-950 via-slate-800 to-slate-950 text-white py-20">
      <div className="container mx-auto  px-6">
        <div className="text-center lg:mt-20 mt-14  flex flex-col justify-center items-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Discover the Power of Organized Creativity
          </h1>
          <p className="text-md lg:text-xl mb-6">
            Bring your ideas to life with IdeaTracker, the ultimate tool for tracking, managing, and realizing your creative visions. Whether you&#39;re an individual creator, a small team, or a large enterprise, IdeaTracker offers the perfect plan to help you stay organized, collaborate seamlessly, and achieve your goals.
          </p>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg" href="/register">Sign Up for Free Trial</Link>
        </div>
      </div>
    </div>
  )
}
