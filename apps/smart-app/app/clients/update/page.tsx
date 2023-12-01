'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    ADD_CLIENT, 
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
import { InputVariants } from '@/app/components/InputVariants';
import { OWNER_TYPE, FUEL_TYPE, MARITAL_STATUS, INSURANCE_TYPE } from '@/json/enums'


const UpdateClient:React.FC = () => {

const router = useRouter();

const[addclient, { data:clientdata, error:addclienterror } ] = useMutation(ADD_CLIENT);
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
const { data:gpermitdata } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
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
          return  await uploadfile(adharfile); 
        return;
      }      
    const panuploadlink = async () => {
        if(ispandocProvided && panfile)
          return  await uploadfile(panfile); 
        return;
      }        
    const VehicleRegistrationuploadlink = async () => {
        if(isVehRegDocProvided && VehRegDocfile )
          return  await uploadfile(VehRegDocfile); 
        return;
      }
      
    const OdPolicyyuploadlink = async () => {
            if(isOdPolicydocProvided && OdPolicydocfile)
            return  await uploadfile(OdPolicydocfile); 
            return;
        } 
    const TpPolicyuploadlink = async () => {
            if(isTpPolicyDocProvided && TpPolicyDocfile)
            return  await uploadfile(TpPolicyDocfile); 
            return;
        } 
    const GstCeruploadlink = async () => {
            if(isGstCerdocProvided && GstCerfile)
            return  await uploadfile(GstCerfile); 
            return;
        } 	
    
    try{
        setisSubmitted(true)                     

        const result = {
            data_owner_id: "65420cde2e5ffc26bed53918",
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
            Vehicle_Reg_Doc: await VehicleRegistrationuploadlink() || undefined,
            OD_Policy_Doc: await OdPolicyyuploadlink() || undefined,
            TP_Policy_Doc: await TpPolicyuploadlink() || undefined,
            GST_Cer_Doc: await GstCeruploadlink() || undefined,
            Vehicle_Description: formValues?.Vehicle_Description || undefined,
            Seating_Capacity: formValues?.Seating_Capacity || undefined,
            Standing_Capacity: formValues?.Standing_Capacity || undefined,
        }
        
        console.log( result );
        addclient( { variables: { input: result}})
        .then(()=> {        
        router.push('/clients')
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));        
          setisSubmitted(false);          
        })

        if(addclienterror) {            
            console.log(JSON.stringify(addclienterror, null, 2));
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
        setVehicleNoprovided(true);
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
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}                    
            />
             <p>Owner Name: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Owner')} defaultValue={gusrdatabyid.user_data_byid?.Owner}/>
            </TextField.Root>
            <p>Son/Wife/Daughter Of: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Son_Wife_Daughter_Of')}/>
            </TextField.Root>
            <p>Owner Serial Number: </p>
            <TextField.Root>
            <TextField.Input { ...register('RC_No')}/>
            </TextField.Root>  
            <p>Chassis Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Chasis_No')}/>
            </TextField.Root>
            <p>Engine Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Engine_No')}/>
            </TextField.Root>
            <DropDownControlWA
                name="Make"
                control={control}
                placeholder="Make:   "           
                options={gmakedata && gmakedata.MAKE.map((data:any) => (data.value)) }             
                onOptionAdd= {async (e: String) => await (addMake( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
            <DropDownControlWA 
                name="Model"
                control={control}
                placeholder="Model:   "           
                options={gmodeldata && gmodeldata.MODEL.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addModel( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <Controller
                name="Registered_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Registration Date: "
                />)}
            />        
             <Controller
                name="tax_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Tax Valid UpTo: "
                />)}
            />          
            <DropDownControlWA 
                name="Vehicle_type"
                control={control}
                placeholder="Vehicle Class:   "           
                options={gVehclassdata && gVehclassdata.VEHICLE_CLASS.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehclass( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControlWA 
                name="Vehicle_Description"
                control={control}
                placeholder="Vehicle Description:   "           
                options={gVehDesdata && gVehDesdata.VEHICLE_DESCRIPTION.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehDes( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControl 
                name="Fuel_type"
                control={control}        
                placeholder="Fuel Type:   "           
                options={FUEL_TYPE}              
            />
            <DropDownControlWA 
                name="Vehice_norms"
                control={control}
                placeholder="Emission Norms:   "           
                options={gnormsdata && gnormsdata.VEHICE_NORMS.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addVehicleNorms( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />   
            <DropDownControlWA 
                name="Vehicle_color"
                control={control}
                placeholder="Vehicle Color:   "           
                options={gcolorsdata && gcolorsdata.VEHICLE_COLOR.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <DropDownControlWA 
                name="Seating_Capacity"
                control={control}
                placeholder="Seating Capacity:   "           
                options={gSeatCapdata && gSeatCapdata.SEATING_CAPACITY.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addSeatCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <DropDownControlWA 
                name="Standing_Capacity"
                control={control}
                placeholder="Standing Capacity:   "           
                options={gStanCapdata && gStanCapdata.STANDING_CAPACITY.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addStanCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <p>Hypothecation Bank: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_bank')}/>
            </TextField.Root>
            <p>Hypothecation City: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_city')}/>
            </TextField.Root>
            <DropDownControl 
                name="Insurance_type"
                control={control}
                placeholder="Insurance Type:   "           
                options={INSURANCE_TYPE}              
            />      
            <p>OD Policy No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Policy_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="OD_Policy_Doc"
                control={control}     
                onSelectFile={(e:FileList | null) => setOdPolicydocfile(e)}   
                isCalled={(e: Boolean) => setOdPolicydocProvided(e)}        
                placeholder=""  
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}                        
            />	   
            <DropDownControlWA 
                name="Insurance_provider"
                control={control}
                placeholder=" Own Damage Insurance Provider:   "           
                options={giproviderdata && giproviderdata.INSURANCE_PROVIDER.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addiProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
             <Controller
                name="Insurance_Start"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Own Damage Insurance Starts From: "
                />)}
            />
             <Controller
                name="Insurance_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Own Damage Insurance UpTo: "
                />)}
            />         
            <p>TP Policy No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('TP_Policy_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="TP_Policy_Doc"
                control={control}     
                onSelectFile={(e:FileList | null) => setTpPolicyDocfile(e)}   
                isCalled={(e: Boolean) => setTpPolicyDocProvided(e)}        
                placeholder=""              
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}            
            />	              
            <DropDownControlWA 
                name="TP_Insurance_provider"
                control={control}
                placeholder="Third Party Insurance Provider:   "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <Controller
                name="TP_Insurance_Start"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Thrid Party Insurance Starts From: "
                />)}
            />              
            <Controller
                name="TP_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Thrid Party Insurance UpTo: "
                />)}
            />        
            <DropDownControlWA 
                name="RTO"
                control={control}            
                placeholder="Registering Authority:   "           
                options={grtodata && grtodata.RTO.map((data:any) => (data.value)) }           
                onOptionAdd= {async (e: String) => await (addrto( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
            />        
            <p>Unladen Weight: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Unladen_Weight')}/>
            </TextField.Root> 
            <p>Laden Weight (GVW): </p>
            <TextField.Root>
            <TextField.Input  { ...register('GVW')}/>
            </TextField.Root>      
            <p>Vehicle Body: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Vehicle_Body')}/>
            </TextField.Root> 
            <p>Wheel Base: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Wheel_Base')}/>
            </TextField.Root> 
            <p>No Of Cylinder: </p>
            <TextField.Root>
            <TextField.Input  { ...register('No_Of_Cylinder')}/>
            </TextField.Root> 
            <p>Sleeper Capacity: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Sleeper_Capacity')}/>
            </TextField.Root> 

            <Controller
                name="Owner_dob"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Owner DOB: "
                />)}
            />   
            <DropDownControl 
                name="Martial_status"
                control={control}
                placeholder="Marital Staus:   "           
                options={MARITAL_STATUS}              
            />                 
            <DropDownControl 
                name="Ownership_type"
                control={control}
                placeholder="Owner Type:   "                                      
                options={OWNER_TYPE}
            />                        
            <Controller
                name="Year_of_manufacuring"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Manufacturing Date: "
                />)}
            />                 
            <Controller
                name="FC_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="REG/FC UpTo: "
                />)}
            />                                                 
            <DropDownControlWA 
                name="CC"
                control={control}            
                placeholder="CC:   "           
                options={gccdata && gccdata.CC.map((data:any) => (data.value)) }           
                onOptionAdd= {async (e: String) => await (addcc( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
            />                       
            <p>Permit No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Permit_No')}/>
            </TextField.Root>
            <DropDownControlWA 
                name="Permit_category"
                control={control}
                placeholder="Permit Category:   "           
                options={gpermitdata && gpermitdata.PERMIT_CATEGORY.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addPermitCategory( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <p>1st Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No1')}/>
            </TextField.Root>
            <p>2nd Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No2')}/>
            </TextField.Root>
            <p>3rd Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No3')}/>
            </TextField.Root>
            <p>Email Id: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Email_id')}/>
            </TextField.Root>
            <p>Aadhar Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Adhar_No')}/>
            </TextField.Root>                     
            <FileUplaod 
                name="Adhar_doc"
                control={control}     
                onSelectFile={(e:FileList | null) => setadharfile(e)}   
                isCalled={(e: Boolean) => setadhardocProvided(e)}        
                placeholder=""        
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}                  
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
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}             
            />
            <p>Nominee Name: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee')}/>
            </TextField.Root>
            <p>Nominee Relationship: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee_Relationship')}/>
            </TextField.Root>
            <Controller
                name="Nominee_dob"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Nominee DOB: "
                />)}
            /> 
            <p>PUC/Emission Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('PUCC_Emission_No')}/>
            </TextField.Root>
            <Controller
                name="Emission_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="PUC/Emission UpTo: "
                />)}
            />      
            <p className='mt-3'>GST No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('GST_No')}/>        
            </TextField.Root>  
            <FileUplaod 
                name="GST_Cer_Doc"
                control={control}
                onSelectFile={(e:FileList | null) => setGstCerfile(e)}
                isCalled={(e:Boolean) => setGstCerdocProvided(e)}
                placeholder=""        
                defaultValue={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}                  
            />                                                                                                 
            <p className='mb-0'>Address: </p>
            <div className='no-style'>            
            <InputVariants
              name="Address.street"
              control={control}
              placeholder="street"              
            />
            <InputVariants
              name="Address.city"
              control={control}
              placeholder="city"              
            />
             <InputVariants
              name="Address.state"
              control={control}
              placeholder="state"              
            />
             <InputVariants
              name="Address.zip"
              control={control}
              placeholder="zip"              
            />
            </div>            
            <p>Referred by: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Referred_by')}/>
            </TextField.Root>
            <p>Updated by: </p>
            <TextField.Root>
            <TextField.Input  { ...register('updated_by')}/>
            </TextField.Root>
            <DropDownControlWA 
                name="Customer_type"
                control={control}
                placeholder="Policy Issued Through:  "           
                options={gCusTypedata && gCusTypedata.CUSTOMER_TYPE.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addCusType( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />                        
            <p className='mt-3'>Comments: </p>
            <TextArea  { ...register('Comments')}/>
            <br/>
            <Button disabled={isSubmitted}> Submit {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>}
    
    </> 
  )
}

export default UpdateClient