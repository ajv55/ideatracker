import React from 'react'

export default function AboutHeader() {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-12 bg-white shadow-lg rounded-lg">
      <section className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-lg sm:text-xl text-gray-600">
          At <span className="font-semibold">IdeaTracker+</span>, our mission is to empower individuals and teams by providing a seamless platform to harness their creativity and innovation. We believe that every idea has the potential to make a significant impact, and our goal is to ensure that no idea gets lost or forgotten.
        </p>
      </section>
      <section>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">Key Features</h2>
        <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26c.86.57 1.95.57 2.81 0L21 8m-18 8l7.89 5.26c.86.57 1.95.57 2.81 0L21 16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Capture Ideas Instantly</h3>
            <p className="text-gray-600">
              Easily jot down your ideas on-the-go with our user-friendly interface. Whether you’re using a smartphone, tablet, or desktop, IdeaTracker+ makes it simple to capture your thoughts as they come.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4m16 0c0-4.418-3.582-8-8-8S4 7.582 4 12m16 0c0 4.418-3.582 8-8 8s-8-3.582-8-8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Organize with Tags and Categories</h3>
            <p className="text-gray-600">
              Sort your ideas with customizable tags and categories. This way, you can quickly find and manage your ideas based on themes, projects, or priorities.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h5m4 4H7m10-4H7m10 0H7m4 4h3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborate and Share</h3>
            <p className="text-gray-600">
              Work together with your team by sharing ideas and collaborating in real-time. Our platform supports seamless sharing and collaboration features, making it easy to brainstorm and develop ideas collectively.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
