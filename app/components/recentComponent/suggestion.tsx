import { useEffect, useState } from 'react';
import axios from 'axios';

const Suggestion = () => {
  const [suggestionLogs, setSuggestionLogs] = useState([]);

  useEffect(() => {
    // Fetch AI suggestion logs for the current user
    const fetchSuggestionLogs = async () => {
      try {
        const response = await axios.get('/api/getSuggestionLogs'); // Replace '/api/getSuggestionLogs' with your backend API endpoint to fetch suggestion logs
        setSuggestionLogs(response.data);
      } catch (error) {
        console.error('Error fetching AI suggestion logs:', error);
      }
    };

    fetchSuggestionLogs();
  }, []);

  return (
    <div className="bg-white w-[47%] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">AI Suggestions</h2>
      <div className="divide-y divide-gray-200">
        {/* {suggestionLogs.map((log) => (
          <div key={log.id} className="py-4">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">{log.idea.title}</p>
              <p className="text-gray-500">{new Date(log.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-gray-600 mt-2">{log.response}</p>
          </div>
        ))}
        {suggestionLogs.length === 0 && (
          <p className="text-gray-500">No AI suggestions available.</p>
        )} */}
      </div>
    </div>
  );
};

export default Suggestion;
