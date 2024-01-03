import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Clear as ClearIcon, Check as CheckIcon } from '@mui/icons-material';
import {
  IconButton,
  TextField,
  Typography,
  Box,
  RadioGroup,
  Modal,
  Divider,
  Radio,
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Button,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { modalSizes, getSizeOfModal } from '../../../providers/constants';
import { StyledAutocomplete } from '../../CustomMUI/SelectCustom';
import { DatePickerCustom } from '../../CustomMUI/DatePickerCustom';

import classNames from 'classnames/bind';
import styles from './ModalEdit.module.scss';
const cx = classNames.bind(styles);

//#region const varibale
const top100Films = [{ label: 'Pê Cê & Láp Tóp' }, { label: 'Ê Lếc Trô Níc ' }, { label: 'Phát sành & Mếch Úp' }];

const TextFieldCustom = styled(TextField)({
  backgroundColor: 'var(--input-color)',
  color: 'var(--text-color)',
  margin: '10px 0',
  borderRadius: '5px',
  input: {
    color: 'var(--text-color)',
    padding: '0 14px',
    height: '38px',
  },

  '&.MuiTextField-root label': {
    color: 'var(--text-color)',
    top: '-7px',
  },

  '& label.MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(14px, -5px) scale(0.8)',
    color: 'var(--text-color)',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      // borderColor: "var(--grey-border)",
    },
    '&:hover fieldset': {
      borderColor: 'var(--grey-border-input)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary-color)',
    },
  },
});

const TypographyCustom = styled(Typography)({
  color: 'var(--text-color)',
});

const TypographyError = styled(Typography)({
  color: 'var(--red-color)',
  fontSize: '14px',
  marginTop: '10px',
});

const FormControlLabelCustom = styled(FormControlLabel)({
  color: 'var(--text-color)',
  span: {
    '&.Mui-checked': {
      color: 'var(--primary-check)',
    },
  },
});

const ButtonCustom = styled(Button)(({ theme }) => ({
  color: 'var(--grey-color)',
  width: '208px',
  height: '46px',
  fontSize: '14px',
  textTransform: 'capitalize',
  borderColor: 'var(--gray-color)',
  marginBottom: '20px',

  [theme.breakpoints.down('md')]: {
    flexGrow: 1,
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    margin: '0 20px 20px 20px',
  },
  [theme.breakpoints.up('lg')]: {
    flexGrow: 0,
    margin: '0 0 0 20px',
  },
}));

//#endregion

function ModalEdit(props, ref) {
  const focusFix = useRef();
  const modalSize = modalSizes.medium;
  const [value, setValue] = useState('male');
  const [isOpen, setOpenModal] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  const [openDatePicker, setOpenDatePicker] = useState(false);

  React.useImperativeHandle(ref, () => ({ openModal }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isOpen === false) {
    } else {
      setTimeout(() => focusFix.current.focus(), 100);
    }
  }, [isOpen]);

  const closeModal = () => {
    setAnimationClass('animate__animated animate__zoomOut animate__fast');
    setTimeout(() => setOpenModal(false), 250);
  };
  const openModal = () => {
    setAnimationClass('animate__animated animate__zoomIn animate__fast');
    setTimeout(() => setOpenModal(true), 100);
  };

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box
        className={cx('modal-main-box', animationClass)}
        sx={{
          width: getSizeOfModal(modalSize),
          overflow: 'auto',
          height: '100%',
          margin: 'auto',
        }}
      >
        <div className={cx('wrapper')}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('modal-box')}>
              <div className={cx('header')}>
                <p>Modal Edit</p>
                <IconButton
                  ref={focusFix}
                  sx={{
                    ':hover': {
                      color: 'var(--primary-color)',
                    },
                  }}
                  onClick={closeModal}
                >
                  <ClearIcon fontSize="inherit" sx={{ color: 'var(--text-color)' }} />
                </IconButton>
              </div>

              <Divider
                sx={{
                  margin: '10px 0',
                  backgroundColor: 'var(--divider-primary)',
                }}
              />

              <div className={cx('contents')}>
                <div className={cx('item-content')}>
                  <TextFieldCustom
                    fullWidth
                    label="Email"
                    {...register('email', {
                      required: true,
                      pattern: /\S+@\S+\.\S+/,
                    })}
                  />

                  {errors.email && errors.email.type === 'required' && (
                    <TypographyError className={cx('validation-text')}>Email is required</TypographyError>
                  )}

                  {errors.email && errors.email.type === 'pattern' && (
                    <TypographyError className={cx('validation-text')}>Enter a valid email</TypographyError>
                  )}
                </div>

                <div className={cx('item-content')}>
                  <TextFieldCustom
                    label="User name"
                    fullWidth
                    {...register('userName', {
                      required: true,
                    })}
                  />

                  {errors.userName && errors.userName.type === 'required' && (
                    <TypographyError className={cx('validation-text')}>User name is required</TypographyError>
                  )}
                </div>

                <div className={cx('item-content')}>
                  <TextFieldCustom
                    label="Password"
                    type="password"
                    fullWidth
                    {...register('passWord', {
                      required: true,
                      minLength: 4,
                    })}
                  />
                  <Box>
                    {errors.passWord && errors.passWord.type === 'required' && (
                      <TypographyError className={cx('validation-text')}>Password is required</TypographyError>
                    )}

                    {errors.passWord && errors.passWord.type === 'minLength' && (
                      <TypographyError className={cx('validation-text')}>Minimum characters 4 required</TypographyError>
                    )}
                  </Box>
                </div>

                <div className={cx('item-content')}>
                  <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                    <StyledAutocomplete
                      disablePortal
                      options={top100Films}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select"
                          fullWidth
                          sx={{
                            '&. MuiPaper-root': {
                              backgroundColor: 'blue',
                            },
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </div>

                <div className={cx('item-content')}>
                  <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                    <StyledAutocomplete
                      disablePortal
                      multiple
                      filterSelectedOptions
                      disableCloseOnSelect
                      options={top100Films}
                      renderInput={(params) => <TextField {...params} label="Multi Select" fullWidth />}
                      size="small"
                    />
                  </FormControl>
                </div>

                <div className={cx('item-content')}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePickerCustom
                      open={openDatePicker}
                      onOpen={() => setOpenDatePicker(true)}
                      onClose={() => setOpenDatePicker(false)}
                      slotProps={{
                        textField: {
                          onClick: () => setOpenDatePicker(true),
                        },
                      }}
                      label="Date Picker"
                      className={cx('date-time-picker')}
                    />
                  </LocalizationProvider>
                </div>

                <div className={cx('item-content')}>
                  <FormControl>
                    <TypographyCustom>Radio</TypographyCustom>

                    <RadioGroup
                      row
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                    >
                      <FormControlLabelCustom
                        value="male"
                        control={<Radio sx={{ color: 'var(--primary-check)' }} />}
                        label="Male"
                      />
                      <FormControlLabelCustom
                        value="female"
                        control={<Radio sx={{ color: 'var(--primary-check)' }} />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className={cx('item-content')}>
                  <FormGroup>
                    <TypographyCustom>Check Box</TypographyCustom>

                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          size="small"
                          sx={{
                            color: 'var(--primary-check)',
                            '&.Mui-checked': {
                              color: 'var(--primary-check)',
                            },
                          }}
                        />
                      }
                      label={
                        <span
                          style={{
                            fontSize: '14px',
                            color: 'var(--text-color)',
                          }}
                        >
                          Remember me
                        </span>
                      }
                      fontSize="14px"
                    />
                  </FormGroup>
                </div>
              </div>

              <Divider sx={{ m: '10px 0', backgroundColor: 'var(--divider-primary)' }} />

              <div className={cx('footer')}>
                <Grid
                  container
                  justifyContent={
                    modalSize === modalSizes.medium || modalSize === modalSizes.mini || modalSize === modalSizes.tiny
                      ? 'center'
                      : 'flex-end'
                  }
                >
                  <ButtonCustom
                    onClick={closeModal}
                    variant="outlined"
                    sx={{
                      border: '1px solid var(--red-color)',
                      color: 'var(--red-color)',
                      ':hover': {
                        borderColor: 'var(--red-color)',
                      },
                    }}
                  >
                    Cancel
                  </ButtonCustom>

                  <ButtonCustom
                    type="submit"
                    variant="contained"
                    startIcon={<CheckIcon />}
                    sx={{
                      backgroundColor: 'var(--btn-primary)',
                      color: 'var(--white-color)',
                      ':hover': {
                        backgroundColor: 'var(--btn-primary)',
                      },
                    }}
                  >
                    Save
                  </ButtonCustom>
                </Grid>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}
export default forwardRef(ModalEdit);
