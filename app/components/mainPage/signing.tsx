'use client';
import Link from 'next/link';
import {useSession} from 'next-auth/react'

export default function Signing() {
    const {data: session} = useSession();
  return (
    <div className='w-[25%] hidden lg:flex gap-2 justify-end items-end text-xl'>
      {/* {session && <Link className=' bg-gradient-to-tr from-slate-800 via-orange-600 to-slate-300 w-[67%] rounded-xl text-2xl font-light tracking-wider hover:from-slate-300 hover:via-orange-500 hover:to-slate-800 text-white px-2.5 py-3 text-center ' href='/dashboard'>Dashboard</Link>} */}
        {!session ? <Link className=' bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-900 w-[67%] rounded-xl text-2xl font-light tracking-wider hover:from-orange-300 hover:via-orange-500 hover:to-orange-800 text-white px-2.5 py-3 text-center ' href='/login'>Sign-In</Link> : <Link className='bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-900 w-[67%]  text-2xl font-light tracking-wider hover:from-orange-300 hover:via-orange-500 hover:to-orange-800 rounded-xl text-white text-center px-2.5 py-3 ' href='/signOut'>Sign-Out</Link> }
        
    </div>
  )
}
