import * as React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, IconButton, Stack, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { Add as AddIcon, BorderColor as BorderColorIcon, EditNote as EditNoteIcon } from '@mui/icons-material';

import { IOSSwitch } from '../../components/CustomMUI/IOSSwitch';
import FullDateCalendar from './FullDateCalendar/FullDateCalendar';
import { DatePickerCustom } from '../../components/CustomMUI/DateCalendarCustom';

import classNames from 'classnames/bind';
import styles from './CalendarPage.module.scss';
const cx = classNames.bind(styles);

export default function CalendarPage() {
  return (
    <div className={cx('wrapper', 'animate__animated', 'animate__fadeInRight', 'animate__fast')}>
      <div className={cx('action-container')}>
        <div className={cx('title')}>
          <h3>Calendar</h3>
        </div>
        <div className={cx('action-wrapper')}>
          <div className={cx('action-add', 'pt-10')}>
            <Stack direction="row" spacing={1}>
              <Button variant="primary" className={cx('btn-add-new')}>
                Print Schedule
              </Button>
              <IconButton aria-label="Add" sx={{ color: 'var(--btn-primary)' }}>
                <AddIcon />
              </IconButton>
            </Stack>
          </div>
        </div>
      </div>
      <div className={cx('calendar-wrap')}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Grid
              xs={4}
              sx={{
                width: {
                  xs: '100%',
                  md: '100%',
                  lg: '100%',
                  xl: 'calc(100% * 3 / var(--Grid-columns))',
                },
              }}
            >
              <div className={cx('add-new-schedule')}>
                <Button startIcon={<BorderColorIcon />} className={cx('btn-add-new')} fullWidth>
                  Add New Schedule
                </Button>
                <div className={cx('calendar-events')}>
                  <div className={cx('ce-item', 'animate')}>
                    <div className={cx('desc')}>
                      <div className={cx('status')}></div>
                      <div className={cx('title')}>
                        <p>ReactJS v18</p>
                        <div className={cx('date-time')}>
                          <span className={cx('date')}>2 Days</span>
                          <span className={cx('spacing')}>-</span>
                          <span className={cx('time')}>10:00 AM</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx('action')}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        sx={{
                          color: 'var(--grey-color)',
                          '&:hover': { backgroundColor: 'var(--btn-primary)', color: 'var(--white-color)' },
                        }}
                        className={cx('animate')}
                      >
                        <EditNoteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className={cx('ce-item', 'animate')}>
                    <div className={cx('desc')}>
                      <div className={cx('status')}></div>
                      <div className={cx('title')}>
                        <p>ReactJS v18</p>
                        <div className={cx('date-time')}>
                          <span className={cx('date')}>2 Days</span>
                          <span className={cx('spacing')}>-</span>
                          <span className={cx('time')}>10:00 AM</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx('action')}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        sx={{
                          color: 'var(--grey-color)',
                          '&:hover': { backgroundColor: 'var(--btn-primary)', color: 'var(--white-color)' },
                        }}
                        className={cx('animate')}
                      >
                        <EditNoteIcon />
                      </IconButton>
                    </div>
                  </div>
                  <div className={cx('ce-item', 'animate')}>
                    <div className={cx('desc')}>
                      <div className={cx('status')}></div>
                      <div className={cx('title')}>
                        <p>ReactJS v18</p>
                        <div className={cx('date-time')}>
                          <span className={cx('date')}>2 Days</span>
                          <span className={cx('spacing')}>-</span>
                          <span className={cx('time')}>10:00 AM</span>
                        </div>
                      </div>
                    </div>
                    <div className={cx('action')}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        sx={{
                          color: 'var(--grey-color)',
                          '&:hover': { backgroundColor: 'var(--btn-primary)', color: 'var(--white-color)' },
                        }}
                        className={cx('animate')}
                      >
                        <EditNoteIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className={cx('remove-action')}>
                  <FormGroup sx={{ marginRight: '10px' }}>
                    <FormControlLabel
                      labelPlacement="start"
                      sx={{ marginLeft: 0 }}
                      label={
                        <Typography
                          style={{
                            marginRight: 'auto',
                            fontSize: '14px',
                            color: 'var(--text-color)',
                          }}
                        >
                          Remove after drop
                        </Typography>
                      }
                      control={<IOSSwitch defaultChecked />}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className={cx('calendar-date-wrap', 'mt-20')}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePickerCustom defaultValue={dayjs('2024-1-1')} views={['year', 'month', 'day']} />
                </LocalizationProvider>
              </div>
            </Grid>
            <Grid
              xs={8}
              sx={{
                width: {
                  xs: '100%',
                  md: '100%',
                  lg: '100%',
                  xl: 'calc(100% * 9 / var(--Grid-columns))',
                },
              }}
            >
              <div className={cx('full-calendar')}>
                <FullDateCalendar />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
