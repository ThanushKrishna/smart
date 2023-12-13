import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { UseFormRegister } from 'react-hook-form';

interface AddressFormProps {
  register: UseFormRegister<any>; // Adjust the type accordingly
  errors: any; // Adjust the type accordingly
}

const AddressForm: React.FC<AddressFormProps> = ({ register, errors }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>Address: </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('Address.street', { required: 'Street is required' })}
            fullWidth
            label="Street"
            variant="outlined"
            error={!!errors?.Address?.street}
            helperText={errors?.Address?.street?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('Address.city', { required: 'City is required' })}
            fullWidth
            label="City"
            variant="outlined"
            error={!!errors?.Address?.city}
            helperText={errors?.Address?.city?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('Address.state', { required: 'State is required' })}
            fullWidth
            label="State"
            variant="outlined"
            error={!!errors?.Address?.state}
            helperText={errors?.Address?.state?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('Address.zip', {
              pattern: {
                value: /^\d{6}$/,
                message: 'Zip code should be a 6-digit number',
              },
            })}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            fullWidth
            label="Pin"
            variant="outlined"
            error={!!errors?.Address?.zip}
            helperText={errors?.Address?.zip?.message}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;