import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import {
  Clear as ClearIcon,
  Check as CheckIcon,
  Room as RoomIcon,
  Store as StoreIcon,
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
  FormControl,
  RadioGroup,
  Typography,
  Radio,
  Paper,
  Checkbox,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePickerCustom } from '../../../CustomMUI/DatePickerCustom';

import StoreAPI from '../../../../api/Stores';
import GetOnlyAPI from '../../../../api/GetOnly';
import DiscountsAPI from '../../../../api/Discounts';

import { modalSizes, getSizeOfModal, delay, LoadOptDropdown } from '../../../../providers/constants';
import { StyledAutocomplete } from '../../../CustomMUI/SelectCustom';
import { Android12Switch } from '../../../Switch/AndroidSwitch/AndroidSwitch';
import Loader from '../../../Loader';

import classNames from 'classnames/bind';
import styles from './ModalEdit.module.scss';

const cx = classNames.bind(styles);

function ModalEdit(props, ref) {
  const focusFix = useRef();

  const modalSize = modalSizes.medium;
  const [isOpen, setOpenModal] = useState(false);
  const [isInsert, setTypeIsInsert] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isAPILoading, setAPILoading] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

  let [discountTypeList, setDiscountTypeList] = useState([]);
  let [storeList, setStoreList] = useState([]);

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
    discountTypeId: '',
    value: '',
    startDate: '',
    isActive: false,
    endDate: '',
    storeIdList: null,
  });

  const [selectAll, setSelectAll] = useState(false);

  const handleToggleSelectAll = () => {
    setSelectAll((prev) => {
      if (!prev) setFormData((prev) => ({ ...prev, storeIdList: [...storeList] }));
      else setFormData((prev) => ({ ...prev, storeIdList: [] }));
      return !prev;
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        return setHasUnsavedChanges(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const discountTypeListResult = await GetOnlyAPI.GetDiscountTypeList();
      const storeListResult = await StoreAPI.GetList();

      if (discountTypeListResult !== null) {
        setDiscountTypeList(discountTypeListResult);
        setLoading(false);
      }

      if (storeListResult !== null) {
        let res = LoadOptDropdown(storeListResult, 'Name', 'Id', false, '--All store--', 'all');
        if (res) {
          setStoreList(res);
        }
      }
    }
    fetchData();
  }, []);

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

    setTimeout(() => setOpenModal(true), 100);

    if (isInsert) {
      setTypeIsInsert(true);
      setFormData({
        id: '',
        name: '',
        value: '',
        isActive: false,
        discountTypeId: discountTypeList?.[0]?.Id ?? '',
        startDate: null,
        endDate: null,
        storeIdList: [],
      });

      setValue('name', '');
      setValue('value', '');
      setValue('discountTypeId', discountTypeList?.[0]?.Id);
      setValue('startDate', '');
      setValue('endDate', '');
      setValue('storeIdList', null);
    } // //
    else {
      setTypeIsInsert(false);
      const res = await DiscountsAPI.GetById(id);
      if (res !== null) {
        console.log('res', res);
        const tempStoreList = storeList?.filter((obj) => res?.StoreIdList?.includes(obj.value.toUpperCase()));

        setFormData({
          id: res.Id ?? '',
          name: res.Name ?? '',
          discountTypeId: res.DiscountTypeId ?? '',
          value: res.Value ?? '',
          isActive: res.IsActive ?? false,
          endDate: dayjs(res.EndDate) ?? '',
          startDate: dayjs(res.StartDate) ?? '',
          storeIdList: tempStoreList.length === 0 ? [] : tempStoreList,
        });
        setValue('name', res.Name ?? '');
        setValue('value', res.value ?? '');
        setValue('startDate', res.StartDate ?? '');
        setValue('endDate', res.EndDate ?? '');
        setValue('discountTypeId', res.DiscountTypeId ?? '');
        setValue('storeIdList', tempStoreList ?? '');
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
      const res = await DiscountsAPI.Insert(formData);
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
      const res = await DiscountsAPI.Update(formData);
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
                <p>{isInsert ? 'ADD NEW DISCOUNT' : 'EDIT DISCOUNT'}</p>
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
                    <Grid container spacing={1} alignItems={'center'}>
                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="Store name"
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
                            sx={{ color: 'var(--text-color)' }}
                          />
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems={'center'}>
                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <FormControl sx={{ position: 'relative' }}>
                            <TypographyCustom
                              sx={{
                                fontSize: '12px',
                                marginRight: ' 20px',
                                color: 'var(--text-color)',
                                position: 'absolute',
                                top: '-12px',
                                left: 0,
                              }}
                            >
                              Discount Type
                            </TypographyCustom>
                            <RadioGroup
                              row
                              name="controlled-radio-buttons-group"
                              value={formData.discountTypeId || discountTypeList?.[0]?.Id}
                              onChange={(event) =>
                                setFormData((prev) => ({ ...prev, discountTypeId: event.target.value }))
                              }
                            >
                              {discountTypeList.map((list) => (
                                <FormControlLabelCustom
                                  key={list.Id}
                                  value={list.Id}
                                  control={<Radio sx={{ color: 'var(--primary-check)' }} />}
                                  label={list.Name}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid xl={6} lg={6} md={12} xs={12} item>
                        <div className={cx('item-content')}>
                          <TextFieldCustom
                            label="Value"
                            value={formData.value}
                            fullWidth
                            inputProps={{ maxLength: 120 }}
                            error={
                              (errors.value && errors.value.type === 'maxLength') ||
                              (errors.rate && errors.rate.type === 'pattern')
                            }
                            helperText={
                              (errors.value && errors.value.type === 'maxLength' && 'Max length exceeded') ||
                              errors.rate?.message
                            }
                            {...register('value', {
                              required: false,
                              pattern: {
                                value: /^[0-9]+$/,
                                message: 'Please enter a number',
                              },
                              maxLength: 120,
                              onChange: (event) => setFormData((prev) => ({ ...prev, value: event.target.value })),
                            })}
                          />
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems={'center'}>
                      <Grid xl={6} lg={6} md={6} xs={6} item>
                        <div className={cx('item-content')}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePickerCustom
                              label="Start Date"
                              value={formData.startDate}
                              onChange={(newValue) => setFormData((prev) => ({ ...prev, startDate: newValue.$d }))}
                              open={openStartDatePicker}
                              onOpen={() => setOpenStartDatePicker(true)}
                              onClose={() => setOpenStartDatePicker(false)}
                              sx={{ width: '100%' }}
                              slotProps={{
                                textField: {
                                  onClick: () => setOpenStartDatePicker(true),
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                      </Grid>

                      <Grid xl={6} lg={6} md={6} xs={6} item>
                        <div className={cx('item-content')}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePickerCustom
                              label="End Date"
                              value={formData.endDate}
                              onChange={(newValue) => setFormData((prev) => ({ ...prev, endDate: newValue.$d }))}
                              sx={{ width: '100%' }}
                              open={openEndDatePicker}
                              onOpen={() => setOpenEndDatePicker(true)}
                              onClose={() => setOpenEndDatePicker(false)}
                              slotProps={{
                                textField: {
                                  onClick: () => setOpenEndDatePicker(true),
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid xl={12} lg={12} md={12} xs={12} item>
                      <div className={cx('item-content')}>
                        <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                          <Controller
                            control={control}
                            name="storeIds"
                            // rules={{ required: 'Store is required' }}
                            render={({ field: { onChange, value } }) => (
                              <StyledAutocomplete
                                onChange={(event, item, reason) => {
                                  onChange(item === null ? '' : item);
                                  if (reason === 'clear' || reason === 'removeOption') setSelectAll(false);
                                  if (reason === 'selectOption' && item.length === storeList.length) setSelectAll(true);
                                  setFormData((prev) => ({ ...prev, storeIdList: item }));
                                }}
                                value={formData.storeIdList}
                                // isOptionEqualToValue={(option, value) => option.value === value.value}
                                isOptionEqualToValue={(option, value) =>
                                  value === undefined || value === '' || option.value === value.value
                                }
                                getOptionLabel={(option) => option.label || ''}
                                options={storeList}
                                disablePortal
                                multiple
                                filterSelectedOptions
                                disableCloseOnSelect
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Store"
                                    fullWidth
                                    helperText={errors.storeIds?.message}
                                    error={!!errors.storeIds}
                                  />
                                )}
                                PaperComponent={(paperProps) => {
                                  const { children, ...restPaperProps } = paperProps;
                                  return (
                                    <Paper {...restPaperProps}>
                                      <Box
                                        onMouseDown={(e) => e.preventDefault()} // prevent blur
                                        pl={1.5}
                                        py={0.5}
                                      >
                                        <FormControlLabel
                                          onClick={(e) => {
                                            e.preventDefault(); // prevent blur
                                            handleToggleSelectAll();
                                          }}
                                          label="Select all"
                                          control={<Checkbox id="select-all-checkbox" checked={selectAll} />}
                                        />
                                      </Box>
                                      <Divider />
                                      {children}
                                    </Paper>
                                  );
                                }}
                                size="small"
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

const TypographyCustom = styled(Typography)({
  color: 'var(--text-color)',
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

export default forwardRef(ModalEdit);
