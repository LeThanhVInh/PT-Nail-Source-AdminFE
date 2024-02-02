import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import { Clear as ClearIcon, Check as CheckIcon, Store as StoreIcon, Save as SaveIcon } from '@mui/icons-material';

import {
  InputAdornment,
  IconButton,
  TextField,
  Box,
  Modal,
  Divider,
  Grid,
  FormControlLabel,
  Button,
  FormControl,
} from '@mui/material';

import Loader from '../../../Loader';
import { Android12Switch } from '../../../Switch/AndroidSwitch/AndroidSwitch';

import { modalSizes, getSizeOfModal, delay, LoadOptDropdown } from '../../../../providers/constants';

import POSDevicesAPI from '../../../../api/POSDevices';
import StoreAPI from '../../../../api/Stores';

import classNames from 'classnames/bind';
import styles from './ModalEdit.module.scss';
import { StyledAutocomplete } from '../../../CustomMUI/SelectCustom';
import { AccountTextField } from '../../../CustomMUI/AccountPage/AccountTextField';

const cx = classNames.bind(styles);

function ModalEdit(props, ref) {
  const focusFix = useRef();
  const modalSize = modalSizes.medium;
  const [isOpen, setOpenModal] = useState(false);
  const [isInsert, setTypeIsInsert] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isAPILoading, setAPILoading] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  let [storeList, setStoreList] = useState([]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    isActive: false,
    storeValue: null,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        return setHasUnsavedChanges(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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

  useEffect(() => {
    async function fetchData() {
      const storeListResult = await StoreAPI.GetList();
      if (storeListResult !== null) {
        let res = LoadOptDropdown(storeListResult, 'Name', 'Id', false, '', '');
        if (res) {
          setStoreList(res);
          storeList = res; // eslint-disable-line react-hooks/exhaustive-deps
        }
      }
    }
    fetchData();
  }, []);

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
        storeValue: null,
      });
      setValue('name', '');
      setValue('storeValue', null);

      setLoading(false);
    } else {
      setTypeIsInsert(false);
      const res = await POSDevicesAPI.GetById(id);
      if (res !== null) {
        const tempStoreList = storeList?.find((item) => item.value === res.StoreId);
        setFormData({
          id: res.Id ?? '',
          name: res.Name ?? '',
          isActive: res.IsActive ?? false,
          storeValue: tempStoreList ?? null,
        });
        setValue('name', res.Name ?? '');
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Data got error !' });
      }
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    setAPILoading(true);
    if (isInsert) {
      const res = await POSDevicesAPI.Insert(formData);
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
      const res = await POSDevicesAPI.Update(formData);
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

  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      Swal.fire({
        title: 'Unsaved changes',
        text: 'Are you sure you want to close this page and discard changes?',
        icon: 'question', //question, success,error, warning, info
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'DISCARD CHANGES',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'CONTINUE EDITING',
        focusConfirm: false,
        focusCancel: true,
        allowEscapeKey: true,
      }).then((result) => {
        if (result.value) {
          setHasUnsavedChanges(false);
          setOpenModal(false);
        }
      });
    } else {
      setHasUnsavedChanges(false);
      setOpenModal(false);
    }
  };

  const formSelectFieldOnchange = (event, stateName) => {
    setFormData({
      ...formData,
      [stateName]: event,
    });
    setHasUnsavedChanges(true);
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
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
                <p>{isInsert ? 'ADD NEW POS DEVICE' : 'EDIT POS DEVICE'}</p>
                <IconButton
                  ref={focusFix}
                  sx={{
                    ':hover': {
                      color: 'var(--primary-color)',
                    },
                  }}
                  onClick={handleCloseModal}
                >
                  <ClearIcon fontSize="inherit" sx={{ color: 'var(--text-color)' }} />
                </IconButton>
              </div>

              <Divider sx={{ margin: '10px 0', backgroundColor: 'var(--divider-primary)' }} />

              {isLoading ? (
                <Loader colorLoader="black" isLoading={true} size={50} hasBackground={false} />
              ) : (
                <div className={cx('contents')}>
                  <Grid container spacing={0} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Grid xl={6} lg={6} md={12} xs={12} item>
                      <div className={cx('item-content')}>
                        <TextFieldCustom
                          label="POS device name"
                          value={formData.name}
                          fullWidth
                          inputProps={{ maxLength: 50 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end" sx={{ color: 'var(--grey)' }}>
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
                            (errors.name && errors.name.type === 'required' && 'Device name is required') ||
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
                          sx={{ color: 'var(--text-color)' }}
                        />
                      </div>
                    </Grid>

                    <Grid xl={12} lg={12} md={12} xs={12} item>
                      <div className={cx('item-content')}>
                        <FormControl sx={{ minWidth: 120, marginTop: '20px' }} size="small" fullWidth>
                          <Controller
                            control={control}
                            name="storeId"
                            rules={{ required: 'Store is required' }}
                            render={({ field: { onChange, value } }) => (
                              <StyledAutocomplete
                                onChange={(event, item) => {
                                  onChange(item === null ? '' : item.value);
                                  formSelectFieldOnchange(item, 'storeValue');
                                }}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                getOptionLabel={(option) => option.label || ''}
                                value={formData.storeValue || null}
                                disablePortal
                                options={storeList}
                                renderInput={(params) => (
                                  <AccountTextField
                                    {...params}
                                    label="Store"
                                    fullWidth
                                    helperText={errors.storeId?.message}
                                    error={!!errors.storeId}
                                  />
                                )}
                              />
                            )}
                          />
                        </FormControl>
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
                    onClick={handleCloseModal}
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

                  {!isAPILoading ? (
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
                  ) : (
                    <ButtonLoadingCustom loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
                      Save
                    </ButtonLoadingCustom>
                  )}
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
