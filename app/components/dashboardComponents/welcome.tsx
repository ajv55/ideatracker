'use client'; 
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IdeaCard from "./ideaCard";
import Link from "next/link";



const Welcome: React.FC = () => {

 
    const {data: session } = useSession();

    const userName = session?.user?.name

    


  return (
    <div className="bg-gradient-to-r from-slate-950 to-teal-500 text-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">Welcome back, {userName?.toUpperCase()}!</h1>
      </div>
      <p className="text-lg mb-4">
        We&#39;re thrilled to see you again! Your dedication and creativity are truly inspiring. Here&#39;s a look at your <Link href='/dashboard/recent' className="hover:underline hover:underline-offset-4 text-sky-200" >recent activity</Link>. Keep up the amazing work, and don&#39;t hesitate to share your new ideas. Remember, every great idea starts with a single thought. Let&#39;s turn those thoughts into reality!
      </p>
    </div>
  );
};

export default Welcome;
