'use client';
import React from 'react'
import { Control, Controller } from 'react-hook-form';
import { useRef } from 'react';

interface iFileUplaod<T> {
    name: string;
    control: Control<any>;    
    placeholder: String;
    onSelectFile: (file:FileList | null) => void;
    isCalled: (item: Boolean) => void;
    value?: String;
}



export const FileUplaod: React.FC<iFileUplaod<any>> = ({ 
    name, 
    control, 
    placeholder,
    onSelectFile,
    isCalled,
    value
    }) => {
		const inputFileRef = useRef<HTMLInputElement>(null);
        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
              }
                                   
             const file = inputFileRef.current.files;
             onSelectFile(file)
             isCalled(true);
             console.log(file)
            }

        return (  
        <div>
            {placeholder}    
            <div className='pb-2'>                
                <Controller  
                name={name}  
                control={control}
                defaultValue={value}
                render={({ field }) => (
                    <>
                    <div {...field} >
						<input 
                        name="file"
                        multiple                 
                        ref={inputFileRef} 
                        type="file"  
                        {...value}
                        onChange={handleFileChange} />						
					</div>                    
                </>
                )}    
                />  
            </div>     
        </div>     
      )
}

