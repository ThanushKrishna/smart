'use client'
import React, { useState } from 'react'
import { useForm, Controller  } from 'react-hook-form'
import { TextField, Button, TextArea, Select, Text } from '@radix-ui/themes'
import { AddClientType } from '@/typings';
import { ADD_CLIENT } from '@/graphql/queries'
import { useMutation } from '@apollo/client';
import { DatePickerComponent } from '@/app/components/DatePicker'
import { DropDownControl }  from '@/app/components/DropDownControl'
import  Spinner from '@/app/components/Spinner'
import { useRouter } from 'next/navigation';
import { FileUplaod } from '@/app/components/Upload'
import { uploadfile } from '@/app/functions/uploadfile'


const AddClient:React.FC = () => {

const router = useRouter();

const[addclient, { data, loading, error } ] = useMutation(ADD_CLIENT);

const { register, handleSubmit, control, formState:{errors} } = useForm<AddClientType>({});

const [isSubmitted, setisSubmitted] = useState(false);
const [ispandocProvided, setpandocProvided] = useState<Boolean>(false);
const [isadhardocProvided, setadhardocProvided] = useState<Boolean>(false);


const [adharfile, setadharfile] = useState<File>();
const [panfile, setpanfile] = useState<File>();



const onSubmit = async (formValues: AddClientType) => { 
    try{
        setisSubmitted(true)     
        
        
        
        const adharuploadlink = async () => {
          if(isadhardocProvided)
            return  await uploadfile(adharfile); 
          return;
        }
        

        const panuploadlink = async () => {
          if(ispandocProvided)
            return  await uploadfile(panfile); 
          return;
        }        

        const result = {
            data_owner_id: "65420cde2e5ffc26bed53918",
            Vehicle_No: formValues?.Vehicle_No || undefined,
            RC_No: formValues?.RC_No || undefined,
            Registered_Date: formValues?.Registered_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,                       
            Owner: formValues?.Owner || undefined,
            Owner_dob: formValues?.Owner_dob?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Ownership_type: formValues?.Ownership_type || undefined,
            Vehicle_type: formValues?.Vehicle_type || undefined,
            Year_of_manufacuring: formValues?.Year_of_manufacuring?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            GVW: formValues?.GVW || undefined,
            Chasis_No: formValues?.Chasis_No || undefined,
            Engine_No: formValues?.Engine_No || undefined,
            FC_due_Date: formValues?.FC_due_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            tax_due_Date: formValues?.tax_due_Date?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Vehicle_color: formValues?.Vehicle_color || undefined,
            Vehice_norms: formValues?.Vehice_norms || undefined,
            Address: formValues?.Address || undefined,
            CC: formValues?.CC || undefined,
            Make: formValues?.Make || undefined,
            Model: formValues?.Model || undefined,
            Insurance_provider: formValues?.Insurance_provider || undefined,
            Insurance_dueDate: formValues?.Insurance_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Policy_No: formValues?.Policy_No || undefined,
            Permit_No: formValues?.Permit_No || undefined,
            Permit_category: formValues?.Permit_category || undefined,
            Mobile_No1: formValues?.Mobile_No1 || undefined,
            Mobile_No2: formValues?.Mobile_No2 || undefined,
            Email_id: formValues?.Email_id || undefined,
            Adhar_No: formValues?.Adhar_No || undefined,
            Adhar_doc: adharuploadlink || undefined,
            PanCard_No: formValues?.PanCard_No || undefined,
            Pan_doc: panuploadlink || undefined,
            Nominee: formValues?.Nominee || undefined,
            Nominee_dob: formValues?.Nominee_dob?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Emission_dueDate: formValues?.Emission_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            Fuel_type: formValues?.Fuel_type || undefined,
            Hypothecation_bank: formValues?.Hypothecation_bank || undefined,
            Hypothecation_city: formValues?.Hypothecation_city || undefined,
            RTO: formValues?.RTO || undefined,
            Referred_by: formValues?.Referred_by || undefined,
            Comments: formValues?.Comments || undefined,
            Customer_type: formValues?.Customer_type || undefined,
            Martial_status: formValues?.Martial_status || undefined,
            TP_Insurance_provider: formValues?.TP_Insurance_provider || undefined,
            TP_dueDate: formValues?.TP_dueDate?.getTime() + 60 * 60 *1000 * 5.5 || undefined,
            GST_No: formValues?.GST_No || undefined,
            Insurance_type: formValues?.Insurance_type || undefined
        }
        addclient( { variables: { input: result}})
        .then(()=> {
        console.log( result );
        router.push('/clients')
        })
        .catch((err) => {
          console.log(err);
          setisSubmitted(false);          
        })        
        
    }   
    catch(e: any){        
        console.log("This is try-catch-error block");
        console.log(e?.message);
        setisSubmitted(false); 
    }
    
   
}



  return (
    
    
    <form className='max-w-md pb-2 text-slate-500 text-base' onSubmit={handleSubmit(onSubmit)}>                    
            <p>Vehicle No:</p>
            <TextField.Root>
            <TextField.Input { ...register('Vehicle_No')}/>
            </TextField.Root>
            <p>RC No: </p>
            <TextField.Root>
            <TextField.Input { ...register('RC_No')}/>
            </TextField.Root>  
            <Controller
                name="Registered_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Registered Date: "
                />)}
            />      
            <p>Owner Name: </p>            
            <TextField.Root> 
            <TextField.Input { ...register('Owner')}/>
            </TextField.Root>
            <Controller
                name="Owner_dob"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Owner DOB: "
                />)}
            />                
            <DropDownControl 
                name="Ownership_type"
                control={control}
                placeholder="Owner Type:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />            
            <DropDownControl 
                name="Vehicle_type"
                control={control}
                placeholder="Vehicle Type:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <Controller
                name="Year_of_manufacuring"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Year Of Manufacturing: "
                />)}
            />    
            <p>GVW: </p>
            <TextField.Root>
            <TextField.Input  { ...register('GVW')}/>
            </TextField.Root>
            <p>Chasis No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Chasis_No')}/>
            </TextField.Root>
            <p>Engine No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Engine_No')}/>
            </TextField.Root>
            <Controller
                name="FC_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="FC Due Date: "
                />)}
            />           
            <Controller
                name="tax_due_Date"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Tax Due Date: "
                />)}
            /> 
            <DropDownControl 
                name="Vehicle_color"
                control={control}
                placeholder="Vehicle Color:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <DropDownControl 
                name="Vehice_norms"
                control={control}
                placeholder="Vehicle Norms:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <p>Address: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Address')}/>
            </TextField.Root>
            <DropDownControl 
                name="CC"
                control={control}            
                placeholder="CC:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <DropDownControl 
                name="Make"
                control={control}
                placeholder="Make:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <DropDownControl 
                name="Model"
                control={control}
                placeholder="Model:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <DropDownControl 
                name="Insurance_provider"
                control={control}
                placeholder="Insurance Provider:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <Controller
                name="Insurance_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Insurance Due Date: "
                />)}
            /> 
            <p>Policy No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Policy_No')}/>
            </TextField.Root>
            <p>Permit No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Permit_No')}/>
            </TextField.Root>
            <DropDownControl 
                name="Permit_category"
                control={control}
                placeholder="Permit Category:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <p>1st Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No1')}/>
            </TextField.Root>
            <p>2nd Mobile No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Mobile_No2')}/>
            </TextField.Root>
            <p>Email Id: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Email_id')}/>
            </TextField.Root>
            <p>Adhar No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Adhar_No')}/>
            </TextField.Root>                     
            <FileUplaod 
                name="Adhar_doc"
                control={control}     
                onSelectFile={(e:File) => setadharfile(e)}   
                isCalled={(e: Boolean) => setadhardocProvided(e)}        
                placeholder="Upload Adhar:   "                       
            />
            <p>PanCard No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('PanCard_No')}/>
            </TextField.Root>
            <FileUplaod 
                name="Pan_doc"
                control={control}
                onSelectFile={(e:File) => setpanfile(e)}
                isCalled={(e:Boolean) => setpandocProvided(e)}
                placeholder="Upload Pan:   "                       
            />
            <p>Nominee Name: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Nominee')}/>
            </TextField.Root>
            <Controller
                name="Nominee_dob"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Nominee DOB: "
                />)}
            /> 
            <Controller
                name="Emission_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="Emission Due Date: "
                />)}
            />
            <DropDownControl 
                name="Fuel_type"
                control={control}        
                placeholder="Fuel Type:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <p>Hypothecation Bank: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_bank')}/>
            </TextField.Root>
            <p>Hypothecation City: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Hypothecation_city')}/>
            </TextField.Root>
            <p>RTO: </p>
            <TextField.Root>
            <TextField.Input  { ...register('RTO')}/>
            </TextField.Root>
            <p>Referred by: </p>
            <TextField.Root>
            <TextField.Input  { ...register('Referred_by')}/>
            </TextField.Root>
            <DropDownControl 
                name="Customer_type"
                control={control}
                placeholder="Customer Type:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <DropDownControl 
                name="Martial_status"
                control={control}
                placeholder="Marital Staus:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <DropDownControl 
                name="TP_Insurance_provider"
                control={control}
                placeholder="TP Insurance Provider:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <Controller
                name="TP_dueDate"
                control={control}             
                render={({ field }) => (
                <DatePickerComponent 
                {...field} 
                placeholder="TP Due Date: "
                />)}
            />
            <p>GST No: </p>
            <TextField.Root>
            <TextField.Input  { ...register('GST_No')}/>        
            </TextField.Root>
            <DropDownControl 
                name="Insurance_type"
                control={control}
                placeholder="Insurance Type:   "           
                options={[
                  { value: 'X'},
                  { value: 'Y'} 
                ]}              
            />
            <p>Comments: </p>
            <TextArea  { ...register('Comments')}/>
            <br/>
            <Button disabled={isSubmitted}> Submit {isSubmitted && <Spinner></Spinner>}</Button>        
    </form>
    
  )
}

export default AddClient