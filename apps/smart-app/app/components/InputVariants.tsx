import React from 'react'
import { Control, Controller } from 'react-hook-form';
import { Input } from "@material-tailwind/react";


interface iInput {
    control: Control<any>;
    placeholder: string;
    name: string;
}

export const InputVariants: React.FC<iInput> = ({
    placeholder,
    control,
    name
} ) => {
    return (          
                <Controller  
                name={name}  
                control={control}
                render={({ field }) => (                
                     <div {...field} className="flex w-72 py-4 flex-col gap-6">
                      <Input variant="standard" label = {placeholder} crossOrigin="" />
                    </div>   
                )}    
                />          
      )
  }

