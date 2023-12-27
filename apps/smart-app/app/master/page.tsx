"use client"
import React, { useState } from 'react';
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
import { GET_MAKE, UPDATE_MAKE } from '@/graphql/queries'

interface iDDValues {
  id: string;
  value: string;
}

const MyTable: React.FC = () => {
  const { loading: gmakedataLoad, error: gmakedataError, data: gmakedata } = useQuery(GET_MAKE, {});

  const [editableRows, setEditableRows] = useState<string[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const [updateMake, { data: updateMakedata, error: updateMakeerror }] = useMutation(UPDATE_MAKE);

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
    // Handle delete logic
    console.log(`Delete record with ID ${id}`);
  };

  const handleValueChange = (id: string, newValue: string) => {
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (id: string) => {
    try {
      const updatedValue = editedValues[id];

      // Call the update mutation
      await updateMake({
        variables: {
          input: {
            id,
            value: updatedValue,
          },
        },
        refetchQueries: [{ query: GET_MAKE }], // Refetch the data after mutation for updated results
      });

      // Reset editable state for the row
      handleEdit(id);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (gmakedataLoad) {
    // Optional: Show a loading indicator or skeleton while data is being fetched
    return <p>Loading...</p>;
  }

  console.log(gmakedata)
  if (gmakedataError) {
    // Optional: Handle error case
    return <p>Error fetching data</p>;
  }

  const tableData: iDDValues[] = gmakedata?.MAKE || [];

  return (
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
          {gmakedata && gmakedata?.MAKE?.map((row: iDDValues, index:number) => (
            <TableRow key={row.id}>
              <TableCell>{index+1}</TableCell>
              <TableCell>
                {editableRows.includes(row.id) ? (
                  <TextField
                    defaultValue={row.value}
                    variant="outlined"
                    onChange={(e) => handleValueChange(row.id, e.target.value)}
                  />
                ) : (
                  row.value
                )}
              </TableCell>
              <TableCell>
                {editableRows.includes(row.id) ? (
                  <Button variant="contained" color="primary" onClick={() => handleSubmit(row.id)}>
                    Save
                  </Button>
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
  );
};

export default MyTable;