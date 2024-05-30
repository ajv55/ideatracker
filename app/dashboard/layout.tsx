'use client';
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { IoMdAnalytics, IoMdHome } from 'react-icons/io'
import { motion } from 'framer-motion';

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div  className='flex justify-start items-start'>
        <motion.nav variants={{hidden: {x: -200, opacity: 0}, visible: {x: 0, opacity: 1}}} initial='hidden' animate='visible' transition={{duration: 0.75, stiffness: 80, type: 'spring'}} className='lg:flex hidden flex-col w-[16%] rounded-r-2xl justify-start items-center gap-24 p-3 text-2xl bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950  h-screen'>
           <h1 className='text-2xl text-white'>IdeaTracker+</h1>
            <Link className='text-white text-2xl flex justify-center items-center gap-2'  href='/dashboard'><IoMdHome size={30} color='white'/>Overview</Link>
            <Link className='text-white text-2xl flex justify-center items-center gap-2'  href='/dashboard/tracking'><IoMdAnalytics size={30} color='white'/>Tracking</Link>
        </motion.nav>
        {children}
    </div>
  )
}
