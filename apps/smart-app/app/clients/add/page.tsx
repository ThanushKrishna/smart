'use client'
import React, { useState } from 'react'
import { useForm, Controller, FieldError  } from 'react-hook-form'
import { TextField, Button } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    ADD_CLIENT, 
    ADD_VEHICLE_COLORS,
    ADD_VEHICE_NORMS, ADD_HYPOTHECATION_CITY,
    ADD_CC, ADD_RTO, ADD_HYPOTHECATION_BANK,
    ADD_MAKE, ADD_STANDING_CAPACITY,
    ADD_MODEL, ADD_SEATING_CAPACITY,
    ADD_INSURANCE_PROVIDER, ADD_VEHICLE_DESCRIPTION,
    ADD_PERMIT_CATEGORY, ADD_CUSTOMER_TYPE,
    ADD_TP_INSURANCE_PROVIDER, ADD_VEHICLE_CLASS, ADD_UNLADEN_WEIGHT,
    ADD_GVW, ADD_VEHICLE_BODY, ADD_WHEEL_BASE, ADD_NO_OF_CYLINDER, ADD_SLEEPER_CAPACITY,
    ADD_UPDATED_BY, ADD_REFERRED_BY
    } from '@/graphql/queries'
import {     
    GET_VEHICLE_COLOR_BY_VALUE, CHECK_VEHICLE_UNIQUE,
    GET_VEHICLE_NORMS_BY_VALUE,  GET_HYPOTHECATION_CITY_BY_VALUE,
    GET_CC_BY_VALUE, GET_RTO_BY_VALUE, GET_HYPOTHECATION_BANK_BY_VALUE,
    GET_MAKE_BY_VALUE, GET_STANDING_CAPACITY_BY_VALUE,
    GET_MODEL_BY_VALUE, GET_VEHICLE_CLASS_BY_VALUE,
    GET_INSURANCE_PROVIDER_BY_VALUE, GET_CUSTOMER_TYPE_BY_VALUE,
    GET_PERMIT_CATEGORY_BY_VALUE, GET_VEHICLE_DESCRIPTION_BY_VALUE,
    GET_TP_INSURANCE_PROVIDER_BY_VALUE, GET_SEATING_CAPACITY_BY_VALUE, GET_USER_DATA_BYID,
    GET_UNLADEN_WEIGHT_BY_VALUE, GET_GVW_BY_VALUE, GET_VEHICLE_BODY_BY_VALUE,
    GET_WHEEL_BASE_BY_VALUE, GET_NO_OF_CYLINDER_BY_VALUE, GET_SLEEPER_CAPACITY_BY_VALUE,
    GET_UPDATED_BY_BY_VALUE, GET_REFERRED_BY_BY_VALUE
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import AddressForm from '@/app/components/AddressForm'
import { OWNER_TYPE, FUEL_TYPE, MARITAL_STATUS, INSURANCE_TYPE, PROSPECT, GENDER, N_Relation, VEHICLE_KIND } from '@/json/enums'
import  Checkbox from '@mui/material/Checkbox';
import { TextField as MyTextField , TextareaAutosize  } from '@mui/material';
import {FormControlLabel, CircularProgress, Button as MyButton}  from '@mui/material';



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
const[addHcity, { data:Hcitydata} ] = useMutation(ADD_HYPOTHECATION_CITY);
const[addHbank, { data:Hbankdata} ] = useMutation(ADD_HYPOTHECATION_BANK);
const [addUnladenWeight, { data: unladenWeightData }] = useMutation(ADD_UNLADEN_WEIGHT);
const [addGVW, { data: gvwData }] = useMutation(ADD_GVW);
const [addVehicleBody, { data: vehicleBodyData }] = useMutation(ADD_VEHICLE_BODY);
const [addWheelBase, { data: wheelBaseData }] = useMutation(ADD_WHEEL_BASE);
const [addNoOfCylinder, { data: noOfCylinderData }] = useMutation(ADD_NO_OF_CYLINDER);
const [addSleeperCapacity, { data: sleeperCapacityData }] = useMutation(ADD_SLEEPER_CAPACITY);
const [addUpdatedBy, { data: updatedByData }] = useMutation(ADD_UPDATED_BY);
const [addReferredBy, { data: referredByData }] = useMutation(ADD_REFERRED_BY);

const { data:gcolorsdata } = useQuery(GET_VEHICLE_COLOR_BY_VALUE, {variables: { input: "" }, });
const { data:gnormsdata } = useQuery(GET_VEHICLE_NORMS_BY_VALUE, {variables: { input: "" }, });
const { data:gccdata } = useQuery(GET_CC_BY_VALUE, {variables: { input: "" }, }); 
const { data:gmakedata } = useQuery(GET_MAKE_BY_VALUE, {variables: { input: "" }, }); 
const { data:gmodeldata } = useQuery(GET_MODEL_BY_VALUE, {variables: { input: "" }, }); 
const { data:giproviderdata } = useQuery(GET_INSURANCE_PROVIDER_BY_VALUE, {variables: { input: "" }, }); 
const { data:gpermitdata } = useQuery(GET_PERMIT_CATEGORY_BY_VALUE, {variables: { input: "" }, }); 
const { data:gtpproviderdata } = useQuery(GET_TP_INSURANCE_PROVIDER_BY_VALUE, {variables: { input: "" }, });
const { data:gCusTypedata } = useQuery(GET_CUSTOMER_TYPE_BY_VALUE, {variables: { input: "" }, }); 	
const { data:gVehDesdata } = useQuery(GET_VEHICLE_DESCRIPTION_BY_VALUE, {variables: { input: "" }, }); 	
const { data:gSeatCapdata } = useQuery(GET_SEATING_CAPACITY_BY_VALUE, {variables: { input: "" }, }); 	
const { data:gStanCapdata } = useQuery(GET_STANDING_CAPACITY_BY_VALUE, {variables: { input: "" }, }); 	
const { data:gVehclassdata } = useQuery(GET_VEHICLE_CLASS_BY_VALUE, {variables: { input: "" }, }); 	
const { data:grtodata } = useQuery(GET_RTO_BY_VALUE, {variables: { input: "" }, }); 
const { data:gHcitydata } = useQuery(GET_HYPOTHECATION_CITY_BY_VALUE, {variables: { input: "" }, }); 
const { data:gHbankdata } = useQuery(GET_HYPOTHECATION_BANK_BY_VALUE, {variables: { input: "" }, }); 
const { data: gunladenWeightData } = useQuery(GET_UNLADEN_WEIGHT_BY_VALUE, {variables: { input: "" }, });
const { data: ggvwData } = useQuery(GET_GVW_BY_VALUE, {variables: { input: "" }, });
const { data: gvehicleBodyData } = useQuery(GET_VEHICLE_BODY_BY_VALUE, {variables: { input: "" }, });
const { data: gwheelBaseData } = useQuery(GET_WHEEL_BASE_BY_VALUE, {variables: { input: "" }, });
const { data: gnoOfCylinderData } = useQuery(GET_NO_OF_CYLINDER_BY_VALUE, {variables: { input: "" }, });
const { data: gsleeperCapacityData } = useQuery(GET_SLEEPER_CAPACITY_BY_VALUE, {variables: { input: "" }, });
const { data: gupdatedByData } = useQuery(GET_UPDATED_BY_BY_VALUE, {variables: { input: "" }, });
const { data: greferredByData } = useQuery(GET_REFERRED_BY_BY_VALUE, {variables: { input: "" }, });

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});

const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
const [vehicleno, setVehicleno] = useState<string>("");   
const [firstpage, setfirstpage ] = useState<Boolean>(false);
const [isSubmitted, setisSubmitted] = useState(false);
const [corporate, setCorporate] = useState<Boolean>(false);
const [panfile, setpanfile] = useState<string | null>(null);
const [adharfile, setadharfile] = useState<string | null>(null);
const [VehRegDocfile, setVehRegDocfile] = useState<string | null>(null);
const [OdPolicydocfile, setOdPolicydocfile] = useState<string | null>(null);
const [TpPolicyDocfile, setTpPolicyDocfile] = useState<string | null>(null);
const [GstCerfile, setGstCerfile] = useState<string | null>(null);
const [photoLinks, setphotoLinks] = useState<string | null>(null);
const [NomineeLinks, setNomineeLinks] = useState<string | null>(null);
const [isAddressChecked, setAddressChecked] = useState(false);
const [isPolicyChecked, setPolicyChecked] = useState(false);
const [isLttChecked, setLttChecked] = useState(false);
const [lttValue, setlttValue] = useState<number | undefined>();
const [isNDChecked, setNDChecked] = useState(false);
const [NDValue, setNDValue] = useState<number | undefined>();

const handleLttCheckBox = (event: any) => {
    setLttChecked(event.target.checked);
    setlttValue(new Date('2099-12-31').getTime() + 60 * 60 *1000 * 5.5)
  };

  const handleNDCheckBox = (event: any) => {
    setNDChecked(event.target.checked);
    setNDValue(new Date('2000-01-01').getTime() + 60 * 60 *1000 * 5.5)
  };

const handleAddressCheckBox = (event: any) => {
    setAddressChecked(event.target.checked);        
  };

  const handlePolicyCheckBox = (event: any) => {
    setPolicyChecked(event.target.checked);
  };


    const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
        variables: { vechicleId: vehicleno },
        skip: !vehicleno, // Skip the query if vehicleno is not provided            
        });

    const handleVehicleNoSubmit = async () => {
        if(vehicleno){
           console.log("This is handleVehicleNoSubmit");
           console.log(vehicleno);                                                   
           setfirstpage(true);
           setVehicleNoprovided(true);
        }
        else {
            setfirstpage(true);
        }
        
    } 
   

  
const onSubmit = async (formValues: AddClientType) => {     

        
        try{
        setisSubmitted(true)                     

        const result = {
            data_owner_id: "65420cde2e5ffc26bed53918",
            Vehicle_No: formValues?.Vehicle_No || undefined,                        
            RC_No: formValues?.RC_No || undefined,
            Registered_Date: (formValues?.Registered_Date ? new Date(formValues?.Registered_Date).getTime() + 60 * 60 *1000 * 5.5 : null),
            Owner: formValues?.Owner || undefined,
            Owner_dob: (formValues?.Owner_dob ? new Date(formValues?.Owner_dob).getTime() + 60 * 60 *1000 * 5.5 : null),
            Ownership_type: formValues?.Ownership_type || undefined,
            Vehicle_type: formValues?.Vehicle_type || undefined,
            Gender: formValues?.Gender || undefined,
            Vehicle_Kind: formValues?.Vehicle_Kind || undefined,
            Year_of_manufacuring:  (formValues?.Year_of_manufacuring ? new Date(formValues?.Year_of_manufacuring).getTime() + 60 * 60 *1000 * 5.5 : null),
            GVW: formValues?.GVW || undefined,
            Chasis_No: formValues?.Chasis_No || undefined,
            Engine_No: formValues?.Engine_No || undefined,
            FC_due_Date: (formValues?.FC_due_Date ? new Date(formValues?.FC_due_Date).getTime() + 60 * 60 *1000 * 5.5 : null), 
            tax_due_Date: (isLttChecked ? lttValue : formValues?.tax_due_Date ? new Date(formValues?.tax_due_Date).getTime() + 60 * 60 *1000 * 5.5 : null), 
            Vehicle_color: formValues?.Vehicle_color || undefined,
            Vehice_norms: formValues?.Vehice_norms || undefined,
            Address: formValues?.Address || undefined,
            CC: formValues?.CC || undefined,
            Make: formValues?.Make || undefined,
            Model: formValues?.Model || undefined,
            Insurance_provider: formValues?.Insurance_provider || undefined,
            Insurance_dueDate: (formValues?.Insurance_dueDate ? new Date(formValues?.Insurance_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null), 
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
            Nominee_dob: (formValues?.Nominee_dob ? new Date(formValues?.Nominee_dob).getTime() + 60 * 60 *1000 * 5.5 : null), 
            //  (formValues?.Emission_dueDate ? new Date(formValues?.Emission_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null), 
             Emission_dueDate: (isNDChecked ? NDValue : formValues?.Emission_dueDate ? new Date(formValues?.Emission_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null), 
            Fuel_type: formValues?.Fuel_type || undefined,
            Hypothecation_bank: formValues?.Hypothecation_bank || undefined,
            Hypothecation_city: formValues?.Hypothecation_city || undefined,
            RTO: formValues?.RTO || undefined,
            Referred_by: formValues?.Referred_by || undefined,
            Comments: formValues?.Comments || undefined,
            Customer_type: formValues?.Customer_type || undefined,
            Martial_status: formValues?.Martial_status || undefined,
            TP_Insurance_provider: (isPolicyChecked ? (formValues?.Insurance_provider || undefined ): (formValues?.TP_Insurance_provider || undefined)),   
            TP_dueDate: new Date(isPolicyChecked ? formValues?.Insurance_dueDate : formValues?.TP_dueDate)?.getTime() + 60 * 60 *1000 * 5.5  || undefined,
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
            TP_Policy_No: (isPolicyChecked ? (formValues?.Policy_No || undefined) : (formValues?.TP_Policy_No || undefined)), 
            Insurance_Start: (formValues?.Insurance_Start ? new Date(formValues?.Insurance_Start).getTime() + 60 * 60 *1000 * 5.5 : null), 
            TP_Insurance_Start: new Date(isPolicyChecked ? formValues?.Insurance_Start : formValues?.TP_Insurance_Start)?.getTime() + 60 * 60 *1000 * 5.5  || undefined,
            Vehicle_Reg_Doc: VehRegDocfile || undefined,
            OD_Policy_Doc: OdPolicydocfile || undefined,
            TP_Policy_Doc: (isPolicyChecked ? (OdPolicydocfile || undefined) : (TpPolicyDocfile || undefined)),
            GST_Cer_Doc: GstCerfile || undefined,
            Vehicle_Description: formValues?.Vehicle_Description || undefined,
            Seating_Capacity: formValues?.Seating_Capacity || undefined,
            Standing_Capacity: formValues?.Standing_Capacity || undefined,
            Permit_dueDate: (formValues?.Permit_dueDate ? new Date(formValues?.Permit_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null), 
            CAddress: (isAddressChecked ? formValues?.Address:formValues?.CAddress || undefined ),
            Prospect: formValues?.Prospect || undefined,
            photo_links: photoLinks || undefined,
            Nominee_Doc: NomineeLinks || undefined
        }
        console.log( result );        
        console.log( "tax_dueDate: " + formValues.tax_due_Date );
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
        <div className='font-bold'>
            <form onSubmit={handleSubmit(onSubmit)}>                                
            
            { gusrdatabyid?.user_data_byid === null && firstpage &&
                <div
                className ='mb-4'
                > 
                <Button className='w-full' disabled={isSubmitted}> Submit {isSubmitted && <Spinner></Spinner>}</Button> 
                </div>
                
            }

            <div className='grid-cols-3 max-w-md pb-2 text-slate-500 text-base'>
            {!isVehicleNoprovided && (
                <>
                    <label> Vehicle Registration Number: </label>
                    <br />
                    <MyTextField sx={{ width: '80%' }}  
                    {...register('Vehicle_No', {
                        required: 'Vehicle Registration Number is required',
                        maxLength: {
                        value: 15,
                        message: 'Vehicle Registration Number should be at most 15 characters',
                        },
                        pattern: {
                        value: /^[A-Za-z0-9]*$/,
                        message: 'Vehicle Registration Number should be alphanumeric',
                        },
                    })}
                    onChange={(e) => setVehicleno((e.target.value = e.target.value.toUpperCase()))}
                    />
                    {errors.Vehicle_No && (
                    <p style={{ color: '#ff0000' }}>{errors.Vehicle_No.message}</p>
                    )}

                    <br />
                    <Button
                    style={{ marginTop: '4px', width: '8em' }}                    
                    onClick={() => handleVehicleNoSubmit()}
                    >
                    GO {gusrbyidload && <Spinner/>}
                    </Button>
                </>
                )}
    
            {gusrbyiderror && <p>{gusrbyiderror.message}</p> }            
            
            {gusrdatabyid?.user_data_byid?.Vehicle_No != null && firstpage && 
             <>
                <p className='text-red-600'>Vehicle No already Exist</p>              
                <div className='mb-5'>
                <Button                 
                onClick={() => window.location.reload()}
                >Go Back
                </Button>            
                </div>       
            </> 
            }
            </div >                
    
            {gusrdatabyid?.user_data_byid === null && firstpage && 
                <div>    
                    <div className='text-slate-500 text-base grid grid-cols-5 gap-5 ml-10 mr-10'>
               
                <div>
                <p>Vehicle Registration Number:</p>
                <MyTextField      
                    sx={{ width: '80%' }}                
                    {...register('Vehicle_No')}
                    defaultValue={vehicleno}
                    disabled={true}
                />           

                <FileUplaod 
                    name="Vehicle_Reg_Doc"
                    control={control}     
                    onSelectFile={(e:string | null) => setVehRegDocfile(e)}   
                    value={VehRegDocfile}
                    placeholder=""                       
                />
                </div>

                <div>
                 <p>Owner Name: </p>                            
                <MyTextField sx={{ width: '80%' }}                   
                { ...register('Owner', {                
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
                {errors.Owner && <p className="error text-red-600">{errors.Owner.message}</p>}
                </div>         
                             

                <div>
                <DropDownControl 
                    name="Ownership_type"
                    control={control}
                    placeholder="Owner Type:   "                                      
                    options={OWNER_TYPE}
                    isCorporate={(e:Boolean) => { setCorporate(e)} } 
                />    
                </div>            		

                <div>
                <DropDownControl 
                    name="Vehicle_Kind"
                    control={control}
                    placeholder="Vehicle Type:   "                                      
                    options={VEHICLE_KIND}                    
                />    
                </div>    

                {!corporate &&  <div>
                <DropDownControl 
                    name="Gender"
                    control={control}
                    placeholder="Gender:   "                                      
                    options={GENDER}
                    isCorporate={(e:Boolean) => { setCorporate(e)} } 
                />    
                </div>  }   
                
                <div>
                {!corporate && <>
                <p>Son/Wife/Daughter Of: </p>            
                
                <MyTextField sx={{ width: '80%' }}   { ...register('Son_Wife_Daughter_Of', {                
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
                
                {errors.Son_Wife_Daughter_Of && <p className="error text-red-600">{errors.Son_Wife_Daughter_Of.message}</p>}
                </> }
                </div>
                
                <div>
                <p>Owner Serial Number: </p>
                
                <MyTextField sx={{ width: '80%' }}   { ...register('RC_No', {                
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
                
                {errors.RC_No && <p className="error text-red-600">{errors.RC_No.message}</p>}
                </div>
                                
                <div>
                <p>Chassis Number: </p>
                
                <MyTextField sx={{ width: '80%' }}    { ...register('Chasis_No', {                
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
                
                {errors.Chasis_No && <p className="error text-red-600">{errors.Chasis_No.message}</p>}
                </div>

                <div>
                <p>Engine Number: </p>
                
                <MyTextField sx={{ width: '80%' }}    { ...register('Engine_No', {                
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
                
                {errors.Engine_No && <p className="error text-red-600">{errors.Engine_No.message}</p>}
                </div>

                <DropDownControlWA
                    name="Make"
                    control={control}
                    placeholder="Make:   "           
                    options={gmakedata && gmakedata.MAKE_BY_VALUE.map((data:any) => (data.value)) }             
                    onOptionAdd={async (e: String) => await (addMake( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_MAKE_BY_VALUE, variables: { input: "" } }],
                    })) }                             
                />
                <DropDownControlWA
                    name="Model"
                    control={control}
                    placeholder="Model:   "           
                    options={gmodeldata && gmodeldata.MODEL_BY_VALUE.map((data:any) => (data.value)) }
                    onOptionAdd={async (e: String) => await (addModel( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_MODEL_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />

                <div>
                <DatePickerComponent 
                    name="Registered_Date"
                    control={control}
                    placeholder="Registration Date:   "                           
                />  
                </div>

                <div>
                <DatePickerComponent 
                   name="tax_due_Date"
                   control={control}
                   placeholder="Tax Valid UpTo: "    
                //    setValue={setValue(tax_due_Date, value:any)}
                   disabled={isLttChecked}                    
                />
                {<FormControlLabel
                   control={<Checkbox checked={isLttChecked} onChange={handleLttCheckBox} />}
                   label="LTT"
                 />
                }   
                </div> 

                <DropDownControlWA
                    name="Vehicle_type"
                    control={control}
                    placeholder="Vehicle Class:   "           
                    options={gVehclassdata && gVehclassdata.VEHICLE_CLASS_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => await (addVehclass( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_VEHICLE_CLASS_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                <DropDownControlWA
                    name="Vehicle_Description"
                    control={control}
                    placeholder="Vehicle Description:   "           
                    options={gVehDesdata && gVehDesdata.VEHICLE_DESCRIPTION_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => await (addVehDes( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_VEHICLE_DESCRIPTION_BY_VALUE, variables: { input: "" } }],
                    }) )}
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
                    options={gnormsdata && gnormsdata.VEHICLE_NORMS_BY_VALUE.map((data:any) => (data.value)) }
                    onOptionAdd= {async (e: String) => await (addVehicleNorms( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_VEHICLE_NORMS_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />   
                <DropDownControlWA 
                    name="Vehicle_color"
                    control={control}
                    placeholder="Vehicle Color:   "           
                    options={gcolorsdata && gcolorsdata.VEHICLE_COLOR_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } },
                    refetchQueries: [{ query: GET_VEHICLE_COLOR_BY_VALUE, variables: { input: "" } }],
                    }) )}            
                />      
                <DropDownControlWA
                    name="Seating_Capacity"
                    control={control}
                    placeholder="Seating Capacity:   "           
                    options={gSeatCapdata && gSeatCapdata.SEATING_CAPACITY_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => await (addSeatCap( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_SEATING_CAPACITY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
               <DropDownControlWA
                    name="Standing_Capacity"
                    control={control}
                    placeholder="Standing Capacity:   "           
                    options={gStanCapdata && gStanCapdata.STANDING_CAPACITY_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => await (addStanCap( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_STANDING_CAPACITY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />

                <div>
                <DropDownControlWA 
                    name="Sleeper_Capacity"
                    control={control}
                    placeholder="Sleeper Capacity: "           
                    options={gsleeperCapacityData && gsleeperCapacityData.SLEEPER_CAPACITY_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addSleeperCapacity( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_SLEEPER_CAPACITY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>
               
               <DropDownControlWA
                    name="Hypothecation_bank"
                    control={control}            
                    placeholder="Hypothecation Bank:   "           
                    options={gHbankdata && gHbankdata.HYPOTHECATION_BANK_BY_VALUE.map((data:any) => (data.value)) }           
                    onOptionAdd={async (e: String) => await (addHbank( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_HYPOTHECATION_BANK_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                
                <DropDownControlWA
                    name="Hypothecation_city"
                    control={control}            
                    placeholder="Hypothecation City:   "           
                    options={gHcitydata && gHcitydata.HYPOTHECATION_CITY_BY_VALUE.map((data:any) => (data.value)) }           
                    onOptionAdd={async (e: String) => await (addHcity( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_HYPOTHECATION_CITY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                <DropDownControl 
                    name="Insurance_type"
                    control={control}
                    placeholder="Insurance Type:   "           
                    options={INSURANCE_TYPE}              
                />     

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
                />            
                
                {errors.Policy_No && <p className="error text-red-600">{errors.Policy_No.message}</p>}
                <FileUplaod 
                    name="OD_Policy_Doc"
                    control={control}     
                    onSelectFile={(e:string | null) => setOdPolicydocfile(e)}     
                    value={OdPolicydocfile} 
                    placeholder=""                       
                />	   
                </div> 

               <DropDownControlWA
                    name="Insurance_provider"
                    control={control}
                    placeholder="Own Damage Insurance Provider:   "           
                    options={giproviderdata && giproviderdata.INSURANCE_PROVIDER_BY_VALUE.map((data:any) => (data.value)) }
                    onOptionAdd={async (e: String) => await (addiProvider( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_INSURANCE_PROVIDER_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                <div>
                <DatePickerComponent 
                   name="Insurance_Start"
                   control={control}
                   placeholder="Own Damage Insurance Starts From: "                           
                />
                </div>

                <div>
                <DatePickerComponent 
                   name="Insurance_dueDate"
                   control={control}
                   placeholder="Own Damage Insurance UpTo:  "                           
                /> 

                <FormControlLabel
                    control={<Checkbox checked={isPolicyChecked} onChange={handlePolicyCheckBox} />}
                    label="TP Policy No is same as OD Policy No"
                />
                </div>
                
                <div>
                { !isPolicyChecked && <>            
                <p>TP Policy No: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('TP_Policy_No', {
                    maxLength: {
                        value: 30,
                        message: 'TP Policy number should be at most 30 characters'
                    }
                    })}
                    onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />            
                
                {errors.TP_Policy_No && <p className="error text-red-600">{errors.TP_Policy_No.message}</p>}
    
                <FileUplaod 
                    name="TP_Policy_Doc"
                    control={control}     
                    onSelectFile={(e:string | null) => setTpPolicyDocfile(e)}     
                    value={TpPolicyDocfile }
                    placeholder=""                       
                />	                  
                </>}
                </div>
                

                { !isPolicyChecked && <>   
                    <DropDownControlWA
                        name="TP_Insurance_provider"
                        control={control}
                        placeholder="Third Party Insurance Provider:   "           
                        options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER_BY_VALUE.map((data:any) => (data.value)) }    
                        onOptionAdd={async (e: String) => await (addTpInsuranceProvider( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                        refetchQueries: [{ query: GET_TP_INSURANCE_PROVIDER_BY_VALUE, variables: { input: "" } }],
                        }) )}
                    />
                </>}

                { !isPolicyChecked && <>   
                <div>
                <DatePickerComponent 
                   name="TP_Insurance_Start"
                   control={control}
                   placeholder="Thrid Party Insurance Starts From:  "                           
                />     
                </div>
                </> }
                

                <div>
                { !isPolicyChecked && <>   
                <DatePickerComponent 
                   name="TP_dueDate"
                   control={control}
                   placeholder="Thrid Party Insurance UpTo: "                           
                />                   
                </> }      
                </div>

                <DropDownControlWA
                    name="RTO"
                    control={control}            
                    placeholder="Registering Authority:   "           
                    options={grtodata && grtodata.RTO_BY_VALUE.map((data:any) => (data.value)) }           
                    onOptionAdd={async (e: String) => await (addrto( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_RTO_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />

                <div>
                <DropDownControlWA 
                    name="Unladen_Weight"
                    control={control}
                    placeholder="Unladen Weight: "           
                    options={gunladenWeightData && gunladenWeightData.UNLADEN_WEIGHT_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd= {async (e: String) => ( await addUnladenWeight( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_UNLADEN_WEIGHT_BY_VALUE, variables: { input: "" } }],
                    }) )}            
                /> 
                </div>    

                <div>
                <DropDownControlWA 
                    name="GVW"
                    control={control}
                    placeholder="Laden Weight (GVW): "           
                    options={ggvwData && ggvwData.GVW_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addGVW( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_GVW_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>
                
                <div>
                <DropDownControlWA 
                    name="Vehicle_Body"
                    control={control}
                    placeholder="Vehicle Body: "           
                    options={gvehicleBodyData && gvehicleBodyData.VEHICLE_BODY_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addVehicleBody( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_VEHICLE_BODY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>

                <div>
                <DropDownControlWA 
                    name="Wheel_Base"
                    control={control}
                    placeholder="Wheel Base: "           
                    options={gwheelBaseData && gwheelBaseData.WHEEL_BASE_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addWheelBase( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_WHEEL_BASE_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>

                <div>
                <DropDownControlWA 
                    name="No_Of_Cylinder"
                    control={control}
                    placeholder="No Of Cylinder: "           
                    options={gnoOfCylinderData && gnoOfCylinderData.NO_OF_CYLINDER_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addNoOfCylinder( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_NO_OF_CYLINDER_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>
                               
                <div>
                <DatePickerComponent 
                   name="Owner_dob"
                   control={control}
                   placeholder="Owner DOB/Date of Incorporation:     "                           
                />   
                </div>

                {!corporate && <>
                <DropDownControl 
                    name="Martial_status"
                    control={control}
                    placeholder="Marital Status:   "           
                    options={MARITAL_STATUS}              
                />       
                </>}    

                <div>
                 <DatePickerComponent 
                   name="Year_of_manufacuring"
                   control={control}
                   placeholder="Manufacturing Date:  "                           
                />   
                </div>                                   

                <div>                                      
                 <DatePickerComponent 
                   name="FC_due_Date"
                   control={control}
                   placeholder="REG/FC UpTo:  "                           
                />                 
                </div>                                   

                <DropDownControlWA 
                    name="CC"
                    control={control}            
                    placeholder="Cubic capacity:   "           
                    options={gccdata && gccdata.CC_BY_VALUE.map((data:any) => (data.value)) }           
                    onOptionAdd= {async (e: String) => await (addcc( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_CC_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />      
                <div>                 
                <p>Permit No: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('Permit_No', {
                    maxLength: {
                        value: 30,
                        message: 'Permit Number should be at most 25 characters'
                    },               
                    })}
                    onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />            
                
                {errors.Permit_No && <p className="error text-red-600">{errors.Permit_No.message}</p>}
                </div>

                <DropDownControlWA
                    name="Permit_category"
                    control={control}
                    placeholder="Permit Category:   "           
                    options={gpermitdata && gpermitdata.PERMIT_CATEGORY_BY_VALUE.map((data:any) => (data.value)) }
                    onOptionAdd={async (e: String) => await (addPermitCategory( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_PERMIT_CATEGORY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />

                <div>
                <DatePickerComponent 
                    name="Permit_dueDate"
                    control={control}
                    placeholder="Permit Valid Upto:   "                           
                />        
                </div>

                <div>
                <p>1st Mobile No: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('Mobile_No1', {
                    pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9'
                    }
                    })}
                />                                  
                
                {errors.Mobile_No1 && typeof errors.Mobile_No1 === 'object' && 'message' in errors.Mobile_No1 && (
                <p className="error text-red-600">{(errors.Mobile_No1 as FieldError).message}</p>)}  
                </div>
                
                <div>
                <p>2nd Mobile No: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('Mobile_No2', {
                    pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9'
                    }
                    })}
                />                                 
                
                {errors.Mobile_No2 && typeof errors.Mobile_No2 === 'object' && 'message' in errors.Mobile_No2 && (
                <p className="error text-red-600">{(errors.Mobile_No2 as FieldError).message}</p>)}   
                </div>
                <div>
                <p>3rd Mobile No: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('Mobile_No3', {
                    pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9'
                    }
                    })}
                />                      
                
                {errors.Mobile_No3 && typeof errors.Mobile_No3 === 'object' && 'message' in errors.Mobile_No3 && (
                <p className="error text-red-600">{(errors.Mobile_No3 as FieldError).message}</p>)}  
                </div>

                <div>
                <p>Email Id: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('Email_id', {
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address'
                    }
                    })}
                />            
                
                {errors.Email_id && <p className="error text-red-600">{errors.Email_id.message}</p>}
                </div>

                <div>
                {!corporate && <>
                <p>Aadhar Number: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('Adhar_No', {
                    pattern: {
                        value: /^\d{12}$/,
                        message: 'Adhar Number should be a 12-digit number'
                    }
                    })}
                />                                 
                                
                {errors.Adhar_No && typeof errors.Adhar_No === 'object' && 'message' in errors.Adhar_No && (
                <p className="error text-red-600">{(errors.Adhar_No as FieldError).message}</p>)}   
                <FileUplaod 
                    name="Adhar_doc"
                    control={control}     
                    onSelectFile={(e:string | null) => setadharfile(e)}  
                    value={ adharfile }                 
                    placeholder=""                       
                />
                </>}
                </div>

                <div>
                <p>PAN Number: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('PanCard_No', {
                    pattern: {
                        value: /^[A-Za-z0-9]{10}$/,
                        message: 'Pan Card Number should be a 10-character alphanumeric string'
                    }
                    })}
                    onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />            
                
                {errors.PanCard_No && <p className="error text-red-600">{errors.PanCard_No.message}</p>}
                <FileUplaod 
                    name="Pan_doc"
                    control={control}
                    onSelectFile={(e:string | null) => setpanfile(e)}
                    value={panfile}
                    placeholder=""                       
                />
                </div>

                
                { !corporate &&  <div>
                <p>Nominee Name: </p>
                
                <MyTextField sx={{ width: '80%' }}  
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
                
                {errors.Nominee && <p className="error text-red-600">{errors.Nominee.message}</p>}
                <FileUplaod 
                    name="Nominee_Doc"
                    control={control}     
                    onSelectFile={(e:string | null) => setNomineeLinks(e)}     
                    value={NomineeLinks} 
                    placeholder=""                    
                />	   
                </div> }

                
                { !corporate && <div>
                <DropDownControl 
                    name="Nominee_Relationship"
                    control={control}
                    placeholder="Nominee Relationship:  "                                      
                    options={N_Relation}                    
                />                                    
                </div> }

                { !corporate &&  <div>                                
                <DatePickerComponent 
                   name="Nominee_dob"
                   control={control}
                   placeholder="Nominee DOB: "                           
                />                                  
                </div> }

                <div>
                <p>PUC/Emission Number: </p>
                
                    
                <MyTextField sx={{ width: '80%' }}  
                    {...register('PUCC_Emission_No', {
                        maxLength: {
                            value: 30,
                            message: 'Emission number should be at most 30 characters'
                        }                
                        })}   
                    disabled={isNDChecked}
                    onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />            
                
                {errors.PUCC_Emission_No && <p className="error text-red-600">{errors.PUCC_Emission_No.message}</p>}
                {<FormControlLabel
                   control={<Checkbox checked={isNDChecked} onChange={handleNDCheckBox} />}
                   label="ND"
                 />
                }   
                </div>    
                
                <div>
                <DatePickerComponent 
                   name="Emission_dueDate"
                   control={control}
                   placeholder="PUC/Emission UpTo: "  
                   disabled={isNDChecked}                         
                />                   
                </div>

                <div>    
                <p className='mt-3'>GST No: </p>
                
                <MyTextField sx={{ width: '80%' }}  
                    {...register('GST_No', {
                    pattern: {
                        value: /^[A-Za-z0-9]{15}$/,
                        message: 'GST Number should be a 15-character alphanumeric string'
                    }
                    })}
                    onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                />
                
                {errors.GST_No && <p className="error text-red-600">{errors.GST_No.message}</p>}
                <FileUplaod 
                    name="GST_Cer_Doc"
                    control={control}
                    onSelectFile={(e:string | null) => setGstCerfile(e)}
                    value={GstCerfile}
                    placeholder=""                       
                />    
                </div>                    
    
                <div>
                <DropDownControlWA 
                    name="Referred_by"
                    control={control}
                    placeholder="Referred By: "           
                    options={greferredByData && greferredByData.REFERRED_BY_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addReferredBy( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_REFERRED_BY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>

                <div>
                <DropDownControlWA 
                    name="updated_by"
                    control={control}
                    placeholder="Updated By: "           
                    options={gupdatedByData && gupdatedByData.UPDATED_BY_BY_VALUE.map((data:any) => (data.value)) }  
                    onOptionAdd={async (e: String) => ( await addUpdatedBy( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_UPDATED_BY_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />
                </div>

                <DropDownControlWA
                    name="Customer_type"
                    control={control}
                    placeholder="Policy Issued Through:  "           
                    options={gCusTypedata && gCusTypedata.CUSTOMER_TYPE_BY_VALUE.map((data:any) => (data.value)) }    
                    onOptionAdd={async (e: String) => await (addCusType( { variables: { input: {data_owner_id: "6562047e649b76ef6a583b8d", value: e } },
                    refetchQueries: [{ query: GET_CUSTOMER_TYPE_BY_VALUE, variables: { input: "" } }],
                    }) )}
                />        

                <div>     
                <p className='mt-3'>Comments: </p>
                <TextareaAutosize
                style={{ width: '80%' }}  
                aria-label="minimum height" minRows={3}
                {...register                    
                    ('Comments', {
                    maxLength: {
                    value: 500,
                    message: 'Comments should be at most 500 characters'
                    }
                })}
                />
                {errors.Comments && <p className="error text-red-600">{errors.Comments.message}</p>}
                </div>
                
                <DropDownControl 
                    name="Prospect"
                    control={control}   
                    value="LEAD"     
                    placeholder="Prospect:   "           
                    options={PROSPECT}              
                />                       

                 <div>
                <FileUplaod 
                    name="photo_links"
                    control={control}     
                    onSelectFile={(e:string | null) => setphotoLinks(e)}     
                    value={photoLinks} 
                    placeholder="Upload Photos:    "                    
                />	   
                </div>

                <div className='col-span-5'>
                <AddressForm addressType="Address" placehoder="RC Address: " register={register} errors={errors} />
                <FormControlLabel
                    control={<Checkbox checked={isAddressChecked} onChange={handleAddressCheckBox} />}
                    label="Communication Address same as RC Address"
                />
                </div>  

                <div className='col-span-5'>
                {!isAddressChecked && <AddressForm addressType="CAddress" placehoder="Communication Address" register={register} errors={errors} /> }
                </div>


            </div>       
           
            <div
            className='mt-10'
            >
            <Button             
            disabled={isSubmitted}
            className='w-full'
            > 
            Submit {isSubmitted && <Spinner></Spinner>}
            </Button> 
            </div>
            </div> }
            </form>
        </div>
      )
    }
    
    
    export default AddClient;