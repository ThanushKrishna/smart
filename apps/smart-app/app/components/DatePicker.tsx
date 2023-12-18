import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers'; 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Control, Controller } from 'react-hook-form';
import dayjs from 'dayjs';

interface IDatePickerProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  selectedDate?: Date | undefined;
}

export const DatePickerComponent: React.FC<IDatePickerProps> = ({
  name, 
  placeholder,
  selectedDate,
	control
}) => {
  
  //const parsedDate = selectedDate ? dayjs(selectedDate) : null;
  const parsedDate = selectedDate !== undefined ? dayjs(selectedDate) : undefined;

  return (  
    <LocalizationProvider  dateAdapter={AdapterDayjs} > 
        {placeholder}    
        <div>                
            <Controller  
              name={name}  
              control={control} 
              defaultValue = {parsedDate}
              render={({ field }) => (                    
                                
                  <DemoContainer components={['DatePicker']}>
                  <DatePicker          
                    sx={{ mb: 10, width: '100%' }}
                    {...field}                                          
                    format="DD/MM/YYYY"                                     
                    // Add other props like 'error' if needed
                  />
                  </DemoContainer>
                                                                
            )}    
            />                  
        </div>                
      </LocalizationProvider>  
  )
};