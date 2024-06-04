'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {format} from 'date-fns';
import BarSkeleton from '../skeleton/barSkeleton';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const IdeasByStatus: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchIdeas = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/getAll'); // Update with your actual API endpoint
      if (response.status === 201) {
        setIdeas(response.data);
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const statusCounts = ideas.reduce(
    (acc, idea) => {
      acc[idea.status]++;
      return acc;
    },
    { OPEN: 0, IN_PROGRESS: 0, COMPLETED: 0 }
  );

  const barData = {
    labels: ['Open', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Ideas by Status',
        data: [statusCounts.OPEN, statusCounts.IN_PROGRESS, statusCounts.COMPLETED],
        backgroundColor: ['#031f7dd0', '#60A5FA', '#34D399'],
        borderColor: '#338ef5',
      },
    ],
  };

  return (
    <div className="lg:w-[55%] w-full relative lg:p-6 p-2">
      {isLoading && <BarSkeleton /> }
        {ideas.length === 0 && <h1 className=' text-5xl absolute flex justify-center items-center z-30 bg-slate-100 rounded-2xl text-center text-balance shadow-lg shadow-zinc-900  w-[95%] h-full'>Add ideas to see analytics</h1>}
      <h2 className="text-3xl font-semibold mb-6">Ideas by Status</h2>
      <div className="bg-white p-4 w-full lg:w-full flex justify-center items-center h-[15rem] lg:h-[25rem] rounded-lg shadow-lg shadow-zinc-900 mb-6">
        <Bar data={barData} />
      </div>
      <div className="w-full border  ">
        <div className="bg-white w-full p-6 rounded-lg overflow-x-scroll  shadow-zinc-900  shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Detailed Status Table</h3>
          <table className="w-full overflow-scroll text-sm text-left rtl:text-right text-teal-500 dark:text-zinc-900">
            <thead className='text-md text-gray-300 uppercase bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950  dark:text-white'>
              <tr>
                <th className="py-2 px-1">Title</th>
                <th className="py-2 px-1">Description</th>
                <th className="py-2 px-1">Category</th>
                <th className="py-2 px-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr className='odd:bg-white text-white odd:dark:bg-gray-600 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700' key={idea.id}>
                  <td className="border lg:px-4 px-2 py-2">{idea.title}</td>
                  <td className="border lg:px-4 px-2 py-2">{idea.description}</td>
                  <td className="border lg:px-4 px-2 py-2">{idea.category}</td>
                  <td className="border lg:px-4 px-2 py-2">{idea.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IdeasByStatus;
