import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form';

interface DropDownControlProps<T> {
    name: string;
    control: Control<any>;
    options: {value: string}[];
    placeholder: string;
    value?: string;
    isCorporate?: (value:Boolean) => void;
}



export const DropDownControl: React.FC<DropDownControlProps<any>> = ({ 
    name, 
    control, 
    options, 
    placeholder,
    value,
    isCorporate
    }) => {


        const [ddValue, setddValue] = useState<string>("");
        const handleValueChange = (selectedValue: string) => {
            if(selectedValue === "CORPORATE" && isCorporate ){
                isCorporate(true); 
                console.log("is Corporate")                
                return;
            }   
                if(isCorporate) isCorporate(false);             
            
          };
        
          useEffect (()=> {
            if(value === "CORPORATE" && isCorporate){
                isCorporate(true); 
                console.log("is Corporate from default Value")       
              }
          }, [])
          


        return (  
        <div>
            {placeholder}    
            <div className='pb-2'>                
                <Controller  
                name={name}  
                control={control}
                defaultValue= {value || ''}                
                render={({ field }) => (
                    <select {...field} 
                    className='w-full py-1.48 rounded pl-1 bottom-0 h-full text-slate-500 pt-1 border-slate-300 border-2'
                    onChange={(e) => {
                        field.onChange(e);
                        handleValueChange(e.target.value); // Call the callback function when the value changes                        
                      }}                      
                    >                  
                     //{value && <option> {value} </option> } 
                     {(value!=="LEAD") && <option key="dummy" value=""></option>}   
                    console.log(value)
                    {options && options.map((option:any) => (
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

