import type { PutBlobResult } from '@vercel/blob';
import { del } from '@vercel/blob';

export const runtime = 'edge';
export const uploadfile = async (files?:FileList | null, previousList?: String) => {  
    console.log("this is uploadfile function") 

    if (!files) {
        throw new Error('No file selected');
      }
    
    if(previousList){
       const urls = previousList.split(" ");
       for(var i=0; i<urls.length; i++){
        console.log(urls[i] + "is deleted" ) 
        await del(urls[i]); 
       }
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
          //console.log(urls);
           
      }
    
      return urls                      
           
         
  }
  
  
 