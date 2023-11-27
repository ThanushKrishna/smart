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
    ADD_CC,
    ADD_MAKE,
    ADD_MODEL,
    ADD_INSURANCE_PROVIDER,
    ADD_PERMIT_CATEGORY,
    ADD_TP_INSURANCE_PROVIDER
    } from '@/graphql/queries'
import {     
    GET_VEHICLE_COLORS,
    GET_VEHICLE_NORMS,  
    GET_CC,
    GET_MAKE,
    GET_MODEL,
    GET_INSURANCE_PROVIDER,
    GET_PERMIT_CATEGORY,
    GET_TP_INSURANCE_PROVIDER    
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { uploadfile } from '@/app/functions/uploadfile'
import { InputVariants } from '@/app/components/InputVariants';
import { VEHICLE_TYPE, OWNER_TYPE, FUEL_TYPE, MARITAL_STATUS, INSURANCE_TYPE } from '@/json/enums'


const AddClient:React.FC = () => {

const router = useRouter();

const[addclient, { data:clientdata} ] = useMutation(ADD_CLIENT);
const[addVehicleColor, { data:colordata} ] = useMutation(ADD_VEHICLE_COLORS);
const[addVehicleNorms, { data:normsdata} ] = useMutation(ADD_VEHICE_NORMS);
const[addcc, { data:ccdata} ] = useMutation(ADD_CC);
const[addMake, { data:makedata} ] = useMutation(ADD_MAKE);
const[addModel, { data:modeldata} ] = useMutation(ADD_MODEL);
const[addiProvider, { data:iproviderdata} ] = useMutation(ADD_INSURANCE_PROVIDER);
const[addPermitCategory, { data:permitdata} ] = useMutation(ADD_PERMIT_CATEGORY);
const[addTpInsuranceProvider, { data:tpproviderdata} ] = useMutation(ADD_TP_INSURANCE_PROVIDER);

const { data:gcolorsdata } = useQuery(GET_VEHICLE_COLORS, { pollInterval: 1000,}); 
const { data:gnormsdata } = useQuery(GET_VEHICLE_NORMS, { pollInterval: 1000,}); 
const { data:gccdata } = useQuery(GET_CC, { pollInterval: 1000,}); 
const { data:gmakedata } = useQuery(GET_MAKE, { pollInterval: 1000,}); 
const { data:gmodeldata } = useQuery(GET_MODEL, { pollInterval: 1000,}); 
const { data:giproviderdata } = useQuery(GET_INSURANCE_PROVIDER, { pollInterval: 1000,}); 
const { data:gpermitdata } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
const { data:gtpproviderdata } = useQuery(GET_TP_INSURANCE_PROVIDER, { pollInterval: 1000,});

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});

const [isSubmitted, setisSubmitted] = useState(false);
const [ispandocProvided, setpandocProvided] = useState<Boolean>(false);
const [panfile, setpanfile] = useState<File>();
const [isadhardocProvided, setadhardocProvided] = useState<Boolean>(false);
const [adharfile, setadharfile] = useState<File>();
const [isVehicleRegisterdocProvided, setVehicleRegisterdocProvided] = useState<Boolean>(false);
const [VehicleRegisterfile, setVehicleRegisterfile] = useState<File>();
const [isPolicydocProvided, setPolicydocProvided] = useState<Boolean>(false);
const [Policyfile, setPolicyfile] = useState<File>();



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
        if(isVehicleRegisterdocProvided && VehicleRegisterfile )
          return  await uploadfile(VehicleRegisterfile); 
        return;
      }
      

	const Policyuploadlink = async () => {
        if(isPolicydocProvided && Policyfile)
          return  await uploadfile(Policyfile); 
        return;
      } 
    
    try{
        setisSubmitted(true)                     

        const result = {
            data_owner_id: "65420cde2e5ffc26bed53918",
            Vehicle_No: formValues?.Vehicle_No || undefined,
            Vehicle_Registration: await VehicleRegistrationuploadlink() || undefined,
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
            Policy_Document: await Policyuploadlink() || undefined,
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
            Nominee_relationship: formValues?.Nominee_relationship || undefined,
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
            OD_Insurance_provider: formValues?.OD_Insurance_provider || undefined,
            OD_dueDate: formValues?.OD_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            GST_No: formValues?.GST_No || undefined,
            Insurance_type: formValues?.Insurance_type || undefined
        }
        addclient( { variables: { input: result}})
        .then(()=> {
        console.log( result );
        router.push('/clients')
        })
        .catch((err) => {
          console.log(err);
          setisSubmitted(false);          
        })        
        
    }   
    catch(e: any){        
        console.log("This is try-catch-error block");
        console.log(e?.message);
        setisSubmitted(false); 
    }   
    
}



  return (
    
    
    <form className='max-w-md pb-2 text-slate-500 text-base' onSubmit={handleSubmit(onSubmit)}>                    
            <p>Vehicle Registration Number:</p>
            <TextField.Root>
            <TextField.Input { ...register('Vehicle_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="Vehicle_Registration"
                control={control}     
                onSelectFile={(e:File) => setVehicleRegisterfile(e)}   
                isCalled={(e: Boolean) => setVehicleRegisterdocProvided(e)}        
                placeholder=""                       
            />
            <p>Owner Serial Number: </p>
            <TextField.Root>
            <TextField.Input { ...register('RC_No')}/>
            </TextField.Root>  
            <Controller
                name="Registered_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Registered Date: "
                />)}
            />      
            <p>Owner Name: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Owner')}/>
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
                name="Ownership_type"
                control={control}
                placeholder="Owner Type:   "                                      
                options={OWNER_TYPE}
            />            
            <DropDownControlWA 
                name="Vehicle_type"
                control={control}
                placeholder="Vehicle Type:   "           
                options={gcolorsdata && gcolorsdata.VEHICLE_COLOR.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
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
            <p>GVW: </p>
            <TextField.Root>
            <TextField.Input  { ...register('GVW')}/>
            </TextField.Root>
            <p>Chassis Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Chasis_No')}/>
            </TextField.Root>
            <p>Engine Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Engine_No')}/>
            </TextField.Root>
            <Controller
                name="FC_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="REG/FC UpTo: "
                />)}
            />           
            <Controller
                name="tax_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Tax UpTo: "
                />)}
            /> 
            <DropDownControlWA 
                name="Vehicle_color"
                control={control}
                placeholder="Vehicle Color:   "           
                options={gcolorsdata && gcolorsdata.VEHICLE_COLOR.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControlWA 
                name="Vehice_norms"
                control={control}
                placeholder="Emission Norms:   "           
                options={gnormsdata && gnormsdata.VEHICE_NORMS.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addVehicleNorms( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />            
            <DropDownControlWA 
                name="CC"
                control={control}            
                placeholder="CC:   "           
                options={gccdata && gccdata.CC.map((data:any) => (data.value)) }           
                onOptionAdd= {async (e: String) => await (addcc( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
            />
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
            <DropDownControlWA 
                name="Insurance_provider"
                control={control}
                placeholder="Insurance Provider:   "           
                options={giproviderdata && giproviderdata.INSURANCE_PROVIDER.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addiProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
            <Controller
                name="Insurance_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Insurance Due Date: "
                />)}
            /> 
            <p>Policy No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Policy_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="Policy_Document"
                control={control}     
                onSelectFile={(e:File) => setPolicyfile(e)}   
                isCalled={(e: Boolean) => setPolicydocProvided(e)}        
                placeholder=""                       
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
            <p>Adhar Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Adhar_No')}/>
            </TextField.Root>                     
            <FileUplaod 
                name="Adhar_doc"
                control={control}     
                onSelectFile={(e:File) => setadharfile(e)}   
                isCalled={(e: Boolean) => setadhardocProvided(e)}        
                placeholder=""                       
            />
            <p>PAN Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('PanCard_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="Pan_doc"
                control={control}
                onSelectFile={(e:File) => setpanfile(e)}
                isCalled={(e:Boolean) => setpandocProvided(e)}
                placeholder=""                       
            />
            <p>Nominee Name: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee')}/>
            </TextField.Root>
            <p>Nominee RelationShip: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee_relationship')}/>
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
            <Controller
                name="Emission_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="PUC/Emission UpTo: "
                />)}
            />
            <DropDownControl 
                name="Fuel_type"
                control={control}        
                placeholder="Fuel Type:   "           
                options={FUEL_TYPE}              
            />
            <p>Hypothecation Bank: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_bank')}/>
            </TextField.Root>
            <p>Hypothecation City: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_city')}/>
            </TextField.Root>
            <p>RTO: </p>
            <TextField.Root>
            <TextField.Input  { ...register('RTO')}/>
            </TextField.Root>
            <p>Referred by: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Referred_by')}/>
            </TextField.Root>
            <DropDownControlWA 
                name="Customer_type"
                control={control}
                placeholder="Policy Issued Through:  "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <DropDownControl 
                name="Martial_status"
                control={control}
                placeholder="Marital Staus:   "           
                options={MARITAL_STATUS}              
            />
            <DropDownControl 
                name="Insurance_type"
                control={control}
                placeholder="Insurance Type:   "           
                options={INSURANCE_TYPE}              
            />            
            <DropDownControlWA 
                name="TP_Insurance_provider"
                control={control}
                placeholder="Third Party Insurance Provider:   "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
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
                name="OD_Insurance_provider"
                control={control}
                placeholder="Own Damage Insurance Provider:   "           
                options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <Controller
                name="OD_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Own Damage Insurance UpTo: "
                />)}
            />
            <p className='mt-3'>GST No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('GST_No')}/>        
            </TextField.Root>          
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
            <p className='mt-3'>Comments: </p>
            <TextArea  { ...register('Comments')}/>
            <br/>
            <Button disabled={isSubmitted}> Submit {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>
    
  )
}

export default AddClient