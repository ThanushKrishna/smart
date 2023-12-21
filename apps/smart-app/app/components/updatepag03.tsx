'use client'
import React, { useState } from 'react'
import { useForm, Controller, FieldError  } from 'react-hook-form'
import { TextField, Button, TextArea } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { 
    UPDATE_CLIENT_03,    
    ADD_CC, 
    ADD_PERMIT_CATEGORY, ADD_CUSTOMER_TYPE,    
    } from '@/graphql/queries'
import {     
    GET_USER_DATA_BYID,     
    GET_CC, GET_CUSTOMER_TYPE,
    GET_PERMIT_CATEGORY, 
    } from '@/graphql/queries'
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import { DropDownControlWA }  from '@/app/components/DropDownControlWA'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { OWNER_TYPE, MARITAL_STATUS, PROSPECT } from '@/json/enums'
import AddressForm from './AddressForm';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void
}

const Updatepage03: React.FC<iupdatevalue> = ( { value, ispagesubmitted } ) => {

const router = useRouter();
const [vehicleno, setVehicleno] = useState<String>(value);
const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
  variables: { vechicleId: vehicleno },
  }); 
const [isSubmitted, setisSubmitted] = useState(false);
const [panfile, setpanfile] = useState<string | null>(gusrdatabyid.user_data_byid?.Pan_doc || '');
const [adharfile, setadharfile] = useState<string | null>(gusrdatabyid.user_data_byid?.Adhar_doc || '');
const [GstCerfile, setGstCerfile] = useState<string | null>(gusrdatabyid.user_data_byid?.GST_Cer_Doc || '');
const [isAddressChecked, setAddressChecked] = useState(false);


const handleAddressCheckBox = (event: any) => {
    setAddressChecked(event.target.checked);        
  };



const { data:gccdata } = useQuery(GET_CC, { pollInterval: 1000,}); 
const { data:gpermitdata, error:gpermiterror } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
const { data:gCusTypedata } = useQuery(GET_CUSTOMER_TYPE, { pollInterval: 1000,}); 	

const[updateclient, { data:updateclientdata, error:updateclienterror } ] = useMutation(UPDATE_CLIENT_03);
const[addcc, { data:ccdata} ] = useMutation(ADD_CC);
const[addPermitCategory, { data:permitdata} ] = useMutation(ADD_PERMIT_CATEGORY);
const[addCusType, { data:custtypedata} ] = useMutation(ADD_CUSTOMER_TYPE);

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});


const onSubmit = async (formValues: AddClientType) => {     

    try{
        setisSubmitted(true)                     

        const result = {
            id: gusrdatabyid.user_data_byid.id,
            Owner_dob: new Date(formValues?.Owner_dob)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Ownership_type: formValues?.Ownership_type || undefined,            
            Year_of_manufacuring: new Date(formValues?.Year_of_manufacuring)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            FC_due_Date: new Date(formValues?.FC_due_Date)?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
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
            Emission_dueDate: new Date(formValues?.Emission_dueDate)?.getTime() + 60 * 60 *1000 * 5.5|| undefined,
            RTO: formValues?.RTO || undefined,
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
        }
        
        console.log( result );
        updateclient( { variables: { input: result}})
        .then(()=> {        
        ispagesubmitted(true);
        router.push('/clients')
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
            <DatePickerComponent 
              name="Owner_dob"
              control={control}
              placeholder="Owner DOB: "
              selectedDate={gusrdatabyid.user_data_byid.Owner_dob && new Date(gusrdatabyid.user_data_byid?.Owner_dob)}      
            />    
            <DropDownControl 
                name="Martial_status"
                control={control}
                value={gusrdatabyid.user_data_byid?.Martial_status}  
                placeholder="Marital Status:   "           
                options={MARITAL_STATUS}              
            />                 
            <DropDownControl 
                name="Ownership_type"
                control={control}
                value={gusrdatabyid.user_data_byid?.Ownership_type}  
                placeholder="Owner Type:   "                                      
                options={OWNER_TYPE}
            />                        
            <DatePickerComponent 
              name="Year_of_manufacuring"
              control={control}
              placeholder="Manufacturing Date: "
              selectedDate={gusrdatabyid.user_data_byid.Year_of_manufacuring && new Date(gusrdatabyid.user_data_byid?.Year_of_manufacuring)}    
            />           
            <DatePickerComponent 
              name="FC_due_Date"
              control={control}
              placeholder="REG/FC UpTo: "
              selectedDate={gusrdatabyid.user_data_byid.FC_due_Date && new Date(gusrdatabyid.user_data_byid?.FC_due_Date)}            
            />                                                
            <DropDownControlWA 
                name="CC"
                control={control}       
                value={gusrdatabyid.user_data_byid?.CC}     
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
                    message: 'Permit Number should be at most 25 characters',
                },
                pattern: {
                    value: /^[A-Za-z0-9]*$/,
                    message: 'Permit Number should be alphanumeric',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Permit_No}
                onChange={(e) => e.target.value = e.target.value.toUpperCase()}
            />
            </TextField.Root>
            {errors.Permit_No && (
            <p className="error text-red-600">{errors.Permit_No.message}</p>
            )}
            <DropDownControlWA 
                name="Permit_category"
                control={control}
                value={gusrdatabyid.user_data_byid?.Permit_category}
                placeholder="Permit Category:   "           
                options={gpermitdata && gpermitdata.PERMIT_CATEGORY.map((data:any) => (data.value)) }
                onOptionAdd= {async (e: String) => await (addPermitCategory( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />
            {gpermiterror && <p> {gpermiterror.message} </p>}
            <DatePickerComponent 
              name="Permit_dueDate"
              control={control}
              placeholder="Permit Valid Upto:   "    
              selectedDate={gusrdatabyid.user_data_byid.Permit_dueDate && new Date(gusrdatabyid.user_data_byid?.Permit_dueDate)}  	
            />  
            <p>1st Mobile No: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Mobile_No1', {
                pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Mobile_No1}
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
                    message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Mobile_No2}
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
                    message: 'Mobile Number should be a 10-digit number starting with 6, 7, 8, or 9',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Mobile_No3}
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
                    message: 'Enter a valid email address',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Email_id}
            />
            </TextField.Root>
            {errors.Email_id && <p className="error text-red-600">{errors.Email_id.message}</p>}

            <p>Aadhar Number: </p>
            <TextField.Root>
            <TextField.Input
                {...register('Adhar_No', {
                pattern: {
                    value: /^\d{12}$/,
                    message: 'Adhar Number should be a 12-digit number',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Adhar_No}
            />
            </TextField.Root>          
            {errors.Adhar_No && typeof errors.Adhar_No === 'object' && 'message' in errors.Adhar_No && (
            <p className="error text-red-600">{(errors.Adhar_No as FieldError).message}</p>)}      
            <FileUplaod 
                name="Adhar_doc"
                control={control}     
                onSelectFile={(e:string | null) => setadharfile(e)}                      
                placeholder=""                          
                value={adharfile}                   
            />
            <p>PAN Number: </p>
            <TextField.Root>
            <TextField.Input
                {...register('PanCard_No', {
                pattern: {
                    value: /^[A-Za-z0-9]{10}$/,
                    message: 'Pan Card Number should be a 10-character alphanumeric string',
                },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.PanCard_No}
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            />
            </TextField.Root>
            {errors.PanCard_No && typeof errors.PanCard_No === 'object' && 'message' in errors.PanCard_No && (
            <p className="error text-red-600">{(errors.PanCard_No as FieldError).message}</p>)}      
            <FileUplaod 
                name="Pan_doc"
                control={control}
                onSelectFile={(e:string | null) => setpanfile(e)}                
                placeholder=""                                      
                value={panfile}                   
            />
            <p>Nominee Name: </p>
            <TextField.Root>
              <TextField.Input
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
            </TextField.Root>
            {errors.Nominee && typeof errors.Nominee === 'string' && (
              <p className="error text-red-600">{errors.Nominee}</p>
            )}

            <p>Nominee Relationship: </p>
            <TextField.Root>
              <TextField.Input
                {...register('Nominee_Relationship', {
                  maxLength: {
                    value: 20,
                    message: 'Nominee Relationship should be at most 20 characters',
                  },
                  pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Nominee Relationship should contain only alphabets and spaces',
                  },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.Nominee_Relationship}
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
              />
            </TextField.Root>
            {errors.Nominee_Relationship && typeof errors.Nominee_Relationship === 'object' && 'message' in errors.Nominee_Relationship && (
            <p className="error text-red-600">{(errors.Nominee_Relationship as FieldError).message}</p>)} 
            <DatePickerComponent 
                name="Nominee_dob"
                control={control}
                placeholder="Nominee DOB: "
                selectedDate={gusrdatabyid.user_data_byid.Nominee_dob && new Date(gusrdatabyid.user_data_byid?.Nominee_dob)}           
              />    
           <p>PUC/Emission Number: </p>
            <TextField.Root>
              <TextField.Input
                {...register('PUCC_Emission_No', {
                  maxLength: {
                      value: 30,
                      message: 'Emission number should be at most 30 characters'
                  }                
                  })}   
                defaultValue={gusrdatabyid?.user_data_byid?.PUCC_Emission_No}
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
              />
            </TextField.Root>
            {errors.PUCC_Emission_No && typeof errors.PUCC_Emission_No === 'object' && 'message' in errors.PUCC_Emission_No && (
            <p className="error text-red-600">{(errors.PUCC_Emission_No as FieldError).message}</p>)} 
            <DatePickerComponent 
              name="Emission_dueDate"
              control={control}
              placeholder="PUC/Emission UpTo: "
              selectedDate={gusrdatabyid.user_data_byid.Emission_dueDate && new Date(gusrdatabyid.user_data_byid?.Emission_dueDate)}  
            />    
           <p className='mt-3'>GST No: </p>
            <TextField.Root>
              <TextField.Input
                {...register('GST_No', {
                  pattern: {
                    value: /^[A-Za-z0-9]{15}$/,
                    message: 'GST Number should be a 15-character alphanumeric string',
                  },
                })}
                defaultValue={gusrdatabyid?.user_data_byid?.GST_No}
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
              />
            </TextField.Root>
            {errors.GST_No && typeof errors.GST_No === 'object' && 'message' in errors.GST_No && (
            <p className="error text-red-600">{(errors.GST_No as FieldError).message}</p>)} 
            <FileUplaod 
                name="GST_Cer_Doc"
                control={control}
                onSelectFile={(e:string | null) => setGstCerfile(e)}                
                placeholder=""                    
                value={GstCerfile}                   
            />                                                                                                                                     
            {/* <AddressForm addressType="Address" placehoder="RC Address: " register={register} errors={errors} defaultAddress={gusrdatabyid?.user_data_byid?.Address} />
            <AddressForm addressType="CAddress" placehoder="Communication Address" register={register} errors={errors} defaultAddress={gusrdatabyid?.user_data_byid?.CAddress} />  */}
            <AddressForm addressType="Address" placehoder="RC Address: " register={register} errors={errors} defaultAddress={gusrdatabyid?.user_data_byid?.Address} />
            <FormControlLabel
                control={<Checkbox checked={isAddressChecked} onChange={handleAddressCheckBox} />}
                label="Communication Address same as RC Address"
            />
            {!isAddressChecked && <AddressForm addressType="CAddress" placehoder="Communication Address" register={register} errors={errors} defaultAddress={gusrdatabyid?.user_data_byid?.CAddress} />  }

            <p>Referred by: </p>
            <TextField.Root>
              <TextField.Input
                {...register('Referred_by', {
                  maxLength: {
                    value: 30,
                    message: 'Referred by should be at most 30 characters',
                  },
                  pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Referred by should contain only alphabets and spaces',
                  },
                })}
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                defaultValue={gusrdatabyid?.user_data_byid?.Referred_by}
              />
            </TextField.Root>
            {errors.Referred_by && (
              <p className="error text-red-600">{errors.Referred_by.message}</p>
            )}
           <p>Updated by: </p>
            <TextField.Root>
              <TextField.Input
                {...register('updated_by', {
                  maxLength: {
                    value: 30,
                    message: 'Updated by should be at most 30 characters',
                  },
                  pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message: 'Updated by should contain only alphabets and spaces',
                  },
                })}
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                defaultValue={gusrdatabyid?.user_data_byid?.updated_by}
              />
            </TextField.Root>
            {errors.updated_by && (
              <p className="error text-red-600">{errors.updated_by.message}</p>
            )}
            <DropDownControlWA 
                name="Customer_type"
                control={control}
                value={gusrdatabyid.user_data_byid?.Customer_type}
                placeholder="Policy Issued Through:  "           
                options={gCusTypedata && gCusTypedata.CUSTOMER_TYPE.map((data:any) => (data.value)) }    
                onOptionAdd= {async (e: String) => await (addCusType( { variables: { input: {"data_owner_id": "6562047e649b76ef6a583b8d", "value": e } }}) )}
            />                        
            <p className="mt-3">Comments: </p>
            <TextArea
              {...register('Comments', {
                maxLength: { value: 500, message: 'Comments should be at most 500 characters' },
              })}
              defaultValue={gusrdatabyid?.user_data_byid?.Comments}
            />
            {errors.Comments && (
              <p className="error text-red-600">{errors.Comments.message}</p>
            )}
            <DropDownControl 
              name="Prospect"
              control={control}      
              value={gusrdatabyid.user_data_byid?.Prospect}  	
              placeholder="Prospect:   "           
              options={PROSPECT}              
            />
            <br/>
            <Button disabled={isSubmitted}> Update {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>
    
    </> 
  )
}

export default Updatepage03