import React, { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { c } from '@vercel/blob/dist/put-96a1f07e';

interface IDatePickerProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  selectedDate?: Date | undefined;
  LTT?: Boolean;
}

export const DatePickerComponent: React.FC<IDatePickerProps> = ({
  name, 
  placeholder,
  selectedDate,
	control,
  LTT,
}) => {  

  const [isLttChecked, setLttChecked] = useState(false);

  //const lastDate = dayjs('2030-12-31');
  const lastDate = new Date('2030-12-30');

  const parsedDate = selectedDate !== undefined ? dayjs(selectedDate) : undefined;

  const handleLttCheckBox = (event: any) => {
    setLttChecked(event.target.checked);
  };
 

  return (  
    <LocalizationProvider  dateAdapter={AdapterDayjs}  > 
        {placeholder}    
        <div>                
            <Controller  
              name={name}  
              control={control}          
              defaultValue={isLttChecked ? lastDate : parsedDate}                    
              render={({ field }) => (                                                    
                  <DemoContainer components={['DatePicker']}>
                  <DatePicker          
                    sx={{ mb: 10, width: '100%' }}
                    {...field}       
                    disabled={isLttChecked}                                    
                    format="DD/MM/YYYY"                       
                    // Add other props like 'error' if needed                    
                  />                                       
                  </DemoContainer>                 
                                                                
            )}    
            />  
            {LTT && <FormControlLabel
               control={<Checkbox checked={isLttChecked} onChange={handleLttCheckBox} />}
               label="LTT"
             />
            }                
        </div>                
      </LocalizationProvider>  
  )
};