'use client'
import React, { useState } from 'react'
import { useForm, Controller, FieldError  } from 'react-hook-form'
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
import { FileUplaod } from '@/app/components/Upload'
import { INSURANCE_TYPE } from '@/json/enums'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/navigation';

interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void
    isCorporateGlobal: Boolean
    back: (res:Boolean) => void
}

const Updatepage02:React.FC<iupdatevalue> = ( { value, ispagesubmitted, back } ) => {

    const router = useRouter();
    const [vehicleno, setVehicleno] = useState<String>(value);
const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
    variables: { vechicleId: vehicleno },
    }); 
const [isSubmitted, setisSubmitted] = useState(false);
const [OdPolicydocfile, setOdPolicydocfile] = useState<string | null>(gusrdatabyid.user_data_byid?.OD_Policy_Doc || '');
const [TpPolicyDocfile, setTpPolicyDocfile] = useState<string | null>(gusrdatabyid.user_data_byid?.TP_Policy_Doc || '');
const [isPolicyChecked, setPolicyChecked] = useState(false);
const [isFinalSubmit, setFinalSubmit] = useState<Boolean>(false);
const [isBack, setBack] = useState(false);

const handlePolicyCheckBox = (event: any) => {
    setPolicyChecked(event.target.checked);
  };

const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT_02);
const[addiProvider, { data:iproviderdata} ] = useMutation(ADD_INSURANCE_PROVIDER);
const[addTpInsuranceProvider, { data:tpproviderdata} ] = useMutation(ADD_TP_INSURANCE_PROVIDER);
const[addrto, { data:rtodata} ] = useMutation(ADD_RTO);
const { data:giproviderdata } = useQuery(GET_INSURANCE_PROVIDER, { pollInterval: 1000,}); 
const { data:gtpproviderdata } = useQuery(GET_TP_INSURANCE_PROVIDER, { pollInterval: 1000,});	
const { data:grtodata } = useQuery(GET_RTO, { pollInterval: 1000,}); 

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
            Insurance_dueDate: new Date(formValues?.Insurance_dueDate)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
			TP_Policy_No: (isPolicyChecked ? (formValues?.Policy_No || undefined) : (formValues?.TP_Policy_No || undefined)),   
            Insurance_Start: new Date(formValues?.Insurance_Start)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            //TP_Insurance_Start: new Date(formValues?.TP_Insurance_Start)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,  
            TP_Insurance_Start: new Date(isPolicyChecked ? formValues?.Insurance_Start : formValues?.TP_Insurance_Start)?.getTime() + 60 * 60 *1000 * 5.5  || undefined,
            TP_Policy_Doc: (isPolicyChecked ? (OdPolicydocfile || undefined) : (TpPolicyDocfile || undefined)),   
			TP_Insurance_provider: (isPolicyChecked ? (formValues?.Insurance_provider || undefined ): (formValues?.TP_Insurance_provider || undefined)),   
            //TP_dueDate: new Date(formValues?.TP_dueDate)?.getTime() + 60 * 60 *1000 * 5.5|| undefined,                     
            TP_dueDate: new Date(isPolicyChecked ? formValues?.Insurance_dueDate : formValues?.TP_dueDate)?.getTime() + 60 * 60 *1000 * 5.5  || undefined,
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
            if(isFinalSubmit){
                router.push('/clients')
                return;
            }
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
     <form  onSubmit={handleSubmit(onSubmit)}>     
     <div className='flex flex-col items-center justify-center'> 
 
         <div className='w-2/3 mb-5'>
         <Button 
         className='w-full'
         disabled={isSubmitted}
         onClick={() => {setFinalSubmit(true)}}
         > 
         Save and Submit {isSubmitted && <Spinner></Spinner>}
         </Button>   
         </div>
 
         <div className='w-2/3 mb-5'>
         <Button 
         className='w-full'
         disabled={isSubmitted}
         > Save and Next {isSubmitted && <Spinner></Spinner>}
         </Button>  
         </div>    

         <div className='w-2/3 mb-5'>
         <Button 
         type="button"
         className='w-full'
         disabled={isBack}
         onClick={() => {back(true); setBack(true)}}
         >Back {isBack && <Spinner></Spinner>}
         </Button>  
         </div>    
 
     <div className='w-2/3 max-w-md pb-2 text-slate-500 text-base' >                        
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
                <TextField.Input  
                {...register('Policy_No', {
                    maxLength: {
                    value: 30,
                    message: 'Policy number should be at most 30 characters'
                    }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                defaultValue={gusrdatabyid.user_data_byid?.Policy_No}
                />
            </TextField.Root>
            {errors.Policy_No && <p className="error text-red-600">{errors.Policy_No.message}</p>}
            <FileUplaod 
                name="OD_Policy_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setOdPolicydocfile(e)}                 
                placeholder=""                  
                value={OdPolicydocfile}                    
            />	   
            <DropDownControlWA 
                name="Insurance_provider"
                control={control}
                value={gusrdatabyid.user_data_byid?.Insurance_provider}
                placeholder=" Own Damage Insurance Provider:   "           
                options={giproviderdata && giproviderdata.INSURANCE_PROVIDER.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addiProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
            <DatePickerComponent 
                name="Insurance_Start"
                control={control}
                placeholder="Own Damage Insurance Starts From:  "                           
                selectedDate={gusrdatabyid.user_data_byid.Insurance_Start && new Date(gusrdatabyid.user_data_byid?.Insurance_Start)}     
                />  
             <DatePickerComponent 
                name="Insurance_dueDate"
                control={control}
                placeholder="Own Damage Insurance UpTo: "                           
                selectedDate={gusrdatabyid.user_data_byid.Insurance_dueDate && new Date(gusrdatabyid.user_data_byid?.Insurance_dueDate)}        
                />    
             <FormControlLabel
                control={<Checkbox checked={isPolicyChecked} onChange={handlePolicyCheckBox} />}
                label="TP Policy No is same as OD Policy No"
            />

             { !isPolicyChecked && <>
            <p>TP Policy No: </p>
            <TextField.Root>
            <TextField.Input
                {...register('TP_Policy_No', {
                maxLength: {
                    value: 30,
                    message: 'TP Policy number should be at most 30 characters'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                defaultValue={gusrdatabyid.user_data_byid?.TP_Policy_No}
            />
            </TextField.Root>
            {errors.TP_Policy_No && <p className="error text-red-600">{errors.TP_Policy_No.message}</p>}
            <FileUplaod 
                name="TP_Policy_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setTpPolicyDocfile(e)}                 
                placeholder=""                              
                value={TpPolicyDocfile}      
            />	              
            <DropDownControlWA 
                name="TP_Insurance_provider"
                control={control}
                value={gusrdatabyid.user_data_byid?.TP_Insurance_provider}
                placeholder="Third Party Insurance Provider:   "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <DatePickerComponent 
                name="TP_Insurance_Start"
                control={control}
                placeholder="Thrid Party Insurance Starts From: "                           
                selectedDate={gusrdatabyid.user_data_byid.TP_Insurance_Start && new Date(gusrdatabyid.user_data_byid?.TP_Insurance_Start)} 
                />            
           <DatePickerComponent 
                name="TP_dueDate"
                control={control}
                placeholder="TP Insurance Valid UpTo:  "                           
                selectedDate={gusrdatabyid.user_data_byid.TP_dueDate && new Date(gusrdatabyid.user_data_byid?.TP_dueDate)}           
            /> 
            </>  }
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
            <TextField.Input
                {...register('Unladen_Weight', {
                maxLength: {
                    value: 6,
                    message: 'Unladen Weight should be at most 6 characters'
                },
                pattern: {
                    value: /^\d{1,6}$/,
                    message: 'Unladen Weight should be at most a 6-digit number'
                }
                })}
                defaultValue={gusrdatabyid.user_data_byid?.Unladen_Weight}
            />
            </TextField.Root>
            {errors.Unladen_Weight && <p className="error text-red-600">{errors.Unladen_Weight.message}</p>}

            <p>Laden Weight (GVW): </p>
            <TextField.Root>
            <TextField.Input
                {...register('GVW', {
                pattern: {
                    value: /^\d{1,6}$/,
                    message: 'GVW should be at most a 6-digit number'
                }
                })}
                defaultValue={gusrdatabyid.user_data_byid?.GVW}
            />
            </TextField.Root>
            {errors.GVW && typeof errors.GVW === 'object' && 'message' in errors.GVW && (
            <p className="error text-red-600">{(errors.GVW as FieldError).message}</p>
            )}

            <p>Vehicle Body: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Vehicle_Body', {
                maxLength: {
                    value: 15,
                    message: 'Vehicle Body should be at most 15 characters'
                },
                pattern: {
                    value: /^[A-Za-z]*$/,
                    message: 'Vehicle Body should contain only alphabets'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Body}
            />
            </TextField.Root>
            {errors.Vehicle_Body && <p className="error text-red-600">{errors.Vehicle_Body.message}</p>}

            <p>Wheel Base: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Wheel_Base', {
                pattern: {
                    value: /^\d{1,6}$/,
                    message: 'Wheel Base should be at most a 6-digit number'
                }
                })}
                defaultValue={gusrdatabyid.user_data_byid?.Wheel_Base}
            />
            </TextField.Root>
            {errors.Wheel_Base && <p className="error text-red-600">{errors.Wheel_Base.message}</p>}

            <p>No Of Cylinder: </p>
            <TextField.Root>
            <TextField.Input
                {...register('No_Of_Cylinder', {
                pattern: {
                    value: /^\d{1,2}$/,
                    message: 'Number of Cylinders should be at most a 2-digit number'
                }
                })}
                defaultValue={gusrdatabyid.user_data_byid?.No_Of_Cylinder}
            />
            </TextField.Root>
            {errors.No_Of_Cylinder && <p className="error text-red-600">{errors.No_Of_Cylinder.message}</p>}

            <p>Sleeper Capacity: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Sleeper_Capacity', {
                pattern: {
                    value: /^\d{1,2}$/,
                    message: 'Sleeper Capacity should be at most a 2-digit number'
                }
                })}
                defaultValue={gusrdatabyid.user_data_byid?.Sleeper_Capacity}
            />
            </TextField.Root>
            {errors.Sleeper_Capacity && <p className="error text-red-600">{errors.Sleeper_Capacity.message}</p>}                

            </div>  

        <div className='w-2/3 mt-5'>
         <Button 
         type="button"
         className='w-full'
         disabled={isBack}
         onClick={() => {back(true); setBack(true)}}
         >Back {isBack && <Spinner></Spinner>}
         </Button>  
         </div>    

            <div className='w-2/3 mt-5'>
            <Button 
            className='w-full'
            disabled={isSubmitted}
            > Save and Next {isSubmitted && <Spinner></Spinner>}
            </Button>  
            </div>

            <div className='w-2/3 mb-5 mt-5'>
            <Button 
            className='w-full'
            disabled={isSubmitted}
            onClick={() => {setFinalSubmit(true)}}
            > 
            Save and Submit {isSubmitted && <Spinner></Spinner>}
            </Button>   
            </div>

        </div>
     </form>    
    </> 
    )
}

export default Updatepage02