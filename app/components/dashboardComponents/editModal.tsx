'use client';
import { setIdeasList, setIsEditOpen, setIsLoading } from "@/app/slices/ideaSlice";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import {  useDispatch, useSelector } from "react-redux";

interface Idea {
    id: number;
  title: string;
  description: string;
  tags?: string;
  createdAt?: Date;
  category?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
}

interface EditModalProps {
    handleEdit?: () => void,
    onClose?: () => void,
    editIdea?: Idea,
}

export default function EditModal({ onClose, editIdea}: EditModalProps) {

    const [formData, setFormData] = useState({
        id: editIdea?.id,
        title: editIdea?.title,
        description: editIdea?.description,
        category: editIdea?.category,
        tags: editIdea?.tags,
        status: editIdea?.status,
      });

      const dispatch = useDispatch();

      console.log(formData);

      const getAllIdeas = async () => {
        dispatch(setIsLoading(true))
        await axios.get('/api/getAll').then((res: any) => {
          if(res.status === 201){
            dispatch(setIdeasList(res?.data))
          }
        }).finally(() => dispatch(setIsLoading(false)))
      }

      const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(`Edit idea with id: ${formData?.id}`);
        await axios.put('/api/updateIdea', {id: formData?.id, formData: formData}).then((res: any) => {
          if(res.status === 201) {
            getAllIdeas();
            dispatch(setIsEditOpen(false));
            toast.success('Successfully updated this idea')
          }
        })
        
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      }

  return (
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{duration: 0.5, type: 'spring', stiffness: 80}} exit={{ opacity: 0, scale: 0.8 }} className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Idea</h2>
      <form onSubmit={handleEdit} >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Innovation">Innovation</option>
            <option value="Improvement">Improvement</option>
            <option value="Research">Research</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter tags separated by commas"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </motion.div>
  </div>
  )
}
