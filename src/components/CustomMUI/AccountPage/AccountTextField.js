import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const AccountTextField = styled(TextField)(({ theme }) => ({
  margin: 0,
  marginTop: '25px',
  width: '100%',
  color: 'var(--text-color)',
  '&:first-of-type': {
    marginTop: 0,
  },

  label: {
    color: 'var(--text-color)',
    '&.Mui-focused ': {
      color: 'var(--text-color)',
    },
  },

  svg: {
    color: 'var(--text-color)',
  },

  input: {
    color: 'var(--text-color)',
  },
  '& .MuiInputBase-input': {
    color: 'var(--text-color)',
  },

  '& .MuiInput-underline:before': { borderBottomColor: 'var(--grey-border-item)' },
  '& .MuiInput-underline:after': { borderBottomColor: 'var(--btn-primary)' },
}));
