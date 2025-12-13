"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import AgGrid from '../components/AgGrid';
import Pagination from '../components/pagination';
import withAuth from '../middleware/withAuth';
import { getUserFromCookie } from '../../utils/auth';
import {
  GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES,
  GET_USER_DATA_AFTER_TP_INSURANCE_DUE_DATE,
  GET_USER_DATA_BEFORE_TP_INSURANCE_DUE_DATE,
  GET_USER_DATA_NA_TP_INSURANCE_DUE_DATE,
  GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES,
  GET_USER_DATA_AFTER_INSURANCE_DUE_DATE,
  GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE,
  GET_USER_DATA_NA_INSURANCE_DUE_DATE,
  GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES,
  GET_USER_DATA_AFTER_EMISSION_DUE_DATE,
  GET_USER_DATA_BEFORE_EMISSION_DUE_DATE,
  GET_USER_DATA_NA_EMISSION_DUE_DATE,
  GET_USER_DATA_BETWEEN_TAX_DUE_DATES,
  GET_USER_DATA_AFTER_TAX_DUE_DATE,
  GET_USER_DATA_BEFORE_TAX_DUE_DATE,
  GET_USER_DATA_NA_TAX_DUE_DATE,
  GET_USER_DATA_BETWEEN_FC_DUE_DATES,
  GET_USER_DATA_AFTER_FC_DUE_DATE,
  GET_USER_DATA_BEFORE_FC_DUE_DATE,
  GET_USER_DATA_NA_FC_DUE_DATE,
  GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES,
  GET_USER_DATA_AFTER_PERMIT_DUE_DATE,
  GET_USER_DATA_BEFORE_PERMIT_DUE_DATE,
  GET_USER_DATA_NA_PERMIT_DUE_DATE,
} from '../../graphql/queries';

const MAIN_TABS = [
  { label: "TP Insurance", value: "0" },
  { label: "OD Insurance", value: "1" },
  { label: "PUC/Emission", value: "2" },
  { label: "Tax", value: "3" },
  { label: "REG/FC", value: "4" },
  { label: "Permit", value: "5" },
];

const SUB_TABS = [
  { label: "Due Today", value: "0" },
  { label: "Due Tomorrow", value: "1" },
  { label: "Due Within Week", value: "2" },
  { label: "Due in Month", value: "3" },
  { label: "Due After Month", value: "4" },
  { label: "OverDue", value: "5" },
  { label: "NA", value: "6" },
];

const QUERY_MAP = {
  "0": [ // TP Insurance
    GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, // Today
    GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, // Tomorrow
    GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, // Week
    GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, // Month
    GET_USER_DATA_AFTER_TP_INSURANCE_DUE_DATE,    // After Month
    GET_USER_DATA_BEFORE_TP_INSURANCE_DUE_DATE,   // Overdue
    GET_USER_DATA_NA_TP_INSURANCE_DUE_DATE,       // NA
  ],
  "1": [ // OD Insurance
    GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES,
    GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES,
    GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES,
    GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES,
    GET_USER_DATA_AFTER_INSURANCE_DUE_DATE,
    GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE,
    GET_USER_DATA_NA_INSURANCE_DUE_DATE,
  ],
  "2": [ // Emission
    GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES,
    GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES,
    GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES,
    GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES,
    GET_USER_DATA_AFTER_EMISSION_DUE_DATE,
    GET_USER_DATA_BEFORE_EMISSION_DUE_DATE,
    GET_USER_DATA_NA_EMISSION_DUE_DATE,
  ],
  "3": [ // Tax
    GET_USER_DATA_BETWEEN_TAX_DUE_DATES,
    GET_USER_DATA_BETWEEN_TAX_DUE_DATES,
    GET_USER_DATA_BETWEEN_TAX_DUE_DATES,
    GET_USER_DATA_BETWEEN_TAX_DUE_DATES,
    GET_USER_DATA_AFTER_TAX_DUE_DATE,
    GET_USER_DATA_BEFORE_TAX_DUE_DATE,
    GET_USER_DATA_NA_TAX_DUE_DATE,
  ],
  "4": [ // FC
    GET_USER_DATA_BETWEEN_FC_DUE_DATES,
    GET_USER_DATA_BETWEEN_FC_DUE_DATES,
    GET_USER_DATA_BETWEEN_FC_DUE_DATES,
    GET_USER_DATA_BETWEEN_FC_DUE_DATES,
    GET_USER_DATA_AFTER_FC_DUE_DATE,
    GET_USER_DATA_BEFORE_FC_DUE_DATE,
    GET_USER_DATA_NA_FC_DUE_DATE,
  ],
  "5": [ // Permit
    GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES,
    GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES,
    GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES,
    GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES,
    GET_USER_DATA_AFTER_PERMIT_DUE_DATE,
    GET_USER_DATA_BEFORE_PERMIT_DUE_DATE,
    GET_USER_DATA_NA_PERMIT_DUE_DATE,
  ],
};

const DashboardPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const decodedToken = getUserFromCookie();
    if (decodedToken && typeof decodedToken === 'object') {
      setUserId(decodedToken.userid);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<string>('0');
  const [activeSubTab, setActiveSubTab] = useState<string>('0');
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);

  // Date logic
  const utcDate = useMemo(() => new Date().setHours(0, 0, 0, 0) + 60 * 60 * 1000 * 5.5, []);

  // Reset page number when tab/subtab changes
  useEffect(() => {
    setPageNumber(1);
  }, [activeTab, activeSubTab]);

  // Build variables for each tab/subtab
  const getVariables = () => {
    switch (activeTab) {
      case "0": // TP Insurance
      case "1": // OD Insurance
      case "2": // Emission
      case "3": // Tax
      case "4": // FC
      case "5": // Permit
        switch (activeSubTab) {
          case "0": // Today
            return { data_owner_id: userId, input1: utcDate, input2: utcDate + 1, pageSize, pageNumber };
          case "1": // Tomorrow
            return { data_owner_id: userId, input1: utcDate + 86400000, input2: utcDate + 86400000 + 1, pageSize, pageNumber };
          case "2": // Week
            return { data_owner_id: userId, input1: utcDate + 86400000, input2: utcDate + 7 * 86400000 + 1, pageSize, pageNumber };
          case "3": // Month
            return { data_owner_id: userId, input1: utcDate + 86400000, input2: utcDate + 30 * 86400000 + 1, pageSize, pageNumber };
          case "4": // After Month
            return { data_owner_id: userId, input: utcDate + 30 * 86400000, pageSize, pageNumber };
          case "5": // Overdue
            return { data_owner_id: userId, input: utcDate, pageSize, pageNumber };
          case "6": // NA
            return { input: userId, pageSize, pageNumber };
          default:
            return {};
        }
      default:
        return {};
    }
  };

  // Select the correct query
  const selectedQuery = QUERY_MAP[activeTab as keyof typeof QUERY_MAP]?.[parseInt(activeSubTab)];

  // Only run the query if userId and both tabs are selected
  const { loading, error, data } = useQuery(selectedQuery, {
    variables: getVariables(),
    skip: !userId || !selectedQuery,
    fetchPolicy: "network-only",
  });

  // Extract data and count
  let gridData: any[] = [];
  let itemCount = 0;
  if (data) {
    // Try to find the first array in the data object
    const arr = Object.values(data).find(v => Array.isArray(v));
    if (arr) gridData = arr as any[];
    // Try to find a count property
    const count = Object.values(data).find(v => typeof v === "number");
    if (typeof count === "number") itemCount = count;
    else itemCount = gridData.length;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 md:px-8 pt-20 ">
      {/* Main Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
        {MAIN_TABS.map(tab => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded-3xl font-bold transition text-sm md:text-base
              ${activeTab === tab.value
                ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white shadow'
                : 'bg-white text-purple-900 border border-purple-300 hover:bg-purple-100'}
            `}
            onClick={() => { setActiveTab(tab.value); setActiveSubTab('0'); }}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
        {SUB_TABS.map(subTab => (
          <button
            key={subTab.value}
            className={`px-3 py-1 rounded-3xl font-semibold transition text-xs md:text-sm
              ${activeSubTab === subTab.value
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white shadow'
                : 'bg-white text-amber-900 border border-amber-300 hover:bg-amber-100'}
            `}
            onClick={() => setActiveSubTab(subTab.value)}
            type="button"
          >
            {subTab.label}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div className="mt-4">
        {loading ? (
          <div className="text-center text-purple-900 py-10">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-10">Error loading data</div>
        ) : (
          <>
            <AgGrid data={gridData} />
            <div className="flex justify-end my-4">
              <Pagination
                onPageSizeChange={(e: number) => { setPageSize(e); setPageNumber(1); }}
                itemCount={itemCount}
                pageSize={pageSize}
                currentPage={pageNumber}
                onPageChange={(e: number) => setPageNumber(e)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);