import React from 'react'

export default function How() {
  return (
    <div>
    {/* Other sections */}
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="lg:text-6xl text-5xl font-extrabold text-gray-900 text-center">How It Works</h2>
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white">
                <svg className="h-8 w-8 lg:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 6V3H6v18m0-18L18 9" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl leading-6 font-medium text-gray-900">Capture Your Ideas</h3>
              <p className="mt-2 text-lg text-gray-500">Use our intuitive interface to quickly jot down your thoughts and ideas.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16  rounded-md bg-indigo-500 text-white">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl leading-6 font-medium text-gray-900">Expand with OpenAI</h3>
              <p className="mt-2 text-lg text-gray-500">Let OpenAI analyze and suggest expansions, giving your ideas more depth and clarity.</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-16 w-16  rounded-md bg-indigo-500 text-white">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16M4 6v14a2 2 0 002 2h12a2 2 0 002-2V6M4 6L6 4m10 0L18 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl leading-6 font-medium text-gray-900">Organize and Share</h3>
              <p className="mt-2 text-lg text-gray-500">Organize your expanded ideas and share them with your team or friends for feedback and collaboration.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    {/* Other sections */}
  </div>
  )
}
