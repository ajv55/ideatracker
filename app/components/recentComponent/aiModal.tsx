'use client';
import { setAiModal } from "@/app/slices/milestoneSlice";
import { RootState } from "@/app/store";
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";

export default function AiModal() {

    const isAiModalOpen = useSelector((state: RootState) => state.milestone.aiModal);
    const dispatch = useDispatch();

  return (
   <div className="fixed inset-0 bg-gray-500 bg-opacity-10 flex justify-center items-center z-20">
     <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{duration: 0.5, type: 'spring', stiffness: 80}} exit={{ opacity: 0, scale: 0.8 }} className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Expand Your Idea</h3>
        <textarea
        //   value={expandedIdea}
        //   onChange={(e) => setExpandedIdea(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Expand your idea here"
        />
        <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => dispatch(setAiModal(false))}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          Cancel
        </button>
        <button
        //   onClick={() => handleOpenAISuggestion('expansion')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          AI Suggestion
        </button>
        </div>
      </motion.div>
   </div>
  )
}


