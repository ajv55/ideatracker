import Link from 'next/link'
import React from 'react'

export default function Nav() {
  return (
    <nav className=" absolute  w-full top-0 left-0 p-2 flex justify-between items-center py-6">
        <div className="text-4xl text-white tracking-wide font-bold">IdeaTracker+</div>
        <ul className="flex space-x-8">
          <li><Link className="text-gray-100 text-xl" href="#features">Features</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#how-it-works">How It Works</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#testimonials">Testimonials</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#contact">Contact</Link></li>
        </ul>
        <Link className="bg-blue-500 hover:bg-blue-700 text-xl text-white tracking-wide font-bold py-2 px-4 rounded" href="#signup">
          Get Started
        </Link>
      </nav>
  )
}
