'use client'

import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, RowClassParams, createGrid, GridApi, GridOptions, ColGroupDef } from 'ag-grid-community';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { Button } from '@radix-ui/themes'
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@/graphql/queries'
import  { AddClientType, tAddress }  from '@/typings';
import 'ag-grid-community/styles/ag-grid.css';
//import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

const AutomobilePage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const { loading, error, data, refetch } = useQuery<{ user_data: AddClientType[] }>(GET_USER_DATA)
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle =  { width: '100%', height: '100%' };
  
 // useEffect to trigger the initial data fetch
 useEffect(() => {
  const fetchData = async () => {
    try {
      await refetch();
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
    }
  };

  // Fetch data when the component mounts
    fetchData();    
  }, [refetch]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  // Check if data is undefined before accessing its properties
  if (!data) return <p>No data available</p>;

  const FileIconRenderer: React.FC<{ data: string | null }> = ({ data }) => {
    if (!data) return null;
      
    const urls = data.split(' ');
    
    return (
      <div style={{ display: 'flex' }}>
        {urls.map((url: string, index:number) => (
          <div key={index} className="document-link">            
            <a href={url} target="_blank" rel="noopener noreferrer">
							<button type="button" className="document-button">
							<img src="/file-icon.svg" alt={`Doc${index + 1} Icon`} className="file-icon h-6" />
							</button>
						</a>
          </div>
        ))}
      </div>
    );
  };


const defaultColDef =  {    
      width: 100,
      sortable: true,
      filter: true,
  };



const saveState = () => {
  if (gridRef.current && gridRef.current.api) {
    const columnState = gridRef.current.api.getColumnState();
    localStorage.setItem('columnState', JSON.stringify(columnState));
    //console.log('column state saved to local storage');
  }
}


const dateFormatter = (params: any) => {
  if (params.value) {
    const date = new Date(params.value);
    const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
    return formattedDate;
  }
  return params.value;
};

const yearFormatter = (params: any) => {
  if (params.value) {
    const date = new Date(params.value);
    const formattedyear = `${date.getFullYear()}`;
    return formattedyear;
  }
  return params.value;
};

// Helper function to pad zero for single-digit values
const padZero = (value: any) => (value < 10 ? `0${value}` : value);

const addressFormatter = (params: any) => {
  // Assuming params.value contains the raw address data
  const rawAddress: tAddress = params.value;

  // Format the address as needed (e.g., combine street, city, state, and zip)
  const formattedAddress = `${rawAddress.street}, ${rawAddress.city}, ${rawAddress.state} ${rawAddress.zip}`;

  return formattedAddress;
};

  
  const columnDefs: ColDef<AddClientType, any>[] = [
    { headerName: 'Vehicle Registration Number', field: 'Vehicle_No', pinned: 'left', colId: 'vehicleRegistrationNumber' },
    { headerName: 'RC Number', field: 'RC_No', colId: 'rcNumber' },
    { headerName: 'Registered Date', field: 'Registered_Date', colId: 'registeredDate', valueFormatter: dateFormatter, },
    { headerName: 'Owner', field: 'Owner', colId: 'owner' },
    { headerName: 'Owner Date of Birth', field: 'Owner_dob', colId: 'ownerDOB', valueFormatter: dateFormatter, },
    { headerName: 'Ownership Type', field: 'Ownership_type', colId: 'ownershipType' },
    { headerName: 'Vehicle Type', field: 'Vehicle_type', colId: 'vehicleType' },
    { headerName: 'Year of Manufacturing', field: 'Year_of_manufacuring', colId: 'manufacturingYear', valueFormatter: yearFormatter, },
    { headerName: 'Gross Vehicle Weight', field: 'GVW', colId: 'grossVehicleWeight' },
    { headerName: 'Chasis Number', field: 'Chasis_No', colId: 'chasisNumber' },
    { headerName: 'Engine Number', field: 'Engine_No', colId: 'engineNumber' },
    { headerName: 'FC Due Date', field: 'FC_due_Date', colId: 'fcDueDate', valueFormatter: dateFormatter, },
    { headerName: 'Tax Due Date', field: 'tax_due_Date', colId: 'taxDueDate', valueFormatter: dateFormatter, },
    { headerName: 'Vehicle Color', field: 'Vehicle_color', colId: 'vehicleColor' },
    { headerName: 'Vehicle Norms', field: 'Vehice_norms', colId: 'vehicleNorms' },
    { headerName: 'Address', field: 'Address', colId: 'address', valueFormatter: addressFormatter, },
    { headerName: 'Cubic Capacity', field: 'CC', colId: 'cubicCapacity' },
    { headerName: 'Make', field: 'Make', colId: 'make' },
    { headerName: 'Model', field: 'Model', colId: 'model' },
    { headerName: 'Insurance Provider', field: 'Insurance_provider', colId: 'insuranceProvider' },
    { headerName: 'Insurance Due Date', field: 'Insurance_dueDate', colId: 'insuranceDueDate', valueFormatter: dateFormatter, },
    { headerName: 'Policy Number', field: 'Policy_No', colId: 'policyNumber' },
    { headerName: 'Policy URL', field: 'Policy_url', colId: 'policyURL' },
    { headerName: 'Permit Number', field: 'Permit_No', colId: 'permitNumber' },
    { headerName: 'Permit Category', field: 'Permit_category', colId: 'permitCategory' },
    { headerName: 'Mobile Number 1', field: 'Mobile_No1', colId: 'mobileNumber1' },
    { headerName: 'Mobile Number 2', field: 'Mobile_No2', colId: 'mobileNumber2' },
    { headerName: 'Mobile Number 3', field: 'Mobile_No3', colId: 'mobileNumber3' },
    { headerName: 'Email ID', field: 'Email_id', colId: 'emailID' },
    { headerName: 'Aadhar Number', field: 'Adhar_No', colId: 'aadharNumber' },
    { headerName: 'Aadhar Document', field: 'Adhar_doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'aadharDocument' },
    { headerName: 'PAN Card Number', field: 'PanCard_No', colId: 'panCardNumber' },
    { headerName: 'PAN Document', field: 'Pan_doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'panDocument' },
    { headerName: 'Nominee', field: 'Nominee', colId: 'nominee' },
    { headerName: 'Nominee Relationship', field: 'Nominee_Relationship', colId: 'nomineeRelationship' },
    { headerName: 'Nominee Date of Birth', field: 'Nominee_dob', colId: 'nomineeDOB', valueFormatter: dateFormatter, },
    { headerName: 'Emission Due Date', field: 'Emission_dueDate', colId: 'emissionDueDate', valueFormatter: dateFormatter, },
    { headerName: 'Fuel Type', field: 'Fuel_type', colId: 'fuelType' },
    { headerName: 'Hypothecation Bank', field: 'Hypothecation_bank', colId: 'hypothecationBank' },
    { headerName: 'Hypothecation City', field: 'Hypothecation_city', colId: 'hypothecationCity' },
    { headerName: 'RTO', field: 'RTO', colId: 'rto' },
    { headerName: 'Referred By', field: 'Referred_by', colId: 'referredBy' },
    { headerName: 'Comments', field: 'Comments', colId: 'comments' },
    { headerName: 'Customer Type', field: 'Customer_type', colId: 'customerType' },
    { headerName: 'Marital Status', field: 'Martial_status', colId: 'maritalStatus' },
    { headerName: 'Third-Party Insurance Provider', field: 'TP_Insurance_provider', colId: 'thirdPartyInsuranceProvider' },
    { headerName: 'Third-Party Insurance Due Date', field: 'TP_dueDate', colId: 'thirdPartyInsuranceDueDate', valueFormatter: dateFormatter, },
    { headerName: 'Own Damage Insurance Due Date', field: 'OD_dueDate', colId: 'ownDamageInsuranceDueDate', valueFormatter: dateFormatter, },
    { headerName: 'GST Number', field: 'GST_No', colId: 'gstNumber' },
    { headerName: 'Insurance Type', field: 'Insurance_type', colId: 'insuranceType' },
    { headerName: 'Customer Type', field: 'Customer_Type', colId: 'customerType' },
    { headerName: 'Vehicle Description', field: 'Vehicle_Description', colId: 'vehicleDescription' },
    { headerName: 'Seating Capacity', field: 'Seating_Capacity', colId: 'seatingCapacity' },
    { headerName: 'Standing Capacity', field: 'Standing_Capacity', colId: 'standingCapacity' },
    { headerName: 'Mobile Number 3 (Second Entry)', field: 'Mobile_No3', colId: 'mobileNumber3SecondEntry' },
    { headerName: 'Nominee Relationship (Second Entry)', field: 'Nominee_Relationship', colId: 'nomineeRelationshipSecondEntry' },
    { headerName: 'Son/Wife/Daughter Of', field: 'Son_Wife_Daughter_Of', colId: 'sonWifeDaughterOf' },
    { headerName: 'Vehicle Body', field: 'Vehicle_Body', colId: 'vehicleBody' },
    { headerName: 'Wheel Base', field: 'Wheel_Base', colId: 'wheelBase' },
    { headerName: 'Number of Cylinders', field: 'No_Of_Cylinder', colId: 'numberOfCylinders' },
    { headerName: 'Unladen Weight', field: 'Unladen_Weight', colId: 'unladenWeight' },
    { headerName: 'Sleeper Capacity', field: 'Sleeper_Capacity', colId: 'sleeperCapacity' },
    { headerName: 'PUCC Emission Number', field: 'PUCC_Emission_No', colId: 'puccEmissionNumber' },
    { headerName: 'Updated By', field: 'updated_by', colId: 'updatedBy' },
    { headerName: 'Third-Party Policy Number', field: 'TP_Policy_No', colId: 'thirdPartyPolicyNumber' },
    { headerName: 'Permit Number (Second Entry)', field: 'Permit_No', colId: 'permitNumberSecondEntry' },
    { headerName: 'Insurance Start Date', field: 'Insurance_Start', colId: 'insuranceStartDate', valueFormatter: dateFormatter, },
    { headerName: 'Third-Party Insurance Start Date', field: 'TP_Insurance_Start', colId: 'thirdPartyInsuranceStartDate', valueFormatter: dateFormatter, },
    { headerName: 'RC Doc', field: 'Vehicle_Reg_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'rcDocument' },
    { headerName: 'Own Damage Policy Document', field: 'OD_Policy_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'ownDamagePolicyDocument' },
    { headerName: 'Third-Party Policy Document', field: 'TP_Policy_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'thirdPartyPolicyDocument' },
    { headerName: 'GST Certificate Document', field: 'GST_Cer_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'gstCertificateDocument' },
  ];
  
  const onGridReady = (params: any) => {
    // Restore column state from local storage
    const storedColumnState = localStorage.getItem('columnState');
    if (storedColumnState && gridRef.current && gridRef.current.api) {
        gridRef.current.api.applyColumnState({
          state: JSON.parse(storedColumnState),
          applyOrder: true,
        });
    //console.log('column state restored from localStorage');
      }
  };

  const onRowClicked = (event: any) => {
    // Toggle selection on row click
    const newSelectedRow = event.data.id === selectedRow ? null : event.data.id;
    setSelectedRow(newSelectedRow);
  };

  const getRowStyle = (params: RowClassParams<any, any>): any => {
    // Check if the row is selected and apply styles accordingly
    return params.data.id === selectedRow
      ? { background: '#aaf0d1' } // Highlight color
      : undefined;
  };
      

  const onBtnExport = () => {
    gridRef.current!.api.exportDataAsCsv();
  }

  const onBtnUpdate = () => {
    const csvContent = gridRef.current?.api.getDataAsCsv();
    // const csvResultElement = document.querySelector('#csvResult');
  
    if (csvContent) {
      // Open a new window with specific dimensions
      const newWindow = window.open('', '_blank', 'width=600,height=600');
  
      // Set the content of the new window
      if (newWindow) {
        newWindow.document.write(`<textarea style="width:100%; height:100vh">${csvContent}</textarea>`);
        newWindow.document.title = 'CSV Export Content';
      }
    }
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
     <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header mb-2">
          <div className="example-section">            
            <div className='flex'>
              <div> <Button  color="cyan" variant="soft" onClick={onBtnUpdate}>Show CSV export content text</Button>  </div>
              <div className='ml-10'> <Button  color="cyan" variant="soft" onClick={onBtnExport}>Download CSV export file</Button>  </div>
              <div className='ml-10'> <Button  color="orange" variant="soft" onClick={saveState}>Save State</Button>  </div>                    
            </div>          
          </div>
        </div>
      

        <div
          className='ag-theme-quartz'
          style={{ height: '80vh', width: '100%' }}
        >          
          <AgGridReact
            ref={gridRef}
            rowData={data.user_data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}            
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            pagination={true}
            paginationPageSize={20}    
            onRowClicked={onRowClicked}
            getRowStyle={getRowStyle} 
            onGridReady={onGridReady}                     
          />
        </div>        
      </div>
    </div>
        </div>
    )

}

export default AutomobilePage