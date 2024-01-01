import React, { useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form';
import { Select, MenuItem } from '@mui/material';

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
          }, [isCorporate])
          


        return (  
        <div>
            {placeholder}    
            <div className='pb-2'>                
                <Controller  
                name={name}  
                control={control}
                defaultValue= {value || ''}                
                render={({ field }) => (
                    <Select {...field}     
                    style={{      
                        width: '66%',                                                              
                        borderRadius: '0.2rem',                        
                        bottom: '0',                                              
                        paddingTop: '0.1rem',
                        border: '2px #cbd5e0',
                      }}                
                    onChange={(e) => {
                        field.onChange(e);
                        handleValueChange(e.target.value); // Call the callback function when the value changes                        
                      }}                      
                    >                  
                     {value && <MenuItem> {value} </MenuItem> } 
                     {(value!=="LEAD") && <MenuItem key="dummy" value=""></MenuItem>}   
                    {/* console.log(value) */}
                    {options && options.map((option:any) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                        </MenuItem>  
                    ))}     
                    </Select>                                          
                )}                    
                />  
            </div>     
        </div>     
      )
}

