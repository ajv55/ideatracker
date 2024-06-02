'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSuggestionIsLoading, setSuggestionLog } from '@/app/slices/milestoneSlice';
import { RootState } from '@/app/store';
import SuggestionSkeleton from '../skeleton/suggestionSkeleton';

interface SuggestionProps {
  id?: string
}

const Suggestion = ({id}: SuggestionProps) => {

  const suggestionLogs = useSelector((state: RootState) => state.milestone.suggestionLog);
  const isSuggestionLoading = useSelector((state: RootState) => state.milestone.suggestionIsLoading);

  const dispatch = useDispatch();

  console.log(isSuggestionLoading)

  useEffect(() => {
    // Fetch AI suggestion logs for the current user
    const fetchSuggestionLogs = async () => {
      try {
        dispatch(setSuggestionIsLoading(true))
        const response = await axios.get(`/api/getSuggestion?id=${id}`).then((res: any) => {
          console.log(res);
          dispatch(setSuggestionLog(res?.data))
        });
        dispatch(setSuggestionIsLoading(false))
      } catch (error) {
        console.error('Error fetching AI suggestion logs:', error);
      }
    };

    fetchSuggestionLogs();
  }, []);

  console.log(suggestionLogs)

  return (
    <div className="bg-white w-[47%] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">AI Suggestions</h2>
      <div className="divide-y  divide-gray-200">
        {isSuggestionLoading && <SuggestionSkeleton />}
        {suggestionLogs?.map((log: any) => (
          <div key={log?.id} className="py-4">
            <div className="flex justify-between">
              <p className="text-gray-500">{new Date(log?.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-gray-600 mt-2">{log?.response}</p>
          </div>
        ))}
        {!isSuggestionLoading && suggestionLogs?.length === 0 && (
          <p className="text-gray-500">No AI suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default Suggestion;
