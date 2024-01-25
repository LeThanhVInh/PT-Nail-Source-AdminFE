import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  backgroundColor: 'var(--input-color)',
  margin: '10px 0',
  color: 'var(--text-color)',
  borderRadius: '5px',
  svg: {
    color: 'var(--text-color)',
  },
  span: {
    color: 'var(--text-color)',
  },
  label: {
    color: 'var(--text-color)',
  },
  input: {
    padding: '7.5px 14px',
  },

  '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
    transform: 'translate(12px, 8px) scale(1);',
  },

  '&.Mui-focused .MuiInputLabel-outlined': {
    color: 'var(--text-color)',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--primary-check)',
  },

  '& .MuiInputBase-input': {
    color: 'var(--text-color)',
    input: {
      color: 'var(--text-color)',
    },
  },

  '& .MuiInputBase-root': {
    '&:hover fieldset': {
      borderColor: 'var(--grey-border-input)',
    },
  },

  '& .MuiAutocomplete-inputRoot': {
    color: 'var(--text-color)',
    // height: "38px",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      padding: '0 0 0 6px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--grey-color-input)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--grey-color-input)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--grey-border-input)',
    },
  },

  '& .Mui-focused': {
    color: 'var(--text-color)',
    fieldset: {
      '&.MuiOutlinedInput-notchedOutline, &.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--grey-border-input)',
      },
      ':hover': {
        borderColor: 'var(--grey-border-input)',
      },
    },
  },
  '&.MuiPickersFadeTransitionGroup-root': {
    backgroundColor: '#209214 !important',

    '&.MuiButtonBase-root-MuiPickersDay-root, &.Mui-selected': {
      backgroundColor: '#209214 !important',
    },
  },
}));

export const DateTimePickerCustom = styled(DateTimePicker)(({ theme }) => ({
  backgroundColor: 'var(--input-color)',
  margin: '10px 0',
  color: 'var(--text-color)',
  borderRadius: '5px',
  svg: {
    color: 'var(--text-color)',
  },
  span: {
    color: 'var(--text-color)',
  },
  label: {
    color: 'var(--text-color)',
  },
  input: {
    padding: '7.5px 14px',
  },

  '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
    transform: 'translate(12px, 8px) scale(1);',
  },

  '&.Mui-focused .MuiInputLabel-outlined': {
    color: 'var(--text-color)',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--primary-check)',
  },

  '& .MuiInputBase-input': {
    color: 'var(--text-color)',
    input: {
      color: 'var(--text-color)',
    },
  },

  '& .MuiInputBase-root': {
    '&:hover fieldset': {
      borderColor: 'var(--grey-border-input)',
    },
  },

  '& .MuiAutocomplete-inputRoot': {
    color: 'var(--text-color)',
    // height: "38px",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      padding: '0 0 0 6px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--grey-color-input)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--grey-color-input)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--grey-border-input)',
    },
  },

  '& .Mui-focused': {
    color: 'var(--text-color)',
    fieldset: {
      '&.MuiOutlinedInput-notchedOutline, &.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--grey-border-input)',
      },
      ':hover': {
        borderColor: 'var(--grey-border-input)',
      },
    },
  },
  '&.MuiPickersFadeTransitionGroup-root': {
    backgroundColor: '#209214 !important',

    '&.MuiButtonBase-root-MuiPickersDay-root, &.Mui-selected': {
      backgroundColor: '#209214 !important',
    },
  },

  '&.MuiMultiSectionDigitalClock-root': {},
}));
