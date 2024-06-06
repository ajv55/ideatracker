'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Signing from './signing'
import { useSession } from 'next-auth/react';
import { HiMenuAlt1 } from "react-icons/hi";
import { AnimatePresence, motion } from 'framer-motion';

export default function Nav() {

  const {data: session } = useSession();
  const userName = session?.user?.name;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(session?.user) {
      return setIsLoggedIn(true)
    }
  }, [])

  return (
    <nav className=" absolute   w-full top-0 left-0 p-3 flex justify-between items-center py-6">
      <AnimatePresence>
          {isOpen && (
                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100vw' }}
                        transition={{ type: 'spring', stiffness: 50 }}
                        className="fixed top-0 left-0 w-64 h-screen rounded-r-2xl bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950 flex flex-col justify-between items-start shadow-lg z-50"
                    >
                        <nav className="flex flex-col p-4 space-y-8">
                            <Link onClick={() => setIsOpen(!isOpen)} className="text-2xl font-semibold text-white  hover:text-teal-500" href="/">
                            Home
                            </Link>
                            <Link onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-white  hover:text-teal-500" href="/about">
                            About
                            </Link>
                            <Link onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-white  hover:text-teal-500" href="/pricing">
                            Pricing
                            </Link>
                            <Link onClick={() => setIsOpen(false)} className="text-2xl font-semibold text-white  hover:text-teal-500" href="#contact">
                            Contact
                            </Link>
                        </nav>
                        {isLoggedIn ? (
                          <div className="flex flex-col items-start p-2 space-y-4">
                            <span className="text-2xl text-white ">Welcome, {userName?.toUpperCase()}</span>
                            <Link href='/dashboard' className="text-2xl text-white hover:text-teal-500">Dashboard</Link>
                            <Link href='/signOut' className="text-2xl text-white hover:text-teal-500">Logout</Link>
                          </div>
                        ) : (
                          <div className="flex p-4 w-full flex-col items-start space-y-4">
                            <Link href='/login' className="text-2xl font-semibold text-sky-300 hover:text-teal-500">Login</Link>
                            <Link href='/register' className="text-2xl font-semibold text-sky-300 hover:text-teal-500">Sign Up</Link>
                          </div>
                        )}

                        <div className=' lg:w-full lg:mt-0 mt-8 w-[97%] h-[4rem] flex justify-center items-center'>
                            <p className='text-md self-end text-white  text-center lg:text-right p-1 lg:p-0'>Copyright © 2024 IdeaTracker+. All rights reserved.</p>
                        </div>
                    </motion.div>
                )}
      </AnimatePresence>

        <h1 className="lg:text-4xl text-3xl text-white tracking-wide font-bold">IdeaTracker+</h1>
        <ul className="lg:flex hidden justify-evenly items-center space-x-8">
          <li><Link className="text-gray-100 text-xl" href="/">Home</Link></li>
          <li><Link className="text-gray-100 text-xl" href="/about">About</Link></li>
          <li><Link className="text-gray-100 text-xl" href="#contact">Contact</Link></li>
          <li><Link className="text-gray-100 text-xl" href="/pricing">Pricing</Link></li>
          {session && <li><Link className="text-gray-100 text-xl" href="/dashboard">Dashboard</Link></li>}
        </ul>
        <HiMenuAlt1 data-testid="menu-icon" className='lg:hidden' onClick={() => setIsOpen(!isOpen)} size={35} color='white' />

        <Signing />
      </nav>
  )
}
