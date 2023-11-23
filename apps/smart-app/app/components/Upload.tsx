'use client';
import React from 'react'
import { Control, Controller } from 'react-hook-form';
import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

interface iFileUplaod<T> {
    name: string;
    control: Control<any>;    
    placeholder: String;
    setadharDoc: (link: String | undefined) => void;
}



export const FileUplaod: React.FC<iFileUplaod<any>> = ({ 
    name, 
    control, 
    placeholder,
    setadharDoc
    }) => {
		const inputFileRef = useRef<HTMLInputElement>(null);

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
              }
     
              const file = inputFileRef.current.files[0];
     
              const response = await fetch(
                `/api/files/upload?filename=${file.name}`,
                {
                  method: 'POST',
                  body: file,
                },
              );
                
                 
              const newBlob = (await response.json()) as PutBlobResult;                                 
              setadharDoc(newBlob.url);
              console.log(newBlob.url) 
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

			