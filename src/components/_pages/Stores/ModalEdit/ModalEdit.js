import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import {
  Clear as ClearIcon,
  Check as CheckIcon,
  Room as RoomIcon,
  RingVolume as RingVolumeIcon,
  Store as StoreIcon,
  MarkunreadMailbox as MarkunreadMailboxIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

import {
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Box,
  Modal,
  Divider,
  Grid,
  FormControlLabel,
  Button,
} from '@mui/material';

import Loader from '../../../Loader';
import { Android12Switch } from '../../../Switch/AndroidSwitch/AndroidSwitch';

import { modalSizes, getSizeOfModal, delay } from '../../../../providers/constants';
import StoreAPI from '../../../../api/Stores';

import classNames from 'classnames/bind';
import styles from './ModalEdit.module.scss';

const cx = classNames.bind(styles);

function ModalEdit(props, ref) {
  const focusFix = useRef();
  const modalSize = modalSizes.medium;
  const [isOpen, setOpenModal] = useState(false);
  const [isInsert, setTypeIsInsert] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isAPILoading, setAPILoading] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    isActive: false,
    address: '',
    phone: '',
    zipPostalCode: '',
    description: '',
  });

  React.useImperativeHandle(ref, () => ({ openModal }));

  useEffect(() => {
    if (isOpen === false) {
    } else {
      setTimeout(() => focusFix.current.focus(), 100);
    }
  }, [isOpen]);

  const closeModal = async () => {
    setAnimationClass('animate__animated animate__zoomOut animate__fast');
    await delay(250);
    setOpenModal(false);
  };

  const openModal = async (isInsert, id) => {
    setAnimationClass('animate__animated animate__zoomIn animate__fast');
    setLoading(true);
    setTimeout(() => setOpenModal(true), 100);

    if (isInsert) {
      setTypeIsInsert(true);
      setFormData({
        id: '',
        name: '',
        isActive: false,
        address: '',
        phone: '',
        zipPostalCode: '',
        description: '',
      });

      setValue('name', '');
      setValue('address', '');
      setValue('phone', '');
      setValue('zipPostalCode', '');
      setValue('description', '');

      setLoading(false);
    } // //
    else {
      setTypeIsInsert(false);
      const res = await StoreAPI.GetById(id);
      if (res !== null) {
        setFormData({
          id: res.Id ?? '',
          name: res.Name ?? '',
          isActive: res.IsActive ?? false,
          address: res.Address ?? '',
          phone: res.Phone ?? '',
          zipPostalCode: res.ZipPostalCode ?? '',
          description: res.Description ?? '',
        });

        setValue('name', res.Name ?? '');
        setValue('address', res.Address ?? '');
        setValue('phone', res.Phone ?? '');
        setValue('zipPostalCode', res.ZipPostalCode ?? '');
        setValue('description', res.Description ?? '');
      } //
      else {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Data got error !' });
      }
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    setAPILoading(true);
    if (isInsert) {
      const res = await StoreAPI.Insert(formData);
      if (res !== null) {
        await closeModal();
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire('Added successfully !', '', 'success');

        props.LoadDataTable(); //reload data of Table
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Insert failed !' });
      }
    } //
    else {
      const res = await StoreAPI.Update(formData);
      if (res !== null) {
        await closeModal();
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showClass: { popup: 'animate__animated animate__fadeInDown' },
          hideClass: { popup: 'animate__animated animate__fadeOutUp' },
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire('Updated successfully !', '', 'success');

        props.LoadDataTable(); //reload data of Table
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Update failed !' });
      }
    }
    setAPILoading(false);
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
          <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSave)}>
            <div className={cx('modal-box')}>
              <div className={cx('header')}>
                <p>{isInsert ? 'ADD NEW STORE' : 'EDIT STORE'}</p>
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

              <Divider sx={{ margin: '10px 0', backgroundColor: 'var(--divider-primary)' }} />

              {isLoading
                ? <Loader colorLoader="black" isLoading={true} size={50} hasBackground={false} />
                : (
                  <div className={cx('contents')}>
                    <Grid container spacing={0} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="Store name"
                            value={formData.name}
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <StoreIcon />
                                </InputAdornment>
                              ),
                            }}
                            error={
                              (errors.name && errors.name.type === 'required') ||
                                (errors.name && errors.name.type === 'maxLength')
                                ? true
                                : false
                            }
                            helperText={
                              (errors.name && errors.name.type === 'required' && 'Store name is required') ||
                              (errors.name && errors.name.type === 'maxLength' && 'Max length exceeded')
                            }
                            {...register('name', {
                              required: true,
                              maxLength: 50,
                              onChange: (event) => setFormData((prev) => ({ ...prev, name: event.target.value })),
                            })}
                          />
                        </div>
                      </Grid>
                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <FormControlLabel
                            control={
                              <Android12Switch
                                checked={formData.isActive}
                                onChange={(event, value) => setFormData((prev) => ({ ...prev, isActive: value }))}
                              />
                            }
                            label="Active"
                          />
                        </div>
                      </Grid>

                      <Grid xl={12} lg={12} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="Address"
                            value={formData.address}
                            fullWidth
                            inputProps={{ maxLength: 120 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <RoomIcon />
                                </InputAdornment>
                              ),
                            }}
                            error={errors.address && errors.address.type === 'maxLength' && 'Max length exceeded'}
                            helperText={errors.address && errors.address.type === 'maxLength' && 'Max length exceeded'}
                            {...register('address', {
                              required: false,
                              maxLength: 120,
                              onChange: (event) => setFormData((prev) => ({ ...prev, address: event.target.value })),
                            })}
                          />
                        </div>
                      </Grid>

                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="Phone"
                            value={formData.phone}
                            fullWidth
                            inputProps={{ maxLength: 11 }}
                            error={errors.phone && errors.phone.type === 'maxLength' && 'Max length exceeded'}
                            helperText={errors.phone && errors.phone.type === 'maxLength' && 'Max length exceeded'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <RingVolumeIcon />
                                </InputAdornment>
                              ),
                            }}
                            {...register('phone', {
                              required: false,
                              maxLength: 11,
                              onChange: (event) => setFormData((prev) => ({ ...prev, phone: event.target.value })),
                            })}
                          />
                        </div>
                      </Grid>

                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="ZIP code/Postal code"
                            value={formData.zipPostalCode}
                            fullWidth
                            inputProps={{ maxLength: 30 }}
                            error={
                              errors.zipPostalCode && errors.zipPostalCode.type === 'maxLength' && 'Max length exceeded'
                            }
                            helperText={
                              errors.zipPostalCode && errors.zipPostalCode.type === 'maxLength' && 'Max length exceeded'
                            }
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <MarkunreadMailboxIcon />
                                </InputAdornment>
                              ),
                            }}
                            {...register('zipPostalCode', {
                              required: false,
                              maxLength: 30,
                              onChange: (event) =>
                                setFormData((prev) => ({ ...prev, zipPostalCode: event.target.value })),
                            })}
                          />
                        </div>
                      </Grid>

                      <Grid xl={12} lg={12} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="Description"
                            value={formData.description}
                            fullWidth
                            inputProps={{ maxLength: 150 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <DescriptionIcon />
                                </InputAdornment>
                              ),
                            }}
                            error={errors.description && errors.description.type === 'maxLength' && 'Max length exceeded'}
                            helperText={
                              errors.description && errors.description.type === 'maxLength' && 'Max length exceeded'
                            }
                            {...register('description', {
                              required: false,
                              maxLength: 150,
                              onChange: (event) => setFormData((prev) => ({ ...prev, description: event.target.value })),
                            })}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )}

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
                    disabled={isAPILoading}
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

                  {
                    !isAPILoading
                      ? (
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
                        </ButtonCustom>)
                      : (
                        <ButtonLoadingCustom loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
                          Save
                        </ButtonLoadingCustom>)
                  }
                </Grid>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

//#region const varibale
const TextFieldCustom = styled(TextField)({
  color: 'var(--text-color)',
  margin: '10px 0',
  borderRadius: '5px',
  input: {
    backgroundColor: 'var(--input-color)',
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
      border: 'none',
    },
    '&:hover fieldset': {
      borderColor: 'var(--grey-border-input)',
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary-color)',
      border: 'none',
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

const ButtonLoadingCustom = styled(LoadingButton)(({ theme }) => ({
  width: '208px',
  height: '46px',
  fontSize: '14px',
  textTransform: 'capitalize',

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

export default forwardRef(ModalEdit);
