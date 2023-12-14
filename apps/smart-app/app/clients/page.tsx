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

interface VehicleData {
  Vehicle_No: string;
  Vehicle_Reg_Doc: string | null;
  // Add other fields with their corresponding types
  // ...
  Comments: string  | null;
}

const AutomobilePage = () => {


  const { loading, error, data } = useQuery<{ user_data: VehicleData[] }>(GET_USER_DATA, {
    pollInterval: 2000, // refetch every 5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

    // Check if data is undefined before accessing its properties
  if (!data) return <p>No data available</p>;

  // const documentFormatter: (params: any) => string = (params) => {
  //   if (params.value) {
  //     return `
  //       <a href="${params.value}" target="_blank" rel="noopener noreferrer">
  //         <button type="button" className="document-button">
  //           <!-- Replace "file-icon.svg" with the actual path to your file icon -->
  //           <img src="/file-icon.svg" alt="Document Icon" className="file-icon" />
  //         </button>
  //       </a>
  //     `;
  //   }
  //   return '';
  // };

// Default valueFormatter for object types
// const objectFormatter: (params: any) => string = (params) => {
//   // Implement your own logic to format the object data here
//   return JSON.stringify(params.value);
// };

  // const isObjectDataType = (colDef: ColDef): boolean => {
  //   // Assuming that the object data type is represented by 'object' string
  //   return colDef.type === 'object';
  // };

  const columnDefs: ColDef<VehicleData, any>[] = [
    { headerName: 'Vehicle Registration Number', field: 'Vehicle_No' },
    { headerName: 'Registration Doc', field: 'Vehicle_Reg_Doc'},
    { headerName: 'Comments', field: 'Comments' },
        
  ];
  
  // console.log(isObjectDataType(columnDefs[0]));
  // console.log(isObjectDataType(columnDefs[1]));

    // const columnTypes = {
    //   object: { valueFormatter: objectFormatter },
    // };

    // const gridOptions: GridOptions = {
    //   columnDefs,
    //   defaultColDef: {
    //     // Your default column definition here
    //   },
    //   columnTypes,
    // };

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