import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  CreditCard as CreditCardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  DesktopWindowsOutlined as DesktopWindowsOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
} from '@mui/icons-material';

import ChartDashboard from './ChartDashboard';
import StoreLocate from './StoreLocate/StoreLocate';
import SocialChart from './SocialChart';
import WeeklyTopProducts from './WeeklyTopProducts/WeeklyTopProducts';
import Transactions from './Transactions';
import RecentActivities from './RecentActivities';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import UserAPI from '../../api/Users';

const cx = classNames.bind(styles);

export default function Home() {
  // console.log('home', new Date().getTime());
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await UserAPI.GetById('VLEo54J2UyYAWGf9cWQqMWkeTYA3');

  //     if (result !== null) {
  //       // console.log(result);
  //       // result.UserId;
  //       // result.Fullname;
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className={cx('home-wrapper', 'animate__animated', 'animate__fadeInRight', 'animate__fast')}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid
            xs={9}
            sx={{
              width: {
                xs: '100%',
                md: '100%',
                lg: '100%',
                xl: 'calc(100% * 9 / var(--Grid-columns))',
              },
            }}
          >
            <div className={cx('general-wrapper')}>
              <div className={cx('title')}>
                <h3>General Report</h3>
              </div>
              <div className={cx('item-wrapper')}>
                <div className={cx('item')}>
                  <div className={cx('info')}>
                    <ShoppingCartOutlinedIcon sx={{ color: 'var(--blue-color)', fontSize: '28px' }} />
                    <div className={cx('parameter')}>
                      <span>
                        33% <KeyboardArrowUpIcon fontSize="small" />
                      </span>
                    </div>
                  </div>
                  <div className={cx('count')}>4.710</div>
                  <div className={cx('desc')}>Item Sales</div>
                </div>
                <div className={cx('item')}>
                  <div className={cx('info')}>
                    <CreditCardIcon sx={{ color: 'var(--pending-color)', fontSize: '28px' }} />
                    <div className={cx('parameter', 'down')}>
                      <span>
                        2% <KeyboardArrowDownIcon fontSize="small" />
                      </span>
                    </div>
                  </div>
                  <div className={cx('count')}>3.721</div>
                  <div className={cx('desc')}>New Orders</div>
                </div>

                <div className={cx('item')}>
                  <div className={cx('info')}>
                    <DesktopWindowsOutlinedIcon sx={{ color: 'var(--warning-color-2)', fontSize: '28px' }} />
                    <div className={cx('parameter')}>
                      <span>
                        12% <KeyboardArrowUpIcon fontSize="small" />
                      </span>
                    </div>
                  </div>
                  <div className={cx('count')}>2.149</div>
                  <div className={cx('desc')}>Total Products</div>
                </div>

                <div className={cx('item')}>
                  <div className={cx('info')}>
                    <PersonOutlinedIcon sx={{ color: 'var(--success-color)', fontSize: '28px' }} />
                    <div className={cx('parameter')}>
                      <span>
                        12% <KeyboardArrowUpIcon fontSize="small" />
                      </span>
                    </div>
                  </div>
                  <div className={cx('count')}>152.040</div>
                  <div className={cx('desc')}>Unique Visitor</div>
                </div>
              </div>
            </div>
            <ChartDashboard />
            <StoreLocate />
            <SocialChart />
            <WeeklyTopProducts />
          </Grid>
          <Grid
            xs={3}
            sx={{
              width: {
                xs: '100%',
                md: '100%',
                lg: '100%',
                xl: 'calc(100% * 3 / var(--Grid-columns))',
              },
            }}
          >
            <Transactions />
            <RecentActivities />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
