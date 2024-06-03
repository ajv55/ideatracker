import React from 'react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold mb-8">Choose Your Plan</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {/* Plan 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Basic</h2>
          <p className="text-xl mb-4">10 Credits</p>
          <p className="text-2xl font-bold mb-4">$10</p>
          <button
            // onClick={() => handlePurchase(10)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>
        {/* Plan 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Standard</h2>
          <p className="text-xl mb-4">25 Credits</p>
          <p className="text-2xl font-bold mb-4">$20</p>
          <button
            // onClick={() => handlePurchase(25)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>
        {/* Plan 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Premium</h2>
          <p className="text-xl mb-4">50 Credits</p>
          <p className="text-2xl font-bold mb-4">$35</p>
          <button
            // onClick={() => handlePurchase(50)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>
        {/* Plan 4 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-3xl font-bold mb-4">Ultimate</h2>
          <p className="text-xl mb-4">100 Credits</p>
          <p className="text-2xl font-bold mb-4">$60</p>
          <button
            // onClick={() => handlePurchase(100)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  )
}
