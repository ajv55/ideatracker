'use client';
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import {signIn, useSession} from 'next-auth/react'
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const [data, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...data, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
        console.log('this is where we are going to signin')
      signIn('credentials', {...data, redirect: false}).then((callback) => {
          if(callback?.error) {
              toast.error(callback.error)
          }

          if(callback?.ok && !callback?.error) {
              router.push('/')
              toast.success('you have successfully logged in')
          }
      })

      ref.current?.reset()
  
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br flex justify-center items-center from-slate-950 via-slate-800 to-slate-950 py-12">
      <div className="w-[64%] px-4">
        <h2 className="text-7xl text-white tracking-wider font-medium text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex justify-center items-center flex-col bg-white h-[23rem] p-8 shadow-lg rounded-lg">
          <div className="mb-6 w-full">
            <label htmlFor="email" className="block text-gray-700  font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg  text-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Your Password"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-600 text-xl text-white px-4 py-2 rounded-lg hover:bg-cyan-800 drop-shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
