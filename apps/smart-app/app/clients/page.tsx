'use client'
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@/graphql/queries'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import  { AddClientType }  from '@/typings';


const AutomobilePage = () => {


  const { loading, error, data } = useQuery<{ user_data: AddClientType[] }>(GET_USER_DATA, {
    pollInterval: 2000, // refetch every 5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  // Check if data is undefined before accessing its properties
  if (!data) return <p>No data available</p>;



  const columnDefs: ColDef<AddClientType, any>[] = [
{ headerName: 'Vehicle Registration Number', field: 'Vehicle_No', pinned: 'left'},
{ headerName: 'RC Number', field: 'RC_No'},
{ headerName: 'Registered Date', field: 'Registered_Date'},
{ headerName: 'Owner', field: 'Owner'},
{ headerName: 'Owner Date of Birth', field: 'Owner_dob'},
{ headerName: 'Ownership Type', field: 'Ownership_type'},
{ headerName: 'Vehicle Type', field: 'Vehicle_type'},
{ headerName: 'Year of Manufacturing', field: 'Year_of_manufacuring'},
{ headerName: 'Gross Vehicle Weight', field: 'GVW'},
{ headerName: 'Chasis Number', field: 'Chasis_No'},
{ headerName: 'Engine Number', field: 'Engine_No'},
{ headerName: 'FC Due Date', field: 'FC_due_Date'},
{ headerName: 'Tax Due Date', field: 'tax_due_Date'},
{ headerName: 'Vehicle Color', field: 'Vehicle_color'},
{ headerName: 'Vehicle Norms', field: 'Vehice_norms'},
{ headerName: 'Address', field: 'Address'},
{ headerName: 'Cubic Capacity', field: 'CC'},
{ headerName: 'Make', field: 'Make'},
{ headerName: 'Model', field: 'Model'},
{ headerName: 'Insurance Provider', field: 'Insurance_provider'},
{ headerName: 'Insurance Due Date', field: 'Insurance_dueDate'},
{ headerName: 'Policy Number', field: 'Policy_No'},
{ headerName: 'Policy URL', field: 'Policy_url'},
{ headerName: 'Permit Number', field: 'Permit_No'},
{ headerName: 'Permit Category', field: 'Permit_category'},
{ headerName: 'Mobile Number 1', field: 'Mobile_No1'},
{ headerName: 'Mobile Number 2', field: 'Mobile_No2'},
{ headerName: 'Mobile Number 3', field: 'Mobile_No3'},
{ headerName: 'Email ID', field: 'Email_id'},
{ headerName: 'Aadhar Number', field: 'Adhar_No'},
{ headerName: 'Aadhar Document', field: 'Adhar_doc'},
{ headerName: 'PAN Card Number', field: 'PanCard_No'},
{ headerName: 'PAN Document', field: 'Pan_doc'},
{ headerName: 'Nominee', field: 'Nominee'},
{ headerName: 'Nominee Relationship', field: 'Nominee_Relationship'},
{ headerName: 'Nominee Date of Birth', field: 'Nominee_dob'},
{ headerName: 'Emission Due Date', field: 'Emission_dueDate'},
{ headerName: 'Fuel Type', field: 'Fuel_type'},
{ headerName: 'Hypothecation Bank', field: 'Hypothecation_bank'},
{ headerName: 'Hypothecation City', field: 'Hypothecation_city'},
{ headerName: 'RTO', field: 'RTO'},
{ headerName: 'Referred By', field: 'Referred_by'},
{ headerName: 'Comments', field: 'Comments'},
{ headerName: 'Customer Type', field: 'Customer_type'},
{ headerName: 'Marital Status', field: 'Martial_status'},
{ headerName: 'Third-Party Insurance Provider', field: 'TP_Insurance_provider'},
{ headerName: 'Third-Party Insurance Due Date', field: 'TP_dueDate'},
{ headerName: 'Own Damage Insurance Due Date', field: 'OD_dueDate'},
{ headerName: 'GST Number', field: 'GST_No'},
{ headerName: 'Insurance Type', field: 'Insurance_type'},
{ headerName: 'Customer Type', field: 'Customer_Type'},
{ headerName: 'Vehicle Description', field: 'Vehicle_Description'},
{ headerName: 'Seating Capacity', field: 'Seating_Capacity'},
{ headerName: 'Standing Capacity', field: 'Standing_Capacity'},
{ headerName: 'Mobile Number 3 (Second Entry)', field: 'Mobile_No3'},
{ headerName: 'Nominee Relationship (Second Entry)', field: 'Nominee_Relationship'},
{ headerName: 'Son/Wife/Daughter Of', field: 'Son_Wife_Daughter_Of'},
{ headerName: 'Vehicle Body', field: 'Vehicle_Body'},
{ headerName: 'Wheel Base', field: 'Wheel_Base'},
{ headerName: 'Number of Cylinders', field: 'No_Of_Cylinder'},
{ headerName: 'Unladen Weight', field: 'Unladen_Weight'},
{ headerName: 'Sleeper Capacity', field: 'Sleeper_Capacity'},
{ headerName: 'PUCC Emission Number', field: 'PUCC_Emission_No'},
{ headerName: 'Updated By', field: 'updated_by'},
{ headerName: 'Third-Party Policy Number', field: 'TP_Policy_No'},
{ headerName: 'Permit Number (Second Entry)', field: 'Permit_No'},
{ headerName: 'Insurance Start Date', field: 'Insurance_Start'},
{ headerName: 'Third-Party Insurance Start Date', field: 'TP_Insurance_Start'},
{ headerName: 'Vehicle Registration Document', field: 'Vehicle_Reg_Doc'},
{ headerName: 'Own Damage Policy Document', field: 'OD_Policy_Doc'},
{ headerName: 'Third-Party Policy Document', field: 'TP_Policy_Doc'},
{ headerName: 'GST Certificate Document', field: 'GST_Cer_Doc' }        
  ];
  
 

    const defaultColDef = {
      sortable: true,
      filter: true,
    };
      

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
          <div
            className='ag-theme-alpine'
            style={{ height: '500px', width: '100%' }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={data.user_data}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
          {/* <AgGridReact
            // gridOptions={gridOptions}
            // rowData={Array.isArray(data.user_data) ? data.user_data : []}
            // columnDefs={columnDefs}
            // rowData={data.user_data}            
            // pagination={true}
            // defaultColDef={defaultColDef}
            // debug={true}  // Enable AG Grid debugging
            // onFirstDataRendered={(params) => {
            //   console.log('Grid rendered:', params);
            // }}
          /> */}
        </div>
    )

}

export default AutomobilePage