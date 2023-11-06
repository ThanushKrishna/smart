'use client'
import React from 'react'
import { useForm, useController  } from 'react-hook-form'
import { TextField, Button, TextArea, Select } from '@radix-ui/themes'
import { AddClientType } from '../../../typings';
import { ADD_CLIENT } from '../../../graphql/queries'
import { GET_APP_USERS } from '../../../graphql/queries'
import { useMutation } from '@apollo/client';

const ownershiptype = [
    {value: "personal", label: "PERSONAL"},
    {value: "commercial", label: "COMMERCIAL"}
];

const AddClient = () => {

const[addclient, { data, loading, error } ] = useMutation(ADD_CLIENT);

const { register, handleSubmit, control } = useForm<AddClientType>({});

//const { field } = useController({name: 'Ownership_type', control})

// const handleSelectChange = (option: any) => {
//     field.onChange(option.value);
// }

const onSubmit = (formValues: AddClientType) => { 
    try{
//        formValues.data_owner_id="65420cde2e5ffc26bed53918"
//        testaddClient( {variables: { dataOwnerId: formValues.data_owner_id, vehicleNo: formValues.Vehicle_No, rcNo: formValues.RC_No }}) 
        const result = {
            data_owner_id: "65420cde2e5ffc26bed53918",
            Vehicle_No: formValues?.Vehicle_No || undefined,
            RC_No: formValues?.RC_No || undefined,
            Registered_Date: formValues?.Registered_Date || undefined,
            Owner: formValues?.Owner || undefined,
            Owner_dob: formValues?.Owner_dob || undefined,
            Ownership_type: formValues?.Ownership_type || undefined,
            Vehicle_type: formValues?.Vehicle_type || undefined,
            Year_of_manufacuring: formValues?.Year_of_manufacuring || undefined,
            GVW: formValues?.GVW || undefined,
            Chasis_No: formValues?.Chasis_No || undefined,
            Engine_No: formValues?.Engine_No || undefined,
            FC_due_Date: formValues?.FC_due_Date || undefined,
            tax_due_Date: formValues?.tax_due_Date || undefined,
            Vehicle_color: formValues?.Vehicle_color || undefined,
            Vehice_norms: formValues?.Vehice_norms || undefined,
            Address: formValues?.Address || undefined,
            CC: formValues?.CC || undefined,
            Make: formValues?.Make || undefined,
            Model: formValues?.Model || undefined,
            Insurance_provider: formValues?.Insurance_provider || undefined,
            Insurance_dueDate: formValues?.Insurance_dueDate || undefined,
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
            Nominee_dob: formValues?.Nominee_dob || undefined,
            Emission_dueDate: formValues?.Emission_dueDate || undefined,
            Fuel_type: formValues?.Fuel_type || undefined,
            Hypothecation_bank: formValues?.Hypothecation_bank || undefined,
            Hypothecation_city: formValues?.Hypothecation_city || undefined,
            RTO: formValues?.RTO || undefined,
            Referred_by: formValues?.Referred_by || undefined,
            Comments: formValues?.Comments || undefined,
            Customer_type: formValues?.Customer_type || undefined,
            Martial_status: formValues?.Martial_status || undefined,
            TP_Insurance_provider: formValues?.TP_Insurance_provider || undefined,
            TP_dueDate: formValues?.TP_dueDate || undefined,
            GST_No: formValues?.GST_No || undefined,
            Insurance_type: formValues?.Insurance_type || undefined
        }
        addclient( { variables: { input: result}})
        console.log( result );
    }   
    catch(e){
        console.log("This is error block");
        console.log(e.message);
    }
 
   
}



  return (
    <form className='max-w-md space-y-2' onSubmit={handleSubmit(onSubmit)}>
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
        {/* <Select 
        value={field.value}        
        onChange={ownershiptype.find(({value}) => value === field.value)}
        options={handleSelectChange}
        >
        </Select> */}
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
        <TextField.Input placeholder="MARITAL_STATUS" { ...register('Martial_status')}/>
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