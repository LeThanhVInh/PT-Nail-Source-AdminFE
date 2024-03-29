import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import {
  Clear as ClearIcon,
  Check as CheckIcon,
  Category as CategoryIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

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
} from '@mui/material';

import Loader from '../../../Loader';
import { Android12Switch } from '../../../Switch/AndroidSwitch/AndroidSwitch';

import constants, { modalSizes, getSizeOfModal, delay } from '../../../../providers/constants';
import CategoryAPI from '../../../../api/Categories';

import classNames from 'classnames/bind';
import styles from './ModalEdit.module.scss';
import noImage from '../../../../assets/images/no-image-available.png';

const cx = classNames.bind(styles);

function ModalEdit(props, ref) {
  const focusFix = useRef();
  const modalSize = modalSizes.medium;
  const [isOpen, setOpenModal] = useState(false);
  const [isInsert, setTypeIsInsert] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isAPILoading, setAPILoading] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    isActive: false,
    imageFile: null,
    representationImageLink: '',
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
        imageFile: null,
        representationImageLink: noImage,
      });

      setValue('name', '');

      setLoading(false);
    }
    else {
      setTypeIsInsert(false);
      const res = await CategoryAPI.GetById(id);
      if (res !== null) {
        setFormData({
          id: res.Id ?? '',
          name: res.Name ?? '',
          isActive: res.IsActive ?? false,
          imageFile: null,
          representationImageLink: res.RepresentationImageLink === null ? noImage : constants.apiUrl + '/' + res.RepresentationImageLink,
        });

        setValue('name', res.Name ?? '');
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
      const res = await CategoryAPI.Insert(formData);
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
      const res = await CategoryAPI.Update(formData);
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

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
          representationImageLink: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
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
                <p>{isInsert ? 'ADD NEW CATEGORY' : 'EDIT CATEGORY'}</p>
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
              {
                isLoading
                  ? <Loader colorLoader="black" isLoading={true} size={50} hasBackground={false} />
                  : (
                    <div className={cx('contents')}>
                      <Grid container spacing={0} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Grid xl={6} lg={6} md={12} xs={12} item>
                          <div className={cx('item-content')}>
                            <TextFieldCustom
                              label="Category name"
                              value={formData.name}
                              fullWidth
                              inputProps={{ maxLength: 50 }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CategoryIcon />
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
                                (errors.name && errors.name.type === 'required' && 'Category name is required') ||
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
                            <div className={cx('upload-card')}>
                              <h3>Representation image</h3>
                              <div className={cx("drop_box")}>
                                <img src={formData.representationImageLink} alt='' />
                                <h4>Select File here</h4>
                                <p>Files Supported: Image types</p>
                                <input id='inputUploadFile'
                                  type="file" hidden
                                  accept="image/*"
                                  onChange={handleFileUploadChange}
                                  style={{ display: 'none' }} />
                                <ButtonCustom
                                  variant="contained"
                                  sx={{
                                    margin: '0 !important',
                                    backgroundColor: 'var(--btn-primary)',
                                    color: 'var(--white-color)',
                                    ':hover': {
                                      backgroundColor: 'var(--btn-primary)',
                                    },
                                  }}
                                  onClick={() => document.getElementById('inputUploadFile').click()}
                                >
                                  Choose file
                                </ButtonCustom>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )
              }
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
                        </ButtonLoadingCustom>
                      )
                  }
                </Grid>
              </div>
            </div>
          </form>
        </div>
      </Box >
    </Modal >
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
