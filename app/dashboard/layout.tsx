'use client';
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'
import { IoMdAnalytics, IoMdHome } from 'react-icons/io'
import { motion, AnimatePresence } from 'framer-motion';
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { MdOutlineSettingsSuggest } from "react-icons/md";

export default function Layout({children}: {children: ReactNode}) {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {data: session} = useSession();

  const userName = session?.user?.name;

  useEffect(() => {
    if(session?.user) {
      return setIsLoggedIn(true)
    }
  }, [])

  return (
    <div  className='flex justify-start flex-col lg:flex-row items-start'>

<AnimatePresence>
          {isOpen && (
                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100vw' }}
                        transition={{ type: 'spring', stiffness: 50 }}
                        className="fixed top-0 left-0 w-64 h-screen rounded-r-2xl bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950 flex flex-col justify-between items-start shadow-lg z-50"
                    >
                        <nav className="flex w-full flex-col justify-evenly  h-[26rem] p-4 space-y-8">
                            <Link onClick={() => setIsOpen(!isOpen)} className="text-2xl w-full flex justify-start items-center gap-4 font-semibold text-white  hover:text-teal-500" href="/dashboard"><IoMdHome size={35} color='white'/>Overview</Link>
                            <Link onClick={() => setIsOpen(false)} className="text-2xl w-full flex justify-start items-center gap-4 font-semibold text-white  hover:text-teal-500" href="/dashboard/tracking"><IoMdAnalytics size={33} color='white'/>Tracking</Link>
                            <Link onClick={() => setIsOpen(false)} className="text-2xl w-full flex justify-start items-center gap-4 font-semibold text-white  hover:text-teal-500" href="/dashboard/recent"><PiClockCounterClockwiseFill size={35} color='white'/>Recent</Link>
                            <Link onClick={() => setIsOpen(false)} className='text-white  w-full text-2xl flex justify-start items-center gap-2'  href='/dashboard/setting'><MdOutlineSettingsSuggest size={35} color='white'/>Setting</Link>
                        </nav>

                        {isLoggedIn && (
                          <div className="flex flex-col items-start p-2 space-y-4">
                            <span className="text-xl text-white ">Welcome, {userName?.toUpperCase()}</span>
                            <Link href='/' className="text-xl text-white hover:text-teal-500">Home</Link>
                            <Link href='/signOut' className="text-xl text-white hover:text-teal-500">Logout</Link>
                          </div>
                        )}
                        
                        <div className=' lg:w-full lg:mt-0 mt-8 w-[97%] h-[4rem] flex justify-center items-center'>
                            <p className='lg:text-lg text-md lg:p-0 p-2 self-end text-white  text-center lg:text-right'>Copyright © 2024 IdeaTracker+. All rights reserved.</p>
                        </div>
                    </motion.div>
                )}
      </AnimatePresence>

        <motion.nav variants={{hidden: {x: -200, opacity: 0}, visible: {x: 0, opacity: 1}}} initial='hidden' animate='visible' transition={{duration: 0.75, stiffness: 80, type: 'spring'}} className='lg:flex hidden flex-col w-[16%] rounded-r-2xl justify-start items-center gap-24 p-3 text-2xl bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950  h-screen'>
           <h1 className='text-2xl text-white'>IdeaTracker+</h1>
            <Link className='text-white w-full   text-2xl flex justify-start items-center gap-2'  href='/dashboard'><IoMdHome size={30} color='white'/>Overview</Link>
            <Link className='text-white  w-full text-2xl flex justify-start items-center gap-2'  href='/dashboard/tracking'><IoMdAnalytics size={30} color='white'/>Tracking</Link>
            <Link className='text-white  w-full text-2xl flex justify-start items-center gap-2'  href='/dashboard/recent'><PiClockCounterClockwiseFill size={35} color='white'/>Recent</Link>
            <Link className='text-white  w-full text-2xl flex justify-start items-center gap-2'  href='/dashboard/setting'><MdOutlineSettingsSuggest size={35} color='white'/>Setting</Link>
        </motion.nav>
        <div className='self-end md:hidden  flex justify-between items-center w-full'>
          <h1 className='text-2xl font-medium tracking-wide p-2'>IdeaTracker+</h1>
          <motion.div whileTap={{scale: 0.3, rotate: 260}} transition={{duration: 1, type: 'spring', stiffness: 60 }} ><MdDashboard onClick={() => setIsOpen(!isOpen)} className='' size={50} color='black'/></motion.div>
        </div>
        {children}
    </div>
  )
}
