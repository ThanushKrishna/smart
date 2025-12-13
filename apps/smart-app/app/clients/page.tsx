'use client'

import { GET_USER_DATA_BYUSERID } from '@/graphql/queries';
import { clientObjectType } from '@/typings';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { getUserFromCookie } from '../../utils/auth';
import withAuth from '../middleware/withAuth';
import Pagination from '../components/pagination';
import AgGrid from '../components/AgGrid';

const AutomobilePage = () => {
  const [userId, setUserId] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const decodedToken = getUserFromCookie();
    if (decodedToken && typeof decodedToken === 'object') {
      setUserId(decodedToken.userid);
    }
  }, []);

  const { loading, error, data } = useQuery<{ user_data_byuserid: { data: clientObjectType[], count: number } }>(
    GET_USER_DATA_BYUSERID,
    {
      variables: { data_owner_id: userId, pageSize, pageNumber },
      skip: !userId,
    }
  );

  if (loading) return <p className="text-center text-purple-900">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message}</p>;
  if (!data) return <p className="text-center text-purple-900">No data available</p>;



  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 md:px-8 pt-20 ">
      {/* AgGrid Table with Pagination at the footer */}
      <div className="mb-6">
        <div className="flex flex-col">
          <AgGrid data={data.user_data_byuserid.data} />
          <div className="flex justify-end my-4">
            <Pagination
              onPageSizeChange={(e: number) => { setPageSize(e); setPageNumber(1); }}
              itemCount={data.user_data_byuserid.count}              
              pageSize={pageSize}
              currentPage={pageNumber}
              onPageChange={(e: number) => setPageNumber(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AutomobilePage);