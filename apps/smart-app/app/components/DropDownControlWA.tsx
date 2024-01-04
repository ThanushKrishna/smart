import React from 'react'
import { Control, Controller } from 'react-hook-form';
import  FormDialog  from '@/app/components/FormDialog'
import { Select, MenuItem } from '@mui/material';

interface DropDownControlWAProps<T> {
    name: string;
    control: Control<any>;
    options: String[] | number[];
    placeholder: string;
    onOptionAdd: (item: String) => void;
    value?: string | undefined;
}



export const DropDownControlWA: React.FC<DropDownControlWAProps<any>> = ({ 
    name, 
    control, 
    options, 
    placeholder,
    onOptionAdd,
    value
    }) => {

            

            if(name == "Seating_Capacity" || name == "Standing_Capacity" || name == "CC" || name == "Sleeper_Capacity" ||
            name == "Unladen_Weight" || name == "GVW" || name == "Wheel_Base" || name == "No_Of_Cylinder"){
                // Convert strings to numbers and filter out non-numeric values
                const numericArray = options?.map(Number).filter(value => !isNaN(value));

                // Sort the numeric array
                const sortedArray = numericArray?.sort((a, b) => a - b);                
                options=sortedArray?.map(String);
                // console.log(name + sortedArray);              
            }



        return (  
        <div  style={{ position: 'relative' }}>
            {placeholder}    
            <div>                
                <Controller  
                name={name}  
                control={control} 
                defaultValue={value}                
                render={({ field }) => (                    
                    <Select {...field} 
                    style={{          
                        width: '80%',                                                                                                                                         
                        borderRadius: '0.2rem',                        
                        bottom: '0',                                              
                        paddingTop: '0.1rem',
                        border: '2px #cbd5e0',
                      }}     
                    >  
                    {value && <MenuItem> {value} </MenuItem> }                                                     
                    {(value == null || value == undefined) && <MenuItem key="dummy" value=""></MenuItem>}                    
                    {options && options.map((option:any) => (
                        <MenuItem key={option} value={option}>
                        {option}
                        </MenuItem>  
                    ))}     
                    </Select>                                                            
                )}    
                />   
                <div>
                    <FormDialog                        
                        placeholder={placeholder}
                        onItemAdd={(e: String) => onOptionAdd(e)}
                        
                    />
                </div>         
            </div>  
                    
        </div>     
      )
}

