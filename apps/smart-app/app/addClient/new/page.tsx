'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '../../../typings';
import { ADD_CLIENT } from '../../../graphql/queries'

const AddClient = () => {

const { register,handleSubmit } = useForm<AddClientType>();

const onSubmit = (data: AddClientType) => {
    console.log( data.Vehicle_No, data.RC_No );
} 


  return (
    <form className='max-w-md space-y-2' onSubmit={handleSubmit((data) => {onSubmit(data)})}>
        <TextField.Root>
        <TextField.Input placeholder="VEHICLE_NO" { ...register('Vehicle_No')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="RC_No" { ...register('RC_No')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="REGISTERED_DATE" { ...register('Registered_Date')}/>
        </TextField.Root>        
        <TextField.Root>
		<TextField.Input placeholder="OWNER" { ...register('Owner')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="OWNER_DOB" { ...register('Owner_dob')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="OWNERSHIP_TYPE" { ...register('Ownership_type')}/>
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="VEHICLE_TYPE" { ...register('Vehicle_type')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="YEAR_OF_MANUFACURING" { ...register('Year_of_manufacuring')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="GVW" { ...register('GVW')}/>
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="CHASIS_NO" { ...register('Chasis_No')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="ENGINE_NO" { ...register('Engine_No')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="FC_DUE_DATE" { ...register('FC_due_Date')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="TAX_DUE_DATE" { ...register('tax_due_Date')}/>
        </TextField.Root>
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
        <TextField.Root>
        <TextField.Input placeholder="INSURANCE_DUEDATE" { ...register('Insurance_dueDate')}/>
        </TextField.Root>
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
        <TextField.Root>
        <TextField.Input placeholder="NOMINEE_DOB" { ...register('Nominee_dob')}/>
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="EMISSION_DUEDATE" { ...register('Emission_dueDate')}/>
        </TextField.Root>
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
        <TextField.Input placeholder="MARTIAL_STATUS" { ...register('Martial_status')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="TP_INSURANCE_PROVIDER" { ...register('TP_Insurance_provider')}/>
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="TP_DUEDATE" { ...register('TP_dueDate')}/>
        </TextField.Root>
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