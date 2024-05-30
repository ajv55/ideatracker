'use client';
import React, { ChangeEvent, FormEvent, useState, useRef } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const ref = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await axios.post('/api/reg', {formData}).then((res: any) => {
      if(res?.data.status === 201){
        setFormData({ name: '', email: '', password: '' });  // Reset the state
        ref?.current?.reset();  // Reset the form
        return toast.success(`You've successfully registered`)
      }
      if(res?.data.status === 401){
        return toast.error(res?.data?.error)
      }
    });
   
  };


  return (
    <div className=" bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950 w-full h-screen flex flex-col justify-start items-center ">
      <Link className='text-xl hover:underline hover:underline-offset-[4px] p-2 lg:mb-20 mb-10 w-full self-end text-white' href='/'>Home</Link>
    <div className="w-full px-4">
      <h2 className="text-6xl font-medium tracking-wider text-white text-center mb-8">Register</h2>
      <form ref={ref} onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Your Password"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
