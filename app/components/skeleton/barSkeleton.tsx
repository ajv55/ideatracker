import React from 'react'

export default function BarSkeleton() {
  return (
    
<div role="status" className="max-w-3xl p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
    <div className="flex items-baseline mt-4">
        <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
        <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
        <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>

  )
}
