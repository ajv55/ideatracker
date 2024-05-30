import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { IoMdAnalytics, IoMdHome } from 'react-icons/io'

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className='flex justify-start items-start'>
        <nav className='lg:flex hidden flex-col w-[8%] justify-evenly items-center  text-2xl bg-slate-500  h-screen'>
            <Link className=''  href='/'><IoMdHome size={50} color='white'/></Link>
            <Link className=''  href='/dashboard'><IoMdAnalytics size={50} color='white'/></Link>
        </nav>
        {children}
    </div>
  )
}
