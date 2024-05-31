'use client';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

interface IdeaChartProps {
  ideas: Idea[];
}

const IdeaCategoryChart: React.FC = () => {
  const categoryCounts: { [key: string]: number } = {};
  const [ideas, setIdeas] = useState<Idea[]>([]);

  const getIdeas = async () => {
    try {
        await axios.get('/api/getAll').then((res) => {
            console.log(res);
            if(res?.status === 201) {
                setIdeas(res?.data)
            }
        })
    } catch (error) {
        console.error('error occurred when fetch ideas', error)
    }
  };

  useEffect(() => {
    getIdeas();
  }, [])

  ideas.forEach(idea => {
    if (categoryCounts[idea.category]) {
      categoryCounts[idea.category]++;
    } else {
      categoryCounts[idea.category] = 1;
    }
  });

  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Category Distribution',
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#091b6cd6', // Red
          '#FBBF24', // Yellow
          '#34D399', // Green
          '#60A5FA', // Blue
          '#A78BFA', // Purple
          '#FB923C', // Orange
        ],
        borderColor: '#3397f5',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 24 // Adjust the font size here
          }
        }
      }
    }
  };

  return (
    <div className="bg-white border w-[43%] h-[33rem] flex flex-col justify-start items-start p-5 rounded-lg shadow">
      <h2 className="text-4xl font-semibold mb-4">Category Distribution</h2>
      <Pie className='p-12' options={options} data={data} />
    </div>
  );
};

export default IdeaCategoryChart;
