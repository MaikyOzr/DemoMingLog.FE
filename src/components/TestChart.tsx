import React from 'react';
import {
  // Chart as ChartJS,
  // CategoryScale,
  // LinearScale,
  // PointElement,
  // LineElement,
  // Title,
  // Tooltip,
  // Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

export const TestChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Test Chart',
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Line options={options} data={data} />
    </div>
  );
}; 