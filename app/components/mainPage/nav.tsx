import Link from 'next/link'
import React from 'react'
import Signing from './signing'

export default function Nav() {
  return (
    <nav className=" absolute  w-full top-0 left-0 p-3 flex justify-between items-center py-6">
        <div className="text-4xl text-white tracking-wide font-bold">IdeaTracker+</div>
        <ul className="flex space-x-8">
          <li><Link className="text-gray-100 text-xl" href="#features">Features</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#how-it-works">How It Works</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#contact">Contact</Link></li>
        </ul>
        <Signing />
      </nav>
  )
}
