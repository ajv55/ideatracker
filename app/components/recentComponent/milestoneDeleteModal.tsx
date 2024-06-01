'use client';
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setMilestoneDeleteModal } from "@/app/slices/milestoneSlice";

export default function MilestoneDeleteModal() {

    const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
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
        //   onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}
