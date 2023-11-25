import React from 'react'
import { Control, Controller } from 'react-hook-form';

interface DropDownControlProps<T> {
    name: string;
    control: Control<any>;
    options: {value: string}[];
    placeholder: string;
}



export const DropDownControl: React.FC<DropDownControlProps<any>> = ({ 
    name, 
    control, 
    options, 
    placeholder
    }) => {
        return (  
        <div>
            {placeholder}    
            <div className='pb-2'>                
                <Controller  
                name={name}  
                control={control}
                render={({ field }) => (
                    <select {...field} className='w-full py-1.48 rounded pl-1 bottom-0 h-full text-slate-500 pt-1 border-slate-300 border-2'>                  
                    {options.map((option:any) => (
                        <option key={option.value} value={option.value}>
                        {option.value}
                        </option>  
                    ))}     
                    </select>  
                )}    
                />  
            </div>     
        </div>     
      )
}

