'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    UPDATE_CLIENT, 
    ADD_VEHICLE_COLORS,
    ADD_VEHICE_NORMS,
    ADD_CC, ADD_RTO,
    ADD_MAKE, ADD_STANDING_CAPACITY,
    ADD_MODEL, ADD_SEATING_CAPACITY,
    ADD_INSURANCE_PROVIDER, ADD_VEHICLE_DESCRIPTION,
    ADD_PERMIT_CATEGORY, ADD_CUSTOMER_TYPE,
    ADD_TP_INSURANCE_PROVIDER, ADD_VEHICLE_CLASS
    } from '@/graphql/queries'
import {     
    GET_USER_DATA_BYID,
    GET_VEHICLE_COLORS,
    GET_VEHICLE_NORMS,  
    GET_CC, GET_RTO,
    GET_MAKE, GET_STANDING_CAPACITY,
    GET_MODEL, GET_VEHICLE_CLASS,
    GET_INSURANCE_PROVIDER, GET_CUSTOMER_TYPE,
    GET_PERMIT_CATEGORY, GET_VEHICLE_DESCRIPTION,
    GET_TP_INSURANCE_PROVIDER, GET_SEATING_CAPACITY
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { uploadfile } from '@/app/functions/uploadfile'
import { OWNER_TYPE, FUEL_TYPE, MARITAL_STATUS, INSURANCE_TYPE } from '@/json/enums'


const UpdateClient:React.FC = () => {

const router = useRouter();

const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT);
const[addVehicleColor, { data:colordata} ] = useMutation(ADD_VEHICLE_COLORS);
const[addVehicleNorms, { data:normsdata} ] = useMutation(ADD_VEHICE_NORMS);
const[addcc, { data:ccdata} ] = useMutation(ADD_CC);
const[addMake, { data:makedata} ] = useMutation(ADD_MAKE);
const[addModel, { data:modeldata} ] = useMutation(ADD_MODEL);
const[addiProvider, { data:iproviderdata} ] = useMutation(ADD_INSURANCE_PROVIDER);
const[addPermitCategory, { data:permitdata} ] = useMutation(ADD_PERMIT_CATEGORY);
const[addTpInsuranceProvider, { data:tpproviderdata} ] = useMutation(ADD_TP_INSURANCE_PROVIDER);
const[addCusType, { data:custtypedata} ] = useMutation(ADD_CUSTOMER_TYPE);
const[addVehclass, { data:vehicleclassdata} ] = useMutation(ADD_VEHICLE_CLASS);
const[addVehDes, { data:vehicledescdata} ] = useMutation(ADD_VEHICLE_DESCRIPTION);
const[addSeatCap, { data:seatcapdata} ] = useMutation(ADD_SEATING_CAPACITY);
const[addStanCap, { data:standcapdata} ] = useMutation(ADD_STANDING_CAPACITY);
const[addrto, { data:rtodata} ] = useMutation(ADD_RTO);

const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
const [vehicleno, setVehicleno] = useState<String>("");

const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
    variables: { vechicleId: vehicleno },
    }); 
const { data:gcolorsdata } = useQuery(GET_VEHICLE_COLORS, { pollInterval: 1000,}); 
const { data:gnormsdata } = useQuery(GET_VEHICLE_NORMS, { pollInterval: 1000,}); 
const { data:gccdata } = useQuery(GET_CC, { pollInterval: 1000,}); 
const { data:gmakedata } = useQuery(GET_MAKE, { pollInterval: 1000,}); 
const { data:gmodeldata } = useQuery(GET_MODEL, { pollInterval: 1000,}); 
const { data:giproviderdata } = useQuery(GET_INSURANCE_PROVIDER, { pollInterval: 1000,}); 
const { data:gpermitdata, error:gpermiterror } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
const { data:gtpproviderdata } = useQuery(GET_TP_INSURANCE_PROVIDER, { pollInterval: 1000,});
const { data:gCusTypedata } = useQuery(GET_CUSTOMER_TYPE, { pollInterval: 1000,}); 	
const { data:gVehDesdata } = useQuery(GET_VEHICLE_DESCRIPTION, { pollInterval: 1000,}); 	
const { data:gSeatCapdata } = useQuery(GET_SEATING_CAPACITY, { pollInterval: 1000,}); 	
const { data:gStanCapdata } = useQuery(GET_STANDING_CAPACITY, { pollInterval: 1000,}); 	
const { data:gVehclassdata } = useQuery(GET_VEHICLE_CLASS, { pollInterval: 1000,}); 	
const { data:grtodata } = useQuery(GET_RTO, { pollInterval: 1000,}); 


const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});


const [isSubmitted, setisSubmitted] = useState(false);
const [ispandocProvided, setpandocProvided] = useState<Boolean>(false);
const [panfile, setpanfile] = useState<FileList | null>(null);
const [isadhardocProvided, setadhardocProvided] = useState<Boolean>(false);
const [adharfile, setadharfile] = useState<FileList | null>(null);
const [isVehRegDocProvided, setVehRegDocProvided] = useState<Boolean>(false);
const [VehRegDocfile, setVehRegDocfile] = useState<FileList | null>(null);
const [isOdPolicydocProvided, setOdPolicydocProvided] = useState<Boolean>(false);
const [OdPolicydocfile, setOdPolicydocfile] = useState<FileList | null>(null);
const [isTpPolicyDocProvided, setTpPolicyDocProvided] = useState<Boolean>(false);
const [TpPolicyDocfile, setTpPolicyDocfile] = useState<FileList | null>(null);
const [isGstCerdocProvided, setGstCerdocProvided] = useState<Boolean>(false);
const [GstCerfile, setGstCerfile] = useState<FileList | null>(null);


const onSubmit = async (formValues: AddClientType) => {     

    const adharuploadlink = async () => {
        if(isadhardocProvided && adharfile)
          return  await uploadfile(adharfile, formValues?.Adhar_doc); 
        return;
      }      
    const panuploadlink = async () => {
        if(ispandocProvided && panfile)
          return  await uploadfile(panfile, formValues?.Pan_doc); 
        return;
      }        
    const VehicleRegistrationuploadlink = async () => {
        if(isVehRegDocProvided && VehRegDocfile )
          return  await uploadfile(VehRegDocfile, formValues?.Vehicle_Reg_Doc); 
        return;
      }
      
    const OdPolicyyuploadlink = async () => {
            if(isOdPolicydocProvided && OdPolicydocfile)
            return  await uploadfile(OdPolicydocfile, formValues?.OD_Policy_Doc); 
            return;
        } 
    const TpPolicyuploadlink = async () => {
            if(isTpPolicyDocProvided && TpPolicyDocfile)
            return  await uploadfile(TpPolicyDocfile, formValues?.TP_Policy_Doc); 
            return;
        } 
    const GstCeruploadlink = async () => {
            if(isGstCerdocProvided && GstCerfile)
            return  await uploadfile(GstCerfile, formValues?.GST_Cer_Doc); 
            return;
        } 	
    
    try{
        setisSubmitted(true)                     

        const result = {
            id: gusrdatabyid.user_data_byid.id,
            Vehicle_No: formValues?.Vehicle_No || undefined,            
            RC_No: formValues?.RC_No || undefined,
            Registered_Date: formValues?.Registered_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,                       
            Owner: formValues?.Owner || undefined,
            Owner_dob: formValues?.Owner_dob?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Ownership_type: formValues?.Ownership_type || undefined,
            Vehicle_type: formValues?.Vehicle_type || undefined,
            Year_of_manufacuring: formValues?.Year_of_manufacuring?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            GVW: formValues?.GVW || undefined,
            Chasis_No: formValues?.Chasis_No || undefined,
            Engine_No: formValues?.Engine_No || undefined,
            FC_due_Date: formValues?.FC_due_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            tax_due_Date: formValues?.tax_due_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Vehicle_color: formValues?.Vehicle_color || undefined,
            Vehice_norms: formValues?.Vehice_norms || undefined,
            Address: formValues?.Address || undefined,
            CC: formValues?.CC || undefined,
            Make: formValues?.Make || undefined,
            Model: formValues?.Model || undefined,
            Insurance_provider: formValues?.Insurance_provider || undefined,
            Insurance_dueDate: formValues?.Insurance_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Policy_No: formValues?.Policy_No || undefined,
            Permit_No: formValues?.Permit_No || undefined,
            Permit_category: formValues?.Permit_category || undefined,
            Mobile_No1: formValues?.Mobile_No1 || undefined,
            Mobile_No2: formValues?.Mobile_No2 || undefined,
            Mobile_No3: formValues?.Mobile_No3 || undefined,
            Email_id: formValues?.Email_id || undefined,
            Adhar_No: formValues?.Adhar_No || undefined,
            Adhar_doc: await adharuploadlink() || undefined,
            PanCard_No: formValues?.PanCard_No || undefined,
            Pan_doc: await panuploadlink() || undefined,
            Nominee: formValues?.Nominee || undefined,
            Nominee_Relationship: formValues?.Nominee_Relationship || undefined,
            Nominee_dob: formValues?.Nominee_dob?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Emission_dueDate: formValues?.Emission_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Fuel_type: formValues?.Fuel_type || undefined,
            Hypothecation_bank: formValues?.Hypothecation_bank || undefined,
            Hypothecation_city: formValues?.Hypothecation_city || undefined,
            RTO: formValues?.RTO || undefined,
            Referred_by: formValues?.Referred_by || undefined,
            Comments: formValues?.Comments || undefined,
            Customer_type: formValues?.Customer_type || undefined,
            Martial_status: formValues?.Martial_status || undefined,
            TP_Insurance_provider: formValues?.TP_Insurance_provider || undefined,
            TP_dueDate: formValues?.TP_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,            
            GST_No: formValues?.GST_No || undefined,
            Insurance_type: formValues?.Insurance_type || undefined,
            Son_Wife_Daughter_Of: formValues?.Son_Wife_Daughter_Of || undefined, 
            Vehicle_Body: formValues?.Vehicle_Body || undefined,
            Wheel_Base: formValues?.Wheel_Base || undefined,
            No_Of_Cylinder: formValues?.No_Of_Cylinder || undefined,
            Unladen_Weight: formValues?.Unladen_Weight || undefined, 
            Sleeper_Capacity: formValues?.Sleeper_Capacity || undefined,
            PUCC_Emission_No: formValues?.PUCC_Emission_No || undefined,
            updated_by: formValues?.updated_by || undefined,
            TP_Policy_No: formValues?.TP_Policy_No || undefined, 
            Insurance_Start: formValues?.Insurance_Start?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            TP_Insurance_Start: formValues?.TP_Insurance_Start?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Vehicle_Reg_Doc:  await VehicleRegistrationuploadlink() || undefined,
            OD_Policy_Doc: await OdPolicyyuploadlink() || undefined,
            TP_Policy_Doc: await TpPolicyuploadlink() || undefined,
            GST_Cer_Doc: await GstCeruploadlink() || undefined,
            Vehicle_Description: formValues?.Vehicle_Description || undefined,
            Seating_Capacity: formValues?.Seating_Capacity || undefined,
            Standing_Capacity: formValues?.Standing_Capacity || undefined,
        }
        
        console.log( result );
        updateclient( { variables: { input: result}})
        .then(()=> {        
        router.push('/clients')
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));        
          setisSubmitted(false);          
        })

        if(updateclienterror) {            
            console.log(JSON.stringify(updateclienterror, null, 2));
        }
        
    }   
    catch(e: any){        
        console.log("This is try-catch-error block");
        console.log(e?.message);
        setisSubmitted(false); 
    }   
    
}


const handleVehicleNoSubmit = async () => {
    console.log("This is handleVehicleNoSubmit");
    console.log(vehicleno);    
    if(await gusrdatabyid ){
        await setVehicleNoprovided(true);
    }
        
}

//if(gusrbyidload) return <h1>Loading...</h1>
//if(gusrbyiderror) return <p>Error:{gusrbyiderror?.message}</p>

  return (
   <>
      
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

    {isVehicleNoprovided && <form className='grid-cols-3 max-w-md pb-2 text-slate-500 text-base' onSubmit={handleSubmit(onSubmit)}>                                      
            <p>Vehicle Registration Number:</p>
            <TextField.Root>
            <TextField.Input { ...register('Vehicle_No')} defaultValue={gusrdatabyid.user_data_byid?.Vehicle_No}/>
            </TextField.Root>        
              
            <FileUplaod 
                name="Vehicle_Reg_Doc"
                control={control}     
                onSelectFile={(e:FileList | null) => setVehRegDocfile(e)}   
                isCalled={(e: Boolean) => setVehRegDocProvided(e)}        
                placeholder=""   
                value={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}                    
            />
             <p>Owner Name: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Owner')} defaultValue={gusrdatabyid.user_data_byid?.Owner}/>
            </TextField.Root>
            <p>Son/Wife/Daughter Of: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Son_Wife_Daughter_Of')} defaultValue={gusrdatabyid.user_data_byid?.Son_Wife_Daughter_Of}/>
            </TextField.Root>
            <p>Owner Serial Number: </p>
            <TextField.Root>
            <TextField.Input { ...register('RC_No')} defaultValue={gusrdatabyid.user_data_byid?.RC_No}/>
            </TextField.Root>  
            <p>Chassis Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Chasis_No')} defaultValue={gusrdatabyid.user_data_byid?.Chasis_No}/>
            </TextField.Root>
            <p>Engine Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Engine_No')} defaultValue={gusrdatabyid.user_data_byid?.Engine_No}/>
            </TextField.Root>
            <DropDownControlWA
                name="Make"
                control={control}
                placeholder="Make:   "     
                value={gusrdatabyid.user_data_byid?.Make}                  
                options={gmakedata && gmakedata.MAKE.map((data:any) => (data.value)) }             
                onOptionAdd= {async (e: String) => await (addMake( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
            <DropDownControlWA 
                name="Model"
                control={control}
                value={gusrdatabyid.user_data_byid?.Model}
                placeholder="Model:   "           
                options={gmodeldata && gmodeldata.MODEL.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addModel( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <Controller
                name="Registered_Date"
                control={control}      
                defaultValue={gusrdatabyid.user_data_byid.Registered_Date && new Date(gusrdatabyid.user_data_byid?.Registered_Date)}       
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Registration Date: "
                />)}
            />        
             <Controller
                name="tax_due_Date"
                control={control}    
                defaultValue={gusrdatabyid.user_data_byid.tax_due_Date && new Date(gusrdatabyid.user_data_byid?.tax_due_Date)}         
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Tax Valid UpTo: "
                />)}
            />          
            <DropDownControlWA 
                name="Vehicle_type"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_type}                
                placeholder="Vehicle Class:   "           
                options={gVehclassdata && gVehclassdata.VEHICLE_CLASS.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehclass( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControlWA 
                name="Vehicle_Description"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_Description}
                placeholder="Vehicle Description:   "           
                options={gVehDesdata && gVehDesdata.VEHICLE_DESCRIPTION.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehDes( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControl 
                name="Fuel_type"
                control={control}      
                value={gusrdatabyid.user_data_byid?.Fuel_type}  
                placeholder="Fuel Type:   "           
                options={FUEL_TYPE}              
            />
            <DropDownControlWA 
                name="Vehice_norms"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehice_norms}
                placeholder="Emission Norms:   "           
                options={gnormsdata && gnormsdata.VEHICE_NORMS.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addVehicleNorms( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />   
            <DropDownControlWA 
                name="Vehicle_color"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_color}
                placeholder="Vehicle Color:   "           
                options={gcolorsdata && gcolorsdata.VEHICLE_COLOR.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <DropDownControlWA 
                name="Seating_Capacity"
                control={control}
                value={gusrdatabyid.user_data_byid?.Seating_Capacity}
                placeholder="Seating Capacity:   "           
                options={gSeatCapdata && gSeatCapdata.SEATING_CAPACITY.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addSeatCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <DropDownControlWA 
                name="Standing_Capacity"
                control={control}
                value={gusrdatabyid.user_data_byid?.Standing_Capacity}
                placeholder="Standing Capacity:   "           
                options={gStanCapdata && gStanCapdata.STANDING_CAPACITY.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addStanCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <p>Hypothecation Bank: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_bank')} defaultValue={gusrdatabyid.user_data_byid?.Hypothecation_bank}/>
            </TextField.Root>
            <p>Hypothecation City: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_city')} defaultValue={gusrdatabyid.user_data_byid?.Hypothecation_city}/>
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
                onSelectFile={(e:FileList | null) => setOdPolicydocfile(e)}   
                isCalled={(e: Boolean) => setOdPolicydocProvided(e)}        
                placeholder=""  
                value={gusrdatabyid.user_data_byid?.OD_Policy_Doc}                        
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
                onSelectFile={(e:FileList | null) => setTpPolicyDocfile(e)}   
                isCalled={(e: Boolean) => setTpPolicyDocProvided(e)}        
                placeholder=""              
                value={gusrdatabyid.user_data_byid?.TP_Policy_Doc}            
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
                onSelectFile={(e:FileList | null) => setadharfile(e)}   
                isCalled={(e: Boolean) => setadhardocProvided(e)}        
                placeholder=""        
                value={gusrdatabyid.user_data_byid?.Adhar_doc}                  
            />
            <p>PAN Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('PanCard_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="Pan_doc"
                control={control}
                onSelectFile={(e:FileList | null) => setpanfile(e)}
                isCalled={(e:Boolean) => setpandocProvided(e)}
                placeholder=""             
                value={gusrdatabyid.user_data_byid?.Pan_doc}             
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
                onSelectFile={(e:FileList | null) => setGstCerfile(e)}
                isCalled={(e:Boolean) => setGstCerdocProvided(e)}
                placeholder=""        
                value={gusrdatabyid.user_data_byid?.GST_Cer_Doc}                  
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
    </form>}
    
    </> 
  )
}

export default UpdateClient