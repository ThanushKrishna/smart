import React, { useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { clientObjectType, tAddress } from '../../typings';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

interface AgGridProps {
  data: clientObjectType[]
}

const AgGrid: React.FC<AgGridProps> = ({ data }) => {
  const gridRef = useRef<AgGridReact>(null);

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
      if (gridRef.current && gridRef.current.api) {
        gridRef.current.api.removeEventListener('columnVisible', saveColumnState);
        gridRef.current.api.removeEventListener('columnResized', saveColumnState);
        gridRef.current.api.removeEventListener('columnMoved', saveColumnState);
      }
    };
  }, [gridRef]);

  if (!data) return <p className="text-center text-purple-900">No data available</p>;

  const FileIconRenderer: React.FC<{ data: string | null }> = ({ data }) => {
    if (!data) return null;
    const urls = data.split(' ');
    return (
      <div className="flex flex-wrap gap-2">
        {urls.map((url: string, index: number) => (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
            <button type="button" className="bg-purple-100 hover:bg-purple-200 rounded-full p-1 shadow">
              <img src="/file-icon.svg" alt={`Doc${index + 1} Icon`} className="h-6" />
            </button>
          </a>
        ))}
      </div>
    );
  };

  const defaultColDef = {
    width: 250,
    sortable: true,
    filter: true,
    resizable: true,
  };

  const saveState = () => {
    if (gridRef.current && gridRef.current.api) {
      const columnState = gridRef.current.api.getColumnState();
      localStorage.setItem('columnState', JSON.stringify(columnState));
    }
  };

  const resetState = () => {
    gridRef.current!.api.resetColumnState();
    if (gridRef.current && gridRef.current.api) {
      localStorage.removeItem('columnState');
    }
  };

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

  const dateTimeFormatter = (params: any) => {
    if (params.value) {
      const date = new Date(params.value);
      const formattedDate = `${padZero(date.getDate())}-${padZero(date.getMonth() + 1)}-${date.getFullYear()}`;
      const formattedTime = `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      return `${formattedDate} ${formattedTime}`;
    }
    return params.value;
  };

  const addressFormatter = (params: any) => {
    const rawAddress: tAddress = params.value;
    if (rawAddress == undefined || rawAddress == null) return "";
    const formattedAddress = `${rawAddress?.street}, ${rawAddress?.city}, ${rawAddress?.state} ${rawAddress?.zip}`;
    return formattedAddress;
  };

const columnDefs: ColDef<clientObjectType, any>[] = [
    { headerName: 'Vehicle Registration Number', field: 'Vehicle_No', pinned: 'left', colId: 'vehicleRegistrationNumber', autoHeight: true },
    { headerName: 'Vehicle Registration Number Document', field: 'Vehicle_Reg_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'rcDocument', autoHeight: true },
    { headerName: 'Owner as per RC', field: 'Owner', colId: 'owner', autoHeight: true },
    { headerName: 'Customer', field: 'Customer', colId: 'customer', autoHeight: true },
    { headerName: 'Owner Type', field: 'Ownership_type', colId: 'ownershipType', autoHeight: true },    
    { headerName: 'Vehicle Type', field: 'Vehicle_Kind', colId: 'Vehicle_Kind', autoHeight: true },
    { headerName: 'Gender', field: 'Gender', colId: 'gender', autoHeight: true },
    { headerName: 'Son/Wife/Daughter Of', field: 'Son_Wife_Daughter_Of', colId: 'sonWifeDaughterOf', autoHeaderHeight: true },
    { headerName: 'Owner Serial Number', field: 'RC_No', colId: 'rcNumber', autoHeight: true },    
    { headerName: 'Chassis Number', field: 'Chasis_No', colId: 'chasisNumber', autoHeight: true },
    { headerName: 'Engine Number', field: 'Engine_No', colId: 'engineNumber', autoHeight: true },
    { headerName: 'Make', field: 'Make', colId: 'make', autoHeaderHeight: true },
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
    { headerName: 'Own Damage Insurance UpTo', field: 'Insurance_dueDate', colId: 'ownDamageInsuranceDueDate', 
                    valueFormatter: dateFormatter, autoHeight: true,
                    filter: 'agDateColumnFilter'                 
                    },
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
    { headerName: 'Nominee Document', field: 'Nominee_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'NomineeDoc', autoHeight: true },
    { headerName: 'Nominee Relationship', field: 'Nominee_Relationship', colId: 'nomineeRelationship', autoHeight: true },
    { headerName: 'Nominee DOB', field: 'Nominee_dob', colId: 'nomineeDOB', valueFormatter: dateFormatter, autoHeight: true  },
    { headerName: 'PUC/Emission Number', field: 'PUCC_Emission_No', colId: 'puccEmissionNumber', autoHeight: true },
    { headerName: 'PUC/Emission UpTo', field: 'Emission_dueDate', colId: 'emissionDueDate', valueFormatter: dateFormatter, autoHeight: true  },        
    { headerName: 'GST No', field: 'GST_No', colId: 'gstNumber', autoHeight: true },
    { headerName: 'GST Certificate', field: 'GST_Cer_Doc', cellRenderer: (params: any) => <FileIconRenderer data={params.value} />, colId: 'gstCertificateDocument', autoHeight: true },    
    { headerName: 'Referred By', field: 'Referred_by', colId: 'referredBy', autoHeight: true },
    { headerName: 'Updated By', field: 'updated_by', colId: 'updatedBy', autoHeight: true },                               
    { headerName: 'Policy Issued Through', field: 'Customer_type', colId: 'customerType', autoHeight: true },      
    { headerName: 'Prospect', field: 'Prospect', colId: 'Prospect'},
    { headerName: 'Photos', field: 'photo_links', colId: 'photo_links',  cellRenderer: (params: any) => <FileIconRenderer data={params.value} />},
    { headerName: 'Comments', field: 'Comments', colId: 'comments'},
    { headerName: 'RC Address', field: 'Address', colId: 'address', valueFormatter: addressFormatter, autoHeight: true  },    
    { headerName: 'Communication Address', field: 'CAddress', colId: 'caddress', valueFormatter: addressFormatter, autoHeight: true  },       
    { headerName: 'Last Updated', field: 'updatedAt', colId: 'updatedAt', valueFormatter: dateTimeFormatter, autoHeight: true  },                                 
  ];

  const onGridReady = (params: any) => {
    const storedColumnState = localStorage.getItem('columnState');
    if (storedColumnState && gridRef.current && gridRef.current.api) {
      gridRef.current.api.applyColumnState({
        state: JSON.parse(storedColumnState),
        applyOrder: true,
      });
    }
  };

  const onBtnExport = () => {
    gridRef.current!.api.exportDataAsCsv();
  };

  const onBtnUpdate = () => {
    const csvContent = gridRef.current?.api.getDataAsCsv();
    if (csvContent) {
      const newWindow = window.open('', '_blank', 'width=600,height=600');
      if (newWindow) {
        newWindow.document.write(`<textarea style="width:100%; height:100vh">${csvContent}</textarea>`);
        newWindow.document.title = 'CSV Export Content';
      }
    }
  };

  return (
  <div className="w-full min-h-[70vh] flex flex-col bg-gray-100 rounded-lg shadow-lg p-2 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <button
            className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-3xl transition"
            onClick={onBtnUpdate}
            type="button"
          >
            Show CSV export content text
          </button>
          <button
            className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-3xl transition"
            onClick={onBtnExport}
            type="button"
          >
            Download CSV export file
          </button>
          <button
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-3xl transition"
            onClick={saveState}
            type="button"
          >
            Save State
          </button>
          <button
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-3xl transition"
            onClick={resetState}
            type="button"
          >
            Reset State
          </button>
        </div>
      </div>
      <div className="ag-theme-quartz w-full" style={{ height: '60vh', minWidth: 0 }}>
        <AgGridReact<clientObjectType>
          ref={gridRef}
          rowData={data}
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
  );
};

export default AgGrid;