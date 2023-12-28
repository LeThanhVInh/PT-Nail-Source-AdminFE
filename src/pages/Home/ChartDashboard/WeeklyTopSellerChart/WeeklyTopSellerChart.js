import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['17 - 30 Years old', '31 - 50 Years old', '>= 50 Years old'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      //   borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
    },
  ],
};

const options = {
  //   aspectRatio: 1,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function WeeklyTopSellerChart() {
  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
}
