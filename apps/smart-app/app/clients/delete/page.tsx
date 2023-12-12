'use client'
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT_BYID } from '@/graphql/queries';

const DeleteClient: React.FC = () => {
  const [deleteclient, { loading: clientdataload, error: deleteclienterror }] = useMutation(DELETE_CLIENT_BYID);
  const [isVehicleNoprovided, setVehicleNoprovided] = useState(false);
  const [vehicleno, setVehicleno] = useState<String>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleVehicleNoSubmit = async () => {
    if (vehicleno) {
      setModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    deleteclient({ variables: { vehicleid: vehicleno } })
      .then(() => {
        setVehicleNoprovided(true);
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        setVehicleNoprovided(false);
        setModalOpen(false);
      });
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {!isVehicleNoprovided && (
        <>
          <label> Vehicle Registration Number: </label>
          <input
            type="text"
            name="Vehicle_No"
            onBlur={(e: any) => setVehicleno(e.target.value)}
          />
          <br />
          <button
            type="button"
            onClick={handleVehicleNoSubmit}
          >
            {' '}
            Search{' '}
          </button>
        </>
      )}

      {clientdataload && <p>Loading...</p>}
      {deleteclienterror && <p>"Vehicle No does not exist"</p>}
      {isVehicleNoprovided && <p>Client Record Deleted Successfully!!! </p>}

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Confirm Deletion
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this client record?
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelDelete}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteClient;
