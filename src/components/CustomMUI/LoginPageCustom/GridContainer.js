import { styled } from '@mui/material/styles';
import { Grid, Box, TextField, Button, Stack, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material';

export const GridContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  backgroundColor: {
    xl: 'var(--white-color)',
    lg: 'none',
    xs: 'none',
    sm: 'none',
    md: 'none',
    overflow: 'hidden',
  },
  minHeight: '100%',
  mt: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
