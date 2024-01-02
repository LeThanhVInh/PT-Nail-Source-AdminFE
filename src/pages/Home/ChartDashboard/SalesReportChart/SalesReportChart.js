import React from 'react';

import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Last Month',
      data: [1332, 5321, 8587, 4122, 4412, 6533],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: '#64748b',
      tension: 0.4,
      segment: {
        borderDash: [6, 6],
      },
    },
    {
      label: 'This Month',
      data: [3332, 2521, 3587, 5122, 5412, 7633],
      borderColor: 'rgba(29, 78, 216, 1)',
      tension: 0.4,
    },
  ],
};

const options = {
  // responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,

  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Report',
    },
  },

  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return '$' + value;
        },
      },
    },
  },
};

export default function SalesReportChart() {
  return <Line data={data} options={options} />;
}
