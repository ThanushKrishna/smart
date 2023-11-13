'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea, Select, Text } from '@radix-ui/themes'
import { AddClientType } from '../../../typings';
import { ADD_CLIENT } from '../../../graphql/queries'
import { GET_APP_USERS } from '../../../graphql/queries'
import { useMutation } from '@apollo/client';
import { DatePickerComponent } from '../../components/DatePicker'
import { OwnerShipeTypeControl }  from '../../components/OwnerShipeTypeControl'

interface IDatePickerProps {
    name: string;
    onChange: (date: Date) => void;  
    value: Date;
   }


const AddClient:React.FC = () => {


const[addclient, { data, loading, error } ] = useMutation(ADD_CLIENT);

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});



const onSubmit = (formValues: AddClientType) => { 
    try{        
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
            Email_id: formValues?.Email_id || undefined,
            Adhar_No: formValues?.Adhar_No || undefined,
            Adhar_doc: formValues?.Adhar_doc || undefined,
            PanCard_No: formValues?.PanCard_No || undefined,
            Pan_doc: formValues?.Pan_doc || undefined,
            Nominee: formValues?.Nominee || undefined,
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
            Insurance_type: formValues?.Insurance_type || undefined
        }
        addclient( { variables: { input: result}})
        console.log( result );
    }   
    catch(e: any){
        console.log("This is error block");
        console.log(e?.message);
    }
    
   
}



  return (
    <form className='max-w-md space-y-2 text-slate-400 text-base' onSubmit={handleSubmit(onSubmit)}>
        
            <TextField.Root>
            <TextField.Input placeholder="VEHICLE_NO" { ...register('Vehicle_No')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="RC_No" { ...register('RC_No')}/>
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
            <TextField.Root> 
            <TextField.Input placeholder="OWNER" { ...register('Owner')}/>
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
            <OwnerShipeTypeControl 
                name="Ownership_type"
                control={control}
                label="OwnerType" 
                placeholder="Owner Type:   "           
                options={[
                  { label: 'x', value: 'X'},
                  { label: 'y', value: 'Y' } 
                ]}              
            />
            {/* <TextField.Root>
            <TextField.Input placeholder="OWNERSHIP_TYPE" { ...register('Ownership_type')}/>
            </TextField.Root> */}
            <TextField.Root>
            <TextField.Input placeholder="VEHICLE_TYPE" { ...register('Vehicle_type')}/>
            </TextField.Root>
            <Controller
                name="Year_of_manufacuring"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="YEAR_OF_MANUFACTURING: "
                />)}
            />    
            <TextField.Root>
            <TextField.Input placeholder="GVW" { ...register('GVW')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="CHASIS_NO" { ...register('Chasis_No')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="ENGINE_NO" { ...register('Engine_No')}/>
            </TextField.Root>
            <Controller
                name="FC_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="FC_DUE_DATE: "
                />)}
            />           
            <Controller
                name="tax_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="TAX_DUE_DATE: "
                />)}
            /> 
            <TextField.Root>
            <TextField.Input placeholder="VEHICLE_COLOR" { ...register('Vehicle_color')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="VEHICLE_NORMS" { ...register('Vehice_norms')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="ADDRESS" { ...register('Address')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="CC" { ...register('CC')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="MAKE" { ...register('Make')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="MODEL" { ...register('Model')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="INSURANCE_PROVIDER" { ...register('Insurance_provider')}/>
            </TextField.Root>
            <Controller
                name="Insurance_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="INSURANCE_DUEDATE: "
                />)}
            /> 
            <TextField.Root>
            <TextField.Input placeholder="POLICY_NO" { ...register('Policy_No')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="PERMIT_NO" { ...register('Permit_No')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="PERMIT_CATEGORY" { ...register('Permit_category')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="MOBILE_NO1" { ...register('Mobile_No1')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="MOBILE_NO2" { ...register('Mobile_No2')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="EMAIL_ID" { ...register('Email_id')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="ADHAR_NO" { ...register('Adhar_No')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="ADHAR_DOC" { ...register('Adhar_doc')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="PANCARD_NO" { ...register('PanCard_No')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="PAN_DOC" { ...register('Pan_doc')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="NOMINEE" { ...register('Nominee')}/>
            </TextField.Root>
            <Controller
                name="Nominee_dob"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="NOMINEE_DOB: "
                />)}
            /> 
            <Controller
                name="Emission_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="EMISSION_DUEDATE: "
                />)}
            />
            <TextField.Root>
            <TextField.Input placeholder="FUEL_TYPE" { ...register('Fuel_type')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="HYPOTHECATION_BANK" { ...register('Hypothecation_bank')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="HYPOTHECATION_CITY" { ...register('Hypothecation_city')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="RTO" { ...register('RTO')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="REFERRED_BY" { ...register('Referred_by')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="CUSTOMER_TYPE" { ...register('Customer_type')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="MARITAL_STATUS" { ...register('Martial_status')}/>
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="TP_INSURANCE_PROVIDER" { ...register('TP_Insurance_provider')}/>
            </TextField.Root>
            <Controller
                name="TP_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="TP_DUEDATE: "
                />)}
            />
            <TextField.Root>
            <TextField.Input placeholder="GST_NO" { ...register('GST_No')}/>        
            </TextField.Root>
            <TextField.Root>
            <TextField.Input placeholder="INSURANCE_TYPE" { ...register('Insurance_type')}/>		        
            </TextField.Root>
            <TextArea placeholder="COMMENTS" { ...register('Comments')}/>
            <Button> Submit </Button>        
    </form>
    
  )
}

export default AddClient