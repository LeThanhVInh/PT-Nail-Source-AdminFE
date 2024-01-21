import { useEffect, useState } from 'react';
import { useActionData, Outlet, useLocation, useBlocker } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';

import LoadingButton from '@mui/lab/LoadingButton';

import { InputAdornment, Divider, Stack, Typography, Button, FormControl, Box } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

import { AccountTextField } from '../../components/CustomMUI/AccountPage/AccountTextField';
import { LoadOptDropdown } from '../../providers/constants';
import { StyledAutocomplete } from '../../components/CustomMUI/SelectCustom';

import { auth } from '../../firebase';

import UserAPI from '../../api/Users';
import GetOnlyAPI from '../../api/GetOnly';
import Loader from '../../components/Loader';

import classNames from 'classnames/bind';
import styles from './AccountPage.module.scss';

const cx = classNames.bind(styles);

export default function AccountPage() {
  const [isAPILoading, setIsAPILoading] = useState(false);

  let [currencyList, setCurrencyList] = useState([]);
  let [timeZoneList, setTimeZoneList] = useState([]);
  let [languageUIList, setLanguageUIList] = useState([]);

  const uidUser = auth.currentUser.uid;

  const [isLoading, setIsLoading] = useState(false);
  const [inputAnimation, setInputAnimation] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [formData, setFormData] = useState({
    idUser: '',
    fullNameUser: '',
    emailUser: '',
    phoneNumUser: '',
    currencyValue: null,
    timeZoneValue: null,
    uiLanguageValue: null,
  });
  //////////////////////////////////////////////

  // Block navigating elsewhere when data has been entered into the input
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) => hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname,
  );

  // console.log('blocker', blocker);

  /////////////////////////////////////////

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = '';

  //     if (hasUnsavedChanges) {
  //       const message = 'Unsaved changes. Are you sure you want to leave this page and discard changes?';
  //       console.log(message);
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [hasUnsavedChanges]);

  const formFieldOnchange = (event, stateName) => {
    setFormData({
      ...formData,
      [stateName]: event.target.value,
    });
    setHasUnsavedChanges(true);
    blocker.state = 'blocked';
  };

  const formSelectFieldOnchange = (event, stateName) => {
    setFormData({
      ...formData,
      [stateName]: event,
    });
    setHasUnsavedChanges(true);
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    setIsAPILoading(true);
    async function fetchData() {
      const userResult = await UserAPI.GetProfile(uidUser);
      const currencyListResult = await GetOnlyAPI.GetCurrencyList();
      const timeZoneResult = await GetOnlyAPI.GetTimeZoneList();
      const languageUIResult = await GetOnlyAPI.GetUILanguageList();

      if (currencyListResult !== null) {
        let res = LoadOptDropdown(currencyListResult, 'Name', 'Id', false, '', '');
        if (res) {
          setCurrencyList(res);
          currencyList = res;
        }
      }

      if (timeZoneResult !== null) {
        let res = LoadOptDropdown(timeZoneResult, 'Label', 'Id', false, '', '');
        if (res) {
          setTimeZoneList(res);
          timeZoneList = res; //triock lo o day ne
        }
      }

      if (languageUIResult !== null) {
        let res = LoadOptDropdown(languageUIResult, 'Name', 'Id', false, '', '');
        if (res) {
          setLanguageUIList(res);
          languageUIList = res;
        }
      }

      if (userResult !== null) {
        const tempCurrency = currencyList?.find((item) => item.value === userResult.CurrencyId);
        const tempTimeZone = timeZoneList?.find((item) => item.value === userResult.TimeZoneId);
        const tempUILanguage = languageUIList?.find((item) => item.value === userResult.UilanguageId);

        setFormData({
          ...formData,
          idUser: userResult.UserId,
          fullNameUser: userResult.Fullname,
          emailUser: userResult.Email,
          phoneNumUser: userResult.Phone,
          currencyValue: tempCurrency,
          timeZoneValue: tempTimeZone,
          uiLanguageValue: tempUILanguage,
        });

        setValue('fullName', userResult.Fullname);
        setValue('email', userResult.Email);
        setValue('phone', userResult.Phone);
        setValue('currencyId', tempCurrency.value);
        setValue('timeZoneId', tempTimeZone.value);
        setValue('uilanguageId', tempUILanguage.value);
        setIsAPILoading(false);
        if (!isAPILoading) {
          blocker.state = 'unblocked';
        }
      }
    }
    fetchData();
  }, []);

  const handleSave = async (data) => {
    setIsLoading(true);
    if (data) {
      data.userId = formData.idUser;
      data.email = formData.emailUser;
      data.phone = formData.phoneNumUser;
      data.fullName = formData.fullNameUser;
      data.timeZoneId = formData.timeZoneValue.value;
      data.currencyId = formData.currencyValue.value;
      data.uilanguageId = formData.uiLanguageValue.value;
      const response = await UserAPI.UpdateProfile(data);
      // console.log(response);
      if (response) {
        Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire('Your account has been updated !', '', 'success');
        setInputAnimation(['animate__animated animate__shakeX', 'border-error']);
        setTimeout(() => setInputAnimation([]), 3000);
        setTimeout(() => setIsLoading(false), 3000);
      }
    }
    setHasUnsavedChanges(false);
  };

  if (isAPILoading) return <Loader colorLoader="black" isLoading={isAPILoading} hasBackground={false} />;
  else
    return (
      <div className={cx('account-wrap', 'animate__animated', 'animate__fadeInUp', 'animate__fast')}>
        <div className={cx('container-wrap')}>
          {blocker?.location?.pathname ? <ConfirmNavigation blocker={blocker} /> : null}

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
                  value={formData.fullNameUser}
                  variant="standard"
                  fullWidth
                  inputProps={{ maxLength: 50 }}
                  control={control}
                  error={errors.fullName && errors.fullName.type === 'required'}
                  helperText={errors.fullName && errors.fullName.type === 'required' && 'Name is required'}
                  {...register('fullName', {
                    required: true,
                    maxLength: 50,
                    onChange: (event) => formFieldOnchange(event, 'fullNameUser'),
                  })}
                />

                <AccountTextField
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={formData.emailUser}
                  control={control}
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
                    onChange: (event) => formFieldOnchange(event, 'emailUser'),
                  })}
                />

                <AccountTextField
                  label="Phone"
                  variant="standard"
                  fullWidth
                  type="text"
                  autoComplete="off"
                  value={formData.phoneNumUser}
                  error={
                    (errors.phone && errors.phone.type === 'required') ||
                    (errors.phone && errors.phone.type === 'maxLength')
                      ? true
                      : false
                  }
                  helperText={
                    (errors.phone && errors.phone.type === 'required' && 'Phone is required') ||
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
                  {...register('phone', {
                    required: true,
                    maxLength: 50,
                    onChange: (event) => formFieldOnchange(event, 'phoneNumUser'),
                  })}
                />

                <FormControl sx={{ minWidth: 120, marginTop: '20px' }} size="small" fullWidth>
                  <Controller
                    control={control}
                    name="currencyId"
                    rules={{ required: 'Currency is required' }}
                    render={({ field: { onChange, value } }) => (
                      <StyledAutocomplete
                        onChange={(event, item) => {
                          onChange(item === null ? '' : item.value);
                          formSelectFieldOnchange(item, 'currencyValue');
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={formData.currencyValue}
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
                          onChange(item === null ? '' : item.value);
                          formSelectFieldOnchange(item, 'timeZoneValue');
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={formData.timeZoneValue}
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
                    rules={{ required: 'Timezone is required' }}
                    render={({ field: { onChange, value } }) => (
                      <StyledAutocomplete
                        onChange={(event, item) => {
                          onChange(item === null ? '' : item.value);
                          formSelectFieldOnchange(item, 'uiLanguageValue');
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        value={formData.uiLanguageValue}
                        variant="standard"
                        disablePortal
                        options={languageUIList}
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
                {!isLoading ? (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: 'var(--white-color)',
                      backgroundColor: 'var(--btn-primary)',
                      // marginLeft: '20px',
                      boxShadow: 'var(--box-shadow-item)',
                      width: '128px',
                      ':hover': {
                        backgroundColor: 'var(--btn-primary)',
                      },
                    }}
                  >
                    Save
                  </Button>
                ) : (
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                    sx={{ width: '128px' }}
                  >
                    Save
                  </LoadingButton>
                )}
              </Box>
            </div>
          </Box>
        </div>
        <Outlet />
      </div>
    );
}

function ConfirmNavigation({ blocker }) {
  console.log('blocker: c ', blocker);
  Swal.fire({
    title: 'CONFIRM ?',
    text: 'UNSAVED DATA, Are you sure you want to direct?',
    icon: 'question', //question, success,error, warning, info
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Let me through',
    cancelButtonColor: '#3085d6',
    cancelButtonText: 'Keep me here',
    focusConfirm: false,
    focusCancel: true,
    allowEscapeKey: true,
  }).then(async (result) => {
    if (result.value) {
      blocker.proceed?.();
      blocker.state = 'unblocked';
    } else {
      blocker.reset?.();
    }
  });
}
