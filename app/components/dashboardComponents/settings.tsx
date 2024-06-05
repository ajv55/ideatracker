'use client';
import { motion } from "framer-motion"
import {signOut,useSession} from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import Email from "next-auth/providers/email";
import toast from "react-hot-toast";
// import CancelModal from "./cancelModal";

type SettingProps = {
    closeOnClick?: () => void;
    arrowOnClick?: () => void
}

export default function Setting({closeOnClick, arrowOnClick}: SettingProps) {

    const {data: session, update} = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    });
    const [passwordData, setPasswordData] = useState({
      currentPassword: "",
      newPassword: "",
    });
    const [message, setMessage] = useState("");
    const [cancelModal, setCancelModel] = useState(false);
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handlePasswordChange = (e: any) => {
      const { name, value } = e.target;
      setPasswordData({ ...passwordData, [name]: value });
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        update({name: formData.name, email: formData.email });
        toast.success('Successfully updated your user settings');
      } catch (error) {
        console.error('error occur when updating user settings', error)
      }
    };


  
    const handlePasswordSubmit = async (e: any) => {
      e.preventDefault();
      try {
         const res = await axios.post("/api/updatePassword", passwordData).then((res) => {
          console.log(res?.data?.status)
          if(res?.data?.status === 200){
            toast.success('Successfully updated password')
          }
          if(res?.data?.status === 401){
            toast.error('Passwords do not match')
          }
          if(res?.data?.status === 400){
            toast.error('Current and new password required')
          }
         });
      } catch (error) {
        setMessage("Error updating password");
      }
    };

    

    if(!session) {
        router.push('/')
    }


  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      exit={{ x: '-100%' }}
      className="w-full z-20 overflow-y-auto rounded-2xl h-full bg-slate-200 p-6"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-wide">Settings</h1>
        <div className="w-full flex flex-col gap-4 p-4 bg-white shadow rounded-lg">
          <div className="flex items-center gap-4">
            <FaUser size={25} className="text-gray-600" />
            <h3 className="text-2xl lg:text-xl font-bold tracking-wide">Account</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 rounded-lg h-9 outline-teal-500 w-full"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 rounded-lg h-9 outline-teal-500 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 rounded-xl text-white py-2 px-4">
              Update Profile
            </button>
          </form>
        </div>
        
        <div className="w-full flex flex-col gap-4 p-4 bg-white shadow rounded-lg mt-4">
          <h3 className="text-2xl lg:text-xl font-bold tracking-wide">Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-lg h-9 outline-teal-500 w-full"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded-lg h-9 outline-teal-500 w-full"
              />
            </div>
            <button type="submit" className="bg-red-500 rounded-xl text-white py-2 px-4">
              Change Password
            </button>
          </form>
        </div>
        
        <div className="w-full flex justify-center mt-6">
          <Link className="rounded-lg text-center text-3xl font-medium tracking-wide text-teal-100 bg-gradient-to-bl from-slate-950 via-slate-700 to-slate-950 w-full py-3" href='/signOut'>
              Sign Out
          </Link>
        </div>
      </div>
    </motion.div>
  )
}