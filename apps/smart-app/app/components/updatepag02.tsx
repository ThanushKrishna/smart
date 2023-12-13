'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    UPDATE_CLIENT_02, 
    ADD_RTO,    
    ADD_INSURANCE_PROVIDER, 
    ADD_TP_INSURANCE_PROVIDER
    } from '@/graphql/queries'
import {     
    GET_USER_DATA_BYID,
    GET_RTO, GET_INSURANCE_PROVIDER, 
    GET_TP_INSURANCE_PROVIDER
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { uploadfile } from '@/app/functions/uploadfile'
import { INSURANCE_TYPE } from '@/json/enums'


interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void
}

const Updatepage02:React.FC<iupdatevalue> = ( { value, ispagesubmitted } ) => {

const [vehicleno, setVehicleno] = useState<String>(value);
const [isSubmitted, setisSubmitted] = useState(false);
const [OdPolicydocfile, setOdPolicydocfile] = useState<String | null>(null);
const [TpPolicyDocfile, setTpPolicyDocfile] = useState<String | null>(null);


const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT_02);
const[addiProvider, { data:iproviderdata} ] = useMutation(ADD_INSURANCE_PROVIDER);
const[addTpInsuranceProvider, { data:tpproviderdata} ] = useMutation(ADD_TP_INSURANCE_PROVIDER);
const[addrto, { data:rtodata} ] = useMutation(ADD_RTO);
const { data:giproviderdata } = useQuery(GET_INSURANCE_PROVIDER, { pollInterval: 1000,}); 
const { data:gtpproviderdata } = useQuery(GET_TP_INSURANCE_PROVIDER, { pollInterval: 1000,});	
const { data:grtodata } = useQuery(GET_RTO, { pollInterval: 1000,}); 



const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
    variables: { vechicleId: vehicleno },
    }); 

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});




const onSubmit = async (formValues: AddClientType) => {     

    
    try{
        setisSubmitted(true)                     

        const result = {
            id: gusrdatabyid.user_data_byid.id,
			Insurance_type: formValues?.Insurance_type || undefined,            			
			Policy_No: formValues?.Policy_No || undefined,
			OD_Policy_Doc: OdPolicydocfile || undefined,
			Insurance_provider: formValues?.Insurance_provider || undefined,
            Insurance_dueDate: formValues?.Insurance_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
			TP_Policy_No: formValues?.TP_Policy_No || undefined, 
            Insurance_Start: formValues?.Insurance_Start?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            TP_Insurance_Start: formValues?.TP_Insurance_Start?.getTime() + 60 * 60 *1000 * 5.5 || undefined,            
            TP_Policy_Doc: TpPolicyDocfile || undefined,
			TP_Insurance_provider: formValues?.TP_Insurance_provider || undefined,
            TP_dueDate: formValues?.TP_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,            
			RTO: formValues?.RTO || undefined,
			Unladen_Weight: formValues?.Unladen_Weight || undefined, 
			GVW: formValues?.GVW || undefined,            
			Vehicle_Body: formValues?.Vehicle_Body || undefined,
			Wheel_Base: formValues?.Wheel_Base || undefined,
			No_Of_Cylinder: formValues?.No_Of_Cylinder || undefined,
			Sleeper_Capacity: formValues?.Sleeper_Capacity || undefined,
        }
        
        console.log( result );
        updateclient( { variables: { input: result}})
        .then(()=> {        
        ispagesubmitted(true);
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));        
          ispagesubmitted(false);          
        })

        if(updateclienterror) {            
            console.log(JSON.stringify(updateclienterror, null, 2));
        }
        
    }   
    catch(e: any){        
        console.log("This is try-catch-error block");
        console.log(e?.message);
        setisSubmitted(false); 
        ispagesubmitted(false); 
    }   
    
}


  return (
   <>
        <form className='grid-cols-3 max-w-md pb-2 text-slate-500 text-base' onSubmit={handleSubmit(onSubmit)}>                                      
        <p>Vehicle Registration Number:</p>
            <TextField.Root >
            <TextField.Input { ...register('Vehicle_No')} defaultValue={gusrdatabyid.user_data_byid?.Vehicle_No} disabled={true}/>
            </TextField.Root>                                 
             <DropDownControl 
             name="Insurance_type"
             control={control}
             value={gusrdatabyid.user_data_byid?.Insurance_type}  
             placeholder="Insurance Type:   "           
             options={INSURANCE_TYPE}              
            />      
            <p>OD Policy No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Policy_No')} defaultValue={gusrdatabyid.user_data_byid?.Policy_No}/>
            </TextField.Root>
            <FileUplaod 
                name="OD_Policy_Doc"
                control={control}     
                onSelectFile={(e:String | null) => setOdPolicydocfile(e)}                 
                placeholder=""                  
                value={(gusrdatabyid.user_data_byid?.OD_Policy_Doc || '') + (OdPolicydocfile || '')}                    
            />	   
            <DropDownControlWA 
                name="Insurance_provider"
                control={control}
                value={gusrdatabyid.user_data_byid?.Insurance_provider}
                placeholder=" Own Damage Insurance Provider:   "           
                options={giproviderdata && giproviderdata.INSURANCE_PROVIDER.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addiProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
             <Controller
                name="Insurance_Start"
                control={control}        
                defaultValue={gusrdatabyid.user_data_byid.Insurance_Start && new Date(gusrdatabyid.user_data_byid?.Insurance_Start)}     
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Own Damage Insurance Starts From: "
                />)}
            />
             <Controller
                name="Insurance_dueDate"
                control={control}     
                defaultValue={gusrdatabyid.user_data_byid.Insurance_dueDate && new Date(gusrdatabyid.user_data_byid?.Insurance_dueDate)}        
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Own Damage Insurance UpTo: "
                />)}
            />         
            <p>TP Policy No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('TP_Policy_No')} defaultValue={gusrdatabyid.user_data_byid?.TP_Policy_No}/>
            </TextField.Root>
            <FileUplaod 
                name="TP_Policy_Doc"
                control={control}     
                onSelectFile={(e:String | null) => setTpPolicyDocfile(e)}                 
                placeholder=""                              
                value={(gusrdatabyid.user_data_byid?.TP_Policy_Doc || '') + (TpPolicyDocfile || '')}      
            />	              
            <DropDownControlWA 
                name="TP_Insurance_provider"
                control={control}
                value={gusrdatabyid.user_data_byid?.TP_Insurance_provider}
                placeholder="Third Party Insurance Provider:   "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <Controller
                name="TP_Insurance_Start"
                control={control}       
                defaultValue={gusrdatabyid.user_data_byid.TP_Insurance_Start && new Date(gusrdatabyid.user_data_byid?.TP_Insurance_Start)}      
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Thrid Party Insurance Starts From: "
                />)}
            />              
            <Controller
                name="TP_dueDate"
                control={control}  
                defaultValue={gusrdatabyid.user_data_byid.TP_dueDate && new Date(gusrdatabyid.user_data_byid?.TP_dueDate)}           
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Thrid Party Insurance UpTo: "
                />)}
            />        
            <DropDownControlWA 
                name="RTO"
                control={control}     
                value={gusrdatabyid.user_data_byid?.RTO}       
                placeholder="Registering Authority:   "           
                options={grtodata && grtodata.RTO.map((data:any) => (data.value)) }           
                onOptionAdd= {async (e: String) => await (addrto( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
            />        
            <p>Unladen Weight: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Unladen_Weight')} defaultValue={gusrdatabyid.user_data_byid?.Unladen_Weight}/>
            </TextField.Root> 
            <p>Laden Weight (GVW): </p>
            <TextField.Root>
            <TextField.Input  { ...register('GVW')} defaultValue={gusrdatabyid.user_data_byid?.GVW}/>
            </TextField.Root>      
            <p>Vehicle Body: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Vehicle_Body')} defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Body}/>
            </TextField.Root> 
            <p>Wheel Base: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Wheel_Base')} defaultValue={gusrdatabyid.user_data_byid?.Wheel_Base}/>
            </TextField.Root> 
            <p>No Of Cylinder: </p>
            <TextField.Root>
            <TextField.Input  { ...register('No_Of_Cylinder')} defaultValue={gusrdatabyid.user_data_byid?.No_Of_Cylinder}/>
            </TextField.Root> 
            <p>Sleeper Capacity: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Sleeper_Capacity')} defaultValue={gusrdatabyid.user_data_byid?.Sleeper_Capacity}/>
            </TextField.Root> 
            
            <br/>
            <Button disabled={isSubmitted}> Save and Next {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>    
    </> 
  )
}

export default Updatepage02