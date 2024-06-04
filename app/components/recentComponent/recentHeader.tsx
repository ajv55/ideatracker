'use client';
import React, { useEffect, useState } from 'react'
import IdeaCard from '../dashboardComponents/ideaCard'
import axios from 'axios';
import RecentList from './recentLists';

export default function RecentHeader() {

    const [recentActivity, setRecentActivity] = useState([]);

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
    <div className="bg-gradient-to-r from-slate-900 to-teal-800 text-white w-full h-screen p-6 rounded-lg shadow-lg mb-6 overflow-scroll">
        <h1 className="text-4xl font-bold mb-2">Most Recent Activity</h1>
        <p className="text-lg mb-4">
          Welcome to your most recent activity page! Here you can find all your ideas that are currently in progress. Click on any idea to view its details and continue working on it.
        </p>
        <RecentList />
    </div>
  )
}
