'use client';
import React, { useEffect, useState } from 'react'
import IdeaCard from '../dashboardComponents/ideaCard'
import axios from 'axios';
import RecentSkeleton from '../skeleton/recentSkeleton';


export default function RecentList() {

    const [recentActivity, setRecentActivity] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

   
    const getIdeas = async () => {
        try {
          setIsLoading(true);
          await axios.get('/api/getIdeas').then((res) => {
            if(res?.status === 201) {
              setRecentActivity(res?.data)
              setIsLoading(false)
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
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-inner">
        {recentActivity.length === 0 ? <h2 className="text-2xl font-semibold mb-2">No Recent Activity</h2> : <h2 className="text-2xl font-semibold mb-2">Recent Activity</h2>}
        <ul className="divide-y divide-gray-200">
          {isLoading && <RecentSkeleton />}
          {recentActivity.map((activity: any, index) => {
            if(activity?.status === 'IN_PROGRESS') {
              return <li key={index} className="py-2">
                      <IdeaCard idea={activity} />
                    </li>
            }
})}
        </ul>
      </div>
  )
}






