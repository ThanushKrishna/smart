'use client'
import React, { useState } from 'react'
import Updatepage01 from '../../components/updatepag01'
import Updatepage02 from '../../components/updatepag02'
import Updatepage03 from '../../components/updatepag03'
import { useQuery } from '@apollo/client';
import { GET_USER_DATA_BYID } from '@/graphql/queries'

const updateClient:React.FC = () => {
   

        const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
        const [vehicleno, setVehicleno] = useState<String>("");   
        const [secndpage, setsecndpage ] = useState<Boolean>(false);
        const [thirddpage, setthirddpage ] = useState<Boolean>(false);

        const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
            variables: { vechicleId: vehicleno },
            }); 

        const handleVehicleNoSubmit = async () => {
            console.log("This is handleVehicleNoSubmit");
            console.log(vehicleno);    
            if(await gusrdatabyid ){
                setVehicleNoprovided(true);
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
    
    {gusrbyidload && <p>Loading...</p>}
    {gusrbyiderror && <p>{gusrbyiderror.message}</p>}

            { isVehicleNoprovided && <Updatepage01 value={vehicleno} ispage1submitted={(e:Boolean) => (setsecndpage(e))} /> }
            {secndpage && <Updatepage02/> }
            {thirddpage && <Updatepage03/>}

    </div>
  )
}


export default updateClient;
