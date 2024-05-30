import Image from 'next/image'
import React from 'react'
import Idea from '@/public/idea-man-person-svgrepo-com.svg'
import { SiOpenai } from "react-icons/si";
import { FaLayerGroup } from "react-icons/fa";

export default function Features() {
  return (
    <section id="features" className="py-20">
        <div className="container mx-auto  text-center">
          <h2 className="text-7xl font-bold tracking-wider mb-14">Features</h2>
          <div className="flex items-center justify-center gap-10">
            <div className="w-full lg:w-[36%] p-4">
              <div className="bg-white shadow-lg shadow-zinc-900 rounded-lg p-6 flex flex-col justify-center items-center">
                <Image src={Idea} alt='idea image' width={80} height={80}></Image>
                <h3 className="text-3xl lg:mt-3 font-bold mb-2">Track Your Ideas</h3>
                <p className="text-gray-700 text-center text-balance text-lg">Easily capture and organize your thoughts and ideas in one place.</p>
              </div>
            </div>
            <div className="w-full lg:w-[36%] p-4">
              <div className="bg-white shadow-lg shadow-zinc-900 rounded-lg flex flex-col justify-center items-center p-6">
                <SiOpenai size={80} />
                <h3 className="text-3xl lg:mt-3 font-bold mb-2">Expand with OpenAI</h3>
                <p className="text-gray-700 text-center text-balance text-lg">Use OpenAI&#39;s powerful algorithms to expand and develop your ideas.</p>
              </div>
            </div>
            <div className="w-full lg:w-[36%] p-4">
              <div className="bg-white shadow-lg shadow-zinc-900 rounded-lg flex flex-col justify-center items-center p-6">
                <FaLayerGroup size={80} />
              <h3 className="text-3xl lg:mt-3 font-bold mb-2">Organize Your Ideas</h3>
              <p className="text-gray-700 text-center text-balance text-lg">Organize your ideas effectively to turn them into actionable plans.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
