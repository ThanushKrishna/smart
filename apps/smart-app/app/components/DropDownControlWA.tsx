import React from 'react'
import { Control, Controller } from 'react-hook-form';

interface DropDownControlWAProps<T> {
    name: string;
    control: Control<any>;
    options: String[];
    placeholder: string;
}


export const DropDownControlWA: React.FC<DropDownControlWAProps<any>> = ({ 
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
                    <option key="dummy" value=""> </option>
                    {options && options.map((option:any) => (
                        <option key={option} value={option}>
                        {option}
                        </option>  
                    ))}     
                    </select>  
                )}    
                />  
            </div>     
        </div>     
      )
}

