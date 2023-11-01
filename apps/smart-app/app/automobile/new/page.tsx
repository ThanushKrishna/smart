'use client'
import React from 'react'
import { TextField, Button } from '@radix-ui/themes'

const AddAutomobilePage = () => {

const fields = [
"ID",
"DATA_OWNER_ID",
"VEHICLE_NO",
"RC_NO",
"REGISTERED_DATE",
"OWNER",
"OWNER_DOB",
"OWNERSHIP_TYPE",
"VEHICLE_TYPE",
"YEAR_OF_MANUFACURING",
"GVW",
"CHASIS_NO",
"ENGINE_NO",
"FC_DUE_DATE",
"TAX_DUE_DATE",
"VEHICLE_COLOR",
"VEHICE_NORMS",
"ADDRESS",
"CC",
"MAKE",
"MODEL",
"INSURANCE_PROVIDER",
"INSURANCE_DUEDATE",
"POLICY_NO",
"PERMIT_NO",
"PERMIT_CATEGORY",
"MOBILE_NO1",
"MOBILE_NO2",
"EMAIL_ID",
"ADHAR_NO",
"ADHAR_DOC",
"PANCARD_NO",
"PAN_DOC",
"NOMINEE",
"NOMINEE_DOB",
"EMISSION_DUEDATE",
"FUEL_TYPE",
"HYPOTHECATION_BANK",
"HYPOTHECATION_CITY",
"RTO",
"REFERRED_BY",
"COMMENTS",
"CUSTOMER_TYPE",
"MARTIAL_STATUS",
"TP_INSURANCE_PROVIDER",
"TP_DUEDATE",
"GST_NO",
"INSURANCE_TYPE"
]

  return (
    <div className='max-w-md space-y-2'>
        <TextField.Root>
        <TextField.Input placeholder="Vehicle No." />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="RC_No" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="Registered_Date" />
        </TextField.Root>        
        <TextField.Root>
		<TextField.Input placeholder="Owner" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="Owner_DOB" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="OWNERSHIP_TYPE" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="VEHICLE_TYPE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="YEAR_OF_MANUFACURING" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="GVW" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="CHASIS_NO" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="ENGINE_NO" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="FC_DUE_DATE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="TAX_DUE_DATE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="VEHICLE_COLOR" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="VEHICE_NORMS" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="ADDRESS" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="CC" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="MAKE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="MODEL" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="INSURANCE_PROVIDER" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="INSURANCE_DUEDATE" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="POLICY_NO" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="PERMIT_NO" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="PERMIT_CATEGORY" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="MOBILE_NO1" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="MOBILE_NO2" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="EMAIL_ID" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="ADHAR_NO" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="ADHAR_DOC" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="PANCARD_NO" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="PAN_DOC" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="NOMINEE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="NOMINEE_DOB" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="EMISSION_DUEDATE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="FUEL_TYPE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="HYPOTHECATION_BANK" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="HYPOTHECATION_CITY" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="RTO" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="REFERRED_BY" />
        </TextField.Root>
        <TextField.Root>
		<TextField.Input placeholder="COMMENTS" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="CUSTOMER_TYPE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="MARTIAL_STATUS" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="TP_INSURANCE_PROVIDER" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="TP_DUEDATE" />
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="GST_NO" />        
        </TextField.Root>
        <TextField.Root>
        <TextField.Input placeholder="INSURANCE_TYPE" />		        
        </TextField.Root>
		 <Button> Submit </Button>
    </div>
    
  )
}

export default AddAutomobilePage