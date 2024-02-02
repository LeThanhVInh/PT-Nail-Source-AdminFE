import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Swal from 'sweetalert2';

import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import 'react18-json-view/src/dark.css';

import { Check as CheckIcon, Save as SaveIcon } from '@mui/icons-material';

import { FormControl, TextField, Box, Grid } from '@mui/material';
import { StyledAutocomplete } from '../../components/CustomMUI/SelectCustom';
import { modalSizes, LoadOptDropdown } from '../../providers/constants';
import Loader from '../../components/Loader';

import UILanguageAPI from '../../api/UILanguages';

import classNames from 'classnames/bind';
import styles from './CustomTranslation.module.scss';
import { SaveButtonCustom, SaveLoadingCustom } from '../../components/CustomMUI/ButtonCustom';
const cx = classNames.bind(styles);

export default function CustomTranslation() {
  const modalSize = modalSizes.medium;
  const [isAPILoading, setIsAPILoading] = useState(false);
  const [isJSONLoading, setIsJSONLoading] = useState(false);
  const [isListLoading, setListLoading] = useState(false);

  // let [selectedLanguage, setSelectedLanguage] = useState({});
  let [languageUIList, setLanguageUIList] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    uiLanguageValue: null,
    jsonData: {},
  });

  const handleChangeLanguage = (item) => {
    if (item !== null) {
      setIsJSONLoading(true);
      async function fetchUILanguageByID() {
        const res = await UILanguageAPI.GetById(item.value);
        if (res !== null) {
          console.log('Res', res);
          setFormData({
            id: res.Id ?? '',
            name: res.Name ?? '',
            uiLanguageValue: item ?? null,
            jsonData: JSON.parse(res.JsonData ?? '{}'),
          });
        }
        setIsJSONLoading(false);
      }
      fetchUILanguageByID();
    } else {
      setFormData({ uiLanguageValue: null });
    }
  };

  const handleChangeJSONLanguage = (params) => {
    setFormData((prev) => ({ ...prev, jsonData: params.src }));
  };

  useEffect(() => {
    setListLoading(true);
    async function fetchData() {
      setIsAPILoading(true);
      const languageUIResult = await UILanguageAPI.GetList();

      if (languageUIResult !== null) {
        let res = LoadOptDropdown(languageUIResult, 'Name', 'Id', false, '', '');
        if (res) {
          setLanguageUIList(res);
          languageUIList = res; // eslint-disable-line react-hooks/exhaustive-deps
        }
      }
      setListLoading(false);
    }
    fetchData();
    setValue('uiLanguageValue', null);
    setValue('jsonData', {});
    setIsAPILoading(false);
  }, []);

  const handleSave = async (data) => {
    const res = await UILanguageAPI.Update(formData);
    if (res !== null) {
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
    } else {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Update failed !' });
    }
  };

  return (
    <div className={cx('container-wrapper')}>
      <div className={cx('header-content')}>
        <div className={cx('title')}>
          <h3>Custom Translation</h3>
        </div>
      </div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleSave)}>
        <div className={cx('body-content')}>
          <Box>
            <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
              <Controller
                control={control}
                name="uilanguageId"
                rules={{ required: 'Language is required' }}
                render={({ field: { onChange, value } }) => (
                  <StyledAutocomplete
                    onChange={(event, item) => {
                      onChange(item === null ? '' : item.value);
                      handleChangeLanguage(item);
                    }}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    getOptionLabel={(option) => option.label || ''}
                    value={formData.uiLanguageValue || null}
                    disablePortal
                    options={languageUIList}
                    loading={isListLoading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Store"
                        fullWidth
                        helperText={errors.uilanguageId?.message}
                        error={!!errors.uilanguageId}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box sx={{ maxHeight: '60vh' }}>
            {isJSONLoading ? (
              <Loader colorLoader="black" isLoading={true} size={50} hasBackground={false} />
            ) : (
              <>
                {/* https://jv.yysuni.com/ */}
                <JsonView
                  src={formData.jsonData}
                  editable
                  onAdd={(params) => handleChangeJSONLanguage(params)}
                  onEdit={(params) => handleChangeJSONLanguage(params)}
                  onDelete={(params) => handleChangeJSONLanguage(params)}
                  theme="a11y"
                />
              </>
            )}
          </Box>
        </div>
        <div className={cx('footer-content')}>
          <Grid
            container
            justifyContent={
              modalSize === modalSizes.medium || modalSize === modalSizes.mini || modalSize === modalSizes.tiny
                ? 'flex-end'
                : 'flex-end'
            }
            sx={{ marginTop: '20px' }}
          >
            {!isAPILoading && !isJSONLoading ? (
              <SaveButtonCustom
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
              </SaveButtonCustom>
            ) : (
              <SaveLoadingCustom loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
                Save
              </SaveLoadingCustom>
            )}
          </Grid>
        </div>
      </form>
    </div>
  );
}
