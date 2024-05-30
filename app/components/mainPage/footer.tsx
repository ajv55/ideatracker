import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className=" bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 text-white w-full py-10">
    <div className="w-full px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link className="text-xl font-bold" href="/">
            IdeaTracker+
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8 mb-4 md:mb-0">
          <Link className="hover:underline"  href="#features">Features</Link>
          <Link className="hover:underline" href="#how-it-works">How It Works</Link>
          <Link className="hover:underline" href="#testimonials">Testimonials</Link>
          <Link className="hover:underline" href="#contact">Contact</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="h-6 w-6 fill-current text-white hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.596 0 0 .592 0 1.326v21.348C0 23.407.596 24 1.325 24H12.81v-9.294H9.692V10.41h3.118V8.077c0-3.1 1.894-4.787 4.659-4.787 1.325 0 2.462.1 2.792.144v3.24h-1.915c-1.504 0-1.796.715-1.796 1.762v2.311h3.588l-.467 3.295h-3.121V24h6.116C23.403 24 24 23.407 24 22.674V1.326C24 .592 23.404 0 22.675 0z"/>
            </svg>
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="h-6 w-6 fill-current text-white hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.931 4.931 0 0 0 2.165-2.724 9.847 9.847 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.847 3c-2.724 0-4.932 2.208-4.932 4.932 0 .387.044.763.128 1.124-4.1-.205-7.728-2.172-10.156-5.16a4.924 4.924 0 0 0-.666 2.482c0 1.71.87 3.217 2.188 4.099a4.904 4.904 0 0 1-2.232-.617v.062c0 2.386 1.696 4.374 3.946 4.828a4.928 4.928 0 0 1-2.224.085c.626 1.956 2.444 3.379 4.6 3.419a9.868 9.868 0 0 1-6.11 2.106c-.397 0-.788-.023-1.175-.068A13.945 13.945 0 0 0 7.548 21c9.06 0 14.01-7.512 14.01-14.01 0-.214-.004-.428-.014-.64A9.936 9.936 0 0 0 24 4.557z"/>
            </svg>
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="h-6 w-6 fill-current text-white hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 2.12 3.86 1 2.5 1S0 2.12 0 3.5 1.12 6 2.5 6s2.48-1.12 2.48-2.5zM.32 24H4.68V7.98H.32V24zM8.98 7.98H13.3v2.2h.05c.6-1.13 2.08-2.2 4.28-2.2 4.58 0 5.42 3 5.42 6.93V24h-4.36v-7.92c0-1.89-.03-4.33-2.64-4.33-2.64 0-3.05 2.06-3.05 4.19V24H8.98V7.98z"/>
            </svg>
          </Link>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p>&copy; 2024 IdeaTracker+. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
