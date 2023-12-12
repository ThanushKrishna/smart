'use client'
import React from 'react';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@/graphql/queries'
import { useRouter } from 'next/navigation';



const AutomobilePage = () => {

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    pollInterval: 2000, // refetch every 5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
        <div>
          <div className='flex'>
          <div className='mb-5'>
            <Button>
              <Link href='/clients/add'> Add Client </Link>
            </Button>            
          </div>
          <div className='mb-5 ml-10'>
            <Button            
             > <Link href='/clients/update'> Update Client </Link>
             </Button>            
          </div>
          <div className='mb-5 ml-10'>
            <Button            
             > <Link href='/clients/delete'> Delete Client </Link>
             </Button>            
          </div>
          </div>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>                
              <Table.ColumnHeaderCell>Vehicle Registration Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>RC Doc:</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Owner Name:</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Son/Wife/Daughter Of:</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Owner Serial Number:</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Chassis Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Engine Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Make</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Registration Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Tax Valid UpTo</Table.ColumnHeaderCell>
				        <Table.ColumnHeaderCell>Vehicle Class:</Table.ColumnHeaderCell>  
                <Table.ColumnHeaderCell>Vehicle Description:</Table.ColumnHeaderCell>                
                <Table.ColumnHeaderCell>Fuel Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Emission Norms</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle Color</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Seating Capacity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Standing Capacity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Hypothecation Bank</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Hypothecation City</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Insurance Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>OD Policy No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>OD Policy Doc</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>OD Insurance Provider</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>OD Insurance Start</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>OD Insurance End</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>TP Policy No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>TP Policy Doc</Table.ColumnHeaderCell>
				        <Table.ColumnHeaderCell>TP Insurance Provider</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>TP Insurance Start</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>TP Insurance End</Table.ColumnHeaderCell>		               
				        <Table.ColumnHeaderCell>RTO</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Unladen Weight</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Laden Weight GVW</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle Body</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Wheel Base</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>No Of Cylinder</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Sleeper Capacity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Owner DOB</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Marital Staus</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Owner Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Manufacturing Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>REG/FC UpTo:</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>CC</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Permit No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Permit Category</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Mobile No1</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Mobile No2</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Mobile No3</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email Id</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Aadhar Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Aadhar Doc</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PAN Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PAN Doc</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nominee Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nominee Relationship</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nominee DOB</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PUC/Emission Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PUC/Emission UpTo</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>GST No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>GST Certificate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Referred by</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Updated by</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Policy Issued Through</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Comments</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.user_data.map((data:any) => (
                <Table.Row key={data.id}>
                  <Table.Cell>{data.Vehicle_No}</Table.Cell>
                  {/* <Table.Cell>{data.Vehicle_Reg_Doc && data.Vehicle_Reg_Doc.toString()}</Table.Cell> */}
                  <Table.Cell>{data.Vehicle_Reg_Doc && data.Vehicle_Reg_Doc.toString()}</Table.Cell>
                  <Table.Cell>{data.Owner}</Table.Cell>
                  <Table.Cell>{data.Son_Wife_Daughter_Of}</Table.Cell>                  
                  <Table.Cell>{data.RC_No}</Table.Cell>               
                  <Table.Cell>{data.Chasis_No}</Table.Cell>
                  <Table.Cell>{data.Engine_No}</Table.Cell>
                  <Table.Cell>{data.Make}</Table.Cell>
                  <Table.Cell>{data.Model}</Table.Cell>
                  <Table.Cell>{data.Registered_Date && new Date(data?.Registered_Date)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.tax_due_Date && new Date(data?.tax_due_Date)?.toDateString().slice(4)}</Table.Cell>                     
                  <Table.Cell>{data.Vehicle_type}</Table.Cell>  
                  <Table.Cell>{data.Vehicle_Description}</Table.Cell>
                  <Table.Cell>{data.Fuel_type}</Table.Cell>
                  <Table.Cell>{data.Vehice_norms}</Table.Cell>    
                  <Table.Cell>{data.Vehicle_color}</Table.Cell>     
                  <Table.Cell>{data.Seating_Capacity}</Table.Cell>   
                  <Table.Cell>{data.Standing_Capacity}</Table.Cell> 
                  <Table.Cell>{data.Hypothecation_bank}</Table.Cell>
                  <Table.Cell>{data.Hypothecation_city}</Table.Cell>  
                  <Table.Cell>{data.Insurance_type}</Table.Cell>                  
                  <Table.Cell>{data.Policy_No}</Table.Cell>  
                  <Table.Cell>{data.OD_Policy_Doc}</Table.Cell>  
                  <Table.Cell>{data.Insurance_provider}</Table.Cell>
                  <Table.Cell>{data.Insurance_Start && new Date(data?.Insurance_Start)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.Insurance_dueDate && new Date(data?.Insurance_dueDate)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.TP_Policy_No}</Table.Cell>  
                  <Table.Cell>{data.TP_Policy_Doc}</Table.Cell>  
                  <Table.Cell>{data.TP_Insurance_provider}</Table.Cell>
                  <Table.Cell>{data.TP_Insurance_Start && new Date(data?.TP_Insurance_Start)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.TP_dueDate && new Date(data?.TP_dueDate)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.RTO}</Table.Cell>
                  <Table.Cell>{data.Unladen_Weight}</Table.Cell>                  
                  <Table.Cell>{data.GVW}</Table.Cell>                                    
                  <Table.Cell>{data.Vehicle_Body}</Table.Cell>           
                  <Table.Cell>{data.Wheel_Base}</Table.Cell>           
                  <Table.Cell>{data.No_Of_Cylinder}</Table.Cell>           
                  <Table.Cell>{data.Sleeper_Capacity}</Table.Cell> 
                  <Table.Cell>{data.Owner_dob && new Date(data?.Owner_dob)?.toDateString().slice(4)}</Table.Cell> 
                  <Table.Cell>{data.Martial_status}</Table.Cell>                 
                  <Table.Cell>{data.Ownership_type}</Table.Cell>   
                  <Table.Cell>{data.Year_of_manufacuring && new Date(data?.Year_of_manufacuring)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.FC_due_Date && new Date(data?.FC_due_Date)?.toDateString().slice(4)}</Table.Cell>                                             
                  <Table.Cell>{data.CC}</Table.Cell>                  
                  <Table.Cell>{data.Permit_No}</Table.Cell>
                  <Table.Cell>{data.Permit_category}</Table.Cell>
                  <Table.Cell>{data.Mobile_No1}</Table.Cell>
                  <Table.Cell>{data.Mobile_No2}</Table.Cell>
                  <Table.Cell>{data.Mobile_No3}</Table.Cell>
                  <Table.Cell>{data.Email_id}</Table.Cell>
                  <Table.Cell>{data.Adhar_No}</Table.Cell>
                  <Table.Cell>{data.Adhar_doc && data.Adhar_doc.toString()}</Table.Cell>
                  <Table.Cell>{data.PanCard_No}</Table.Cell>
                  <Table.Cell>{data.Pan_doc}</Table.Cell>
                  <Table.Cell>{data.Nominee}</Table.Cell>
                  <Table.Cell>{data.Nominee_Relationship}</Table.Cell>
                  <Table.Cell>{data.Nominee_dob && new Date(data?.Nominee_dob)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.PUCC_Emission_No}</Table.Cell>
                  <Table.Cell>{data.Emission_dueDate && new Date(data?.Emission_dueDate)?.toDateString().slice(4)}</Table.Cell>                                                    
                  <Table.Cell>{data.GST_No}</Table.Cell>                  
                  <Table.Cell>{data.GST_Cer_Doc}</Table.Cell>
                  <Table.Cell className='w-30'>{data.Address.state && "Street: " + data.Address.street + "\n" + "City: " +  data.Address.city + "\n" + "State: " + data.Address.state + "\n" + "Zip: " + data.Address.zip }</Table.Cell>
                  <Table.Cell>{data.Referred_by}</Table.Cell>
                  <Table.Cell>{data.updated_by}</Table.Cell>
                  <Table.Cell>{data.Customer_type}</Table.Cell>                                                                                                                                                                                  
                  <Table.Cell>{data.Comments}</Table.Cell>                                    
                </Table.Row>
              ))}
            </Table.Body>
            {/* const result = data.Address.map((item) => {item}) */}
          </Table.Root>
        </div>
    )

}

export default AutomobilePage