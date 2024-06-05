import React from 'react'

export default function PieSkeleton() {
  return (
    <div className='w-full h-full absolute top-0 left-0 flex bg-slate-50 rounded-xl justify-center items-center '>
        <div className='w-[350px] h-[350px] bg-gray-600 animate-pulse rounded-full'></div>
    </div>
  )
}
