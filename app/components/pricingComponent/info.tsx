import Link from 'next/link'
import React from 'react'

export default function Info() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Ready to Elevate Your Creativity?</h1>
        <p className="text-xl text-gray-600 mb-8">
          Take the first step towards organized, efficient, and impactful idea management with IdeaTracker.
          Sign up now and unlock the full potential of your creativity!
        </p>
        <Link
          href="/register"
          className="bg-blue-400 text-white py-3 px-6 rounded-md text-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up for Free Trial
        </Link>
      </div>
    </section>
  )
}
