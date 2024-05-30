'use client';
import {signOut, useSession,} from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {  useEffect } from 'react';


export default function Page() {
    const {data: session, status} = useSession();
    const router = useRouter();

    const userName = session?.user?.name

    useEffect(() => {
        if (!session) {
            router.push('/')
        }
    }, [session, router]);

    const handleClick = () => {
        signOut();
    }


  return (
    <div className="min-h-screen bg-slate-700 flex justify-center items-center">
    <div className="bg-white w-[23rem] h-[32rem] lg:w-[45%] rounded-xl p-6 flex flex-col justify-center items-center shadow-lg">
        <h1 className="text-2xl lg:text-5xl font-bold text-center mb-6 tracking-wide text-slate-700">
            Are you sure you want to sign out?
        </h1>
        <h6 className="text-lg lg:text-2xl mb-8 text-gray-600">Bye, {userName?.toUpperCase()}!</h6>
        <button
            onClick={handleClick}
            className="w-full lg:w-[85%] py-3 bg-red-500 text-white rounded-lg text-xl lg:text-2xl font-semibold hover:bg-red-600 transition-colors"
        >
            Sign Out
        </button>
        <Link
            href='/'
            className="w-full lg:w-[85%] mt-3 lg:mt-3 py-3 bg-sky-500 text-center text-white rounded-lg text-xl lg:text-2xl font-semibold hover:bg-sky-600 transition-colors"
        >
            Cancel
        </Link>
    </div>
</div>
  )
}
