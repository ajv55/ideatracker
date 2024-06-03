'use client';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setAiModal, setSuggestionLog, setCurrentCredits  } from "@/app/slices/milestoneSlice"; // Assuming you have a slice for handling modals
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RootState } from "@/app/store";
import { setIdeaCredit } from "@/app/slices/ideaSlice";

interface AISuggestionModalProps {
    title?: string,
    description?: string,
    id?: string
}


export default function AISuggestionModal({title, description, id}: AISuggestionModalProps) {
  const dispatch = useDispatch();
  const ideaCredit = useSelector((state: RootState) => state.idea.ideaCredit!);
  const { data: session, update} = useSession();

  const userId = session?.user?.id

  const userCredits = session?.user?.credit!

  const router = useRouter();

  

  console.log('ideaCredit: ', ideaCredit)

  const getSuggestionLogs = async () => {
    await axios.get(`/api/getSuggestion?id=${id}`).then((res: any) => {
      if(res.status === 201){
        dispatch(setSuggestionLog(res?.data))
      }
    })
  }


  const getAiSuggestion = async () => {
    await axios.post('/api/getAISuggestion', {title, description, id}).then(async (res: any) => {
       console.log(res)
       if(res.status === 201) {
         toast.success('Suggestion added to your log');
         getSuggestionLogs();
         dispatch(setAiModal(false)); 
        const newCredits = userCredits - 1;
        const ideaNewCredits = Number(ideaCredit) - 1;
        const toStringCredit = ideaNewCredits.toString()
        console.log(toStringCredit)
        // await axios.put('/api/updateCredit', {userId, ideaNewCredits}).then((res: any) => {
        //   if(res.status === 201){
        //     console.log(res)
        //   }
        // })
        await axios.put('/api/credit', {toStringCredit, userId}).then(async (res: any) => {
          console.log(res)
          if(res.status === 201) {
            console.log(res)
            dispatch(setIdeaCredit(res?.data?.ideaCredit))
          }
        })
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
        <h2 className="text-2xl font-semibold mb-4">AI Suggestion Confirmation</h2>
        <p className="mb-4">Are you sure you want to use an AI suggestion? This will cost you 1 credit.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => dispatch(setAiModal(false))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={getAiSuggestion}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  )
}

