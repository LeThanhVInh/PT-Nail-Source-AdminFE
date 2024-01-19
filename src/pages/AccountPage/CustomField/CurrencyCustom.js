import React from 'react';
import { Controller } from 'react-hook-form';
import { StyledAutocomplete } from '../../../components/CustomMUI/SelectCustom';
import { AccountTextField } from '../../../components/CustomMUI/AccountPage/AccountTextField';

export default function CurrencySelect({ onChange: ignored, control, props }) {
  const { currencyList } = props;
  return (
    <Controller
      render={({ onChange, ...props }) => (
        <StyledAutocomplete
          options={currencyList}
          getOptionLabel={(option) => option.label}
          renderOption={(option) => <span>{option.label}</span>}
          renderInput={(params) => <AccountTextField {...params} label="Choose a country" variant="outlined" />}
          onChange={(e, data) => onChange(data)}
          {...props}
        />
      )}
      onChange={([, data]) => data}
      //   defaultValue={{ code: 'AF', label: 'Afghanistan', value: '93' }}
      name="currency"
      control={control}
    />
  );
}
