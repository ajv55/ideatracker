'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ProgressTracking = () => {
  const data = {
    labels: ['Idea 1', 'Idea 2', 'Idea 3', 'Idea 4'],
    datasets: [
      {
        label: 'Progress',
        data: [70, 50, 90, 30],
        backgroundColor: ['#3B82F6', '#EF4444', '#F59E0B', '#10B981'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const milestones = [
    { title: 'Milestone 1', date: '2024-06-01', progress: 60 },
    { title: 'Milestone 2', date: '2024-07-01', progress: 80 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
      
      <div className="mb-6">
        <Bar data={data} options={options} />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{milestone.title}</h4>
                <span className="text-gray-500">{milestone.date}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    milestone.progress >= 75
                      ? 'bg-green-500'
                      : milestone.progress >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${milestone.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
