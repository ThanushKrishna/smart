import type { PutBlobResult } from '@vercel/blob';

export const uploadfile = async (file?:File) => {  
    console.log("this is uploadfile function") 

    try{
        const response = await fetch(
            `/api/files/upload?filename=${file?.name}`,
            {
            method: 'POST',
            body: file,
            },
        );     
        const newBlob = (await response.json()) as PutBlobResult;     
        console.log(newBlob.url)  
        return newBlob.url  
    }
    
    catch(error){
            console.log(error)
    }                                            
     
      
         
  }
  
  
 