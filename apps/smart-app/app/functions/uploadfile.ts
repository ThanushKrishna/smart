import type { PutBlobResult } from '@vercel/blob';

export const uploadfile = async (files?:FileList | null) => {  
    console.log("this is uploadfile function") 

    if (!files) {
        throw new Error('No file selected');
      }

      var urls="";

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
          urls+=newBlob.url + " "
          console.log(urls);
           
      }
    
      return urls                      
           
         
  }
  
  
 