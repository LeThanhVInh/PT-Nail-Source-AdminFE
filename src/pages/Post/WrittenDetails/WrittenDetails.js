import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';

import { Box, Radio, RadioGroup, FormControl, FormGroup, Checkbox, FormControlLabel, Typography } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { StyledAutocomplete } from '../../../components/CustomMUI/SelectCustom';
import { TextFieldProductEdit } from '../../../components/CustomMUI/ProductEdit/TextFieldProductEdit';
import { DatePickerCustom } from '../../../components/CustomMUI/DatePickerCustom';
import classNames from 'classnames/bind';
import styles from './WrittenDetails.module.scss';

const cx = classNames.bind(styles);

const categoryList = [
  {
    id: 1,
    value: 'PC-Laptop',
    label: 'Pê Cê & Láp Tóp',
  },
  {
    id: 2,
    value: 'Electronic',
    label: 'Ê Lếc Trô Níc',
  },
  {
    id: 3,
    value: 'Fashion-Make-Up',
    label: 'Phát sành & Mếch Úp',
  },
];

const TypographyCustom = styled(Typography)({
  color: 'var(--text-color)',
  margin: '10px 0',
  fontSize: '14px',
});

const FormControlLabelCustom = styled(FormControlLabel)({
  color: 'var(--text-color)',

  span: {
    '&.Mui-checked': {
      color: 'var(--primary-check)',
    },
  },
});

export default function WrittenDetails(props) {
  // eslint-disable-next-line
  const { handleSubmit, formState: { errors } } = useForm();
  const [value, setValue] = useState('male');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ overflow: 'auto', height: '100%' }}>
      <div className={cx('wrapper')}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('add-new-container')}>
            <div className={cx('content-items')}>
              <div className={cx('item')}>
                <div className={cx('item-title-content')}>
                  <Box>
                    <TypographyCustom>Written By</TypographyCustom>
                    <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                      <StyledAutocomplete
                        disablePortal
                        options={categoryList}
                        renderInput={(params) => (
                          <TextFieldProductEdit {...params} placeholder="Written By" fullWidth />
                        )}
                      />
                    </FormControl>
                  </Box>

                  <Box>
                    <TypographyCustom>Post Date</TypographyCustom>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePickerCustom className={cx('date-time-picker')} />
                    </LocalizationProvider>
                  </Box>

                  <Box>
                    <TypographyCustom>Categories</TypographyCustom>
                    <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                      <StyledAutocomplete
                        disablePortal
                        options={categoryList}
                        renderInput={(params) => (
                          <TextFieldProductEdit {...params} placeholder="Categories" fullWidth />
                        )}
                      />
                    </FormControl>
                  </Box>

                  <Box>
                    <TypographyCustom>Tags</TypographyCustom>
                    <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
                      <StyledAutocomplete
                        disablePortal
                        multiple
                        filterSelectedOptions
                        options={categoryList}
                        renderInput={(params) => <TextFieldProductEdit {...params} placeholder="Tags" fullWidth />}
                        size="small"
                      />
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl>
                      <TypographyCustom>Radio</TypographyCustom>

                      <RadioGroup row name="controlled-radio-buttons-group" value={value} onChange={handleChange}>
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
                  </Box>

                  <Box>
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
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Box>
  );
}