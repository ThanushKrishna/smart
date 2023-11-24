'use client';
import React from 'react'
import { Control, Controller } from 'react-hook-form';
import { useRef } from 'react';

interface iFileUplaod<T> {
    name: string;
    control: Control<any>;    
    placeholder: String;
    onSelectFile: (file:File) => void;
    isCalled: (item: Boolean) => void;
}



export const FileUplaod: React.FC<iFileUplaod<any>> = ({ 
    name, 
    control, 
    placeholder,
    onSelectFile,
    isCalled
    }) => {
		const inputFileRef = useRef<HTMLInputElement>(null);
        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
              }
                                   
             const file = inputFileRef.current.files[0];
             onSelectFile(file);
             isCalled(true);
             console.log(file);          
			 console.log("file upload block");                        
        }
        return (  
        <div>
            {placeholder}    
            <div className='pb-2'>                
                <Controller  
                name={name}  
                control={control}
                render={({ field }) => (
                    <>
                    <div {...field} >
						<input name="file" ref={inputFileRef} type="file" onChange={handleFileChange} />						
					</div>                    
                </>
                )}    
                />  
            </div>     
        </div>     
      )
}

			