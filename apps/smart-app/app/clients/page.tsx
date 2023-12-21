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
  

  // Save column state to local storage whenever it changes
  useEffect(() => {
    const saveColumnState = () => {
      if (gridRef.current && gridRef.current.api) {
        const columnState = gridRef.current.api.getColumnState();
        localStorage.setItem('columnState', JSON.stringify(columnState));
      }
    };

    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.addEventListener('columnVisible', saveColumnState);
      gridRef.current.api.addEventListener('columnResized', saveColumnState);
      gridRef.current.api.addEventListener('columnMoved', saveColumnState);
    }

    return () => {
      // Cleanup event listeners on component unmount
      if (gridRef.current && gridRef.current.api) {
        gridRef.current.api.removeEventListener('columnVisible', saveColumnState);
        gridRef.current.api.removeEventListener('columnResized', saveColumnState);
        gridRef.current.api.removeEventListener('columnMoved', saveColumnState);
      }
    };
  }, [gridRef]);

  if (loading) return <p>Loading...</p>;
  console.log(data);
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

const resetState = () => {
  gridRef.current!.api.resetColumnState();  
  if (gridRef.current && gridRef.current.api) {      
    localStorage.removeItem('columnState');    
  }
}

const padZero = (value: any) => (value < 10 ? `0${value}` : value);
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


const addressFormatter = (params: any) => {
  
  const rawAddress: tAddress = params.value;  
  if(rawAddress == undefined || rawAddress == null) return "";
  const formattedAddress = `${rawAddress?.street}, ${rawAddress?.city}, ${rawAddress?.state} ${rawAddress?.zip}`;
  return formattedAddress;
};

  
  const columnDefs: ColDef<AddClientType, any>[] = [
    { headerName: 'Vehicle Registration Number', field: 'Vehicle_No', pinned: 'left', colId: 'vehicleRegistrationNumber', autoHeight: true },
    { headerName: 'Vehicle Registration Number Document', field: 'Vehicle_Reg_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'rcDocument', autoHeight: true },
    { headerName: 'Owner Name', field: 'Owner', colId: 'owner', autoHeight: true },
    { headerName: 'Son/Wife/Daughter Of', field: 'Son_Wife_Daughter_Of', colId: 'sonWifeDaughterOf', autoHeight: true },
    { headerName: 'Owner Serial Number', field: 'RC_No', colId: 'rcNumber', autoHeight: true },
    { headerName: 'Chassis Number', field: 'Chasis_No', colId: 'chasisNumber', autoHeight: true },
    { headerName: 'Engine Number', field: 'Engine_No', colId: 'engineNumber', autoHeight: true },
    { headerName: 'Make', field: 'Make', colId: 'make', autoHeight: true },
    { headerName: 'Model', field: 'Model', colId: 'model', autoHeight: true },    
    { headerName: 'Registered Date', field: 'Registered_Date', colId: 'registeredDate', 
                  valueFormatter: dateFormatter, autoHeight: true,
                  filter: 'agDateColumnFilter'                 
                  },    
    { headerName: 'Tax Valid UpTo', field: 'tax_due_Date', colId: 'taxDueDate', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'Vehicle Class', field: 'Vehicle_type', colId: 'vehicleType', autoHeight: true },
    { headerName: 'Vehicle Description', field: 'Vehicle_Description', colId: 'vehicleDescription', autoHeight: true },
    { headerName: 'Fuel Type', field: 'Fuel_type', colId: 'fuelType', autoHeight: true },
    { headerName: 'Emission Norms', field: 'Vehice_norms', colId: 'vehicleNorms', autoHeight: true },
    { headerName: 'Vehicle Color', field: 'Vehicle_color', colId: 'vehicleColor', autoHeight: true },
    { headerName: 'Seating Capacity', field: 'Seating_Capacity', colId: 'seatingCapacity', autoHeight: true },
    { headerName: 'Standing Capacity', field: 'Standing_Capacity', colId: 'standingCapacity', autoHeight: true },
    { headerName: 'Hypothecation Bank', field: 'Hypothecation_bank', colId: 'hypothecationBank', autoHeight: true },
    { headerName: 'Hypothecation City', field: 'Hypothecation_city', colId: 'hypothecationCity', autoHeight: true },
    { headerName: 'Insurance Type', field: 'Insurance_type', colId: 'insuranceType', autoHeight: true },    
    { headerName: 'OD Policy No', field: 'Policy_No', colId: 'policyNumber', autoHeight: true },
    { headerName: 'Own Damage Policy Document', field: 'OD_Policy_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'ownDamagePolicyDocument', autoHeight: true },
    { headerName: 'Own Damage Insurance Provider', field: 'Insurance_provider', colId: 'insuranceProvider', autoHeight: true },
    { headerName: 'Own Damage Insurance Starts From', field: 'Insurance_Start', colId: 'insuranceStartDate', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'Own Damage Insurance UpTo', field: 'Insurance_dueDate', colId: 'ownDamageInsuranceDueDate', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'TP Policy No', field: 'TP_Policy_No', colId: 'thirdPartyPolicyNumber', autoHeight: true },    
    { headerName: 'Third-Party Policy Doc', field: 'TP_Policy_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'thirdPartyPolicyDocument', autoHeight: true },
    { headerName: 'Third-Party Insurance Provider', field: 'TP_Insurance_provider', colId: 'thirdPartyInsuranceProvider', autoHeight: true },    
    { headerName: 'Third-Party Insurance Starts From', field: 'TP_Insurance_Start', colId: 'thirdPartyInsuranceStartDate', valueFormatter: dateFormatter, autoHeight: true  },        
    { headerName: 'Third-Party Insurance UpTo', field: 'TP_dueDate', colId: 'thirdPartyInsuranceDueDate', valueFormatter: dateFormatter, autoHeight: true  },            
    { headerName: 'Registering Authority', field: 'RTO', colId: 'rto', autoHeight: true },
    { headerName: 'Unladen Weight', field: 'Unladen_Weight', colId: 'unladenWeight', autoHeight: true },
    { headerName: 'Laden Weight (GVW)', field: 'GVW', colId: 'grossVehicleWeight', autoHeight: true },   
    { headerName: 'Vehicle Body', field: 'Vehicle_Body', colId: 'vehicleBody', autoHeight: true },
    { headerName: 'Wheel Base', field: 'Wheel_Base', colId: 'wheelBase', autoHeight: true },
    { headerName: 'No Of Cylinder', field: 'No_Of_Cylinder', colId: 'numberOfCylinders', autoHeight: true },   
    { headerName: 'Sleeper Capacity', field: 'Sleeper_Capacity', colId: 'sleeperCapacity', autoHeight: true },
    { headerName: 'Owner DOB', field: 'Owner_dob', colId: 'ownerDOB', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'Marital Status', field: 'Martial_status', colId: 'maritalStatus', autoHeight: true },
    { headerName: 'Owner Type', field: 'Ownership_type', colId: 'ownershipType', autoHeight: true },
    { headerName: 'Manufacturing Date', field: 'Year_of_manufacuring', colId: 'manufacturingYear', valueFormatter: yearFormatter, autoHeight: true  },     
    { headerName: 'REG/FC UpTo', field: 'FC_due_Date', colId: 'fcDueDate', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'CC', field: 'CC', colId: 'cubicCapacity', autoHeight: true },    
    { headerName: 'Permit No', field: 'Permit_No', colId: 'permitNumber', autoHeight: true },
    { headerName: 'Permit Category', field: 'Permit_category', colId: 'permitCategory', autoHeight: true },
    { headerName: 'Permit Valid Upto:', field: 'Permit_dueDate', colId: 'permitDueDate', valueFormatter: dateFormatter, autoHeight: true  },   
    { headerName: '1st Mobile No', field: 'Mobile_No1', colId: 'mobileNumber1', autoHeight: true },
    { headerName: '2nd Mobile No', field: 'Mobile_No2', colId: 'mobileNumber2', autoHeight: true },
    { headerName: '3rd Mobile No:', field: 'Mobile_No3', colId: 'mobileNumber3', autoHeight: true },
    { headerName: 'Email Id', field: 'Email_id', colId: 'emailID', autoHeight: true },
    { headerName: 'Aadhar Number', field: 'Adhar_No', colId: 'aadharNumber', autoHeight: true },
    { headerName: 'Aadhar Number Document', field: 'Adhar_doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'aadharDocument', autoHeight: true },
    { headerName: 'PAN Number', field: 'PanCard_No', colId: 'panCardNumber', autoHeight: true },
    { headerName: 'PAN Number Document', field: 'Pan_doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'panDocument', autoHeight: true },
    { headerName: 'Nominee Name', field: 'Nominee', colId: 'nominee', autoHeight: true },
    { headerName: 'Nominee Relationship', field: 'Nominee_Relationship', colId: 'nomineeRelationship', autoHeight: true },
    { headerName: 'Nominee DOB', field: 'Nominee_dob', colId: 'nomineeDOB', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'PUC/Emission Number', field: 'PUCC_Emission_No', colId: 'puccEmissionNumber', autoHeight: true },
    { headerName: 'PUC/Emission UpTo', field: 'Emission_dueDate', colId: 'emissionDueDate', valueFormatter: dateFormatter, autoHeight: true  },        
    { headerName: 'GST No', field: 'GST_No', colId: 'gstNumber', autoHeight: true },
    { headerName: 'GST Certificate', field: 'GST_Cer_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'gstCertificateDocument', autoHeight: true },
    { headerName: 'RC Address', field: 'Address', colId: 'address', valueFormatter: addressFormatter, autoHeight: true  },    
    { headerName: 'Communication Address', field: 'CAddress', colId: 'caddress', valueFormatter: addressFormatter, autoHeight: true  },    
    { headerName: 'Referred By', field: 'Referred_by', colId: 'referredBy', autoHeight: true },
    { headerName: 'Updated By', field: 'updated_by', colId: 'updatedBy', autoHeight: true },                               
    { headerName: 'Policy Issued Through', field: 'Customer_type', colId: 'customerType', autoHeight: true },  
    { headerName: 'Comments', field: 'Comments', colId: 'comments'},
    { headerName: 'Prospect', field: 'Prospect', colId: 'Prospect'},
                       
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
              <div className='ml-10'> <Button  color="orange" variant="soft" onClick={resetState}>Reset State</Button>  </div>    
            </div>          
          </div>
        </div>
      

        <div
          className='ag-theme-quartz'
          style={{ height: '80vh', width: '100%' }}
        >          
          <AgGridReact<AddClientType>
            ref={gridRef}
            rowData={data.user_data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}            
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            pagination={true}
            paginationPageSize={20}                
            onGridReady={onGridReady}                     
          />
        </div>        
      </div>
    </div>
        </div>
    )

}

export default AutomobilePage