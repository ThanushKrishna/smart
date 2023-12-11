'use client';
import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form';
import { useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { del } from '@vercel/blob';
export const runtime = 'edge';


interface iFileUplaod<T> {
    name: string,
    control: Control<any>,
    placeholder: string,
    onSelectFile: (urls:string | null) => void,
    value?: string | null
}



export const FileUplaod: React.FC<iFileUplaod<any>> = ({ 
    name, 
    control, 
    placeholder,
    onSelectFile,
    value
    }) => {      
        
        
         
            const [links, setLinks] = useState<string[]>([]);
            const [link, setLink] = useState<string>("");
            const inputFileRef = useRef<HTMLInputElement>(null);
            
            if(value) {
                const urls = value.split(" ");                
                setLinks([ ...urls ]);
            }
        

        const handlefileDelete = async (index:number) => {
            
            try{

                if(links.length===1){
                    await del(links[0]); 
                    onSelectFile("");
                }
                if(links.length > 0){
                    console.log("Deleting Blob:" + links[index]);
                    await del(links[index]);                    
                    links.splice(index, 1);                         
                    onSelectFile(links.join(" "))      
                }
            }
            catch(e){
                console.log(e);
                <p>Some Issue Occured During file Delete</p>
                return;
            }            
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
                        setLink(newBlob.url.toString() + " ")
                        setLinks([...links, link]);
                        console.log("All Links: " + links.join(" "))  
                        onSelectFile(links.join(" "))
                        
                   }                        
                   
                }

                catch(e){
                    console.log("This is catch:" + e);                    
                    return;
                }                                 

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
            {links && links.map((item:string, index:number) => ( 
            <>
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

