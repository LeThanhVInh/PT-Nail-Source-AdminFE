import { styled } from '@mui/system';
import { InputBase } from '@mui/material';

export const SearchMediumCustom = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '999px',
  position: 'relative',
  marginLeft: '4px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapperCustom = styled('div')(({ theme }) => ({
  color: 'var(--btn-edit)',
  padding: '0 8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

export const StyledInputBaseCustom = styled(InputBase)(({ theme }) => ({
  color: 'var(--btn-edit)',
  '& .MuiInputBase-input': {
    backgroundColor: 'var(--input-color)',
    padding: theme.spacing(1, 1, 1, 0),
    borderRadius: '999px',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '99%',
    [theme.breakpoints.up('md')]: {
      width: '270px',
    },
  },
}));
