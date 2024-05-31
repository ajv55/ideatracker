'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface IdeaChartProps {
  ideas: Idea[];
}

const IdeaChart: React.FC = () => {

    const [ideas, setIdeas] = useState<Idea[]>([])

    const getIdeas = async () => {
        await axios.get('/api/getAll').then((res: any) => {
            console.log(res)
            if(res.status === 201) {
                setIdeas(res?.data)
            }
        })
    }

    useEffect(() => {
        getIdeas();
    }, [])
  // Group ideas by status
  const ideaStatusCounts = ideas.reduce(
    (acc, idea) => {
      acc[idea.status] = (acc[idea.status] || 0) + 1;
      return acc;
    },
    { OPEN: 0, IN_PROGRESS: 0, COMPLETED: 0 }
  );

  const data = {
    labels: ['Open', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Number of Ideas',
        data: [
          ideaStatusCounts.OPEN,
          ideaStatusCounts.IN_PROGRESS,
          ideaStatusCounts.COMPLETED,
        ],
        backgroundColor: ['#ffcd56', '#36a2eb', '#4bc0c0'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ideas by Status',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-4xl font-semibold mb-4">Ideas by Status</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default IdeaChart;
