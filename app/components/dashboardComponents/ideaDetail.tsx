// components/IdeaDetails.tsx

import React from 'react';




const IdeaDetails: React.FC = () => {

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">title goes here</h3>
      <p className="text-gray-700 mb-4">descriptions</p>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Tasks</h4>
        <ul className="list-disc list-inside">
          akdflkasjfasjf
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Notes</h4>
        <p className="text-gray-700">notes goes here</p>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default IdeaDetails;
