'use client'; 
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IdeaCard from "./ideaCard";



const Welcome: React.FC = () => {

  const [recentActivity, setRecentActivity] = useState([]);
    const {data: session } = useSession();

    const userName = session?.user?.name

    const getIdeas = async () => {
      try {
        await axios.get('/api/getIdeas').then((res) => {
          if(res?.status === 201) {
            setRecentActivity(res?.data)
          }
        })
      } catch (error) {
        console.error('Error occurred when fetching ideas', error)
      }
    }

    useEffect(() => {
      getIdeas();
    } , [])


  return (
    <div className="bg-gradient-to-r from-slate-950 to-teal-500 text-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">Welcome back, {userName?.toUpperCase()}!</h1>
        <p className="text-lg">Here&#39;s a summary of your recent activity:</p>
      </div>
      <div className="bg-white text-gray-800 p-4 rounded-lg shadow-inner">
        {recentActivity.length === 0 ? <h2 className="text-2xl font-semibold mb-2">No Recent Activity</h2> : <h2 className="text-2xl font-semibold mb-2">Recent Activity</h2>}
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity: any, index) => {
            if(activity?.status === 'IN_PROGRESS') {
              return <li key={index} className="py-2">
              <IdeaCard idea={activity} />
            </li>
            }
})}
        </ul>
      </div>
    </div>
  );
};

export default Welcome;
