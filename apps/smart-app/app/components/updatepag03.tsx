'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    UPDATE_CLIENT_03,    
    ADD_CC, 
    ADD_PERMIT_CATEGORY, ADD_CUSTOMER_TYPE,    
    } from '@/graphql/queries'
import {     
    GET_USER_DATA_BYID,     
    GET_CC, GET_CUSTOMER_TYPE,
    GET_PERMIT_CATEGORY, 
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { uploadfile } from '@/app/functions/uploadfile'
import { OWNER_TYPE, MARITAL_STATUS } from '@/json/enums'

interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void
}

const Updatepage03: React.FC<iupdatevalue> = ( { value, ispagesubmitted } ) => {

const router = useRouter();
const [vehicleno, setVehicleno] = useState<String>(value);
const [isSubmitted, setisSubmitted] = useState(false);
const [panfile, setpanfile] = useState<String | null>(null);
const [adharfile, setadharfile] = useState<String | null>(null);
const [GstCerfile, setGstCerfile] = useState<String | null>(null);

const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
    variables: { vechicleId: vehicleno },
    }); 
const { data:gccdata } = useQuery(GET_CC, { pollInterval: 1000,}); 
const { data:gpermitdata, error:gpermiterror } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
const { data:gCusTypedata } = useQuery(GET_CUSTOMER_TYPE, { pollInterval: 1000,}); 	

const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT_03);
const[addcc, { data:ccdata} ] = useMutation(ADD_CC);
const[addPermitCategory, { data:permitdata} ] = useMutation(ADD_PERMIT_CATEGORY);
const[addCusType, { data:custtypedata} ] = useMutation(ADD_CUSTOMER_TYPE);

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});


const onSubmit = async (formValues: AddClientType) => {     

    try{
        setisSubmitted(true)                     

        const result = {
            id: gusrdatabyid.user_data_byid.id,
			Owner_dob: formValues?.Owner_dob?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Ownership_type: formValues?.Ownership_type || undefined,            
            Year_of_manufacuring: formValues?.Year_of_manufacuring?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            FC_due_Date: formValues?.FC_due_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,           
            Address: formValues?.Address || undefined,
            CC: formValues?.CC || undefined,
            Permit_No: formValues?.Permit_No || undefined,
            Permit_category: formValues?.Permit_category || undefined,
            Mobile_No1: formValues?.Mobile_No1 || undefined,
            Mobile_No2: formValues?.Mobile_No2 || undefined,
            Mobile_No3: formValues?.Mobile_No3 || undefined,
            Email_id: formValues?.Email_id || undefined,
            Adhar_No: formValues?.Adhar_No || undefined,
            Adhar_doc: adharfile || undefined,
            PanCard_No: formValues?.PanCard_No || undefined,
            Pan_doc: panfile || undefined,
            Nominee: formValues?.Nominee || undefined,
            Nominee_Relationship: formValues?.Nominee_Relationship || undefined,
            Nominee_dob: formValues?.Nominee_dob?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Emission_dueDate: formValues?.Emission_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,                        
            RTO: formValues?.RTO || undefined,
            Referred_by: formValues?.Referred_by || undefined,
            Comments: formValues?.Comments || undefined,
            Customer_type: formValues?.Customer_type || undefined,
            Martial_status: formValues?.Martial_status || undefined,
            GST_No: formValues?.GST_No || undefined,
            PUCC_Emission_No: formValues?.PUCC_Emission_No || undefined,
            updated_by: formValues?.updated_by || undefined,            
            GST_Cer_Doc: GstCerfile || undefined,                        
        }
        
        console.log( result );
        updateclient( { variables: { input: result}})
        .then(()=> {        
        ispagesubmitted(true);
        router.push('/clients')
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
             <Controller
             name="Owner_dob"
             control={control}       
             defaultValue={gusrdatabyid.user_data_byid.Owner_dob && new Date(gusrdatabyid.user_data_byid?.Owner_dob)}      
             render={({ field }) => (
             <DatePickerComponent 
             {...field} 
             placeholder="Owner DOB: "
             />)}
            />   
            <DropDownControl 
                name="Martial_status"
                control={control}
                value={gusrdatabyid.user_data_byid?.Martial_status}  
                placeholder="Marital Staus:   "           
                options={MARITAL_STATUS}              
            />                 
            <DropDownControl 
                name="Ownership_type"
                control={control}
                value={gusrdatabyid.user_data_byid?.Ownership_type}  
                placeholder="Owner Type:   "                                      
                options={OWNER_TYPE}
            />                        
            <Controller
                name="Year_of_manufacuring"
                control={control}         
                defaultValue={gusrdatabyid.user_data_byid.Year_of_manufacuring && new Date(gusrdatabyid.user_data_byid?.Year_of_manufacuring)}    
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Manufacturing Date: "
                />)}
            />                 
            <Controller
                name="FC_due_Date"
                control={control} 
                defaultValue={gusrdatabyid.user_data_byid.FC_due_Date && new Date(gusrdatabyid.user_data_byid?.FC_due_Date)}            
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="REG/FC UpTo: "
                />)}
            />                                                 
            <DropDownControlWA 
                name="CC"
                control={control}       
                value={gusrdatabyid.user_data_byid?.CC}     
                placeholder="CC:   "           
                options={gccdata && gccdata.CC.map((data:any) => (data.value)) }           
                onOptionAdd= {async (e: String) => await (addcc( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
            />                       
            <p>Permit No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Permit_No')} defaultValue={gusrdatabyid.user_data_byid?.Permit_No}/>
            </TextField.Root>
            <DropDownControlWA 
                name="Permit_category"
                control={control}
                value={gusrdatabyid.user_data_byid?.Permit_category}
                placeholder="Permit Category:   "           
                options={gpermitdata && gpermitdata.PERMIT_CATEGORY.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addPermitCategory( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            {gpermiterror && <p> {gpermiterror.message} </p>}
            <p>1st Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No1')} defaultValue={gusrdatabyid.user_data_byid?.Mobile_No1}/>
            </TextField.Root>
            <p>2nd Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No2')} defaultValue={gusrdatabyid.user_data_byid?.Mobile_No2}/>
            </TextField.Root>
            <p>3rd Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No3')} defaultValue={gusrdatabyid.user_data_byid?.Mobile_No3}/>
            </TextField.Root>
            <p>Email Id: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Email_id')} defaultValue={gusrdatabyid.user_data_byid?.Email_id}/>
            </TextField.Root>
            <p>Aadhar Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Adhar_No')} defaultValue={gusrdatabyid.user_data_byid?.Adhar_No}/>
            </TextField.Root>                     
            <FileUplaod 
                name="Adhar_doc"
                control={control}     
                onSelectFile={(e:String | null) => setadharfile(e)}                      
                placeholder=""        
                value={gusrdatabyid.user_data_byid?.Adhar_doc + adharfile}                  
            />
            <p>PAN Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('PanCard_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="Pan_doc"
                control={control}
                onSelectFile={(e:String | null) => setpanfile(e)}                
                placeholder=""             
                value={gusrdatabyid.user_data_byid?.Pan_doc + panfile}             
            />
            <p>Nominee Name: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee')} defaultValue={gusrdatabyid.user_data_byid?.Nominee}/>
            </TextField.Root>
            <p>Nominee Relationship: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee_Relationship')} defaultValue={gusrdatabyid.user_data_byid?.Nominee_Relationship}/>
            </TextField.Root>
            <Controller
                name="Nominee_dob"
                control={control}      
                defaultValue={gusrdatabyid.user_data_byid.Nominee_dob && new Date(gusrdatabyid.user_data_byid?.Nominee_dob)}           
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Nominee DOB: "
                />)}
            /> 
            <p>PUC/Emission Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('PUCC_Emission_No')} defaultValue={gusrdatabyid.user_data_byid?.PUCC_Emission_No}/>
            </TextField.Root>
            <Controller
                name="Emission_dueDate"
                control={control}     
                defaultValue={gusrdatabyid.user_data_byid.Emission_dueDate && new Date(gusrdatabyid.user_data_byid?.Emission_dueDate)}        
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="PUC/Emission UpTo: "
                />)}
            />      
            <p className='mt-3'>GST No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('GST_No')} defaultValue={gusrdatabyid.user_data_byid?.GST_No}/>        
            </TextField.Root>  
            <FileUplaod 
                name="GST_Cer_Doc"
                control={control}
                onSelectFile={(e:String | null) => setGstCerfile(e)}                
                placeholder=""        
                value={gusrdatabyid.user_data_byid?.GST_Cer_Doc + GstCerfile}                  
            />                                                                                                                         
            <p>Address: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Address.street')} placeholder='Street' defaultValue={gusrdatabyid.user_data_byid?.Address?.street}/>
            </TextField.Root>       
            <TextField.Root>
            <TextField.Input  { ...register('Address.city')} defaultValue={gusrdatabyid.user_data_byid?.Address?.city}/>
            </TextField.Root>       
            <TextField.Root>
            <TextField.Input  { ...register('Address.state')} defaultValue={gusrdatabyid.user_data_byid?.Address?.state}/>
            </TextField.Root>       
            <TextField.Root>
            <TextField.Input  { ...register('Address.zip')} defaultValue={gusrdatabyid.user_data_byid?.Address?.zip}/>
            </TextField.Root>       
            <p>Referred by: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Referred_by')} defaultValue={gusrdatabyid.user_data_byid?.Referred_by}/>
            </TextField.Root>
            <p>Updated by: </p>
            <TextField.Root>
            <TextField.Input  { ...register('updated_by')} defaultValue={gusrdatabyid.user_data_byid?.updated_by}/>
            </TextField.Root>
            <DropDownControlWA 
                name="Customer_type"
                control={control}
                value={gusrdatabyid.user_data_byid?.Customer_type}
                placeholder="Policy Issued Through:  "           
                options={gCusTypedata && gCusTypedata.CUSTOMER_TYPE.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addCusType( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />                        
            <p className='mt-3'>Comments: </p>
            <TextArea  { ...register('Comments')} defaultValue={gusrdatabyid.user_data_byid?.Comments}/>
            <br/>
            <Button disabled={isSubmitted}> Update {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>
    
    </> 
  )
}

export default Updatepage03