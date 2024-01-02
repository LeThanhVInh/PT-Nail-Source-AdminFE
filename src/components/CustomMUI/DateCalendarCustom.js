import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { styled } from '@mui/system';

export const DatePickerCustom = styled(DateCalendar)(({ theme }) => ({
  color: 'var(--text-color)',
  borderRadius: '5px',
  width: 'unset',

  svg: {
    color: 'var(--text-color)',
  },
  span: {
    color: 'var(--text-color)',
  },

  '& .MuiDayCalendar-monthContainer': {
    '& .MuiPickersDay-root': {
      color: 'var(--text-color)',
      '&.Mui-selected': {
        color: 'var(--white-color)',
        backgroundColor: 'var(--btn-primary)',
      },
    },
  },
}));
