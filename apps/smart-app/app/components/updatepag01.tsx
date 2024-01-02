'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    ADD_VEHICLE_COLORS,ADD_HYPOTHECATION_BANK,
    ADD_VEHICE_NORMS, ADD_HYPOTHECATION_CITY,
    ADD_MAKE, ADD_STANDING_CAPACITY,
    ADD_MODEL, ADD_SEATING_CAPACITY,
    ADD_VEHICLE_DESCRIPTION,
    ADD_VEHICLE_CLASS,
    UPDATE_CLIENT_01, GET_SLEEPER_CAPACITY_BY_VALUE,
    GET_CC_BY_VALUE
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
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { FileUplaod } from '@/app/components/Upload'
import { FUEL_TYPE, GENDER, OWNER_TYPE, VEHICLE_KIND } from '@/json/enums'
import { Checkbox, FormControlLabel, TextField as MyTextField, TextareaAutosize  } from '@mui/material';
import { useRouter } from 'next/navigation';



interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void,
    isCorporateLocal: (res: Boolean) => void,
}

const Updatepage01:React.FC<iupdatevalue> = ( { value, ispagesubmitted, isCorporateLocal, } ) => {
    
const router = useRouter();
const [vehicleno, setVehicleno] = useState<String>(value);
const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid, refetch } = useQuery(GET_USER_DATA_BYID, {
    variables: { vechicleId: vehicleno },
    }); 
const [isSubmitted, setisSubmitted] = useState(false);
const [VehRegDocfile, setVehRegDocfile] = useState<string | null>(gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc || '');
const [isLttChecked, setLttChecked] = useState(false);
const [lttValue, setlttValue] = useState<number | undefined>();
const [isCorporateUpdate, setCorporateUpdate ] = useState<Boolean>(false);
const [isFinalSubmit, setFinalSubmit] = useState<Boolean>(false);

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});    
const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT_01);
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
const [addSleeperCapacity, { data: sleeperCapacityData }] = useMutation(ADD_SLEEPER_CAPACITY);

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

const handleLttCheckBox = (event: any) => {
    setLttChecked(event.target.checked);
    setlttValue(new Date('2099-12-31').getTime() + 60 * 60 *1000 * 5.5)
  };

const onSubmit = async (formValues: AddClientType) => {     

        
    
    try{
        setisSubmitted(true)                     

        const result = {
            id: gusrdatabyid.user_data_byid.id,
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
			// tax_due_Date: new Date(formValues?.tax_due_Date)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
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
            Hypothecation_city: formValues?.Hypothecation_city || undefined
        }
        
        console.log( result );
        updateclient( { variables: { input: result},           
        })
        .then(()=> {        
            refetch();
            if(isFinalSubmit){
                router.push('/clients')
                return;
            }
        ispagesubmitted(true);
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));        
          ispagesubmitted(false);          
        })

        if(updateclienterror) {            
            console.log(JSON.stringify(updateclienterror, null, 2));
        }
        
    }   
    catch(e: any){        
        console.log("This is try-catch-error block");
        console.log(e?.message);
        setisSubmitted(false); 
        ispagesubmitted(false); 
    }   
    
}


  return (
   <>      
        <form  onSubmit={handleSubmit(onSubmit)}>     
            <div className='font-bold'>                
                    <div className='mb-5'>
                    <Button 
                    className='w-full'
                    disabled={isSubmitted}
                    onClick={() => {setFinalSubmit(true)}}
                    > 
                    Save and Submit {isSubmitted && <Spinner></Spinner>}
                    </Button>   
                    </div>

                    <div className='mb-5'>
                    <Button 
                    className='w-full'
                    disabled={isSubmitted}
                    > Save and Next {isSubmitted && <Spinner></Spinner>}
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
                        isCorporate={(e:Boolean) => { isCorporateLocal(e); setCorporateUpdate(e)} } 
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

                        </div>                                   

                        <div className='mt-5'>
                        <Button 
                        className='w-full'
                        disabled={isSubmitted}
                        > Save and Next {isSubmitted && <Spinner></Spinner>}
                        </Button>  
                        </div>

                        <div className='mb-5 mt-5'>
                        <Button 
                        className='w-full'
                        disabled={isSubmitted}
                        onClick={() => {setFinalSubmit(true)}}
                        > 
                        Save and Submit {isSubmitted && <Spinner></Spinner>}
                        </Button>   
                        </div>
            </div>
        </form>    
    </> 
  )
}

export default Updatepage01