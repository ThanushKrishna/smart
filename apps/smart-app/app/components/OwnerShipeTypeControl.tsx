import React from 'react'
import { Control, Controller } from 'react-hook-form';

interface OwnerShipeTypeControlProps<T> {
    name: string;
    control: Control<any>;
    label: string;
    options: {label: string, value: string}[];
    placeholder: String;
}



export const OwnerShipeTypeControl: React.FC<OwnerShipeTypeControlProps<any>> = ({ 
    name, 
    control, 
    label,
    options, 
    placeholder
    }) => {
        return (      
        <div>
            {placeholder}
            <Controller  
            name={name}  
            control={control}
            render={({ field }) => (
                <select {...field}>  
                {label && <label>{label}</label>}
                {options.map((option:any) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>  
                ))}     
                </select>  
            )}    
            />  
        </div>          
      )
}

