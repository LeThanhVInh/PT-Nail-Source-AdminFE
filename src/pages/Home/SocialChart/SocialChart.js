import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import classNames from 'classnames/bind';
import styles from './SocialChart.module.scss';
const cx = classNames.bind(styles);

ChartJS.register(ArcElement, Tooltip, Legend);

var style = getComputedStyle(document.body);
var primCol = style.getPropertyValue('--primary-color');

/// dataTargetSales
const percentTest = ['50'];

const dataTargetSales = {
  labels: [`${percentTest}`, `${100 - percentTest}`],
  datasets: [
    {
      //   label: '# of Votes',
      data: [`${percentTest}`, `${100 - percentTest}`],
      backgroundColor: ['rgba(255, 99, 132, 1)', 'rgb(30, 64, 175)'],
      //   borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 0,
      cutout: '70%',
    },
  ],
};

const optionsTargetSales = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
    },
    hover: {
      mode: null,
    },
    legend: {
      display: false,
    },
  },
};
//////////////////

//////////////////////Social Media

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'This Month',
      data: [32, 25, 35, 22],
      borderColor: 'rgb(30, 64, 175)',
      tension: 0.4,
    },
  ],
};

const options = {
  plugins: {
    tooltip: {
      enabled: true,
    },
    hover: {
      mode: null,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};
/////////////

export default function SocialChart() {
  return (
    <div className={cx('social-chart-wrapper', 'mt-20')}>
      <div className={cx('sc-item-wrap')}>
        <div className={cx('item', 'animate')}>
          <div className={cx('info')}>
            <div className={cx('desc')}>Target Sales</div>
            <div className={cx('count')}>300 Sales</div>
          </div>
          <div className={cx('chart-wrapper')}>
            <Doughnut data={dataTargetSales} options={optionsTargetSales} width={'100%'} />
            <span className={cx('chart-percent')}>{percentTest}%</span>
          </div>
        </div>

        <div className={cx('item', '_line-chart', 'animate')}>
          <div className={cx('info')}>
            <div className={cx('desc')}>Social Media</div>
            <div className={cx('count', 'chip')}>326 Followers</div>
          </div>
          <div className={cx('chart-wrapper')}>
            <Line options={options} data={data} />
          </div>
        </div>

        <div className={cx('item', 'animate')}>
          <div className={cx('info')}>
            <div className={cx('desc')}>New Products</div>
            <div className={cx('count')}>1450 Products</div>
          </div>
          <div className={cx('chart-wrapper')}>
            <Doughnut data={dataTargetSales} options={optionsTargetSales} width={'100%'} />
            <span className={cx('chart-percent')}>{percentTest}%</span>
          </div>
        </div>

        <div className={cx('item', '_line-chart', 'animate')}>
          <div className={cx('info')}>
            <div className={cx('desc')}>Posted Ads</div>
            <div className={cx('count', 'chip')}>180 Campaign</div>
          </div>
          <div className={cx('chart-wrapper')}>
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
