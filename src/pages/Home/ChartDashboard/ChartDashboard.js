import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { FormControl } from '@mui/material';
import { StyledAutocomplete } from '../../../components/CustomMUI/SelectCustom';
import { TextFieldProductEdit } from '../../../components/CustomMUI/ProductEdit/TextFieldProductEdit';
import SalesReportChart from './SalesReportChart';
import WeeklyTopSellerChart from './WeeklyTopSellerChart';
import SalesReportChartCircle from './SalesReportChartCircle';

import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
const cx = classNames.bind(styles);

const categoryList = [
  {
    id: 1,
    value: 'PC-Laptop',
    label: 'Pê Cê & Láp Tóp',
  },
  {
    id: 2,
    value: 'Electronic',
    label: 'Ê Lếc Trô Níc',
  },
  {
    id: 3,
    value: 'Fashion-Make-Up',
    label: 'Phát sành & Mếch Úp',
  },
];

export default function ChartDashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className={cx('chart-wrapper', 'mt-20')}>
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Grid
            xs={6}
            sx={{
              width: {
                xs: '100%',
                md: '100%',
                lg: 'calc(100% * 6 / var(--Grid-columns))',
                xl: 'calc(100% * 6 / var(--Grid-columns))',
              },
            }}
          >
            <div className={cx('sales-report-wrap')}>
              <div className={cx('title')}>
                <h3>Sales Report</h3>
              </div>
              <div className={cx('container', 'ml-10')}>
                <div className={cx('info')}>
                  <div className={cx('info-wrap')}>
                    <div className={cx('total-wrap')}>
                      <span className={cx('total', 'current')}>$15,000</span>
                      <span className={cx('month')}>This Month</span>
                    </div>
                    <div className={cx('total-wrap')}>
                      <span className={cx('total')}>$10,000</span>
                      <span className={cx('month')}>Last Month</span>
                    </div>
                  </div>
                  <div className={cx('filter')}>
                    <FormControl sx={{ minWidth: 120, width: '230px' }} size="small" fullWidth>
                      <StyledAutocomplete
                        size={'small'}
                        disablePortal
                        options={categoryList}
                        sx={{
                          '& + .MuiAutocomplete-popper .MuiPaper-root': {
                            fontSize: '14px',
                          },
                        }}
                        renderInput={(params) => (
                          <TextFieldProductEdit
                            {...params}
                            placeholder="Filter by Category"
                            fullWidth
                            sx={{
                              '& input,& input::placeholder': {
                                fontSize: '14px',
                              },
                              '& MuiAutocomplete-listbox': {
                                fontSize: '14px',
                              },
                            }}
                          />
                        )}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className={cx('chart-container')}>
                  <div className={cx('chart-item')}>
                    <SalesReportChart />
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            xs={3}
            sx={{
              width: {
                xs: '100%',
                md: 'calc(100% * 6 / var(--Grid-columns))',
                lg: 'calc(100% * 3 / var(--Grid-columns))',
                xl: 'calc(100% * 3 / var(--Grid-columns))',
              },
            }}
          >
            <div className={cx('sales-report-wrap')}>
              <div className={cx('title')}>
                <h3>Weekly Top Seller</h3>
              </div>
              <div className={cx('container')}>
                <div className={cx('chart-container')}>
                  <div className={cx('chart-content')}>
                    <div className={cx('chart-wrap')}>
                      <WeeklyTopSellerChart />
                    </div>
                    <div className={cx('chart-desc')}>
                      <div className={cx('desc-wrap')}>
                        <div className={cx('desc-item')}>
                          <div className={cx('dot', 'color_1')}></div>
                          <span className={cx('desc-text')}>17 - 30 Years old</span>
                          <span className={cx('percent')}>50%</span>
                        </div>
                        <div className={cx('desc-item')}>
                          <div className={cx('dot', 'color_2')}></div>
                          <span className={cx('desc-text')}>31 - 50 Years old</span>
                          <span className={cx('percent')}>30%</span>
                        </div>
                        <div className={cx('desc-item')}>
                          <div className={cx('dot', 'color_3')}></div>
                          <span className={cx('desc-text')}>>= 50 Years old</span>
                          <span className={cx('percent')}>20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            xs={3}
            sx={{
              width: {
                xs: '100%',
                md: 'calc(100% * 6 / var(--Grid-columns))',
                lg: 'calc(100% * 3 / var(--Grid-columns))',
                xl: 'calc(100% * 3 / var(--Grid-columns))',
              },
            }}
          >
            <div className={cx('sales-report-wrap')}>
              <div className={cx('title')}>
                <h3>Sales Report</h3>
              </div>
              <div className={cx('container')}>
                <div className={cx('chart-container')}>
                  <div className={cx('chart-content')}>
                    <div className={cx('chart-wrap')}>
                      <SalesReportChartCircle />
                    </div>
                    <div className={cx('chart-desc')}>
                      <div className={cx('desc-wrap')}>
                        <div className={cx('desc-item')}>
                          <div className={cx('dot', 'color_1')}></div>
                          <span className={cx('desc-text')}>17 - 30 Years old</span>
                          <span className={cx('percent')}>50%</span>
                        </div>
                        <div className={cx('desc-item')}>
                          <div className={cx('dot', 'color_2')}></div>
                          <span className={cx('desc-text')}>31 - 50 Years old</span>
                          <span className={cx('percent')}>30%</span>
                        </div>
                        <div className={cx('desc-item')}>
                          <div className={cx('dot', 'color_3')}></div>
                          <span className={cx('desc-text')}>{'>'}= 50 Years old</span>
                          <span className={cx('percent')}>20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
