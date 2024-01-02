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
    ADD_TP_INSURANCE_PROVIDER,
    GET_UNLADEN_WEIGHT_BY_VALUE,
    ADD_UNLADEN_WEIGHT,
    GET_VEHICLE_BODY_BY_VALUE,
    ADD_VEHICLE_BODY,
    ADD_WHEEL_BASE,
    GET_WHEEL_BASE_BY_VALUE,
    GET_NO_OF_CYLINDER_BY_VALUE,
    ADD_NO_OF_CYLINDER,
    ADD_GVW,    
    GET_GVW_BY_VALUE
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
import { Checkbox, FormControlLabel, TextField as MyTextField  } from '@mui/material';
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
const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid, refetch } = useQuery(GET_USER_DATA_BYID, {
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
const [addUnladenWeight, { data: unladenWeightData }] = useMutation(ADD_UNLADEN_WEIGHT);
const { data: gunladenWeightData } = useQuery(GET_UNLADEN_WEIGHT_BY_VALUE, {variables: { input: "" }, });
const [addLadenWeight, { data: ladenWeightData }] = useMutation(ADD_GVW);
const { data: gvwData } = useQuery(GET_GVW_BY_VALUE, {variables: { input: "" }, });

const [addVehicleBody, { data: vehicleBodyData }] = useMutation(ADD_VEHICLE_BODY);
const { data: vehicleBodyOptions } = useQuery(GET_VEHICLE_BODY_BY_VALUE, { variables: { input: "" } });
const [addWheelBase, { data: wheelBaseData }] = useMutation(ADD_WHEEL_BASE);
const { data: wheelBaseOptions } = useQuery(GET_WHEEL_BASE_BY_VALUE, { variables: { input: "" } });
const [addNoOfCylinders, { data: noOfCylindersData }] = useMutation(ADD_NO_OF_CYLINDER);
const { data: noOfCylindersOptions } = useQuery(GET_NO_OF_CYLINDER_BY_VALUE, { variables: { input: "" } });
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
        }
        
        console.log( result );
        updateclient( { variables: { input: result}})
        .then(()=> {        
            refetch();
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
     <div className='font-bold'> 
 
         <div className='mb-5'>
         <Button 
         className='w-full'
         disabled={isSubmitted}
         onClick={() => {setFinalSubmit(true)}}
         > 
         Save and Submit {isSubmitted && <Spinner></Spinner>}
         </Button>   
         </div>
 
         <div className='mb-5'>
         <Button 
         className='w-full'
         disabled={isSubmitted}
         > Save and Next {isSubmitted && <Spinner></Spinner>}
         </Button>  
         </div>    

         <div className='mb-5'>
         <Button          
         className='w-full'
         disabled={isBack}
         onClick={() => {back(true); setBack(true)}}
         >Back {isBack && <Spinner></Spinner>}
         </Button>  
         </div>    
 
         <div  className='text-slate-500 text-base grid grid-cols-5 gap-5 ml-10 mr-10 font-bold'>                            
        
            <div>                     
            <p>Vehicle Registration Number:</p>           
            <MyTextField sx={{ width: '80%' }} { ...register('Vehicle_No')} defaultValue={gusrdatabyid.user_data_byid?.Vehicle_No} disabled={true}/>
            </div>

            <div>                                
             <DropDownControl 
             name="Insurance_type"
             control={control}
             value={gusrdatabyid.user_data_byid?.Insurance_type}  
             placeholder="Insurance Type:   "           
             options={INSURANCE_TYPE}              
            />   
            </div>

            <div>
            <p>OD Policy No: </p>
           
                <MyTextField sx={{ width: '80%' }}  
                {...register('Policy_No', {
                    maxLength: {
                    value: 30,
                    message: 'Policy number should be at most 30 characters'
                    }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                defaultValue={gusrdatabyid.user_data_byid?.Policy_No}
                />
           
            {errors.Policy_No && <p className="error text-red-600">{errors.Policy_No.message}</p>}
            <FileUplaod 
                name="OD_Policy_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setOdPolicydocfile(e)}                 
                placeholder=""                  
                value={OdPolicydocfile}                    
            />	
            </div>   
            
            <div>
            <DropDownControlWA 
                name="Insurance_provider"
                control={control}
                value={gusrdatabyid.user_data_byid?.Insurance_provider}
                placeholder=" Own Damage Insurance Provider:   "           
                options={giproviderdata && giproviderdata.INSURANCE_PROVIDER?.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addiProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
            </div>   

            <div>
            <DatePickerComponent 
                name="Insurance_Start"
                control={control}
                placeholder="Own Damage Insurance Starts From:  "                           
                selectedDate={gusrdatabyid.user_data_byid.Insurance_Start && new Date(gusrdatabyid.user_data_byid?.Insurance_Start)}     
                />  
            </div>

            <div>
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
            </div>

             { !isPolicyChecked && <div>
            <p>TP Policy No: </p>
           
            <MyTextField sx={{ width: '80%' }}
                {...register('TP_Policy_No', {
                maxLength: {
                    value: 30,
                    message: 'TP Policy number should be at most 30 characters'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                defaultValue={gusrdatabyid.user_data_byid?.TP_Policy_No}
            />
           
            {errors.TP_Policy_No && <p className="error text-red-600">{errors.TP_Policy_No.message}</p>}
            <FileUplaod 
                name="TP_Policy_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setTpPolicyDocfile(e)}                 
                placeholder=""                              
                value={TpPolicyDocfile}      
            />	
            </div>}

            { !isPolicyChecked && <div>
            <DropDownControlWA 
                name="TP_Insurance_provider"
                control={control}
                value={gusrdatabyid.user_data_byid?.TP_Insurance_provider}
                placeholder="Third Party Insurance Provider:   "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER?.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            </div>}

            { !isPolicyChecked && <div>
            <DatePickerComponent 
                name="TP_Insurance_Start"
                control={control}
                placeholder="Thrid Party Insurance Starts From: "                           
                selectedDate={gusrdatabyid.user_data_byid.TP_Insurance_Start && new Date(gusrdatabyid.user_data_byid?.TP_Insurance_Start)} 
                />   
            </div> }

            { !isPolicyChecked && <div>         
           <DatePickerComponent 
                name="TP_dueDate"
                control={control}
                placeholder="TP Insurance Valid UpTo:  "                           
                selectedDate={gusrdatabyid.user_data_byid.TP_dueDate && new Date(gusrdatabyid.user_data_byid?.TP_dueDate)}           
            /> 
            </div>  }

            <div>
            <DropDownControlWA 
                name="RTO"
                control={control}     
                value={gusrdatabyid.user_data_byid?.RTO}       
                placeholder="Registering Authority:   "           
                options={grtodata && grtodata.RTO?.map((data:any) => (data.value)) }           
                onOptionAdd= {async (e: String) => await (addrto( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
            />    
            </div>

            <div>
            <DropDownControlWA 
                name="Unladen_Weight"
                control={control}
                value={gusrdatabyid.user_data_byid?.Unladen_Weight}
                placeholder="Unladen Weight: "
                options={gunladenWeightData && gunladenWeightData.UNLADEN_WEIGHT_BY_VALUE?.map((data: any) => data.value) || []}
                onOptionAdd={async (e: String) => await addUnladenWeight({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_UNLADEN_WEIGHT_BY_VALUE, variables: { input: "" } }] })}
            />
            </div>

           <div>
           <DropDownControlWA 
                name="GVW"
                control={control}
                value={gusrdatabyid.user_data_byid?.GVW}
                placeholder="Laden Weight(GVW): "
                options={gvwData && gvwData.GVW_BY_VALUE?.map((data: any) => data.value) || []}
                onOptionAdd={async (e: String) => await addLadenWeight({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_GVW_BY_VALUE, variables: { input: "" } }] })}
            />
           </div>

           <div>
           <DropDownControlWA 
                name="Vehicle_Body"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_Body}
                placeholder="Vehicle Body: "
                options={vehicleBodyOptions && vehicleBodyOptions.VEHICLE_BODY_BY_VALUE?.map((data: any) => data.value) || []}
                onOptionAdd={async (e: String) => await addVehicleBody({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_VEHICLE_BODY_BY_VALUE, variables: { input: "" } }] })}
            />
           </div>

            <div>
            <DropDownControlWA 
                name="Wheel_Base"
                control={control}
                value={gusrdatabyid.user_data_byid?.Wheel_Base}
                placeholder="Wheel Base: "
                options={wheelBaseOptions && wheelBaseOptions.WHEEL_BASE_BY_VALUE?.map((data: any) => data.value) || []}
                onOptionAdd={async (e: String) => await addWheelBase({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_WHEEL_BASE_BY_VALUE, variables: { input: "" } }] })}
            />
            </div>

           <div>
           <DropDownControlWA 
                name="No_Of_Cylinder"
                control={control}
                value={gusrdatabyid.user_data_byid?.No_Of_Cylinder}
                placeholder="No. of Cylinders: "
                options={noOfCylindersOptions && noOfCylindersOptions.NO_OF_CYLINDER_BY_VALUE?.map((data: any) => data.value) || []}
                onOptionAdd={async (e: String) => await addNoOfCylinders({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_NO_OF_CYLINDER_BY_VALUE, variables: { input: "" } }] })}
            />
            </div>
                    

            </div>  

            <div className='mt-5'>
            <Button          
            className='w-full'
            disabled={isBack}
            onClick={() => {back(true); setBack(true)}}
            >Back {isBack && <Spinner></Spinner>}
            </Button>  
            </div>    

            <div className='mt-5'>
            <Button 
            className='w-full'
            disabled={isSubmitted}
            > Save and Next {isSubmitted && <Spinner></Spinner>}
            </Button>  
            </div>

            <div className='mb-5 mt-5'>
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