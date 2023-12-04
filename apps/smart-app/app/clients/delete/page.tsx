'use client'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT_BYID } from '@/graphql/queries'

const DeleteClient:React.FC = () => {
   
    const[deleteclient, { loading:clientdataload, data:clientdata, error:deleteclienterror } ] = useMutation(DELETE_CLIENT_BYID);
    const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
    const [vehicleno, setVehicleno] = useState<String>("");           
    
    const handleVehicleNoSubmit = async () => {
        console.log("This is handleVehicleNoSubmit");
        console.log(vehicleno);    
        
        if(vehicleno) {    
            deleteclient( { variables: { vehicleid: vehicleno }})
            .then(()=> {                    
            setVehicleNoprovided(true);
            })
            .catch((err) => {
              console.log(JSON.stringify(err, null, 2));        
              setVehicleNoprovided(false);          
            })
    
            if(deleteclienterror) {            
                console.log(JSON.stringify(deleteclienterror, null, 2));
            }                 
        }  
    }  

    return (
    <div>
        {!isVehicleNoprovided &&
        <>
        <label> Vehicle Registration Number: </label> 
        <input type="text" 
        name='Vehicle_No'  
        onBlur={(e:any) => setVehicleno(e.target.value)}    
        /> 
        <br></br>
        <button 
        type="button" 
        onClick = {handleVehicleNoSubmit}            
        > Search </button>
        </>
        }
    
    {clientdataload && <p>Loading...</p>}
    {deleteclienterror && <p>{deleteclienterror.message}</p>}
    {isVehicleNoprovided && <p>Client Record Deleted Successfully!!! </p>}       

    </div>
  )
}


export default DeleteClient;
