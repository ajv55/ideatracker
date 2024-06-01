'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { setMilestoneModal, setMilestoneList, setMilestoneIsLoading, setMilestoneDeleteModal, setAiModal } from '@/app/slices/milestoneSlice';
import MilestoneModal from '@/app/components/recentComponent/milestoneModal';
import { AnimatePresence, motion } from "framer-motion";
import IdeaListSkeleton from '@/app/components/skeleton/ideaListSkeleton';
import { format } from 'date-fns';
import MilestoneDeleteModal from '@/app/components/recentComponent/milestoneDeleteModal';
import AiModal from '@/app/components/recentComponent/aiModal';


interface Milestone {
  id: number;
  title: string;
  description: string;
  createdAt?: string
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
  const milestoneDeleteModalIsOpen = useSelector((state: RootState) => state.milestone.milestoneDeleteModal);
  const milestoneList = useSelector((state: RootState) => state.milestone.milestoneList);
  const milestoneIsLoading = useSelector((state: RootState) => state.milestone.milestoneIsLoading);
  const isAiModalOpen = useSelector((state: RootState) => state.milestone.aiModal);
  const dispatch = useDispatch();


  const [newMilestone, setNewMilestone] = useState({ title: '', description: '' });
  const [expandedIdea, setExpandedIdea] = useState('');
  const [milestoneId, setMilestoneId] = useState(0);


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

  const handleDeleteMilestone = async (id: string) => {
    console.log(id)
  };

  console.log('tags: ', isAiModalOpen)


  return (
    <div className="flex flex-col relative  items-center w-full h-screen overflow-scroll p-2 bg-gray-100">
      <AnimatePresence>
        {milestoneModalIsOpen && <MilestoneModal id={id!} />}
        {milestoneDeleteModalIsOpen && <MilestoneDeleteModal ideaId={id as any} id={milestoneId}/>}
        {isAiModalOpen && <AiModal />}
        </AnimatePresence>
      <div className="bg-gradient-to-r from-slate-950 to-teal-500 text-white flex flex-col justify-start items-center w-full p-2 rounded-lg shadow-lg mb-8">
        <div className='w-full flex justify-end items-end  h-content'>
          <button onClick={() => dispatch(setAiModal(true))} className='text-xl px-2.5 py-3 rounded-2xl w-[14%] bg-gradient-to-r from-teal-800 via-slate-800 to-slate-900 hover:from-slate-950 hover:via-slate-800 hover:bg-teal-800 text-center tracking-wide font-medium'>AI Suggestion</button>
        </div>
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
            <li key={milestone.id} className="bg-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center">
              
            <div>
              <h4 className="text-xl font-bold">{milestone.title}</h4>
              <p>{milestone.description}</p>
              <p className="text-sm text-gray-600">Created at: {format(new Date(milestone?.createdAt!), 'PPP')}</p>
            </div>
            <button
              onClick={() => {dispatch(setMilestoneDeleteModal(true)); setMilestoneId(milestone?.id) }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </li>
          ))}
        </ul>
        
      </div>

      
    </div>
  );
}
