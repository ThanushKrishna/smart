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
  <>
  {placeholder}
  <DatePicker 
  name={name}
  selected={value}
  onChange={onChange}
  />
  </>
 )

}