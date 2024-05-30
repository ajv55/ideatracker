'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';

type Idea = {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
  status: 'pending' | 'in progress' | 'completed';
};

const ideasMock: Idea[] = [
  {
    id: 1,
    title: 'New Marketing Strategy',
    description: 'Develop a new strategy for social media marketing.',
    dateCreated: '2023-05-01',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Product Launch Plan',
    description: 'Outline the steps for the upcoming product launch.',
    dateCreated: '2023-04-25',
    status: 'in progress',
  },
  {
    id: 3,
    title: 'Website Redesign',
    description: 'Redesign the company website for better user experience.',
    dateCreated: '2023-03-15',
    status: 'completed',
  },
];

const IdeaList: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>(ideasMock);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in progress' | 'completed'>('all');
  const [sortKey, setSortKey] = useState<'title' | 'dateCreated'>('dateCreated');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as 'all' | 'pending' | 'in progress' | 'completed');
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as 'title' | 'dateCreated');
  };

  const filteredIdeas = ideas.filter(idea => filterStatus === 'all' || idea.status === filterStatus);
  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortKey === 'title') {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
  });

  return (
    <div className="bg-white w-[45%] p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Ideas</h2>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 rounded-lg p-2"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">New Idea</button>
      </div>
      <ul className="space-y-4">
        {sortedIdeas.map(idea => (
          <li key={idea.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{idea.title}</h3>
              <p className="text-gray-600">{idea.description}</p>
              <p className="text-gray-400 text-sm">{format(new Date(idea.dateCreated), 'PPP')}</p>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                idea.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                idea.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}
            >
              {idea.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IdeaList;
