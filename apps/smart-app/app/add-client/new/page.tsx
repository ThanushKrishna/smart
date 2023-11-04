'use client'
import React from 'react'
import { useForm, useController  } from 'react-hook-form'
import { TextField, Button, TextArea, Select } from '@radix-ui/themes'
import { AddClientType } from '../../../typings';
import { ADD_CLIENT } from '../../../graphql/queries'
import { GET_APP_USERS } from '../../../graphql/queries'
import { useMutation } from '@apollo/client';
// import { onError } from "@apollo/client/link/error";

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.forEach(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         )
//       );
//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   });

const ownershiptype = [
    {value: "personal", label: "PERSONAL"},
    {value: "commercial", label: "COMMERCIAL"}
];

const AddClient = () => {

const[addclient, { data, loading, error } ] = useMutation(ADD_CLIENT);

const { register, handleSubmit, control } = useForm<AddClientType>( {
    defaultValues: {
        RC_No: "N/A",
        Registered_Date:undefined,
        Owner:"N/A",
        Owner_dob:undefined,
        Ownership_type:"N/A",
        Vehicle_type: 0,
        Year_of_manufacuring:undefined,
        GVW:"N/A",
        Chasis_No:"N/A",
        Engine_No:"N/A",
        FC_due_Date:undefined,
        tax_due_Date:undefined,
        Vehicle_color:0,
        Vehice_norms:0,
        Address:undefined,
        CC:0,
        Make:1,
        Model:0,
        Insurance_provider:0,
        Insurance_dueDate:undefined,
        Policy_No:undefined,
        Permit_No:"N/A",
        Permit_category:0,
        Mobile_No1:"N/A",
        Mobile_No2:"N/A",
        Email_id:"N/A",
        Adhar_No:"N/A",
        Adhar_doc:"N/A",
        PanCard_No:"N/A",
        Pan_doc:"N/A",
        Nominee:"N/A",
        Nominee_dob:undefined,
        Emission_dueDate:undefined,
        Fuel_type:0,
        Hypothecation_bank:"N/A",
        Hypothecation_city:"N/A",
        RTO:"N/A",
        Referred_by:"N/A",
        Comments:"N/A",
        Customer_type:0,
        Martial_status:0,
        TP_Insurance_provider:0,
        TP_dueDate:undefined,
        GST_No:"N/A",
        Insurance_type:0
    },

});

//const { field } = useController({name: 'Ownership_type', control})

// const handleSelectChange = (option: any) => {
//     field.onChange(option.value);
// }

const onSubmit = (formValues: AddClientType) => { 
    try{
        formValues.data_owner_id="65420cde2e5ffc26bed53918"
        //testaddClient( {variables: { dataOwnerId: formValues.data_owner_id, vehicleNo: formValues.Vehicle_No, rcNo: formValues.RC_No }})        
        addclient( { variables: { input: formValues}})
        console.log( formValues );
    }   
    catch(e){
        console.log("This is error block");
        console.log(e);
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