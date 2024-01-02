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
    ADD_PERMIT_CATEGORY, ADD_CUSTOMER_TYPE, GET_UPDATED_BY_BY_VALUE, ADD_UPDATED_BY, ADD_REFERRED_BY, GET_REFERRED_BY_BY_VALUE,    
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
import {  MARITAL_STATUS, N_Relation, PROSPECT } from '@/json/enums'
import AddressForm from './AddressForm';
import { Checkbox, FormControlLabel, TextField as MyTextField, TextareaAutosize  } from '@mui/material';

interface iupdatevalue {
    value: String,
    ispagesubmitted: (res: Boolean) => void,
    isCorporateGlobal: Boolean
    back: (res:Boolean) => void
}

const Updatepage03: React.FC<iupdatevalue> = ( { value, ispagesubmitted, isCorporateGlobal, back } ) => {

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
const [isBack, setBack] = useState(false);
const [isNDChecked, setNDChecked] = useState(false);
const [NDValue, setNDValue] = useState<number | undefined>();
const [photoLinks, setphotoLinks] = useState<string | null>(gusrdatabyid.user_data_byid?.photo_links || '');
const [NomineeLinks, setNomineeLinks] = useState<string | null>(gusrdatabyid.user_data_byid?.Nominee_Doc || '');


const handleAddressCheckBox = (event: any) => {
    setAddressChecked(event.target.checked);        
  };

  const handleNDCheckBox = (event: any) => {
    setNDChecked(event.target.checked);
    setNDValue(new Date('2000-01-01').getTime() + 60 * 60 *1000 * 5.5)
  };


const { data:gccdata } = useQuery(GET_CC, { pollInterval: 1000,}); 
const { data:gpermitdata, error:gpermiterror } = useQuery(GET_PERMIT_CATEGORY, { pollInterval: 1000,}); 
const { data:gCusTypedata } = useQuery(GET_CUSTOMER_TYPE, { pollInterval: 1000,}); 	
const [addUpdatedBy, { data: updatedByData }] = useMutation(ADD_UPDATED_BY);
const { data: updatedByOptions } = useQuery(GET_UPDATED_BY_BY_VALUE, { variables: { input: "" } });
const [addReferredBy, { data: referredByData }] = useMutation(ADD_REFERRED_BY);
const { data: referredByOptions } = useQuery(GET_REFERRED_BY_BY_VALUE, { variables: { input: "" } });
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
            Emission_dueDate: (isNDChecked ? NDValue : formValues?.Emission_dueDate ? new Date(formValues?.Emission_dueDate).getTime() + 60 * 60 *1000 * 5.5 : null), 
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
            photo_links: photoLinks || undefined,   
            Nominee_Doc: NomineeLinks || undefined,               
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
      <form  onSubmit={handleSubmit(onSubmit)}>     

      <div>           

          <div className='mb-5'>
          <Button 
          className='w-full'
          disabled={isSubmitted}
          > Update {isSubmitted && <Spinner></Spinner>}
          </Button>  
          </div>    
          
          <div className='mb-5'>
          <Button          
          className='w-full'
          disabled={isBack}
          onClick={() => {back(true); setBack(true)}}
          >Back {isBack && <Spinner></Spinner>}
          </Button>  
          </div>    

         <div  className='text-slate-500 text-base grid grid-cols-5 gap-5 ml-10 mr-10 font-bold'>                            
            
            <div>                     
            <p>Vehicle Registration Number:</p>           
            <MyTextField sx={{ width: '80%' }} { ...register('Vehicle_No')} defaultValue={gusrdatabyid.user_data_byid?.Vehicle_No} disabled={true}/>
            </div>
            
            <div>
            <DatePickerComponent 
              name="Owner_dob"
              control={control}
              placeholder="Owner DOB/Date of Incorporation:   "
              selectedDate={gusrdatabyid.user_data_byid.Owner_dob && new Date(gusrdatabyid.user_data_byid?.Owner_dob)}      
            />   
            </div>

            { ! isCorporateGlobal && <div>
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
                placeholder="Cubic capacity:   "           
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

            { ! isCorporateGlobal && <div> 
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

            { ! isCorporateGlobal && <div> 
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

              { !isCorporateGlobal && <div>
                <DropDownControl 
                    name="Nominee_Relationship"
                    control={control}
                    placeholder="Nominee Relationship:  "                                      
                    value={gusrdatabyid?.user_data_byid?.Nominee_Relationship}  
                    options={N_Relation}                    
                />                    
                </div> }       

              { !isCorporateGlobal && <div>      
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
            <p className="mt-3">Comments: </p>
            <TextareaAutosize
                style={{ width: '80%' }}  
                aria-label="minimum height" minRows={3}
              {...register('Comments', {
                maxLength: { value: 500, message: 'Comments should be at most 500 characters' },
              })}
              defaultValue={gusrdatabyid?.user_data_byid?.Comments}
            />
            {errors.Comments && (
              <p className="error text-red-600">{errors.Comments.message}</p>
            )}
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
           
            <div className='mt-5'>
            <Button             
            className='w-full'
            disabled={isBack}
            onClick={() => {back(true); setBack(true)}}
            >Back {isBack && <Spinner></Spinner>}
            </Button>  
            </div>    


            <div className='mt-5'>
            <Button 
            className='w-full'
            disabled={isSubmitted}
            > Update {isSubmitted && <Spinner></Spinner>}
            </Button>  
            </div>
      
      </div>
  </form>    
  </> 
  )
}

export default Updatepage03