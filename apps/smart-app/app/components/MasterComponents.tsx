import React, { useState } from 'react';
import { useQuery, useMutation, DocumentNode } from '@apollo/client';
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

interface TableProps {
  tableName: string;
  query: DocumentNode;
  mutation: DocumentNode;
}

interface RowData {
  id: string;
  value: string;
}

const MasterComponent: React.FC<TableProps> = ({ tableName, query, mutation }) => {
  const { loading, error, data } = useQuery(query, {});

  const [editableRows, setEditableRows] = useState<string[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const [updateData, { error: updateError }] = useMutation(mutation);

  const handleEdit = (id: string) => {
    setEditableRows((prevEditableRows) =>
      prevEditableRows.includes(id)
        ? prevEditableRows.filter((rowId) => rowId !== id)
        : [...prevEditableRows, id]
    );
  };

  const handleDelete = async (id: string) => {
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
      await updateData({
        variables: {
          input: {
            id,
            value: updatedValue,
          },
        },
        refetchQueries: [{ query }], // Refetch the data after mutation for updated results
      });

      // Reset editable state for the row
      handleEdit(id);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading) {
    // Optional: Show a loading indicator or skeleton while data is being fetched
    return <p>Loading...</p>;
  }

  if (error || updateError) {
    // Optional: Handle error case
    return <p>Error fetching or updating data</p>;
  }

  const tableData: RowData[] = data?.[tableName] || [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: RowData) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
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

export default MasterComponent;
