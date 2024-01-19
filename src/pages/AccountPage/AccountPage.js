import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import constants from '../../providers/constants';

import {
  InputAdornment,
  MenuItem,
  Divider,
  Stack,
  Typography,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { AccountTextField } from '../../components/CustomMUI/AccountPage/AccountTextField';

import UserAPI from '../../api/Users';
import GetOnlyAPI from '../../api/GetOnly';

import classNames from 'classnames/bind';
import styles from './AccountPage.module.scss';
import { LoadOptDropdown } from '../../providers/constants';
import { StyledAutocomplete } from '../../components/CustomMUI/SelectCustom';

const cx = classNames.bind(styles);

const defaultValues = {};

export default function AccountPage() {
  const [emailUser, setEmailUser] = useState('');
  const [fullNameUser, setFullNameUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [currencyList, setCurrencyList] = useState([]);
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [languageUI, setLanguageUI] = useState([]);

  const [data, setData] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    async function fetchData() {
      const userResult = await UserAPI.GetById('VLEo54J2UyYAWGf9cWQqMWkeTYA3');
      const currencyListResult = await GetOnlyAPI.GetCurrencyList();
      const timeZoneResult = await GetOnlyAPI.GetTimeZoneList();
      const languageUIResult = await GetOnlyAPI.GetUILanguageList();

      if (userResult !== null) {
        setEmailUser(userResult.Email);
        setFullNameUser(userResult.Fullname);
        setIdUser(userResult.UserId);
      }

      if (currencyListResult !== null) {
        let res = LoadOptDropdown(currencyListResult, 'Name', 'Id', false, '', '');
        if (res) {
          setCurrencyList(res);
        }
      }

      if (timeZoneResult !== null) {
        let res = LoadOptDropdown(timeZoneResult, 'Label', 'Id', false, '', '');
        if (res) {
          setTimeZoneList(res);
        }
      }

      if (languageUIResult !== null) {
        let res = LoadOptDropdown(languageUIResult, 'Name', 'Id', false, '', '');
        if (res) {
          setLanguageUI(res);
        }
      }
    }
    fetchData();
  }, []);

  // console.log('test list: ', idUser);

  const handleSave = async (data) => {
    setData(data);

    if (data) {
      data.userId = 'VLEo54J2UyYAWGf9cWQqMWkeTYA3';
      const response = await UserAPI.UpdateProfile(data);
      console.log(response);
    }
  };

  return (
    <div className={cx('account-wrap', 'animate__animated', 'animate__fadeInUp', 'animate__fast')}>
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
                label="Name"
                value={fullNameUser}
                variant="standard"
                fullWidth
                inputProps={{ maxLength: 50 }}
                // name="name"
                control={control}
                {...register('fullName', {
                  required: true,
                  maxLength: 50,
                  onChange: (e) => setFullNameUser(e.target.value),
                })}
              />

              <AccountTextField
                label="Email"
                variant="standard"
                fullWidth
                value={emailUser}
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
                {...register('email', {
                  required: true,
                  maxLength: 50,
                  pattern: /\S+@\S+\.\S+/,
                  onChange: (e) => setEmailUser(e.target.value),
                })}
              />

              <AccountTextField
                label="Phone Number"
                variant="standard"
                fullWidth
                type="text"
                autoComplete="off"
                error={
                  (errors.passWord && errors.passWord.type === 'required') ||
                    (errors.passWord && errors.passWord.type === 'maxLength')
                    ? true
                    : false
                }
                helperText={
                  (errors.phone && errors.phone.type === 'required' && 'Phone Number is required') ||
                  (errors.phone && errors.phone.type === 'maxLength' && 'Max length exceeded')
                }
                inputProps={{ maxLength: 50 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                {...register('phone', { required: true, maxLength: 50 })}
              />

              <FormControl sx={{ minWidth: 120, marginTop: '20px' }} size="small" fullWidth>
                <Controller
                  control={control}
                  name="currencyId"
                  rules={{ required: 'Currency is required' }}
                  render={({ field: { onChange, value } }) => (
                    <StyledAutocomplete
                      onChange={(event, item) => {
                        onChange(item.value);
                      }}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      value={
                        value
                          ? currencyList.find((option) => {
                            return value === option.value;
                          }) ?? null
                          : null
                      }
                      variant="standard"
                      disablePortal
                      options={currencyList}
                      sx={{ my: 0, backgroundColor: 'transparent' }}
                      renderInput={(params) => (
                        <AccountTextField
                          {...params}
                          label="Currency"
                          fullWidth
                          variant="standard"
                          helperText={errors.currencyId?.message}
                          error={!!errors.currencyId}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>

              <FormControl sx={{ minWidth: 120, marginTop: '20px' }} size="small" fullWidth>
                <Controller
                  control={control}
                  name="timeZoneId"
                  rules={{ required: 'Timezone is required' }}
                  render={({ field: { onChange, value } }) => (
                    <StyledAutocomplete
                      onChange={(event, item) => {
                        onChange(item.value);
                      }}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      value={
                        value
                          ? timeZoneList.find((option) => {
                            return value === option.value;
                          }) ?? null
                          : null
                      }
                      variant="standard"
                      disablePortal
                      options={timeZoneList}
                      sx={{ my: 0, backgroundColor: 'transparent' }}
                      renderInput={(params) => (
                        <AccountTextField
                          {...params}
                          label="Timezone"
                          fullWidth
                          variant="standard"
                          helperText={errors.timeZoneId?.message}
                          error={!!errors.timeZoneId}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>

              <FormControl sx={{ minWidth: 120, marginTop: '20px' }} size="small" fullWidth>
                <Controller
                  control={control}
                  name="uilanguageId"
                  rules={{ required: 'UILanguage is required' }}
                  render={({ field: { onChange, value } }) => (
                    <StyledAutocomplete
                      onChange={(event, item) => {
                        onChange(item.value);
                      }}
                      isOptionEqualToValue={(option, value) => option.value === value.value}
                      value={
                        value
                          ? languageUI.find((option) => {
                            return value === option.value;
                          }) ?? null
                          : null
                      }
                      variant="standard"
                      disablePortal
                      options={languageUI}
                      sx={{ my: 0, backgroundColor: 'transparent' }}
                      renderInput={(params) => (
                        <AccountTextField
                          {...params}
                          label="UI Language"
                          fullWidth
                          variant="standard"
                          helperText={errors.uilanguageId?.message}
                          error={!!errors.uilanguageId}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>

              <Divider sx={{ borderColor: 'var(--grey-border-item)', marginY: '20px', width: '100%' }} />
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
          </div>
        </Box>
      </div>
    </div>
  );
}
