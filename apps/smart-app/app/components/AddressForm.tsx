import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { UseFormRegister } from 'react-hook-form';
import { tAddress } from '@/typings';

interface AddressFormProps {
  register: UseFormRegister<any>; // Adjust the type accordingly
  errors: any; // Adjust the type accordingly
  defaultaddress?: tAddress;
}

const AddressForm: React.FC<AddressFormProps> = ({ register, errors, defaultaddress }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>Address: </p>
        </Grid>
        <Grid item xs={12} style={{ height: '70px' }}>
          <TextField
            {...register('Address.street')}
            fullWidth
            label="Street"            
            variant="outlined"
            defaultValue={defaultaddress?.street}   
            error={!!errors?.Address?.street}
            helperText={errors?.Address?.street?.message}
            style={{ height: '2px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('Address.city')}
            fullWidth
            label="City"
            variant="outlined"
            defaultValue={defaultaddress?.city}   
            error={!!errors?.Address?.city}
            helperText={errors?.Address?.city?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('Address.state')}
            fullWidth
            label="State"
            variant="outlined"
            defaultValue={defaultaddress?.state}   
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
            defaultValue={defaultaddress?.zip}   
            error={!!errors?.Address?.zip}
            helperText={errors?.Address?.zip?.message}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;