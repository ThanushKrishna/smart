import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
  
  const parsedDate = dayjs(selectedDate);
  
  return (  
    <div className='relative h-20' >
        {placeholder}    
        <div>                
            <Controller  
            name={name}  
            control={control} 
            defaultValue = {parsedDate}
            render={({ field }) => (                    
                <LocalizationProvider  dateAdapter={AdapterDayjs}>                  
                  <DemoContainer components={['DatePicker']}>
                  <DatePicker          
                    {...field}
                    value={parsedDate}        
                    format="DD-MM-YYYY"
                    // Add other props like 'error' if needed
                  />
                  </DemoContainer>
                </LocalizationProvider>                                                   
            )}    
            />                  
        </div>                
    </div>     
  )
};