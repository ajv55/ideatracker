'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { setMilestoneModal, setMilestoneList, setMilestoneIsLoading } from '@/app/slices/milestoneSlice';
import MilestoneModal from '@/app/components/recentComponent/milestoneModal';
import { AnimatePresence, motion } from "framer-motion";
import IdeaListSkeleton from '@/app/components/skeleton/ideaListSkeleton';


interface Milestone {
  id: number;
  title: string;
  description: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const category = searchParams.get('category');
  const tags = searchParams.get('tags');
  const status = searchParams.get('status');
  const id = searchParams.get('id');

  const milestoneModalIsOpen = useSelector((state: RootState) => state.milestone.milestoneModal);
  const milestoneList = useSelector((state: RootState) => state.milestone.milestoneList);
  const milestoneIsLoading = useSelector((state: RootState) => state.milestone.milestoneIsLoading);
  const dispatch = useDispatch();


  const [newMilestone, setNewMilestone] = useState({ title: '', description: '' });
  const [expandedIdea, setExpandedIdea] = useState('');


  const getMilestones = async () => {
    dispatch(setMilestoneIsLoading(true))
    await axios.get(`/api/getMilestone?id=${id}`).then((res: any) => {
      if(res.status === 201) {
        dispatch(setMilestoneList(res?.data))
      }
    })
    dispatch(setMilestoneIsLoading(false))
  }

  

  useEffect(() => {
    getMilestones();
  }, [])

  const handleOpenAISuggestion = async (type: string) => {
    try {
      const response = await axios.post('/api/openai/suggest', { type, content: type === 'milestone' ? newMilestone : expandedIdea });
      const suggestion = response.data.suggestion;
      if (type === 'milestone') {
        setNewMilestone({ ...newMilestone, description: suggestion });
      } else {
        setExpandedIdea(expandedIdea + '\n' + suggestion);
      }
    } catch (error) {
      console.error('Error getting OpenAI suggestion', error);
    }
  };

  console.log(milestoneList)


  return (
    <div className="flex flex-col relative items-center w-full h-screen overflow-scroll p-4 bg-gray-100">
      <AnimatePresence>{milestoneModalIsOpen && <MilestoneModal id={id!} />}</AnimatePresence>
      <div className="bg-gradient-to-r from-slate-950 to-teal-500 text-white w-full p-8 rounded-lg shadow-lg mb-8">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-lg">{description }</p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4">
          <p className="text-md"><strong>Category:</strong> {category}</p>
          <p className="text-md"><strong>Tags:</strong> {tags}</p>
          <p className={`text-md font-semibold ${status === 'OPEN' ? 'text-yellow-300' : status === 'IN_PROGRESS' ? 'text-blue-300' : 'text-green-300'}`}>
            <strong>Status:</strong> {status}
          </p>
        </div>
      </div>

      <div className="bg-white w-full md:w-2/3 lg:w-full p-8 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Milestones</h3>
          <button
            onClick={() => dispatch(setMilestoneModal(true))}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            New Milestone
          </button>
        </div>
        <ul className="space-y-4 mb-4">
          {milestoneIsLoading && <IdeaListSkeleton />}
          {milestoneList?.length === 0 && <h1>No milestone added yet.</h1>}
          {!milestoneIsLoading && milestoneList?.map((milestone: Milestone) => (
            <li key={milestone.id} className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold">{milestone.title}</h4>
              <p>{milestone.description}</p>
            </li>
          ))}
        </ul>
        
      </div>

      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Expand Your Idea</h3>
        <textarea
          value={expandedIdea}
          onChange={(e) => setExpandedIdea(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Expand your idea here"
        />
        <button
          onClick={() => handleOpenAISuggestion('expansion')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          AI Suggestion
        </button>
      </div>
    </div>
  );
}
