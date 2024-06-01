'use client';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setMilestoneDeleteModal, setMilestoneIsLoading, setMilestoneList } from "@/app/slices/milestoneSlice";
import axios from "axios";
import { RootState } from "@/app/store";
import toast from "react-hot-toast";

interface MilestoneDeleteModalProps {
    id?: number,
    ideaId?: number,
}

interface Milestone {
    id: number; // or number, based on your actual data type
    title: string;
    description: string;
    createdAt: string;
  }


export default function MilestoneDeleteModal({id, ideaId}: MilestoneDeleteModalProps) {

    const dispatch = useDispatch();
    const milestoneList = useSelector((state: RootState) => state?.milestone?.milestoneList);

    console.log('id: ', id);

    const matchedMilestone = milestoneList?.find((ml: Milestone) => ml?.id === id) as Milestone | undefined;
    const matchingId = matchedMilestone?.id;
    console.log(matchingId);

    const getMilestones = async () => {
        dispatch(setMilestoneIsLoading(true))
        await axios.get(`/api/getMilestone?id=${ideaId}`).then((res: any) => {
          if(res.status === 201) {
            dispatch(setMilestoneList(res?.data))
          }
        })
        dispatch(setMilestoneIsLoading(false))
      }
    


    const handleDelete = async () => {
        await axios.delete(`/api/deleteMilestone?milestoneId=${matchingId}`).then((res: any) => {
            console.log(res)
            if(res.status === 201){
                toast.success('Successfully delete the milestone');
                dispatch(setMilestoneDeleteModal(false))
                getMilestones();
            }
        })
    }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex justify-center items-center z-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{duration: 0.5, type: 'spring', stiffness: 80}}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Delete Milestone</h2>
        <p className="mb-4">Are you sure you want to delete this milestone? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => dispatch(setMilestoneDeleteModal(false))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
          onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}
