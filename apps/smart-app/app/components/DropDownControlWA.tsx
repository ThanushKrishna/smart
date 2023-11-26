import React from 'react'
import { Control, Controller } from 'react-hook-form';
import  FormDialog  from '@/app/components/FormDialog'
import { e } from '@vercel/blob/dist/put-96a1f07e';

interface DropDownControlWAProps<T> {
    name: string;
    control: Control<any>;
    options: String[];
    placeholder: string;
    onOptionAdd: (item: String) => void;
}



export const DropDownControlWA: React.FC<DropDownControlWAProps<any>> = ({ 
    name, 
    control, 
    options, 
    placeholder,
    onOptionAdd
    }) => {

      

        return (  
        <div className='relative h-20' >
            {placeholder}    
            <div>                
                <Controller  
                name={name}  
                control={control}
                render={({ field }) => (                    
                    <select  {...field} className='w-full  rounded pl-1 bottom-0 h-full text-slate-500 pt-1 border-slate-300 border-2'>                  
                    <option key="dummy" value="dummy"></option>                    
                    {options && options.map((option:any) => (
                        <option key={option} value={option}>
                        {option}
                        </option>  
                    ))}     
                    </select>                                                            
                )}    
                />                  
            </div>  
            <FormDialog 
            placeholder={placeholder}
            onItemAdd={(e:String) => onOptionAdd(e)}
            />              
        </div>     
      )
}

