import React from 'react';

const SkeletonTable = () => {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {Array(3).fill('').map((_, index) => (
                <th key={index} className="px-6 py-3 bg-gray-200">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(3).fill('').map((_, rowIndex) => (
              <tr key={rowIndex} className="bg-white divide-y divide-gray-200">
                {Array(3).fill('').map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;
