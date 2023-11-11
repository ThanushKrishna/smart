import React from 'react';
import DatePicker from 'react-datepicker';

interface IDatePickerProps {
  name: string;
  onChange: (date: Date) => void;  
  value: Date;
 }

export const DatePickerComponent: React.FC<IDatePickerProps> = ({ name, onChange, value  }) => {
 return (
  <DatePicker 
  name={name}
  selected={value}
  onChange={onChange} 
/>  
 );
}