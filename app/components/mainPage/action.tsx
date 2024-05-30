import Link from 'next/link'
import React from 'react'

export default function Action() {
  return (
    <section id="signup" className=" bg-gradient-to-tl from-slate-950 via-slate-800 to-slate-950 w-full text-white py-20 text-center">
        <h2 className="text-6xl font-bold mb-8">Ready to Bring Your Ideas to Life?</h2>
        <p className="text-2xl mb-10">Sign up now and start transforming your ideas into reality with the help of OpenAI.</p>
        <Link
        href="/register"
        className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out hover:bg-blue-500 text-2xl hover:text-white"
        >
        Get Started for Free
        </Link>
  </section>
  )
}
