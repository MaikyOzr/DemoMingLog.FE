import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { JournalResponse, MoodEnum } from '../types/journal';
import 'chart.js/auto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodChartProps {
  entries: JournalResponse[];
}

export const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  useEffect(() => {
    return () => {
      Object.keys(ChartJS.instances).forEach((key) => {
        ChartJS.instances[key].destroy();
      });
    };
  }, []);

  const moodLabels = Object.values(MoodEnum).filter(value => typeof value === 'string');
  
  const data = {
    labels: entries.map(entry => new Date(entry.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Level',
        data: entries.map(entry => entry.mood),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Mood History',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        min: 0,
        max: 10,
        ticks: {
          callback: function(value: number | string) {
            if (typeof value === 'number') {
              return moodLabels[value];
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Line options={options} data={data} />
    </div>
  );
}; 