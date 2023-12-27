"use client"
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UPDATE_MAKE, DELETE_MAKEDATA, ADD_MAKE, GET_MAKE_BY_VALUE } from '@/graphql/queries'
import {ADD_VEHICLE_COLORS,UPDATE_VEHICLE_COLOR,DELETE_VEHICLE_COLOR_DATA,GET_VEHICLE_COLOR_BY_VALUE,} from '@/graphql/queries';
import {ADD_VEHICE_NORMS,UPDATE_VEHICLE_NORMS,DELETE_VEHICLE_NORMS_DATA,GET_VEHICLE_NORMS_BY_VALUE,} from '@/graphql/queries';
import {ADD_CC,UPDATE_CC,DELETE_CC_DATA,GET_CC_BY_VALUE,} from '@/graphql/queries';
import {ADD_MODEL,UPDATE_MODEL,DELETE_MODEL_DATA,GET_MODEL_BY_VALUE,} from '@/graphql/queries';
import {ADD_INSURANCE_PROVIDER,UPDATE_INSURANCE_PROVIDER,DELETE_INSURANCE_PROVIDER_DATA,GET_INSURANCE_PROVIDER_BY_VALUE,} from '@/graphql/queries';
import {ADD_PERMIT_CATEGORY,UPDATE_PERMIT_CATEGORY,DELETE_PERMIT_CATEGORY_DATA,GET_PERMIT_CATEGORY_BY_VALUE,} from '@/graphql/queries';
import {ADD_TP_INSURANCE_PROVIDER,UPDATE_TP_INSURANCE_PROVIDER,DELETE_TP_INSURANCE_PROVIDER_DATA,GET_TP_INSURANCE_PROVIDER_BY_VALUE,} from '@/graphql/queries';
import {ADD_VEHICLE_CLASS,UPDATE_VEHICLE_CLASS,DELETE_VEHICLE_CLASS_DATA,GET_VEHICLE_CLASS_BY_VALUE,} from '@/graphql/queries';
import {ADD_CUSTOMER_TYPE,UPDATE_CUSTOMER_TYPE,DELETE_CUSTOMER_TYPE_DATA,GET_CUSTOMER_TYPE_BY_VALUE,} from '@/graphql/queries';
import {ADD_VEHICLE_DESCRIPTION,UPDATE_VEHICLE_DESCRIPTION,DELETE_VEHICLE_DESCRIPTION_DATA,GET_VEHICLE_DESCRIPTION_BY_VALUE,} from '@/graphql/queries';
import {ADD_SEATING_CAPACITY,UPDATE_SEATING_CAPACITY,DELETE_SEATING_CAPACITY_DATA,GET_SEATING_CAPACITY_BY_VALUE,} from '@/graphql/queries';
import {ADD_STANDING_CAPACITY,UPDATE_STANDING_CAPACITY,DELETE_STANDING_CAPACITY_DATA,GET_STANDING_CAPACITY_BY_VALUE,} from '@/graphql/queries';
import {ADD_RTO,UPDATE_RTO,DELETE_RTO_DATA,GET_RTO_BY_VALUE,} from '@/graphql/queries';
import {ADD_HYPOTHECATION_BANK,UPDATE_HYPOTHECATION_BANK,DELETE_HYPOTHECATION_BANK_DATA,GET_HYPOTHECATION_BANK_BY_VALUE,} from '@/graphql/queries';
import {ADD_HYPOTHECATION_CITY,UPDATE_HYPOTHECATION_CITY,DELETE_HYPOTHECATION_CITY_DATA,GET_HYPOTHECATION_CITY_BY_VALUE,} from '@/graphql/queries';
import DeleteConfirmationDialog from '@/app/components/DeleteConfirmationDialog';


interface iDDValues {
  id: string;
  value: string;
}

const MasterTable: React.FC = () => {

 
  

  const [editableRows, setEditableRows] = useState<string[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>("");
  const[isSearching, setisSearching] = useState<Boolean>(false);
  

  const { loading: gmakedataLoad, error: gmakedataError, data: gmakedata, refetch  } = useQuery(GET_MAKE_BY_VALUE, {
    variables: {
      input: searchTerm,
      },
  });

  const[addMake, { data:makedata} ] = useMutation(ADD_MAKE);
  const [updateMake, { data: updateMakedata, error: updateMakeerror }] = useMutation(UPDATE_MAKE);
  const [deleteMakeData, { loading: deleteMakeDataLoad, error: deleteMakeDataError }] = useMutation(DELETE_MAKEDATA);

  const handleEdit = (id: string) => {
    setEditableRows((prevEditableRows) => {
      if (prevEditableRows.includes(id)) {
        return prevEditableRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevEditableRows, id];
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
  };

  const handleDeleteConfirm  = async (id: string) => {
    try {
      await deleteMakeData({
        variables: {
          id: id,
        },
        refetchQueries: [{ query: GET_MAKE_BY_VALUE, variables: { input: searchTerm } }],
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  const handleValueChange = (id: string, newValue: string) => {
    setEditedValues((prevEditedValues) => {
      const updatedValues = { ...prevEditedValues };
  
      // Update the value only if it's different from the original value
      if (newValue !== editedValues[id]) {
        updatedValues[id] = newValue;
      } else {
        // If it's the same as the original value, remove it from the edited values
        delete updatedValues[id];
      }
  
      return updatedValues;
    });
  };


  const handleSubmit = async (id: string) => {
    try {
      const updatedValue = editedValues[id];      

      if(updatedValue == undefined) return;

      // Call the update mutation
      await updateMake({
        variables: {
          input: {
            id,
            value: updatedValue
          },
        },
        refetchQueries: [{ query: GET_MAKE_BY_VALUE, variables: { input: searchTerm } }], // Refetch the data after mutation for updated results
      });

      // Reset editable state for the row
      handleEdit(id);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handleAddRecord = async () => {
    try {
      await addMake({
        variables: {
          input: {
            data_owner_id: '6562047e649b76ef6a583b8d', // Replace with your actual data_owner_id
            value: newValue,
          },
        },
        refetchQueries: [{ query: GET_MAKE_BY_VALUE, variables: { input: searchTerm } }],
      });

      // Clear the input after adding a record
      setNewValue('');
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };


  

  if (gmakedataLoad && !isSearching) {
    // Optional: Show a loading indicator or skeleton while data is being fetched
    return <p>Loading...</p>;
  }


  if (gmakedataError ||  updateMakeerror || deleteMakeDataError) {
    return <p>Error fetching data</p> || <p> {gmakedataError && gmakedataError.message }</p> || <p> {updateMakeerror && updateMakeerror.message }</p> || <p> {deleteMakeDataError && deleteMakeDataError.message }</p>  
  }

  //console.log(gmakedata?.MAKE_BY_VALUE)
  const tableData: iDDValues[] = gmakedata?.MAKE_BY_VALUE || [];
  

  return (
    <>
    <div >
     <TextField
        label="Search by Value"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setisSearching(true) }}
        onBlur={() => setisSearching(false)  }
        style={{ marginBottom: '16px' ,width: '100%', maxWidth: '400px' }}
      />   
      </div>   

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SL No</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>          
        <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TextField
                  label="New Value"
                  variant="standard"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value.toUpperCase())}
                  style={{ width: '100%' }}
                  InputProps={{
                    disableUnderline: false
                  }}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={handleAddRecord}>
                  Add Record
                </Button>
              </TableCell>
            </TableRow>
          {tableData && tableData.map((row: iDDValues, index:number) => (
            <TableRow key={row.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>
                {editableRows.includes(row.id) ? (
                  <TextField
                    defaultValue={row.value}
                    variant="standard" 
                    onChange={(e) => {
                      const newValue = e.target.value !== null ? e.target.value : row.value;                      
                      if (newValue !== row.value) {
                        handleValueChange(row.id, newValue);
                      }
                    }}
                    style={{ width: '100%' }}                    
                    InputProps={{
                      disableUnderline: false, 
                    }}
                  />
                ) : (
                  row.value
                )}
              </TableCell>
              <TableCell>
                {editableRows.includes(row.id) ? (
                  <>
                  <Button variant="contained" color="primary" onClick={() => handleSubmit(row.id)}>
                    Save
                  </Button>                  
                  <Button variant="contained" 
                  color="primary" 
                  onClick={() => handleEdit(row.id)}
                  style={{marginLeft: 2}}                
                  >
                    Cancel
                  </Button>

                  </>
                ) : (
                  <>
                    <IconButton onClick={() => handleEdit(row.id)} aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)} aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>    

        <DeleteConfirmationDialog
          open={!!deleteItemId}
          onClose={() => setDeleteItemId(null)}
          onConfirm={() => handleDeleteConfirm(deleteItemId ?? '')} // Use '' as default value
          itemName={tableData.find((row) => row.id === deleteItemId)?.value || ''}
        />

    </>
  );
};

export default MasterTable;