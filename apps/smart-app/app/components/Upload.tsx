'use client';
import React, { useState, useEffect } from 'react'
import { Control, Controller } from 'react-hook-form';
import { useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { del } from '@vercel/blob';
import { useMutation } from '@apollo/client';
import { 
    ADD_DELETED_BLOBS
    } from '@/graphql/queries'
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
        
        
            const[addDelBlob, { data:clientdata, error:addDelBloberror } ] = useMutation(ADD_DELETED_BLOBS);
            const [links, setLinks] = useState<string[]>([]);                 
            const inputFileRef = useRef<HTMLInputElement>(null);
            
            useEffect(()=>{
                if(value){
                    const urls = value.split(" ");  
                    setLinks([ ...urls ]);
                }
            }, []); 

            
        

            const handlefileDelete = async (index: number) => {
                try {
                  let updatedLinks = [...links]; // Make a copy of the links array
              
                  if (links.length === 1) {
                    await addDelBlob({
                      variables: { input: { "data_owner_id": "6562047e649b76ef6a583b8d", "value": links[0] } }
                    })
                      .then(() => {
                        // Handle success if needed
                      })
                      .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                      });
              
                    updatedLinks.splice(index, 1);
                    console.log("Deleted Link: " + updatedLinks.join(" "));
                  }
              
                  if (links.length > 1) {
                    console.log("Deleting Blob:" + links[index]);
                    
                    // await del(links[index], {
                    //   token: process.env.BLOB_READ_WRITE_TOKEN
                    // });               

                    await addDelBlob({
                      variables: { input: { "data_owner_id": "6562047e649b76ef6a583b8d", "value": links[index] } }
                    })
                      .then(() => {
                        // Handle success if needed
                      })
                      .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                      });
              
                    updatedLinks.splice(index, 1);
                    console.log("Deleted Links: " + updatedLinks.join(" "));
                  }
              
                  onSelectFile(updatedLinks.join(' '));
                  setLinks(updatedLinks);
                } catch (e) {
                  console.log(e);
                  // Handle the error accordingly
                }
              };

        const handleFileChange = async () => {
            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
            }
        
            try {
                const files = inputFileRef.current.files;
                const newLinks: string[] = [];
        
                for (let i = 0; i < files.length; i++) {
                    const response = await fetch(
                        `/api/files/upload?filename=${files[i].name}`,
                        {
                            method: 'POST',
                            body: files[i],
                        },
                    );
                    const newBlob = (await response.json()) as PutBlobResult;
                    console.log(newBlob.url.toString());
                    newLinks.push(newBlob.url.toString());
                }
                                        
                const updatedLinks = [...newLinks, ...links];                
                console.log("All Links: " + updatedLinks.join(" ") )
                onSelectFile(updatedLinks.join(' '))
                setLinks(updatedLinks);
                
            } catch (e) {
                console.log('This is catch:' + e);
                return;
            }
        };
        


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
                        onChange={() => handleFileChange()} />	                        
					</div>                    
                </>
                )}    
                />  
            </div>  
            {links.map((item:string, index:number) => ( 
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

