'use client'
import React, { useState } from 'react'
import { useForm, Controller, FieldError  } from 'react-hook-form'
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
import { OWNER_TYPE, FUEL_TYPE, MARITAL_STATUS, INSURANCE_TYPE } from '@/json/enums'


const AddClient:React.FC = () => {

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
const [panfile, setpanfile] = useState<string | null>(null);
const [adharfile, setadharfile] = useState<string | null>(null);
const [VehRegDocfile, setVehRegDocfile] = useState<string | null>(null);
const [OdPolicydocfile, setOdPolicydocfile] = useState<string | null>(null);
const [TpPolicyDocfile, setTpPolicyDocfile] = useState<string | null>(null);
const [GstCerfile, setGstCerfile] = useState<string | null>(null);


const onSubmit = async (formValues: AddClientType) => {     

	
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
            Adhar_doc: adharfile || undefined,
            PanCard_No: formValues?.PanCard_No || undefined,
            Pan_doc: panfile || undefined,
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
            Vehicle_Reg_Doc: VehRegDocfile || undefined,
            OD_Policy_Doc: OdPolicydocfile || undefined,
            TP_Policy_Doc: TpPolicyDocfile || undefined,
            GST_Cer_Doc: GstCerfile || undefined,
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



  return (
    
    
    <form className='grid-cols-3 max-w-md pb-2 text-slate-500 text-base' onSubmit={handleSubmit(onSubmit)}>                    
            <p>Vehicle Registration Number:</p>
            <TextField.Root>
            <TextField.Input 
             {...register('Vehicle_No', {
                required: 'Vehicle Registration Number is required',
                maxLength: {
                  value: 10,
                  message: 'Vehicle Registration Number should be at most 10 characters'
                },
                pattern: {
                  value: /^[A-Za-z0-9]*$/,
                  message: 'Vehicle Registration Number should be alphanumeric'
                }
              })}
              onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
          {errors.Vehicle_No && <p className="error text-red-600">{errors.Vehicle_No.message}</p>}
            <FileUplaod 
                name="Vehicle_Reg_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setVehRegDocfile(e)}   
                value={VehRegDocfile}
                placeholder=""                       
            />
             <p>Owner Name: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Owner', {                
                maxLength: {
                  value: 30,
                  message: 'Owner Name should be at most 30 characters'
                },
                pattern: {
                    value: /^[A-Za-z\s]*$/,
                  message: 'Owner Name  should contain only alphabets and spaces'
                }
              })}
              onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.Owner && <p className="error text-red-600">{errors.Owner.message}</p>}
            <p>Son/Wife/Daughter Of: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Son_Wife_Daughter_Of', {                
                maxLength: {
                  value: 30,
                  message: 'Name should be at most 30 characters'
                },
                pattern: {
                    value: /^[A-Za-z\s]*$/,
                  message: 'Name  should contain only alphabets and spaces'
                }
              })}
              onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.Son_Wife_Daughter_Of && <p className="error text-red-600">{errors.Son_Wife_Daughter_Of.message}</p>}
            <p>Owner Serial Number: </p>
            <TextField.Root>
            <TextField.Input { ...register('RC_No', {                
                maxLength: {
                  value: 2,
                  message: 'Owner Serial Number should be at most 2 characters'
                },
                pattern: {
                    value: /^[0-9]{2}$/,
                  message: 'Owner Serial Number should be a two-digit number'
                }
              })}
              onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.RC_No && <p className="error text-red-600">{errors.RC_No.message}</p>}
            <p>Chassis Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Chasis_No', {                
                maxLength: {
                  value: 25,
                  message: 'Chassis Number should be at most 25 characters'
                },
                pattern: {
                    value: /^[A-Za-z0-9]{0,25}$/,
                  message: 'Chassis Number should be  alphanumeric and at most 25 characters'
                }
              })}
              onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.Chasis_No && <p className="error text-red-600">{errors.Chasis_No.message}</p>}
            <p>Engine Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Engine_No', {                
                maxLength: {
                  value: 25,
                  message: 'Engine Number should be at most 25 characters'
                },
                pattern: {
                    value: /^[A-Za-z0-9]{0,25}$/,
                  message: 'Engine Number should be  alphanumeric and at most 25 characters'
                }
              })}
              onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.Engine_No && <p className="error text-red-600">{errors.Engine_No.message}</p>}
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
            <TextField.Input  {...register('Hypothecation_bank', {                
                maxLength: {
                    value: 40,
                    message: 'Hypothecation bank should be at most 40 characters'
                },
                pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Hypothecation bank should contain only alphabets and spaces'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.Hypothecation_bank && <p className="error text-red-600">{errors.Hypothecation_bank.message}</p>}
            <p>Hypothecation City: </p>
            <TextField.Root>
            <TextField.Input {...register('Hypothecation_city', {
                maxLength: {
                    value: 40,
                    message: 'Hypothecation city should be at most 40 characters'
                },
                pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Hypothecation city should contain only alphabets and spaces'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.Hypothecation_city && <p className="error text-red-600">{errors.Hypothecation_city.message}</p>}
            <DropDownControl 
                name="Insurance_type"
                control={control}
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
                },
                pattern: {
                    value: /^[A-Za-z0-9]*$/,
                    message: 'Policy number should be alphanumeric'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.Policy_No && <p className="error text-red-600">{errors.Policy_No.message}</p>}
            <FileUplaod 
                name="OD_Policy_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setOdPolicydocfile(e)}     
                value={OdPolicydocfile} 
                placeholder=""                       
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
            <TextField.Input
                {...register('TP_Policy_No', {
                maxLength: {
                    value: 30,
                    message: 'TP Policy number should be at most 30 characters'
                },
                pattern: {
                    value: /^[A-Za-z0-9]*$/,
                    message: 'TP Policy number should be alphanumeric'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.TP_Policy_No && <p className="error text-red-600">{errors.TP_Policy_No.message}</p>}
            <FileUplaod 
                name="TP_Policy_Doc"
                control={control}     
                onSelectFile={(e:string | null) => setTpPolicyDocfile(e)}     
                value={TpPolicyDocfile }
                placeholder=""                       
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
            />                
            </TextField.Root>            
            {errors.GVW && typeof errors.GVW === 'object' && 'message' in errors.GVW && (
    <p className="error text-red-600">{(errors.GVW as FieldError).message}</p>)}
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
            />            
            </TextField.Root>
            {errors.Sleeper_Capacity && <p className="error text-red-600">{errors.Sleeper_Capacity.message}</p>}

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
            <TextField.Input
                {...register('Permit_No', {
                maxLength: {
                    value: 25,
                    message: 'Permit Number should be at most 25 characters'
                },
                pattern: {
                    value: /^[A-Za-z0-9]*$/,
                    message: 'Permit Number should be alphanumeric'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.Permit_No && <p className="error text-red-600">{errors.Permit_No.message}</p>}
            <DropDownControlWA 
                name="Permit_category"
                control={control}
                placeholder="Permit Category:   "           
                options={gpermitdata && gpermitdata.PERMIT_CATEGORY.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addPermitCategory( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <p>1st Mobile No: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Mobile_No1', {
                pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9'
                }
                })}
            />                                  
            </TextField.Root>
            {errors.Mobile_No1 && typeof errors.Mobile_No1 === 'object' && 'message' in errors.Mobile_No1 && (
            <p className="error text-red-600">{(errors.Mobile_No1 as FieldError).message}</p>)}  
            <p>2nd Mobile No: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Mobile_No2', {
                pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9'
                }
                })}
            />                                 
            </TextField.Root>
            {errors.Mobile_No2 && typeof errors.Mobile_No2 === 'object' && 'message' in errors.Mobile_No2 && (
            <p className="error text-red-600">{(errors.Mobile_No2 as FieldError).message}</p>)}   
            <p>3rd Mobile No: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Mobile_No3', {
                pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9'
                }
                })}
            />                      
            </TextField.Root>
            {errors.Mobile_No3 && typeof errors.Mobile_No3 === 'object' && 'message' in errors.Mobile_No3 && (
            <p className="error text-red-600">{(errors.Mobile_No3 as FieldError).message}</p>)}  
            <p>Email Id: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Email_id', {
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address'
                }
                })}
            />            
            </TextField.Root>
            {errors.Email_id && <p className="error text-red-600">{errors.Email_id.message}</p>}
            <p>Aadhar Number: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Adhar_No', {
                pattern: {
                    value: /^\d{12}$/,
                    message: 'Adhar Number should be a 12-digit number'
                }
                })}
            />                                 
            </TextField.Root>                 
            {errors.Adhar_No && typeof errors.Adhar_No === 'object' && 'message' in errors.Adhar_No && (
            <p className="error text-red-600">{(errors.Adhar_No as FieldError).message}</p>)}   
            <FileUplaod 
                name="Adhar_doc"
                control={control}     
                onSelectFile={(e:string | null) => setadharfile(e)}  
                value={ adharfile }                 
                placeholder=""                       
            />
            <p>PAN Number: </p>
            <TextField.Root>
            <TextField.Input
                {...register('PanCard_No', {
                pattern: {
                    value: /^[A-Za-z0-9]{10}$/,
                    message: 'Pan Card Number should be a 10-character alphanumeric string'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.PanCard_No && <p className="error text-red-600">{errors.PanCard_No.message}</p>}
            <FileUplaod 
                name="Pan_doc"
                control={control}
                onSelectFile={(e:string | null) => setpanfile(e)}
                value={panfile}
                placeholder=""                       
            />
            <p>Nominee Name: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Nominee', {
                maxLength: {
                    value: 30,
                    message: 'Nominee should be at most 30 characters'
                },
                pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Nominee should contain only alphabets and spaces'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.Nominee && <p className="error text-red-600">{errors.Nominee.message}</p>}
            <p>Nominee Relationship: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Nominee_Relationship', {
                maxLength: {
                    value: 20,
                    message: 'Nominee Relationship should be at most 20 characters'
                },
                pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Nominee Relationship should contain only alphabets and spaces'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.Nominee_Relationship && <p className="error text-red-600">{errors.Nominee_Relationship.message}</p>}
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
            <TextField.Input
                {...register('PUCC_Emission_No', {
                pattern: {
                    value: /^[A-Za-z0-9]{20}$/,
                    message: 'PUCC Emission Number should be a 20-character alphanumeric string'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />            
            </TextField.Root>
            {errors.PUCC_Emission_No && <p className="error text-red-600">{errors.PUCC_Emission_No.message}</p>}
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
            <TextField.Input
                {...register('GST_No', {
                pattern: {
                    value: /^[A-Za-z0-9]{15}$/,
                    message: 'GST Number should be a 15-character alphanumeric string'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.GST_No && <p className="error text-red-600">{errors.GST_No.message}</p>}
            <FileUplaod 
                name="GST_Cer_Doc"
                control={control}
                onSelectFile={(e:string | null) => setGstCerfile(e)}
                value={GstCerfile}
                placeholder=""                       
            />                                                                                                 
            <p>Address: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Address.street')} placeholder='Street'/>
            </TextField.Root>       
            <TextField.Root>
            <TextField.Input  { ...register('Address.city')} placeholder='city'/>
            </TextField.Root>       
            <TextField.Root>
            <TextField.Input  { ...register('Address.state')} placeholder='state'/>
            </TextField.Root>       
            <TextField.Root>
            <TextField.Input
                {...register('Address.zip', {
                pattern: {
                    value: /^\d{6}$/,
                    message: 'Zip code should be a 6-digit number'
                }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                placeholder='pin'
            />
            </TextField.Root>
            {errors?.Address?.zip && <p className="error text-red-600">{errors.Address.zip.message}</p>}
            <p>Referred by: </p>
            <TextField.Root>
                <TextField.Input
                {...register('Referred_by', {
                    maxLength: {
                    value: 30,
                    message: 'Referred by should be at most 30 characters'
                    },
                    pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Referred by should contain only alphabets and spaces'
                    }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />
            </TextField.Root>
            {errors.Referred_by && <p className="error text-red-600">{errors.Referred_by.message}</p>}

            <p>Updated by: </p>
            <TextField.Root>
                <TextField.Input
                {...register('updated_by', {
                    maxLength: {
                    value: 30,
                    message: 'Updated by should be at most 30 characters'
                    },
                    pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Updated by should contain only alphabets and spaces'
                    }
                })}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />
            </TextField.Root>
            {errors.updated_by && <p className="error text-red-600">{errors.updated_by.message}</p>}
            <DropDownControlWA 
                name="Customer_type"
                control={control}
                placeholder="Policy Issued Through:  "           
                options={gCusTypedata && gCusTypedata.CUSTOMER_TYPE.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addCusType( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}                
            />                        
            <p className='mt-3'>Comments: </p>
            <TextArea
            {...register('Comments', {
                maxLength: {
                value: 500,
                message: 'Comments should be at most 500 characters'
                }
            })}
            />
            {errors.Comments && <p className="error text-red-600">{errors.Comments.message}</p>}
            <br/>
            <Button disabled={isSubmitted}> Submit {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>
    
  )
}

export default AddClient