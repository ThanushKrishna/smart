'use client'
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { Button } from '@radix-ui/themes'
import  Spinner from '@/app/components/Spinner'
import { useForm, FieldError  } from 'react-hook-form'
import { AddClientType } from '@/typings';
import { 
    ADD_VEHICLE_COLORS,ADD_HYPOTHECATION_BANK,
    ADD_VEHICE_NORMS, ADD_HYPOTHECATION_CITY,
    ADD_MAKE, ADD_STANDING_CAPACITY,
    ADD_MODEL, ADD_SEATING_CAPACITY,
    ADD_VEHICLE_DESCRIPTION,
    ADD_VEHICLE_CLASS,
    GET_SLEEPER_CAPACITY_BY_VALUE,
    UPDATE_CLIENT
    } from '@/graphql/queries'
import {     
    GET_USER_DATA_BYID, GET_HYPOTHECATION_BANK,
    GET_VEHICLE_COLORS, GET_HYPOTHECATION_CITY,
    GET_VEHICLE_NORMS,      
    GET_MAKE, GET_STANDING_CAPACITY,
    GET_MODEL, GET_VEHICLE_CLASS,
    GET_VEHICLE_DESCRIPTION, ADD_SLEEPER_CAPACITY,
    GET_SEATING_CAPACITY
    } from '@/graphql/queries'
import { 
        ADD_CC, GET_CC, GET_CUSTOMER_TYPE, GET_PERMIT_CATEGORY, 
        ADD_PERMIT_CATEGORY, ADD_CUSTOMER_TYPE, GET_UPDATED_BY_BY_VALUE, 
        ADD_UPDATED_BY, ADD_REFERRED_BY, GET_REFERRED_BY_BY_VALUE,           
        GET_RTO, GET_INSURANCE_PROVIDER, 
        GET_TP_INSURANCE_PROVIDER, ADD_RTO,    
        ADD_INSURANCE_PROVIDER, ADD_TP_INSURANCE_PROVIDER,
        GET_UNLADEN_WEIGHT_BY_VALUE, ADD_UNLADEN_WEIGHT,
        GET_VEHICLE_BODY_BY_VALUE, ADD_VEHICLE_BODY,
        ADD_WHEEL_BASE, GET_WHEEL_BASE_BY_VALUE,
        GET_NO_OF_CYLINDER_BY_VALUE, ADD_NO_OF_CYLINDER,
        ADD_GVW, GET_GVW_BY_VALUE
        } from '@/graphql/queries'

import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import { FileUplaod } from '@/app/components/Upload'
import { Checkbox, FormControlLabel, TextField as MyTextField, TextareaAutosize  } from '@mui/material';
import { useRouter } from 'next/navigation';
import { FUEL_TYPE, GENDER, OWNER_TYPE, VEHICLE_KIND , MARITAL_STATUS, N_Relation, PROSPECT, INSURANCE_TYPE } from '@/json/enums'
import AddressForm from '@/app/components/AddressForm';
import withAuth from '../../middleware/withAuth';
import { getUserFromCookie } from '../../../utils/auth';

const UpdateClient:React.FC = () => {
   
        const [userId, setUserId] = useState('');
        useEffect(() => {        
            const decodedToken = getUserFromCookie();        
            if(decodedToken  && typeof decodedToken === 'object' ){
                //console.log('userid from token:' +  decodedToken.userid);
                setUserId(decodedToken.userid);
            }
        }, []);

        const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
        const [vehicleno, setVehicleno] = useState<String>("");   
        const [firstpage, setfirstpage ] = useState<Boolean>(false);  

        const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
            variables: { data_owner_id: userId, vechicle_id: vehicleno, },
            skip: !vehicleno, // Skip the query if vehicleno is not provided            
            });

            const router = useRouter();                      
            const [isSubmitted, setisSubmitted] = useState(false);
            const [dataId, setdataID] = useState();
            const [VehRegDocfile, setVehRegDocfile] = useState<string | null>(gusrdatabyid?.user_data_byid?.Vehicle_Reg_Doc || '');        
            const [TpPolicyDocfile, setTpPolicyDocfile] = useState<string | null>(gusrdatabyid?.user_data_byid?.TP_Policy_Doc || '');
            const [OdPolicydocfile, setOdPolicydocfile] = useState<string | null>(gusrdatabyid?.user_data_byid?.OD_Policy_Doc || '');
            const [panfile, setpanfile] = useState<string | null>(gusrdatabyid?.user_data_byid?.Pan_doc || '');
            const [adharfile, setadharfile] = useState<string | null>(gusrdatabyid?.user_data_byid?.Adhar_doc || '');
            const [GstCerfile, setGstCerfile] = useState<string | null>(gusrdatabyid?.user_data_byid?.GST_Cer_Doc || '');
            const [photoLinks, setphotoLinks] = useState<string | null>(gusrdatabyid?.user_data_byid?.photo_links || '');
            const [NomineeLinks, setNomineeLinks] = useState<string | null>(gusrdatabyid?.user_data_byid?.Nominee_Doc || '');            
            const [isLttChecked, setLttChecked] = useState(false);
            const [lttValue, setlttValue] = useState<number | undefined>();
            const [isCorporateUpdate, setCorporateUpdate ] = useState<Boolean>(false);            
            const [isPolicyChecked, setPolicyChecked] = useState(false);            
            const [isAddressChecked, setAddressChecked] = useState(false);            
            const [isNDChecked, setNDChecked] = useState(false);
            const [NDValue, setNDValue] = useState<number | undefined>();            
            
            const handlePolicyCheckBox = (event: any) => {
                setPolicyChecked(event.target.checked);
              };
            
            const handleAddressCheckBox = (event: any) => {
              setAddressChecked(event.target.checked);        
            };
            
            const handleNDCheckBox = (event: any) => {
              setNDChecked(event.target.checked);
              setNDValue(new Date('2000-01-01').getTime() + 60 * 60 *1000 * 5.5)
            };

            const handleLttCheckBox = (event: any) => {
                setLttChecked(event.target.checked);
                setlttValue(new Date('2099-12-31').getTime() + 60 * 60 *1000 * 5.5)
              };
            
            
            
            const[addiProvider, { data:iproviderdata} ] = useMutation(ADD_INSURANCE_PROVIDER);
            const[addTpInsuranceProvider, { data:tpproviderdata} ] = useMutation(ADD_TP_INSURANCE_PROVIDER);
            const[addrto, { data:rtodata} ] = useMutation(ADD_RTO);
            const[addUnladenWeight, { data: unladenWeightData }] = useMutation(ADD_UNLADEN_WEIGHT);
            const[addLadenWeight, { data: ladenWeightData }] = useMutation(ADD_GVW);	
            const[addUpdatedBy, { data: updatedByData }] = useMutation(ADD_UPDATED_BY);
            const[addReferredBy, { data: referredByData }] = useMutation(ADD_REFERRED_BY);
            const[addcc, { data:ccdata} ] = useMutation(ADD_CC);
            const[addPermitCategory, { data:permitdata} ] = useMutation(ADD_PERMIT_CATEGORY);
            const[addCusType, { data:custtypedata} ] = useMutation(ADD_CUSTOMER_TYPE);
            const[addVehicleBody, { data: vehicleBodyData }] = useMutation(ADD_VEHICLE_BODY);
            const[addWheelBase, { data: wheelBaseData }] = useMutation(ADD_WHEEL_BASE);
            const[addNoOfCylinders, { data: noOfCylindersData }] = useMutation(ADD_NO_OF_CYLINDER);
            const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT);
            const[addVehicleColor, { data:colordata} ] = useMutation(ADD_VEHICLE_COLORS);
            const[addVehicleNorms, { data:normsdata} ] = useMutation(ADD_VEHICE_NORMS);
            const[addMake, { data:makedata} ] = useMutation(ADD_MAKE);
            const[addModel, { data:modeldata} ] = useMutation(ADD_MODEL);
            const[addVehclass, { data:vehicleclassdata} ] = useMutation(ADD_VEHICLE_CLASS);
            const[addVehDes, { data:vehicledescdata} ] = useMutation(ADD_VEHICLE_DESCRIPTION);
            const[addSeatCap, { data:seatcapdata} ] = useMutation(ADD_SEATING_CAPACITY);
            const[addStanCap, { data:standcapdata} ] = useMutation(ADD_STANDING_CAPACITY);
            const[addHcity, { data:Hcitydata} ] = useMutation(ADD_HYPOTHECATION_CITY);
            const[addHbank, { data:Hbankdata} ] = useMutation(ADD_HYPOTHECATION_BANK);
            const[addSleeperCapacity, { data: sleeperCapacityData }] = useMutation(ADD_SLEEPER_CAPACITY);
            
            const { data: vehicleBodyOptions } = useQuery(GET_VEHICLE_BODY_BY_VALUE, { variables: { input: "" } });
            const { data: wheelBaseOptions } = useQuery(GET_WHEEL_BASE_BY_VALUE, { variables: { input: "" } });
            const { data: noOfCylindersOptions } = useQuery(GET_NO_OF_CYLINDER_BY_VALUE, { variables: { input: "" } });
            const { data:giproviderdata } = useQuery(GET_INSURANCE_PROVIDER, { pollInterval: 1000,}); 
            const { data:gtpproviderdata } = useQuery(GET_TP_INSURANCE_PROVIDER, { pollInterval: 1000,});	
            const { data:grtodata } = useQuery(GET_RTO, { pollInterval: 1000,}); 
            const { data: updatedByOptions } = useQuery(GET_UPDATED_BY_BY_VALUE, { variables: { input: "" } });
            const { data: gvwData } = useQuery(GET_GVW_BY_VALUE, {variables: { input: "" }, });
            const { data: gunladenWeightData } = useQuery(GET_UNLADEN_WEIGHT_BY_VALUE, {variables: { input: "" }, });
            const { data:gccdata } = useQuery(GET_CC, { pollInterval: 1000,}); 
            const { data:gpermitdata, error:gpermiterror } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
            const { data:gCusTypedata } = useQuery(GET_CUSTOMER_TYPE, { pollInterval: 1000,}); 
            const { data: referredByOptions } = useQuery(GET_REFERRED_BY_BY_VALUE, { variables: { input: "" } });
            const { data:gcolorsdata } = useQuery(GET_VEHICLE_COLORS, { pollInterval: 1000,}); 
            const { data:gnormsdata } = useQuery(GET_VEHICLE_NORMS, { pollInterval: 1000,}); 
            const { data:gmakedata } = useQuery(GET_MAKE, { pollInterval: 1000,}); 
            const { data:gmodeldata } = useQuery(GET_MODEL, { pollInterval: 1000,}); 
            const { data:gVehDesdata } = useQuery(GET_VEHICLE_DESCRIPTION, { pollInterval: 1000,}); 	
            const { data:gSeatCapdata } = useQuery(GET_SEATING_CAPACITY, { pollInterval: 1000,}); 	
            const { data:gStanCapdata } = useQuery(GET_STANDING_CAPACITY, { pollInterval: 1000,}); 	
            const { data:gVehclassdata } = useQuery(GET_VEHICLE_CLASS, { pollInterval: 1000,}); 	
            const { data:gHcitydata } = useQuery(GET_HYPOTHECATION_CITY, { pollInterval: 1000,}); 
            const { data:gHbankdata } = useQuery(GET_HYPOTHECATION_BANK, { pollInterval: 1000,}); 
            const { data: gsleeperCapacityData } = useQuery(GET_SLEEPER_CAPACITY_BY_VALUE, {variables: { input: "" }, });
            
            const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});                        

            const onSubmit = async (formValues: AddClientType) => {     
            
                try{
                    setisSubmitted(true)                     
            
                    const result = {
                        id: dataId,
                        Vehicle_Reg_Doc:  VehRegDocfile || undefined,			
                        RC_No: formValues?.RC_No || undefined,
                        Registered_Date: new Date(formValues?.Registered_Date)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,                      
                        Owner: formValues?.Owner || undefined,
                        Son_Wife_Daughter_Of: formValues?.Son_Wife_Daughter_Of || undefined, 
                        Gender: formValues?.Gender || undefined,
                        Vehicle_Kind: formValues?.Vehicle_Kind || undefined,
                        Chasis_No: formValues?.Chasis_No || undefined,
                        Engine_No: formValues?.Engine_No || undefined,
                        Make: formValues?.Make || undefined,
                        Model: formValues?.Model || undefined,
                        Ownership_type: formValues?.Ownership_type || undefined,            			
                        tax_due_Date: (isLttChecked ? lttValue : formValues?.tax_due_Date ? new Date(formValues?.tax_due_Date).getTime() + 60 * 60 *1000 * 5.5 : null), 
                        Vehicle_type: formValues?.Vehicle_type || undefined,
                        Vehicle_Description: formValues?.Vehicle_Description || undefined,
                        Fuel_type: formValues?.Fuel_type || undefined,
                        Vehice_norms: formValues?.Vehice_norms || undefined,
                        Vehicle_color: formValues?.Vehicle_color || undefined,            
                        Seating_Capacity: formValues?.Seating_Capacity || undefined,
                        Standing_Capacity: formValues?.Standing_Capacity || undefined,
                        Sleeper_Capacity: formValues?.Sleeper_Capacity || undefined,
                        Hypothecation_bank: formValues?.Hypothecation_bank || undefined,
                        Hypothecation_city: formValues?.Hypothecation_city || undefined,
                        Insurance_type: formValues?.Insurance_type || undefined,            			
                        Policy_No: formValues?.Policy_No || undefined,
                        OD_Policy_Doc: OdPolicydocfile || undefined,
                        Insurance_provider: formValues?.Insurance_provider || undefined,
                        Insurance_dueDate: new Date(formValues?.Insurance_dueDate)?.getTime() + 60 * 60 *1000 * 5.5 || null,
                        TP_Policy_No: (isPolicyChecked ? (formValues?.Policy_No || undefined) : (formValues?.TP_Policy_No || undefined)),   
                        Insurance_Start: new Date(formValues?.Insurance_Start)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,        
                        TP_Insurance_Start: new Date(isPolicyChecked ? formValues?.Insurance_Start : formValues?.TP_Insurance_Start)?.getTime() + 60 * 60 *1000 * 5.5  || null,
                        TP_Policy_Doc: (isPolicyChecked ? (OdPolicydocfile || undefined) : (TpPolicyDocfile || undefined)),   
                        TP_Insurance_provider: (isPolicyChecked ? (formValues?.Insurance_provider || undefined ): (formValues?.TP_Insurance_provider || undefined)),                                 
                        TP_dueDate: new Date(isPolicyChecked ? formValues?.Insurance_dueDate : formValues?.TP_dueDate)?.getTime() + 60 * 60 *1000 * 5.5  || null,
                        RTO: formValues?.RTO || undefined,
                        Unladen_Weight: formValues?.Unladen_Weight || undefined, 
                        GVW: formValues?.GVW || undefined,            
                        Vehicle_Body: formValues?.Vehicle_Body || undefined,
                        Wheel_Base: formValues?.Wheel_Base || undefined,
                        No_Of_Cylinder: formValues?.No_Of_Cylinder || undefined,	
                        Owner_dob: new Date(formValues?.Owner_dob)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,            
                        Year_of_manufacuring: new Date(formValues?.Year_of_manufacuring)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
                        FC_due_Date: new Date(formValues?.FC_due_Date)?.getTime() + 60 * 60 *1000 * 5.5 || null,
                        Address: formValues?.Address || undefined,
                        CC: formValues?.CC || undefined,
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
                        Nominee_dob: new Date(formValues?.Nominee_dob)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,          
                        Emission_dueDate: (isNDChecked ? NDValue : formValues?.Emission_dueDate ? new Date(formValues?.Emission_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null),             
                        Referred_by: formValues?.Referred_by || undefined,
                        Comments: formValues?.Comments || undefined,
                        Customer_type: formValues?.Customer_type || undefined,
                        Martial_status: formValues?.Martial_status || undefined,
                        GST_No: formValues?.GST_No || undefined,
                        PUCC_Emission_No: formValues?.PUCC_Emission_No || undefined,
                        updated_by: formValues?.updated_by || undefined,            
                        GST_Cer_Doc: GstCerfile || undefined,     
                        Permit_dueDate: (formValues?.Permit_dueDate ? new Date(formValues?.Permit_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null), 
                        CAddress: (isAddressChecked ? formValues?.Address:formValues?.CAddress || undefined ),
                        Prospect: formValues?.Prospect || undefined, 
                        photo_links: photoLinks || undefined,   
                        Nominee_Doc: NomineeLinks || undefined, 
                    }
                    
                    console.log( result );
                    updateclient( { variables: { input: result},           
                    })
                    .then(()=> {                   
                            router.push('/clients/update') 
                            window.location.reload();               
                        }        
                    )
                    .catch((err) => {
                      console.log(JSON.stringify(err, null, 2));                        
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
            if(vehicleno){
               //console.log("This is handleVehicleNoSubmit");                                                                 
               setfirstpage(true);
               setVehicleNoprovided(true);
               setdataID(gusrdatabyid?.user_data_byid?.id || '')
               setVehRegDocfile(gusrdatabyid?.user_data_byid?.Vehicle_Reg_Doc || '');
               setTpPolicyDocfile(gusrdatabyid?.user_data_byid?.TP_Policy_Doc || '')
               setOdPolicydocfile(gusrdatabyid?.user_data_byid?.OD_Policy_Doc || '')
               setpanfile(gusrdatabyid?.user_data_byid?.Pan_doc || '')
               setadharfile(gusrdatabyid?.user_data_byid?.Adhar_doc || '')
               setGstCerfile(gusrdatabyid?.user_data_byid?.GST_Cer_Doc || '')
               setphotoLinks(gusrdatabyid?.user_data_byid?.photo_links || '')
               setNomineeLinks(gusrdatabyid?.user_data_byid?.Nominee_Doc || '')
//               console.log("VehRegDocfile: " + VehRegDocfile); 
            }
            else {
                setfirstpage(true);
            }
            
        }     

    return (    
        <div>
        
        {!isVehicleNoprovided &&
        <div className='grid-cols-3 max-w-md pb-2 text-slate-500 text-base font-bold'>
         <label> Vehicle Registration Number: </label>
         <br />
         <MyTextField sx={{ width: '80%' }}  
         type="text" 
         name='Vehicle_No'  
         onBlur={(e:any) => setVehicleno(e.target.value)}                     
         onChange={(e) => setVehicleno((e.target.value = e.target.value.toUpperCase()))}
        />                           
       
        <br />
        <Button
        style={{ marginTop: '4px', width: '8em' }}                    
        onClick={() => handleVehicleNoSubmit()}
        >
        GO {gusrbyidload && <Spinner/>}
        </Button>
        </div>
        }  
          

        {gusrbyiderror && <p>{gusrbyiderror.message}</p> }

        {!vehicleno && firstpage &&  <p className='text-red-600'>Provide the Vehicle No</p>}
        
        {gusrdatabyid?.user_data_byid === null && firstpage && 
         <>
            <p className='text-red-600'>Vehicle No does not exist</p>              
            <div className='mb-5'>
            <Button 
            onClick={() => window.location.reload() }
            >Go Back
            </Button>            
            </div>       
        </> 
        }
               

        { gusrdatabyid?.user_data_byid?.Vehicle_No && firstpage && 
        
        <form  onSubmit={handleSubmit(onSubmit)}>     
        <div className='font-bold'>     

                <div className='mb-5'>
                <Button 
                className='w-full'
                disabled={isSubmitted}                    
                > 
                Submit {isSubmitted && <Spinner></Spinner>}
                </Button>   
                </div>                   

                <div  className='text-slate-500 text-base grid grid-cols-5 gap-5 ml-10 mr-10 font-bold'>                            
                <div>
                <p>Vehicle Registration Number:</p>
                
                    <MyTextField sx={{ width: '80%' }}
                    {...register('Vehicle_No', )}
                    defaultValue={gusrdatabyid.user_data_byid?.Vehicle_No}
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    disabled={true}
                    />
                    
                <FileUplaod
                    name="Vehicle_Reg_Doc"
                    control={control}
                    onSelectFile={(e: string | null) => setVehRegDocfile(e)}
                    value={VehRegDocfile}
                    placeholder=""
                />
                </div>

                <div>
                <p>Owner Name: </p>
                
                    <MyTextField sx={{ width: '80%' }}
                    {...register('Owner', {
                        maxLength: {
                        value: 30,
                        message: 'Owner Name should be at most 30 characters',
                        },
                        pattern: {
                        value: /^[A-Za-z\s]*$/,
                        message: 'Owner Name  should contain only alphabets and spaces',
                        },
                    })}
                    defaultValue={gusrdatabyid.user_data_byid?.Owner}
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                
                {errors.Owner && (
                    <p className="error text-red-600">{errors.Owner.message}</p>
                )}
                </div>

                <div>
                <DropDownControl 
                    name="Ownership_type"
                    control={control}
                    value={gusrdatabyid.user_data_byid?.Ownership_type}  
                    placeholder="Owner Type:   "                                      
                    options={OWNER_TYPE}
                    isCorporate={(e:Boolean) => { setCorporateUpdate(e)} } 
                />         
                </div>

                <div>
                    <DropDownControl 
                        name="Vehicle_Kind"
                        control={control}
                        value={gusrdatabyid.user_data_byid?.Vehicle_Kind}  
                        placeholder="Vehicle Type:   "                                      
                        options={VEHICLE_KIND}                    
                    />    
                </div>        

            

                {! isCorporateUpdate && 
                <div>
                    <DropDownControl 
                        name="Gender"
                        control={control}
                        value={gusrdatabyid.user_data_byid?.Gender}  
                        placeholder="Gender:   "                                      
                        options={GENDER}                    
                    />    
                </div> }
            
                {! isCorporateUpdate && <div>
                <p>Son/Wife/Daughter Of: </p>
                
                    <MyTextField sx={{ width: '80%' }}
                    {...register('Son_Wife_Daughter_Of', {
                        maxLength: {
                        value: 30,
                        message: 'Name should be at most 30 characters',
                        },
                        pattern: {
                        value: /^[A-Za-z\s]*$/,
                        message: 'Name  should contain only alphabets and spaces',
                        },
                    })}
                    defaultValue={gusrdatabyid.user_data_byid?.Son_Wife_Daughter_Of}
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />        
                
                {errors.Son_Wife_Daughter_Of && (
                    <p className="error text-red-600"> {errors.Son_Wife_Daughter_Of.message} </p>
                )}
                </div>}

                <div>
                <p>Owner Serial Number: </p>
                
                    <MyTextField sx={{ width: '80%' }}
                    {...register('RC_No', {
                        maxLength: {
                        value: 2,
                        message: 'Owner Serial Number should be at most 2 characters',
                        },
                        pattern: {
                        value: /^[0-9]{2}$/,
                        message: 'Owner Serial Number should be a two-digit number',
                        },
                    })}
                    defaultValue={gusrdatabyid.user_data_byid?.RC_No}
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    
                    {errors.RC_No && (
                        <p className="error text-red-600">{errors.RC_No.message}</p>
                    )}
                    </div>
                
                    <div>
                    <p>Chassis Number: </p>
                    
                    <MyTextField sx={{ width: '80%' }}
                    {...register('Chasis_No', {
                        maxLength: {
                        value: 50,
                        message: 'Chassis Number should be at most 50 characters',
                        }
                    })}
                    defaultValue={gusrdatabyid.user_data_byid?.Chasis_No}
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    
                    {errors.Chasis_No && (
                        <p className="error text-red-600">{errors.Chasis_No.message}</p>
                    )}
                    </div>
                    
                    <div>
                    <p>Engine Number: </p>
                    
                    <MyTextField sx={{ width: '80%' }}
                    {...register('Engine_No', {
                        maxLength: {
                        value: 50,
                        message: 'Engine Number should be at most 50 characters',
                        }
                    })}
                    defaultValue={gusrdatabyid.user_data_byid?.Engine_No}
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    
                    {errors.Engine_No && (
                        <p className="error text-red-600">{errors.Engine_No.message}</p>
                    )}
                    </div>

                    <div>
                        <DropDownControlWA
                            name="Make"
                            control={control}
                            placeholder="Make:   "     
                            value={gusrdatabyid.user_data_byid?.Make}                  
                            options={gmakedata && gmakedata.MAKE.map((data:any) => (data.value)) }             
                            onOptionAdd= {async (e: String) => await (addMake( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
                        />
                    </div>
                    
                    <div>
                        <DropDownControlWA 
                            name="Model"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Model}
                            placeholder="Model:   "           
                            options={gmodeldata && gmodeldata.MODEL.map((data:any) => (data.value)) }
                            onOptionAdd= {async (e: String) => await (addModel( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
                        />
                    </div>

                    <div>            
                        <DatePickerComponent 
                            name="Registered_Date"
                            control={control}
                            placeholder="Registration Date:   "                           
                            selectedDate={gusrdatabyid.user_data_byid?.Registered_Date && new Date(gusrdatabyid.user_data_byid?.Registered_Date)}         
                        />
                    </div>

                    <div>         
                        <DatePickerComponent 
                            name="tax_due_Date"
                            control={control}
                            placeholder="Tax Valid UpTo:  "                           
                            selectedDate={gusrdatabyid.user_data_byid?.tax_due_Date && new Date(gusrdatabyid.user_data_byid?.tax_due_Date)}             
                            disabled={isLttChecked} 
                        />            
                        <FormControlLabel
                        control={<Checkbox checked={isLttChecked} onChange={handleLttCheckBox} />}
                        label="LTT"
                        />
                    </div>   

                    <div>
                        <DropDownControlWA 
                            name="Vehicle_type"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Vehicle_type}                
                            placeholder="Vehicle Class:   "           
                            options={gVehclassdata && gVehclassdata?.VEHICLE_CLASS.map((data:any) => (data.value)) }  
                            onOptionAdd= {async (e: String) => await (addVehclass( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
                        />
                    </div>
                    
                    <div>
                        <DropDownControlWA 
                            name="Vehicle_Description"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Vehicle_Description}
                            placeholder="Vehicle Description:   "           
                            options={gVehDesdata && gVehDesdata.VEHICLE_DESCRIPTION.map((data:any) => (data.value)) }  
                            onOptionAdd= {async (e: String) => await (addVehDes( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
                        />
                    </div>

                    <div>
                        <DropDownControl 
                            name="Fuel_type"
                            control={control}      
                            value={gusrdatabyid.user_data_byid?.Fuel_type}  
                            placeholder="Fuel Type:   "           
                            options={FUEL_TYPE}              
                        />
                    </div>

                    <div>
                        <DropDownControlWA 
                            name="Vehice_norms"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Vehice_norms}
                            placeholder="Emission Norms:   "           
                            options={gnormsdata && gnormsdata.VEHICE_NORMS.map((data:any) => (data.value)) }
                            onOptionAdd= {async (e: String) => await (addVehicleNorms( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
                        />   
                    </div>

                    <div>
                        <DropDownControlWA 
                            name="Vehicle_color"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Vehicle_color}
                            placeholder="Vehicle Color:   "           
                            options={gcolorsdata && gcolorsdata.VEHICLE_COLOR.map((data:any) => (data.value)) }  
                            onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
                        />      
                    </div>

                    <div>
                        <DropDownControlWA 
                            name="Seating_Capacity"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Seating_Capacity}
                            placeholder="Seating Capacity:   "           
                            options={gSeatCapdata && gSeatCapdata.SEATING_CAPACITY.map((data:any) => (data.value)) }  
                            onOptionAdd= {async (e: String) => await (addSeatCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
                        />      
                    </div>

                    <div>        
                        <DropDownControlWA 
                            name="Standing_Capacity"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Standing_Capacity}
                            placeholder="Standing Capacity:   "           
                            options={gStanCapdata && gStanCapdata.STANDING_CAPACITY.map((data:any) => (data.value)) }  
                            onOptionAdd= {async (e: String) => await (addStanCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
                        /> 
                    </div>
                   
                    <div>
                      <DropDownControlWA 
                          name="Sleeper_Capacity"
                          control={control}
                          value={gusrdatabyid.user_data_byid?.Sleeper_Capacity}
                          placeholder="Sleeper Capacity: "
                          options={gsleeperCapacityData && gsleeperCapacityData.SLEEPER_CAPACITY_BY_VALUE?.map((data: any) => data.value) || []}
                          onOptionAdd={async (e: String) => await addSleeperCapacity({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_SLEEPER_CAPACITY_BY_VALUE, variables: { input: "" } }] })}
                      />
                      </div>

                    <div>     
                        <DropDownControlWA 
                            name="Hypothecation_bank"
                            control={control}            
                            value={gusrdatabyid.user_data_byid?.Hypothecation_bank}
                            placeholder="Hypothecation Bank:   "           
                            options={gHbankdata && gHbankdata.HYPOTHECATION_BANK.map((data:any) => (data.value)) }           
                            onOptionAdd= {async (e: String) => await (addHbank( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
                        />  
                    </div>
                    
                    <div>
                        <DropDownControlWA 
                            name="Hypothecation_city"
                            control={control}            
                            value={gusrdatabyid.user_data_byid?.Hypothecation_city}
                            placeholder="Hypothecation City:   "           
                            options={gHcitydata && gHcitydata.HYPOTHECATION_CITY.map((data:any) => (data.value)) }           
                            onOptionAdd= {async (e: String) => await (addHcity( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
                        />  
                    </div>   

                    <div>                                
                    <DropDownControl 
                        name="Insurance_type"
                        control={control}
                        value={gusrdatabyid.user_data_byid?.Insurance_type}  
                        placeholder="Insurance Type:   "           
                        options={INSURANCE_TYPE}              
                        />   
                        </div>

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
                            defaultValue={gusrdatabyid.user_data_byid?.Policy_No}
                            />
                    
                        {errors.Policy_No && <p className="error text-red-600">{errors.Policy_No.message}</p>}
                        <FileUplaod 
                            name="OD_Policy_Doc"
                            control={control}     
                            onSelectFile={(e:string | null) => setOdPolicydocfile(e)}                 
                            placeholder=""                  
                            value={OdPolicydocfile}                    
                        />	
                        </div>   
                        
                        <div>
                        <DropDownControlWA 
                            name="Insurance_provider"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Insurance_provider}
                            placeholder=" Own Damage Insurance Provider:   "           
                            options={giproviderdata && giproviderdata.INSURANCE_PROVIDER?.map((data:any) => (data.value)) }
                            onOptionAdd= {async (e: String) => await (addiProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
                        />
                        </div>   

                        <div>
                        <DatePickerComponent 
                            name="Insurance_Start"
                            control={control}
                            placeholder="Own Damage Insurance Starts From:  "                           
                            selectedDate={gusrdatabyid.user_data_byid.Insurance_Start && new Date(gusrdatabyid.user_data_byid?.Insurance_Start)}     
                            />  
                        </div>

                        <div>
                        <DatePickerComponent 
                            name="Insurance_dueDate"
                            control={control}
                            placeholder="Own Damage Insurance UpTo: "                           
                            selectedDate={gusrdatabyid.user_data_byid.Insurance_dueDate && new Date(gusrdatabyid.user_data_byid?.Insurance_dueDate)}        
                            />    
                        <FormControlLabel
                            control={<Checkbox checked={isPolicyChecked} onChange={handlePolicyCheckBox} />}
                            label="TP Policy No is same as OD Policy No"
                        />
                        </div>

                        { !isPolicyChecked && <div>
                        <p>TP Policy No: </p>
                    
                        <MyTextField sx={{ width: '80%' }}
                            {...register('TP_Policy_No', {
                            maxLength: {
                                value: 30,
                                message: 'TP Policy number should be at most 30 characters'
                            }
                            })}
                            onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                            defaultValue={gusrdatabyid.user_data_byid?.TP_Policy_No}
                        />
                    
                        {errors.TP_Policy_No && <p className="error text-red-600">{errors.TP_Policy_No.message}</p>}
                        <FileUplaod 
                            name="TP_Policy_Doc"
                            control={control}     
                            onSelectFile={(e:string | null) => setTpPolicyDocfile(e)}                 
                            placeholder=""                              
                            value={TpPolicyDocfile}      
                        />	
                        </div>}

                        { !isPolicyChecked && <div>
                        <DropDownControlWA 
                            name="TP_Insurance_provider"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.TP_Insurance_provider}
                            placeholder="Third Party Insurance Provider:   "           
                            options={gtpproviderdata && gtpproviderdata.TP_INSURANCE_PROVIDER?.map((data:any) => (data.value)) }    
                            onOptionAdd= {async (e: String) => await (addTpInsuranceProvider( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
                        />
                        </div>}

                        { !isPolicyChecked && <div>
                        <DatePickerComponent 
                            name="TP_Insurance_Start"
                            control={control}
                            placeholder="Thrid Party Insurance Starts From: "                           
                            selectedDate={gusrdatabyid.user_data_byid.TP_Insurance_Start && new Date(gusrdatabyid.user_data_byid?.TP_Insurance_Start)} 
                            />   
                        </div> }

                        { !isPolicyChecked && <div>         
                    <DatePickerComponent 
                            name="TP_dueDate"
                            control={control}
                            placeholder="TP Insurance Valid UpTo:  "                           
                            selectedDate={gusrdatabyid.user_data_byid.TP_dueDate && new Date(gusrdatabyid.user_data_byid?.TP_dueDate)}           
                        /> 
                        </div>  }

                        <div>
                        <DropDownControlWA 
                            name="RTO"
                            control={control}     
                            value={gusrdatabyid.user_data_byid?.RTO}       
                            placeholder="Registering Authority:   "           
                            options={grtodata && grtodata.RTO?.map((data:any) => (data.value)) }           
                            onOptionAdd= {async (e: String) => await (addrto( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
                        />    
                        </div>

                        <div>
                        <DropDownControlWA 
                            name="Unladen_Weight"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Unladen_Weight}
                            placeholder="Unladen Weight: "
                            options={gunladenWeightData && gunladenWeightData.UNLADEN_WEIGHT_BY_VALUE?.map((data: any) => data.value) || []}
                            onOptionAdd={async (e: String) => await addUnladenWeight({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_UNLADEN_WEIGHT_BY_VALUE, variables: { input: "" } }] })}
                        />
                        </div>

                    <div>
                    <DropDownControlWA 
                            name="GVW"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.GVW}
                            placeholder="Laden Weight(GVW): "
                            options={gvwData && gvwData.GVW_BY_VALUE?.map((data: any) => data.value) || []}
                            onOptionAdd={async (e: String) => await addLadenWeight({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_GVW_BY_VALUE, variables: { input: "" } }] })}
                        />
                    </div>

                    <div>
                    <DropDownControlWA 
                            name="Vehicle_Body"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Vehicle_Body}
                            placeholder="Vehicle Body: "
                            options={vehicleBodyOptions && vehicleBodyOptions.VEHICLE_BODY_BY_VALUE?.map((data: any) => data.value) || []}
                            onOptionAdd={async (e: String) => await addVehicleBody({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_VEHICLE_BODY_BY_VALUE, variables: { input: "" } }] })}
                        />
                    </div>

                        <div>
                        <DropDownControlWA 
                            name="Wheel_Base"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.Wheel_Base}
                            placeholder="Wheel Base: "
                            options={wheelBaseOptions && wheelBaseOptions.WHEEL_BASE_BY_VALUE?.map((data: any) => data.value) || []}
                            onOptionAdd={async (e: String) => await addWheelBase({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_WHEEL_BASE_BY_VALUE, variables: { input: "" } }] })}
                        />
                        </div>

                    <div>
                    <DropDownControlWA 
                            name="No_Of_Cylinder"
                            control={control}
                            value={gusrdatabyid.user_data_byid?.No_Of_Cylinder}
                            placeholder="No. of Cylinders: "
                            options={noOfCylindersOptions && noOfCylindersOptions.NO_OF_CYLINDER_BY_VALUE?.map((data: any) => data.value) || []}
                            onOptionAdd={async (e: String) => await addNoOfCylinders({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_NO_OF_CYLINDER_BY_VALUE, variables: { input: "" } }] })}
                        />
                        </div>


                    <div>
                    <DatePickerComponent 
                    name="Owner_dob"
                    control={control}
                    placeholder="Owner DOB/Date of Incorporation:   "
                    selectedDate={gusrdatabyid.user_data_byid.Owner_dob && new Date(gusrdatabyid.user_data_byid?.Owner_dob)}      
                    />   
                    </div>

                    { ! isCorporateUpdate && <div>
                    <DropDownControl 
                        name="Martial_status"
                        control={control}
                        value={gusrdatabyid.user_data_byid?.Martial_status}  
                        placeholder="Marital Status:   "           
                        options={MARITAL_STATUS}              
                    />                        
                    </div> }

                    <div>
                    <DatePickerComponent 
                    name="Year_of_manufacuring"
                    control={control}
                    placeholder="Manufacturing Date: "
                    selectedDate={gusrdatabyid.user_data_byid.Year_of_manufacuring && new Date(gusrdatabyid.user_data_byid?.Year_of_manufacuring)}    
                    />           
                    </div>

                    <div>
                    <DatePickerComponent 
                    name="FC_due_Date"
                    control={control}
                    placeholder="REG/FC UpTo: "
                    selectedDate={gusrdatabyid.user_data_byid.FC_due_Date && new Date(gusrdatabyid.user_data_byid?.FC_due_Date)}            
                    />        
                    </div>

                    <div>
                    <DropDownControlWA 
                        name="CC"
                        control={control}       
                        value={gusrdatabyid.user_data_byid?.CC}     
                        placeholder="Cubic Capacity:   "           
                        options={gccdata && gccdata.CC.map((data:any) => (data.value)) }           
                        onOptionAdd= {async (e: String) => await (addcc( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}       
                    />        
                    </div>                                        

                    <div>               
                    <p>Permit No: </p>            
                    <MyTextField sx={{ width: '80%' }}
                        {...register('Permit_No', {
                        maxLength: {
                            value: 30,
                            message: 'Permit Number should be at most 25 characters',
                        },                
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Permit_No}
                        onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                    />
                    
                    {errors.Permit_No && (
                    <p className="error text-red-600">{errors.Permit_No.message}</p>
                    )}
                    </div>                                        

                    <div>
                    <DropDownControlWA 
                        name="Permit_category"
                        control={control}
                        value={gusrdatabyid.user_data_byid?.Permit_category}
                        placeholder="Permit Category:   "           
                        options={gpermitdata && gpermitdata.PERMIT_CATEGORY.map((data:any) => (data.value)) }
                        onOptionAdd= {async (e: String) => await (addPermitCategory( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
                    />            
                    {gpermiterror && <p> {gpermiterror.message} </p>}
                    </div>

                    <div>
                    <DatePickerComponent 
                    name="Permit_dueDate"
                    control={control}
                    placeholder="Permit Valid Upto:   "    
                    selectedDate={gusrdatabyid.user_data_byid.Permit_dueDate && new Date(gusrdatabyid.user_data_byid?.Permit_dueDate)}  	
                    />  
                    </div>

                    <div>
                    <p>1st Mobile No: </p>            
                    <MyTextField sx={{ width: '80%' }}
                        {...register('Mobile_No1', {
                        pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Mobile_No1}
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
                            message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Mobile_No2}
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
                            message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Mobile_No3}
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
                            message: 'Enter a valid email address',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Email_id}
                    />
                    
                    {errors.Email_id && <p className="error text-red-600">{errors.Email_id.message}</p>}
                    </div>

                    { ! isCorporateUpdate && <div> 
                    <p>Aadhar Number: </p>
                    
                    <MyTextField sx={{ width: '80%' }}
                        {...register('Adhar_No', {
                        pattern: {
                            value: /^\d{12}$/,
                            message: 'Adhar Number should be a 12-digit number',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Adhar_No}
                    />
                            
                    {errors.Adhar_No && typeof errors.Adhar_No === 'object' && 'message' in errors.Adhar_No && (
                    <p className="error text-red-600">{(errors.Adhar_No as FieldError).message}</p>)}      
                    <FileUplaod 
                        name="Adhar_doc"
                        control={control}     
                        onSelectFile={(e:string | null) => setadharfile(e)}                      
                        placeholder=""                          
                        value={adharfile}                   
                    />
                    </div>}
                    
                    <div>
                    <p>PAN Number: </p>
                    
                    <MyTextField sx={{ width: '80%' }}
                        {...register('PanCard_No', {
                        pattern: {
                            value: /^[A-Za-z0-9]{10}$/,
                            message: 'Pan Card Number should be a 10-character alphanumeric string',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.PanCard_No}
                        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    
                    {errors.PanCard_No && typeof errors.PanCard_No === 'object' && 'message' in errors.PanCard_No && (
                    <p className="error text-red-600">{(errors.PanCard_No as FieldError).message}</p>)}                  
                    <FileUplaod 
                        name="Pan_doc"
                        control={control}
                        onSelectFile={(e:string | null) => setpanfile(e)}                
                        placeholder=""                                      
                        value={panfile}                   
                    />
                    </div>

                    { ! isCorporateUpdate && <div> 
                    <p>Nominee Name: </p>
                    
                    <MyTextField sx={{ width: '80%' }}
                        {...register('Nominee', {
                        maxLength: {
                            value: 30,
                            message: 'Nominee should be at most 30 characters',
                        },
                        pattern: {
                            value: /^[A-Za-z\s]*$/,
                            message: 'Nominee should contain only alphabets and spaces',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Nominee}
                        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    
                    {errors.Nominee && typeof errors.Nominee === 'string' && (
                    <p className="error text-red-600">{errors.Nominee}</p>
                    )}            
                    <FileUplaod 
                        name="Nominee_Doc"
                        control={control}     
                        onSelectFile={(e:string | null) => setNomineeLinks(e)}                      
                        placeholder=""                          
                        value={NomineeLinks}                   
                    />
                    </div>}

                    { !isCorporateUpdate && <div>
                        <DropDownControl 
                            name="Nominee_Relationship"
                            control={control}
                            placeholder="Nominee Relationship:  "                                      
                            value={gusrdatabyid?.user_data_byid?.Nominee_Relationship}  
                            options={N_Relation}                    
                        />                    
                        </div> }       

                    { !isCorporateUpdate && <div>      
                    <DatePickerComponent 
                        name="Nominee_dob"
                        control={control}
                        placeholder="Nominee DOB: "
                        selectedDate={gusrdatabyid.user_data_byid.Nominee_dob && new Date(gusrdatabyid.user_data_byid?.Nominee_dob)}           
                    />  
                        
                    </div>}
                            
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
                        defaultValue={gusrdatabyid?.user_data_byid?.PUCC_Emission_No}
                        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />                        
                    {errors.PUCC_Emission_No && typeof errors.PUCC_Emission_No === 'object' && 'message' in errors.PUCC_Emission_No && (
                    <p className="error text-red-600">{(errors.PUCC_Emission_No as FieldError).message}</p>)} 
                    <FormControlLabel
                        control={<Checkbox checked={isNDChecked} onChange={handleNDCheckBox} />}
                        label="ND"
                        />            
                    </div>

                    <div>
                    <DatePickerComponent 
                    name="Emission_dueDate"
                    control={control}
                    placeholder="PUC/Emission UpTo: "
                    selectedDate={gusrdatabyid.user_data_byid.Emission_dueDate && new Date(gusrdatabyid.user_data_byid?.Emission_dueDate)}  
                    disabled={isNDChecked}
                    />                
                    </div>

                    <div>
                <p className='mt-3'>GST No: </p>
                    
                    <MyTextField sx={{ width: '80%' }}
                        {...register('GST_No', {
                        pattern: {
                            value: /^[A-Za-z0-9]{15}$/,
                            message: 'GST Number should be a 15-character alphanumeric string',
                        },
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.GST_No}
                        onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    
                    {errors.GST_No && typeof errors.GST_No === 'object' && 'message' in errors.GST_No && (
                    <p className="error text-red-600">{(errors.GST_No as FieldError).message}</p>)} 
                    <FileUplaod 
                        name="GST_Cer_Doc"
                        control={control}
                        onSelectFile={(e:string | null) => setGstCerfile(e)}                
                        placeholder=""                    
                        value={GstCerfile}                   
                    />  
                    </div>                                                                                                                                                           
                    
                <div>
                <DropDownControlWA 
                    name="Referred_by"
                    control={control}
                    value={gusrdatabyid.user_data_byid?.Referred_by}
                    placeholder="Referred By: "
                    options={referredByOptions && referredByOptions.REFERRED_BY_BY_VALUE.map((data: any) => data.value) || []}
                    onOptionAdd={async (e: String) => await addReferredBy({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_REFERRED_BY_BY_VALUE, variables: { input: "" } }] })}
                />
                    </div>

                    <div>
                    <DropDownControlWA 
                    name="updated_by"
                    control={control}
                    value={gusrdatabyid.user_data_byid?.updated_by}
                    placeholder="Updated By: "
                    options={updatedByOptions && updatedByOptions.UPDATED_BY_BY_VALUE.map((data: any) => data.value) || []}
                    onOptionAdd={async (e: String) => await addUpdatedBy({ variables: { input: { data_owner_id: "6562047e649b76ef6a583b8d", value: e } }, refetchQueries: [{ query: GET_UPDATED_BY_BY_VALUE, variables: { input: "" } }] })}
                />
                </div>

                <div>
                    <DropDownControlWA 
                        name="Customer_type"
                        control={control}
                        value={gusrdatabyid.user_data_byid?.Customer_type}
                        placeholder="Policy Issued Through:  "           
                        options={gCusTypedata && gCusTypedata.CUSTOMER_TYPE.map((data:any) => (data.value)) }    
                        onOptionAdd= {async (e: String) => await (addCusType( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
                    />       
                    </div>           

                    <div>
                    <DropDownControl 
                    name="Prospect"
                    control={control}      
                    value={gusrdatabyid.user_data_byid?.Prospect}  	
                    placeholder="Prospect:   "           
                    options={PROSPECT}              
                    />
                    </div>

                    <div>
                    <FileUplaod 
                            name="photo_links"
                            control={control}     
                            onSelectFile={(e:string | null) => setphotoLinks(e)}     
                            value={photoLinks} 
                            placeholder="Upload Photos:   "                       
                        />	   
                    </div>

                    <div className='w-80'>     
                        <p>Comments:   </p>
                        <TextareaAutosize
                        className="w-full text-sm font-sans font-normal leading-5 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-black border border-solid border-slate-400 hover:border-gray-900 focus:border-grey-800 bg-white text-slate-900 focus-visible:outline-0"
                        aria-label="Demo input"                
                        minRows={3}
                        {...register                    
                            ('Comments', {
                            maxLength: {
                            value: 500,
                            message: 'Comments should be at most 500 characters'
                            }
                        })}
                        defaultValue={gusrdatabyid?.user_data_byid?.Comments}
                        />
                        {errors.Comments && <p className="error text-red-600">{errors.Comments.message}</p>}
                    </div>

                    
                    <div className='col-span-5'>
                    <AddressForm addressType="Address" placehoder="RC Address: " register={register} errors={errors} defaultAddress={gusrdatabyid?.user_data_byid?.Address} />
                    <FormControlLabel
                        control={<Checkbox checked={isAddressChecked} onChange={handleAddressCheckBox} />}
                        label="Communication Address same as RC Address"
                    />
                    </div>

                    <div className='col-span-5'>
                    {!isAddressChecked && <AddressForm addressType="CAddress" placehoder="Communication Address" register={register} errors={errors} defaultAddress={gusrdatabyid?.user_data_byid?.CAddress} />  }
                    </div>

                </div>                                   
                   

                    <div className='mb-5 mt-5'>
                    <Button 
                    className='w-full'
                    disabled={isSubmitted}                        
                    > 
                    Submit {isSubmitted && <Spinner></Spinner>}
                    </Button>   
                    </div>
        </div>
    </form>    
        }       

    </div>
  )
}


export default withAuth(UpdateClient);
