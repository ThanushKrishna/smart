import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

interface IDatePickerProps {
  name: string;
  onChange: (date: Date) => void;  
  value: Date;
  placeholder: String
 }

export const DatePickerComponent: React.FC<IDatePickerProps> = ({ name, onChange, value, placeholder  }) => {
 return (
  <div>
    {placeholder}
    <div>      
    <DatePicker 
    className='w-full rounded py-1.47 pl-1 bottom-0 text-slate-500 pt-1 border-slate-300 border-2'
    name={name}
    selected={value}
    onChange={onChange}
    />
    </div>
  </div>
 )

}