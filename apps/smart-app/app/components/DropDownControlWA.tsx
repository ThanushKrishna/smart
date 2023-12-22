import React from 'react'
import { Control, Controller } from 'react-hook-form';
import  FormDialog  from '@/app/components/FormDialog'
import { e } from '@vercel/blob/dist/put-96a1f07e';

interface DropDownControlWAProps<T> {
    name: string;
    control: Control<any>;
    options: String[] | number[];
    placeholder: string;
    onOptionAdd: (item: String) => void;
    value?: String | undefined;
}



export const DropDownControlWA: React.FC<DropDownControlWAProps<any>> = ({ 
    name, 
    control, 
    options, 
    placeholder,
    onOptionAdd,
    value
    }) => {

            

            if(name == "Seating_Capacity" || name == "Standing_Capacity"){
                // Convert strings to numbers and filter out non-numeric values
                const numericArray = options?.map(Number).filter(value => !isNaN(value));

                // Sort the numeric array
                const sortedArray = numericArray?.sort((a, b) => a - b);                
                options=sortedArray;
                // console.log(name + sortedArray);              
            }



        return (  
        <div className='relative h-20' >
            {placeholder}    
            <div>                
                <Controller  
                name={name}  
                control={control} 
                defaultValue={value}                
                render={({ field }) => (                    
                    <select  {...field} className='w-full  rounded pl-1 bottom-0 h-full text-slate-500 pt-1 border-slate-300 border-2'>  
                    {value && <option> {value} </option> }                                                     
                    {<option key="dummy" value=""></option>}                    
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

