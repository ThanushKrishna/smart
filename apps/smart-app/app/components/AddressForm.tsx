import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { UseFormRegister } from 'react-hook-form';
import { tAddress } from '@/typings';

interface AddressFormProps {
  register: UseFormRegister<any>, // Adjust the type accordingly
  errors: any, // Adjust the type accordingly
  addressType: string,
  placehoder: string
  defaultAddress?: tAddress
}

const AddressForm: React.FC<AddressFormProps> = ({ register, errors, defaultAddress, addressType, placehoder }) => {
  return (
    <>
      <p> {placehoder} </p>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            {...register(addressType + '.street')}
            fullWidth
            label="Street"
            variant="outlined"
            defaultValue={defaultAddress?.street}
            error={!!errors?.[addressType]?.street}
            helperText={errors?.[addressType]?.street?.message}
            onChange={(e: any) => (e.target.value = e.target.value.toUpperCase())}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register(addressType + '.city')}
            fullWidth
            label="City"
            variant="outlined"
            defaultValue={defaultAddress?.city}
            error={!!errors?.[addressType]?.city}
            helperText={errors?.[addressType]?.city?.message}
            onChange={(e: any) => (e.target.value = e.target.value.toUpperCase())}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register(addressType + '.state')}
            fullWidth
            label="State"
            variant="outlined"
            defaultValue={defaultAddress?.state}
            error={!!errors?.[addressType]?.state}
            helperText={errors?.[addressType]?.state?.message}
            onChange={(e: any) => (e.target.value = e.target.value.toUpperCase())}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register(addressType + '.zip', {
              pattern: {
                value: /^\d{6}$/,
                message: 'Zip code should be a 6-digit number',
              },
            })}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            fullWidth
            label="Pin"
            variant="outlined"
            defaultValue={defaultAddress?.zip}
            error={!!errors?.[addressType]?.zip}
            helperText={errors?.[addressType]?.zip?.message}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;