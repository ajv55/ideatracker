'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

type IdeaSubmissionProps = {
  onClick?: () => void;
}

export default function IdeaSubmission({onClick}: IdeaSubmissionProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: ''

  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/postIdeas', formData).then((res) => {
        if(res?.status === 201 ) {
          toast.success('Successfully added your idea 💡')
          setFormData({
            title: '',
            description: '',
            category: '',
            tags: ''
          })
        };

        if(res?.data?.status === 401) {
          toast.error(res?.data?.error);
        }
      });
      
    } catch (error) {
      console.error('Error submitting idea:', error);
    }
  };

  return (
    <motion.div initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 100}} transition={{duration: 0.5, stiffness: 80, type: 'spring'}} className="bg-white absolute top-0 left-[30%] mt-32 w-[45%] h-content p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Submit a New Idea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter idea title"
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
            placeholder="Enter idea description"
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
        <div className="text-center">
        <button
           type='button'
           onClick={onClick}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Submit Idea
          </button>
        </div>
      </form>
    </motion.div>
  );
}
