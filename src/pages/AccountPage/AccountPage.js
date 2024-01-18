import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import { InputAdornment, MenuItem, Divider, Stack, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { AccountTextField } from '../../components/CustomMUI/AccountPage/AccountTextField';
import useAuth from '../../custom-hooks/useAuth';
import classNames from 'classnames/bind';
import styles from './AccountPage.module.scss';
const cx = classNames.bind(styles);

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function AccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { currentUser } = useAuth();

  const handleSave = (data) => {
    console.log(data);
  };

  return (
    <div className={cx('account-wrap')}>
      <div className={cx('container-wrap')}>
        <div className={cx('title')}>
          <h3>My Account</h3>
        </div>
        <Box
          component="form"
          sx={{ width: '100%', padding: '20px' }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleSave)}
        >
          <div className={cx('body-wrap')}>
            <div className={cx('form-wrap')}>
              <AccountTextField
                id="standard-required"
                label="Business Name"
                defaultValue="PT Nail Source & Supply"
                variant="standard"
                fullWidth
                inputProps={{ maxLength: 50 }}
                {...register('businessName', { required: true, maxLength: 50 })}
              />
              <AccountTextField
                label="Email"
                defaultValue={currentUser?.email}
                variant="standard"
                fullWidth
                inputProps={{ maxLength: 50 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                error={
                  (errors.email && errors.email.type === 'required') ||
                  (errors.email && errors.email.type === 'pattern' && 'Enter a valid email')
                    ? true
                    : false
                }
                helperText={
                  (errors.email && errors.email.type === 'required' && 'Email is required') ||
                  (errors.email && errors.email.type === 'maxLength' && 'Max length exceeded') ||
                  (errors.email && errors.email.type === 'pattern' && 'Enter a valid email')
                }
                {...register('email', { required: true, maxLength: 50, pattern: /\S+@\S+\.\S+/ })}
              />
              <AccountTextField
                label="Password"
                variant="standard"
                fullWidth
                type="password"
                autoComplete="off"
                error={
                  (errors.passWord && errors.passWord.type === 'required') ||
                  (errors.passWord && errors.passWord.type === 'maxLength')
                    ? true
                    : false
                }
                helperText={
                  (errors.passWord && errors.passWord.type === 'required' && 'Password is required') ||
                  (errors.passWord && errors.passWord.type === 'maxLength' && 'Max length exceeded')
                }
                inputProps={{ maxLength: 50 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                {...register('passWord', { required: true, maxLength: 50 })}
              />
              <AccountTextField select label="Currency" defaultValue="EUR" variant="standard">
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </AccountTextField>
              <AccountTextField select label="Timezone" defaultValue="EUR" variant="standard">
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </AccountTextField>
              <AccountTextField select label="UI Language" defaultValue="EUR" variant="standard">
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </AccountTextField>
              <Divider sx={{ borderColor: 'var(--grey-border-item)', marginY: '15px', width: '120%' }} />
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography gutterBottom variant="body2" component="div" sx={{ color: 'var(--text-color)' }}>
                    Delete account
                  </Typography>
                  <Button variant="text" sx={{ color: 'var(--primary-white)' }}>
                    Delete
                  </Button>
                </Stack>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ maxWidth: '80%', color: 'var(--grey-color-text)' }}
                >
                  You can permanently delete your Email account add all its data
                </Typography>
              </Box>
            </div>
          </div>

          <Divider sx={{ borderColor: 'var(--grey-border-item)', marginY: '20px' }} />

          <Box justifyContent="end" direction="row" sx={{ display: 'flex' }}>
            <Button
              variant="contained"
              sx={{
                color: 'var(--text-color)',
                backgroundColor: 'var(--white-color-outline)',
                boxShadow: 'var(--box-shadow-item)',
                ':hover': {
                  backgroundColor: 'var(--white-color-outline)',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: 'var(--white-color)',
                backgroundColor: 'var(--btn-primary)',
                marginLeft: '20px',
                boxShadow: 'var(--box-shadow-item)',
                ':hover': {
                  backgroundColor: 'var(--btn-primary)',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
