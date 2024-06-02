import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store';
import { setEditModal, setMilestoneIsLoading, setMilestoneList } from '@/app/slices/milestoneSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Milestone {
    id: string;
    title: string;
    description: string;
    createdAt: string;
  }

  interface MilestoneEditModalProps {
    id?: string;
    ideaId?: string
  }

export default function EditMilestoneModal({id, ideaId}: MilestoneEditModalProps) {

    const dispatch = useDispatch();
    const milestoneList = useSelector((state: RootState) => state.milestone.milestoneList as Milestone[]);

    const matchedMilestone = milestoneList?.find((ml: Milestone) => ml?.id === id) as Milestone | undefined;


    const [title, setTitle] = useState(matchedMilestone?.title || '');
    const [description, setDescription] = useState(matchedMilestone?.description || '');

  useEffect(() => {
    if (matchedMilestone) {
      setTitle(matchedMilestone.title);
      setDescription(matchedMilestone.description);
    }
  }, [matchedMilestone]);

  const getMilestones = async () => {
    dispatch(setMilestoneIsLoading(true))
    await axios.get(`/api/getMilestone?id=${ideaId}`).then((res: any) => {
      if(res.status === 201) {
        dispatch(setMilestoneList(res?.data))
      }
    })
    dispatch(setMilestoneIsLoading(false))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('id:', id, 'match: ', matchedMilestone)
    try {
      await axios.put('/api/updateMilestone', {id: matchedMilestone?.id, title, description}).then((res: any) => {
        console.log(res)
        if(res.status === 201) {
            toast.success('Successfully edit milestone')
        }
      });
      dispatch(setEditModal(false));
      getMilestones();
    } catch (error) {
      console.error('Error updating milestone:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex justify-center items-center z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, type: 'spring', stiffness: 80 }} 
        exit={{ opacity: 0, scale: 0.8 }} 
        className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-semibold mb-4">Edit Milestone</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter milestone title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter milestone description"
              required
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
              type="button"
              onClick={() => dispatch(setEditModal(false))}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Update Milestone
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
