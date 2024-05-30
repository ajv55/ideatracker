'use client'; 
import { useSession } from "next-auth/react";

interface WelcomeSectionProps {
  recentActivity?: string; // Replace with actual type if you have a structured activity data
}

const Welcome: React.FC<WelcomeSectionProps> = ({  recentActivity }) => {
    const {data: session } = useSession();

    const userName = session?.user?.name

  return (
    <div className="bg-gradient-to-r from-slate-950 to-teal-500 text-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">Welcome back, {userName?.toUpperCase()}!</h1>
        <p className="text-lg">Here&#39;s a summary of your recent activity:</p>
      </div>
      <div className="bg-white text-gray-800 p-4 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-2">Recent Activity</h2>
        <p>{recentActivity}</p>
      </div>
    </div>
  );
};

export default Welcome;
