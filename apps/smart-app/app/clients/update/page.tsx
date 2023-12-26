'use client'
import React, { useState } from 'react'
import Updatepage01 from '../../components/updatepag01'
import Updatepage02 from '../../components/updatepag02'
import Updatepage03 from '../../components/updatepag03'
import { useQuery } from '@apollo/client';
import { GET_USER_DATA_BYID } from '@/graphql/queries'
import { Button } from '@radix-ui/themes'
import  Spinner from '@/app/components/Spinner'
import Link from 'next/link';

const UpdateClient:React.FC = () => {
   

        const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
        const [vehicleno, setVehicleno] = useState<String>("");   
        const [firstpage, setfirstpage ] = useState<Boolean>(false);
        const [secndpage, setsecndpage ] = useState<Boolean>(false);
        const [thirddpage, setthirddpage ] = useState<Boolean>(false);
        const [isCorporateGlobal, setCorporateGlobal] = useState<Boolean>(false);

        const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
            variables: { vechicleId: vehicleno },
            skip: !vehicleno, // Skip the query if vehicleno is not provided            
            });

        const handleVehicleNoSubmit = async () => {
            if(vehicleno){
               console.log("This is handleVehicleNoSubmit");
               console.log(vehicleno);                                                   
               setfirstpage(true);
               setVehicleNoprovided(true);
            }
            else {
                setfirstpage(true);
            }
            
        } 
        
        const refreshPage = () => {
            window.location.reload();
          }

    return (
    <div>
        {!isVehicleNoprovided &&
        <>
        <label> Vehicle Registration Number: </label> 
        <br/>
        <input 
        className="p-2 h-8 border border-gray-300 rounded-md text-lg focus:outline-none focus:border-blue-500 mb-2"
        type="text" 
        name='Vehicle_No'  
        onBlur={(e:any) => setVehicleno(e.target.value)}    
        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
        /> 
        <br></br>
        <Button         
         onClick = {() => handleVehicleNoSubmit()}   
        > 
        Search {gusrbyidload && <Spinner></Spinner>}
        </Button>
        </>
        }    

        {gusrbyiderror && <p>{gusrbyiderror.message}</p> }

        {!vehicleno && firstpage &&  <p className='text-red-600'>Provide the Vehicle No</p>}
        
        {gusrdatabyid?.user_data_byid === null && firstpage && 
         <>
            <p className='text-red-600'>Vehicle No does not exist</p>              
            <div className='mb-5'>
            <Button 
            onClick={refreshPage}
            >Go Back
            </Button>            
            </div>       
        </> 
        }
               



        { gusrdatabyid?.user_data_byid?.Vehicle_No && firstpage && 
        <Updatepage01 
        value={vehicleno} 
        ispagesubmitted={(e:Boolean) => {setsecndpage(e); setfirstpage(!e)}}         
        isCorporateLocal={(e:Boolean) => {setCorporateGlobal(e)}}
        />  }
        {secndpage && 
        <Updatepage02 
        value={vehicleno} 
        ispagesubmitted={(e:Boolean) => {setthirddpage(e); setsecndpage(!e)}} 
        isCorporateGlobal={isCorporateGlobal}         
        /> }


        {thirddpage && 
        <Updatepage03 
        value={vehicleno} 
        ispagesubmitted={(e:Boolean) => { setthirddpage(!e)} } 
        isCorporateGlobal={isCorporateGlobal}                
        /> }

    </div>
  )
}


export default UpdateClient;
