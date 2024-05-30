'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AiExpansionProps  {
    selectedIdea?: string
}

const AiExpansion = ({ selectedIdea }: AiExpansionProps) => {
  const [aiSuggestions, setAiSuggestions] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ai-expand', { idea: selectedIdea });
      setAiSuggestions(response.data.suggestions);
      toast.success('AI suggestions generated successfully!');
    } catch (error) {
      toast.error('Failed to generate AI suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">AI Expansion</h2>
      <p className="mb-4">Generate AI-powered suggestions and enhancements for your idea.</p>
      <button
        onClick={handleGenerateSuggestions}
        className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate AI Suggestions'}
      </button>
      {aiSuggestions && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">AI Suggestions:</h3>
          <p>{aiSuggestions}</p>
        </div>
      )}
    </div>
  );
};

export default AiExpansion;
