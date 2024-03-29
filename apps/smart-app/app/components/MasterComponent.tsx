"use client"
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { getUserFromCookie } from '../../utils/auth';

interface MasterComponentProps {
  entityName: string;
  entityDname: string;
  queries: {
    getAll: any;
    add: any;
    update: any;
    delete: any;
  };
}

interface Row {
  id: string;
  value: string;
}

const MasterComponent: React.FC<MasterComponentProps> = ({ entityName, entityDname, queries }) => {

  const [userId, setUserId] = useState('');
  useEffect(() => {        
      const decodedToken = getUserFromCookie();        
      if(decodedToken  && typeof decodedToken === 'object' ){
          //console.log('userid from token:' +  decodedToken.userid);
          setUserId(decodedToken.userid);
      }
    }, []);

  const [editableRows, setEditableRows] = useState<string[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setisSearching] = useState<Boolean>(false);
  const [error, setError] = useState(false);

  const { loading, error:gQueryError, data, refetch } = useQuery(queries.getAll, {
    variables: { data_owner_id: userId, input: searchTerm },
  });

  const [addRecord, { data: addedData }] = useMutation(queries.add);
  const [updateRecord, { data: updatedData, error: updateError }] = useMutation(queries.update);
  const [deleteRecord, { loading: deleteLoading, error: deleteError }] = useMutation(queries.delete);

  const handleEdit = (id: string) => {
    setEditableRows((prevEditableRows) =>
      prevEditableRows.includes(id) ? prevEditableRows.filter((rowId) => rowId !== id) : [...prevEditableRows, id]
    );
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      await deleteRecord({
        variables: { id },
        refetchQueries: [{ query: queries.getAll, variables: { data_owner_id: userId, input: searchTerm } }],
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleValueChange = (id: string, newValue: string) => {
    setEditedValues((prevEditedValues) => {
      const updatedValues = { ...prevEditedValues };

      if (newValue !== editedValues[id]) {
        updatedValues[id] = newValue;
      } else {
        delete updatedValues[id];
      }

      return updatedValues;
    });
  };

  const handleSubmit = async (id: string) => {
    try {
      const updatedValue = editedValues[id];

      if (updatedValue === undefined) return;

      await updateRecord({
        variables: { input: { id, value: updatedValue } },
        refetchQueries: [{ query: queries.getAll, variables: { data_owner_id: userId, input: searchTerm } }],
      });

      handleEdit(id);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleAddRecord = async () => {

    if (newValue.trim() === '') {
      setError(true);
    } else {
      try {
        await addRecord({
          variables: { input: { data_owner_id: userId, value: newValue } },
          refetchQueries: [{ query: queries.getAll, variables: { data_owner_id: userId, input: searchTerm } }],
        });
  
        setNewValue('');
      } catch (error) {
        console.error('Error adding record:', error);
      }  
      setError(false);
    }

  }

  if (loading && !isSearching) {
    return <p>Loading...</p>;
  }

  if (gQueryError || updateError || deleteError) {
    return <p>Error fetching data</p> || <p>{gQueryError && gQueryError.message}</p> || <p>{updateError && updateError.message}</p> || <p>{deleteError && deleteError.message}</p>;
  }

  const tableData: Row[] = data ? data[`${entityName}_BY_VALUE`] : [];

  return (
    <>
      <div>
        <TextField
          label={`Search ${entityDname} by Value`}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setisSearching(true);
          }}
          onBlur={() => setisSearching(false)}
          style={{ marginBottom: '16px', width: '100%', maxWidth: '400px' }}
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
                    disableUnderline: false,
                  }}
                  error={error}  // Set error prop based on the error state
                  helperText={error ? 'Value cannot be empty' : ''} 
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={handleAddRecord}>
                  Add Record
                </Button>
              </TableCell>
            </TableRow>
            {tableData &&
              tableData.map((row: Row, index: number) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
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
                        <Button variant="contained" color="primary" onClick={() => handleEdit(row.id)} style={{ marginLeft: 2 }}>
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
        onConfirm={() => handleDeleteConfirm(deleteItemId ?? '')}
        itemName={tableData && tableData.find((row) => row.id === deleteItemId)?.value || ''}
      />
    </>
  );
};

export default MasterComponent;