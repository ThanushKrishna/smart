'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    ADD_VEHICLE_COLORS,
    ADD_VEHICE_NORMS,    
    ADD_MAKE, ADD_STANDING_CAPACITY,
    ADD_MODEL, ADD_SEATING_CAPACITY,
    ADD_VEHICLE_DESCRIPTION,
    ADD_VEHICLE_CLASS,
    UPDATE_CLIENT_01
    } from '@/graphql/queries'
import {     
    GET_USER_DATA_BYID,
    GET_VEHICLE_COLORS,
    GET_VEHICLE_NORMS,      
    GET_MAKE, GET_STANDING_CAPACITY,
    GET_MODEL, GET_VEHICLE_CLASS,
    GET_VEHICLE_DESCRIPTION,
    GET_SEATING_CAPACITY
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { uploadfile } from '@/app/functions/uploadfile'
import { FUEL_TYPE } from '@/json/enums'

interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void
}

const Updatepage01:React.FC<iupdatevalue> = ( { value, ispagesubmitted } ) => {

const [vehicleno, setVehicleno] = useState<String>(value);
const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});
const [isSubmitted, setisSubmitted] = useState(false);
const [isVehRegDocProvided, setVehRegDocProvided] = useState<Boolean>(false);
const [VehRegDocfile, setVehRegDocfile] = useState<FileList | null>(null);

const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
    variables: { vechicleId: vehicleno },
    }); 

const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT_01);
const[addVehicleColor, { data:colordata} ] = useMutation(ADD_VEHICLE_COLORS);
const[addVehicleNorms, { data:normsdata} ] = useMutation(ADD_VEHICE_NORMS);
const[addMake, { data:makedata} ] = useMutation(ADD_MAKE);
const[addModel, { data:modeldata} ] = useMutation(ADD_MODEL);
const[addVehclass, { data:vehicleclassdata} ] = useMutation(ADD_VEHICLE_CLASS);
const[addVehDes, { data:vehicledescdata} ] = useMutation(ADD_VEHICLE_DESCRIPTION);
const[addSeatCap, { data:seatcapdata} ] = useMutation(ADD_SEATING_CAPACITY);
const[addStanCap, { data:standcapdata} ] = useMutation(ADD_STANDING_CAPACITY);


const { data:gcolorsdata } = useQuery(GET_VEHICLE_COLORS, { pollInterval: 1000,}); 
const { data:gnormsdata } = useQuery(GET_VEHICLE_NORMS, { pollInterval: 1000,}); 
const { data:gmakedata } = useQuery(GET_MAKE, { pollInterval: 1000,}); 
const { data:gmodeldata } = useQuery(GET_MODEL, { pollInterval: 1000,}); 
const { data:gVehDesdata } = useQuery(GET_VEHICLE_DESCRIPTION, { pollInterval: 1000,}); 	
const { data:gSeatCapdata } = useQuery(GET_SEATING_CAPACITY, { pollInterval: 1000,}); 	
const { data:gStanCapdata } = useQuery(GET_STANDING_CAPACITY, { pollInterval: 1000,}); 	
const { data:gVehclassdata } = useQuery(GET_VEHICLE_CLASS, { pollInterval: 1000,}); 	


const onSubmit = async (formValues: AddClientType) => {     

    const VehicleRegistrationuploadlink = async () => {
        if(isVehRegDocProvided && VehRegDocfile )
          return  await uploadfile(VehRegDocfile, formValues?.Vehicle_Reg_Doc); 
        return;
      }
        
    
    try{
        setisSubmitted(true)                     

        const result = {
            id: gusrdatabyid.user_data_byid.id,
            Vehicle_Reg_Doc:  await VehicleRegistrationuploadlink() || undefined,			
            RC_No: formValues?.RC_No || undefined,
            Registered_Date: formValues?.Registered_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,                       
            Owner: formValues?.Owner || undefined,
			Son_Wife_Daughter_Of: formValues?.Son_Wife_Daughter_Of || undefined, 
			Chasis_No: formValues?.Chasis_No || undefined,
            Engine_No: formValues?.Engine_No || undefined,
			Make: formValues?.Make || undefined,
            Model: formValues?.Model || undefined,
			tax_due_Date: formValues?.tax_due_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
			Vehicle_type: formValues?.Vehicle_type || undefined,
			Vehicle_Description: formValues?.Vehicle_Description || undefined,
			Fuel_type: formValues?.Fuel_type || undefined,
			Vehice_norms: formValues?.Vehice_norms || undefined,
			Vehicle_color: formValues?.Vehicle_color || undefined,            
			Seating_Capacity: formValues?.Seating_Capacity || undefined,
            Standing_Capacity: formValues?.Standing_Capacity || undefined,
			Hypothecation_bank: formValues?.Hypothecation_bank || undefined,
            Hypothecation_city: formValues?.Hypothecation_city || undefined
        }
        
        console.log( result );
        updateclient( { variables: { input: result}})
        .then(()=> {        
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
    <form className='grid-cols-3 max-w-md pb-2 text-slate-500 text-base' onSubmit={handleSubmit(onSubmit)}>                                      
            <p>Vehicle Registration Number:</p>
            <TextField.Root >
            <TextField.Input { ...register('Vehicle_No')} defaultValue={gusrdatabyid.user_data_byid?.Vehicle_No} disabled={true}/>
            </TextField.Root>        
              
            <FileUplaod 
                name="Vehicle_Reg_Doc"
                control={control}     
                onSelectFile={(e:FileList | null) => setVehRegDocfile(e)}   
                isCalled={(e: Boolean) => setVehRegDocProvided(e)}        
                placeholder=""   
                value={gusrdatabyid.user_data_byid?.Vehicle_Reg_Doc}                    
            />
             <p>Owner Name: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Owner')} defaultValue={gusrdatabyid.user_data_byid?.Owner}/>
            </TextField.Root>
            <p>Son/Wife/Daughter Of: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Son_Wife_Daughter_Of')} defaultValue={gusrdatabyid.user_data_byid?.Son_Wife_Daughter_Of}/>
            </TextField.Root>
            <p>Owner Serial Number: </p>
            <TextField.Root>
            <TextField.Input { ...register('RC_No')} defaultValue={gusrdatabyid.user_data_byid?.RC_No}/>
            </TextField.Root>  
            <p>Chassis Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Chasis_No')} defaultValue={gusrdatabyid.user_data_byid?.Chasis_No}/>
            </TextField.Root>
            <p>Engine Number: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Engine_No')} defaultValue={gusrdatabyid.user_data_byid?.Engine_No}/>
            </TextField.Root>
            <DropDownControlWA
                name="Make"
                control={control}
                placeholder="Make:   "     
                value={gusrdatabyid.user_data_byid?.Make}                  
                options={gmakedata && gmakedata.MAKE.map((data:any) => (data.value)) }             
                onOptionAdd= {async (e: String) => await (addMake( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}         
            />
            <DropDownControlWA 
                name="Model"
                control={control}
                value={gusrdatabyid.user_data_byid?.Model}
                placeholder="Model:   "           
                options={gmodeldata && gmodeldata.MODEL.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addModel( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            <Controller
                name="Registered_Date"
                control={control}      
                defaultValue={gusrdatabyid.user_data_byid?.Registered_Date && new Date(gusrdatabyid.user_data_byid?.Registered_Date)}       
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Registration Date: "
                />)}
            />        
             <Controller
                name="tax_due_Date"
                control={control}    
                defaultValue={gusrdatabyid.user_data_byid?.tax_due_Date && new Date(gusrdatabyid.user_data_byid?.tax_due_Date)}         
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Tax Valid UpTo: "
                />)}
            />          
            <DropDownControlWA 
                name="Vehicle_type"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_type}                
                placeholder="Vehicle Class:   "           
                options={gVehclassdata && gVehclassdata?.VEHICLE_CLASS.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehclass( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControlWA 
                name="Vehicle_Description"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_Description}
                placeholder="Vehicle Description:   "           
                options={gVehDesdata && gVehDesdata.VEHICLE_DESCRIPTION.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehDes( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />
            <DropDownControl 
                name="Fuel_type"
                control={control}      
                value={gusrdatabyid.user_data_byid?.Fuel_type}  
                placeholder="Fuel Type:   "           
                options={FUEL_TYPE}              
            />
            <DropDownControlWA 
                name="Vehice_norms"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehice_norms}
                placeholder="Emission Norms:   "           
                options={gnormsdata && gnormsdata.VEHICE_NORMS.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addVehicleNorms( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />   
            <DropDownControlWA 
                name="Vehicle_color"
                control={control}
                value={gusrdatabyid.user_data_byid?.Vehicle_color}
                placeholder="Vehicle Color:   "           
                options={gcolorsdata && gcolorsdata.VEHICLE_COLOR.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addVehicleColor( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <DropDownControlWA 
                name="Seating_Capacity"
                control={control}
                value={gusrdatabyid.user_data_byid?.Seating_Capacity}
                placeholder="Seating Capacity:   "           
                options={gSeatCapdata && gSeatCapdata.SEATING_CAPACITY.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addSeatCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <DropDownControlWA 
                name="Standing_Capacity"
                control={control}
                value={gusrdatabyid.user_data_byid?.Standing_Capacity}
                placeholder="Standing Capacity:   "           
                options={gStanCapdata && gStanCapdata.STANDING_CAPACITY.map((data:any) => (data.value)) }  
                onOptionAdd= {async (e: String) => await (addStanCap( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}            
            />      
            <p>Hypothecation Bank: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_bank')} defaultValue={gusrdatabyid.user_data_byid?.Hypothecation_bank}/>
            </TextField.Root>
            <p>Hypothecation City: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_city')} defaultValue={gusrdatabyid.user_data_byid?.Hypothecation_city}/>
            </TextField.Root>
            
            <Button disabled={isSubmitted}> Save and Next {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>    
    </> 
  )
}

export default Updatepage01