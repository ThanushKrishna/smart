"use client"
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import { getUserFromCookie } from '../../utils/auth';
import { FaPencilAlt, FaTrash } from "react-icons/fa"; // Add this import


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
    if (decodedToken && typeof decodedToken === 'object') {
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

  const { loading, error: gQueryError, data, refetch } = useQuery(queries.getAll, {
    variables: { data_owner_id: userId, input: searchTerm },
  });

  const [addRecord] = useMutation(queries.add);
  const [updateRecord, { error: updateError }] = useMutation(queries.update);
  const [deleteRecord, { error: deleteError }] = useMutation(queries.delete);

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
  };

  if (loading && !isSearching) {
    return <p className="text-center text-purple-900 py-8">Loading...</p>;
  }

  if (gQueryError || updateError || deleteError) {
    return (
      <p className="text-center text-red-600 py-8">
        Error fetching data: {gQueryError?.message || updateError?.message || deleteError?.message}
      </p>
    );
  }

  const tableData: Row[] = data ? data[`${entityName}_BY_VALUE`] : [];

  return (
    <>
      {/* Search */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="text"
          placeholder={`Search ${entityDname} by Value`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setisSearching(true);
          }}
          onBlur={() => setisSearching(false)}
          className="w-full md:w-96 px-4 py-2 border border-purple-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-purple-900">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-semibold text-left">SL No</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Value</th>
              <th className="px-4 py-2 border-b font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Add New Row */}
            <tr className="bg-purple-50">
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  placeholder="New Value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value.toUpperCase())}
                  className={`w-full px-3 py-1 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${error ? 'border-red-500' : 'border-purple-300'}`}
                />
                {error && <span className="text-xs text-red-600">Value cannot be empty</span>}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:bg-purple-800 text-white font-bold py-1 px-4 rounded-3xl transition"
                  onClick={handleAddRecord}
                  type="button"
                >
                  Add Record
                </button>
              </td>
            </tr>
            {/* Data Rows */}
            {tableData &&
              tableData.map((row: Row, index: number) => (
                <tr key={row.id} className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {editableRows.includes(row.id) ? (
                      <input
                        type="text"
                        defaultValue={row.value}
                        onChange={(e) => {
                          const newValue = e.target.value !== null ? e.target.value : row.value;
                          if (newValue !== row.value) {
                            handleValueChange(row.id, newValue);
                          }
                        }}
                        className="w-full px-3 py-1 border border-purple-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                      />
                    ) : (
                      row.value
                    )}
                  </td>
                   <td className="px-4 py-2">
                    {editableRows.includes(row.id) ? (
                      <div className="flex gap-2">
                        <button
                          className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:bg-purple-800 text-white font-bold py-1 px-4 rounded-3xl transition"
                          onClick={() => handleSubmit(row.id)}
                          type="button"
                        >
                          Save
                        </button>
                        <button
                          className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:bg-amber-800 text-white font-bold py-1 px-4 rounded-3xl transition"
                          onClick={() => handleEdit(row.id)}
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-full hover:bg-purple-100 transition"
                          onClick={() => handleEdit(row.id)}
                          type="button"
                          title="Edit"
                        >
                          <FaPencilAlt className="text-purple-700" />
                        </button>
                        <button
                          className="p-2 rounded-full hover:bg-amber-100 transition"
                          onClick={() => handleDelete(row.id)}
                          type="button"
                          title="Delete"
                        >
                          <FaTrash className="text-amber-700" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

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