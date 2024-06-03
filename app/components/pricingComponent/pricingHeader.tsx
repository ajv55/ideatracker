import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import Signing from '../mainPage/signing';

export default function PricingHeader() {

    const {data: session } = useSession();

  return (
    <nav className=" absolute bg-transparent w-full top-0 left-0 p-3 flex justify-between items-center py-6">
        <div className="text-4xl text-white tracking-wide font-bold">IdeaTracker+</div>
        <ul className="flex space-x-8">
          <li><Link className="text-gray-100 text-xl" href="/">Features</Link></li>
          <li><Link className="text-gray-100 text-xl" href="/">How It Works</Link></li>
          <li><Link className="text-gray-100 text-xl" href="/">Contact</Link></li>
          {session && <li><Link className="text-gray-100 text-xl" href="/dashboard">Dashboard</Link></li>}
        </ul>
        <Signing />
      </nav>
  )
}
