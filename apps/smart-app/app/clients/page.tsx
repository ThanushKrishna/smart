'use client'
import React from 'react';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@/graphql/queries'



const AutomobilePage = () => {
  const { loading, error, data } = useQuery(GET_USER_DATA, {
    pollInterval: 2000, // refetch every 5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
        <div>
          <div className='mb-5'>
            <Button>
              <Link href='/clients/new'> Add Client </Link>
            </Button>
          </div>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>                
                <Table.ColumnHeaderCell>Vehicle No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Registered Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>RC NO</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Owner DOB</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Year Of Manufacuring</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>GVW</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Chasis No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Engine No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>FC Due Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Tax Due Date</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle Color</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehice Norms</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>CC</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Make</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Insurance Provider</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Insurance DueDate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Policy</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Permit No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Permit Category</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Pri Mobile No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Sec Mobile No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email Id</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Adhar No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Adhar Doc</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PanCard</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>PanCard Doc</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nominee Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Nominee DOB</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Emission DueDate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Fuel Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Hypothecation Bank</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Hypothecation City</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>RTO</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Referred By</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Customer Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Martial Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>TP Insurance Provider</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>TP DueDate</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>GST No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Insurance Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Comments</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.user_data.map((data:any) => (
                <Table.Row key={data.id}>
                  <Table.Cell>{data.Vehicle_No}</Table.Cell>
                  <Table.Cell>{data.Registered_Date && new Date(data?.Registered_Date)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.RC_No}</Table.Cell>
                  <Table.Cell>{data.Owner}</Table.Cell>
                  <Table.Cell>{data.Owner_dob && new Date(data?.Owner_dob)?.toDateString().slice(4)}</Table.Cell>                  
                  <Table.Cell>{data.Vehicle_type}</Table.Cell>
                  <Table.Cell>{data.Year_of_manufacuring && new Date(data?.Year_of_manufacuring)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.GVW}</Table.Cell>
                  <Table.Cell>{data.Chasis_No}</Table.Cell>
                  <Table.Cell>{data.Engine_No}</Table.Cell>
                  <Table.Cell>{data.FC_due_Date && new Date(data?.FC_due_Date)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.tax_due_Date && new Date(data?.tax_due_Date)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.Vehicle_color}</Table.Cell>
                  <Table.Cell>{data.Vehice_norms}</Table.Cell>                  
                  <Table.Cell>{data.CC}</Table.Cell>
                  <Table.Cell>{data.Make}</Table.Cell>
                  <Table.Cell>{data.Model}</Table.Cell>
                  <Table.Cell>{data.Insurance_provider}</Table.Cell>
                  <Table.Cell>{data.Insurance_dueDate && new Date(data?.Insurance_dueDate)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.Policy_No}</Table.Cell>
                  <Table.Cell>{data.Permit_No}</Table.Cell>
                  <Table.Cell>{data.Permit_category}</Table.Cell>
                  <Table.Cell>{data.Mobile_No1}</Table.Cell>
                  <Table.Cell>{data.Mobile_No2}</Table.Cell>
                  <Table.Cell>{data.Email_id}</Table.Cell>
                  <Table.Cell>{data.Adhar_No}</Table.Cell>
                  <Table.Cell>{data.Adhar_doc}</Table.Cell>
                  <Table.Cell>{data.PanCard}</Table.Cell>
                  <Table.Cell>{data.Pan_doc}</Table.Cell>
                  <Table.Cell>{data.Nominee}</Table.Cell>
                  <Table.Cell>{data.Nominee_dob && new Date(data?.Nominee_dob)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.Emission_dueDate && new Date(data?.Emission_dueDate)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.Fuel_type}</Table.Cell>
                  <Table.Cell>{data.Hypothecation_bank}</Table.Cell>
                  <Table.Cell>{data.Hypothecation_city}</Table.Cell>
                  <Table.Cell>{data.RTO}</Table.Cell>
                  <Table.Cell>{data.Referred_by}</Table.Cell>
                  <Table.Cell>{data.Customer_type}</Table.Cell>
                  <Table.Cell>{data.Martial_status}</Table.Cell>
                  <Table.Cell>{data.TP_Insurance_provider}</Table.Cell>
                  <Table.Cell>{data.TP_dueDate && new Date(data?.TP_dueDate)?.toDateString().slice(4)}</Table.Cell>
                  <Table.Cell>{data.GST_No}</Table.Cell>
                  <Table.Cell>{data.Insurance_type}</Table.Cell>                  
                  <Table.Cell className='w-30'>{data.Address && "Street: " + data.Address.street + "\n" + "City: " +  data.Address.city + "\n" + "State: " + data.Address.state + "\n" + "Zip: " + data.Address.zip }</Table.Cell>
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