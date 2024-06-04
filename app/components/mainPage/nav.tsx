'use client';
import Link from 'next/link'
import React from 'react'
import Signing from './signing'
import { useSession } from 'next-auth/react';
import { HiMenuAlt1 } from "react-icons/hi";

export default function Nav() {

  const {data: session } = useSession();

  return (
    <nav className=" absolute   w-full top-0 left-0 p-3 flex justify-between items-center py-6">


        <h1 className="lg:text-4xl text-3xl text-white tracking-wide font-bold">IdeaTracker+</h1>
        <ul className="lg:flex hidden space-x-8">
          <li><Link className="text-gray-100 text-xl" href="#features">Features</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#how-it-works">How It Works</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#contact">Contact</Link></li>
          {session && <li><Link className="text-gray-100 text-xl" href="/dashboard">Dashboard</Link></li>}
        </ul>
        <HiMenuAlt1 size={35} color='white' />

        <Signing />
      </nav>
  )
}
