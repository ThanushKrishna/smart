'use client';
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form';
import { useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { del } from '@vercel/blob';
export const runtime = 'edge';


interface iFileUplaod<T> {
    name: string;
    control: Control<any>;    
    placeholder: String;
    onSelectFile: (urls:String | null) => void;    
    value?: String | null;
}



export const FileUplaod: React.FC<iFileUplaod<any>> = ({ 
    name, 
    control, 
    placeholder,
    onSelectFile,
    value
    }) => {      
        
        
            const urls=value?.toString()?.split(',');
            urls?.pop();             
            const [links, setLinks] = useState<string[]>(urls!);
            var [newLink, setNewLink] = useState<string>('');
            const inputFileRef = useRef<HTMLInputElement>(null);
            console.log("previous urls: " + value);            
        

        const handlefileDelete = async (index:number) => {
            
            try{
                console.log("Deleting Blob:" + links[index]);
                await del(links[index]);
            }
            catch(e){
                console.log(e);
                <p>Some Issue Occured During file Delete</p>
                return;
            }
            const updatedLinks = [...links];
            updatedLinks.splice(index, 1);
            setLinks(updatedLinks);      
            onSelectFile(links.toString())      
        }

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
              }                                            

                try{
                    const files = inputFileRef.current.files;             
                    console.log("Files now Selected: "+ files)             
       
                   for(var i=0; i<files.length; i++){
                       console.log(files[i].name) 
                    const response = await fetch(
                        `/api/files/upload?filename=${files[i].name}`,
                        {
                        method: 'POST',
                        body: files[i],
                        },
                    );     
                        const newBlob = (await response.json()) as PutBlobResult;     
                        console.log(newBlob.url.toString())  
                        newLink = newBlob.url.toString() + ",";
                        
                   }                        
                   
                }

                catch(e){
                    console.log("This is catch:" + e);                    
                    return;
                }

                if (newLink.trim() !== '' && links?.length > 0) {
                    setLinks([...links!, newLink]);
                    setNewLink('');
                }
                else{
                    setLinks([newLink]);
                    setNewLink('');
                }
                onSelectFile(links?.toString())

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
						<input 
                        name="file"
                        multiple                 
                        ref={inputFileRef} 
                        type="file"                                            
                        onChange={handleFileChange} />	                        
					</div>                    
                </>
                )}    
                />  
            </div>  
            {links?.length > 0 && links?.map((item:string, index:number) => ( <>
                <a href={item} target="_blank" rel="noopener noreferrer">
                <button type="button" className='mr-4'>Doc{index+1}</button>                                                                
                </a>                
              <button type="button" onClick={() => handlefileDelete(index)}>Delete </button>
              <br></br>
              </>
            ))}   
        </div>     
      )
}

