'use client';
import { motion } from "framer-motion"
import { useDispatch } from "react-redux";
import { setMilestoneIsLoading, setMilestoneList, setMilestoneModal } from "@/app/slices/milestoneSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface MilestoneModalProps {
  id?: string
}

export default function MilestoneModal({id}: MilestoneModalProps) {

    const dispatch = useDispatch();

    const [newMilestone, setNewMilestone] = useState({ title: '', description: '', id: id });

    const getMilestones = async () => {
      dispatch(setMilestoneIsLoading(true))
      await axios.get(`/api/getMilestone?id=${id}`).then((res: any) => {
        if(res.status === 201) {
          dispatch(setMilestoneList(res?.data))
        }
      })
      dispatch(setMilestoneIsLoading(false))
    }

    const addMilestone = async () => {
      await axios.post('/api/postMilestone', {newMilestone}).then((res) => {
        if(res.status === 201) {
          toast.success(`Successfully added a milestone`)
          setNewMilestone({
            title: '', description: '', id: id
          })
          dispatch(setMilestoneModal(false));
          getMilestones();
        };
      }).catch((res) => {
        console.log(res?.response);
        if(res?.response?.status === 401){
          toast.error(res?.response?.data?.error)
        }
      })
      
    }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{duration: 0.5, type: 'spring', stiffness: 80}} exit={{ opacity: 0, scale: 0.8 }} className="bg-white  lg:w-[55%] w-[96%] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Add a New Milestone</h3>
          <div className="mb-4">
            <label htmlFor="milestoneTitle" className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              id="milestoneTitle"
              name="title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter milestone title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="milestoneDescription" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="milestoneDescription"
              name="description"
              value={newMilestone.description}
              onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter milestone description"
              required
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <button
                onClick={addMilestone}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Add Milestone
            </button>
            <button
                onClick={() => dispatch(setMilestoneModal(false))}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Cancel
            </button>
          </div>
        </motion.div>
    </div>
  )
}
