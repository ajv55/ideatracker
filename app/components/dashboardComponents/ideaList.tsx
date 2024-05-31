'use client';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import IdeaSubmission from './submission';
import axios from 'axios';
import IdeaListSkeleton from '../skeleton/ideaListSkeleton';

type Idea = {
  id: number;
  title: string;
  description: string;
  createdAt?: Date;
  category?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
};


const IdeaList: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [filterStatus, setFilterStatus] = useState<'all' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED'>('all');
  const [sortKey, setSortKey] = useState<'title' | 'dateCreated'>('dateCreated');
  const [isOpen, setIsOpen] = useState<boolean>(false);
 
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as 'all' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED');
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as 'title' | 'dateCreated');
  };

  const handleEdit = (id: number) => {
    // Handle edit action here
    console.log(`Edit idea with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    setIdeas(prevIdeas => prevIdeas.filter(idea => idea.id !== id));
  };

  const getAllIdeas = async () => {
    setIsLoading(true)
    await axios.get('/api/getAll').then((res: any) => {
      if(res.status === 201){
        setIdeas(res?.data)
      }
    }).finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getAllIdeas();
  }, [])

  console.log(ideas)

  const filteredIdeas = ideas.filter(idea => filterStatus === 'all' || idea.status === filterStatus);
  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortKey === 'title') {
      return a?.title.localeCompare(b?.title);
    } else {
      return new Date(b?.createdAt!).getTime() - new Date(a?.createdAt!).getTime();
    }
  });

  return (
    <div className="bg-white w-[85%] p-6 rounded-lg shadow-zinc-900 shadow-md">
      <AnimatePresence>{isOpen && <IdeaSubmission onClick={() => setIsOpen(false)} />}</AnimatePresence>
      <h2 className="text-2xl font-semibold mb-4">Your Ideas</h2>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-lg p-2"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select
            className="border border-gray-300 rounded-lg p-2"
            value={sortKey}
            onChange={handleSortChange}
          >
            <option value="dateCreated">Date Created</option>
            <option value="title">Title</option>
          </select>
        </div>
        <button onClick={() => setIsOpen(true)} className=" bg-gradient-to-bl from-teal-800 via-slate-800 to-teal-800 text-white px-4 py-2 rounded-lg">New Idea</button>
      </div>
      <ul className="space-y-4">
        {isLoading && <IdeaListSkeleton />}
        {sortedIdeas.map(idea => (
          <li key={idea.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{idea.title}</h3>
              <p className="text-gray-600">{idea.description}</p>
              <p className="text-gray-400 text-sm">{format(new Date(idea?.createdAt!), 'PPP')}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  idea.status === 'OPEN' ? 'bg-yellow-100 text-yellow-800' :
                  idea.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}
              >
                {idea.status}
              </span>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded-lg"
                onClick={() => handleEdit(idea.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-lg"
                onClick={() => handleDelete(idea.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaList;

