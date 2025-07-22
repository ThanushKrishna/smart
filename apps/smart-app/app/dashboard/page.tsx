"use client"
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import AgGrid from '../components/AgGrid';
import {
  GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, GET_USER_DATA_NA_INSURANCE_DUE_DATE,
  GET_USER_DATA_BEFORE_TP_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_TP_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, GET_USER_DATA_NA_TP_INSURANCE_DUE_DATE,
  GET_USER_DATA_BEFORE_EMISSION_DUE_DATE, GET_USER_DATA_AFTER_EMISSION_DUE_DATE, GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES, GET_USER_DATA_NA_EMISSION_DUE_DATE,
  GET_USER_DATA_BEFORE_TAX_DUE_DATE, GET_USER_DATA_AFTER_TAX_DUE_DATE, GET_USER_DATA_BETWEEN_TAX_DUE_DATES, GET_USER_DATA_NA_TAX_DUE_DATE,
  GET_USER_DATA_BEFORE_FC_DUE_DATE, GET_USER_DATA_AFTER_FC_DUE_DATE, GET_USER_DATA_BETWEEN_FC_DUE_DATES, GET_USER_DATA_NA_FC_DUE_DATE,
  GET_USER_DATA_BEFORE_PERMIT_DUE_DATE, GET_USER_DATA_AFTER_PERMIT_DUE_DATE, GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES, GET_USER_DATA_NA_PERMIT_DUE_DATE
} from '../../graphql/queries';
import withAuth from '../middleware/withAuth';
import { getUserFromCookie } from '../../utils/auth';

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

  // new Date() gets today's Date in Server(IST) Timezone, .setHours(0, 0, 0, 0) provide the milliseconds of 12:00:00 am IST of today.
  // The setHours(0, 0, 0, 0) gives the millisecods in UTC timezone which is 5.5hrs backward. ie is 18:30 hrs UTC of yesterday.
  const [utcDate, setUtcDate] = useState<number>(new  Date().setHours(0, 0, 0, 0)  + 60 * 60 * 1000 * 5.5 );


  //OD Insurance Queries
  //OD Insurance Queries
  //OD Insurance Queries
  //OD Insurance Queries


    const { loading: overdueLoading, data: overdueData, error:overdueDataError } = useQuery(GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, {
    variables: { data_owner_id: userId, input: utcDate },
    skip: !utcDate,
  });
    const { loading: todayLoading, data: todayData, error: todayDataError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { data_owner_id: userId, input1: utcDate, input2: utcDate+1  },
      skip: !utcDate,
    });
    const { loading: tomorrowDueLoading, data: tomorrowDuedata, error: tomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate  + (24 * 60 * 60 * 1000) + 1 },
      skip: !utcDate,
    });
    const { loading: weekDueLoading, data: weekDuedata, error: weekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate  + (7 * 24 * 60 * 60 * 1000) + 1 },
      skip: !utcDate,
    });
    const { loading: monthDueLoading, data: monthDuedata, error: monthDueError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate  + (30 * 24 * 60 * 60 * 1000) + 1 },
      skip: !utcDate,
    });

    const { loading: dueafterMonthLoading, data: dueafterMonthData, error:dueafterMonthError } = useQuery(GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, {
      variables: { data_owner_id: userId, input: utcDate  + (30 * 24 * 60 * 60 * 1000) },
      skip: !utcDate,
    });

    const { loading: dueNALoading, data: dueNAData, error:dueNAError } = useQuery(GET_USER_DATA_NA_INSURANCE_DUE_DATE, {
      variables: { input: userId },   
      skip: !userId,    
    });
    //{dueNALoading && console.log(dueNAData)}
  

// TP Insurance Queries
// TP Insurance Queries
// TP Insurance Queries
// TP Insurance Queries


const { loading: tpOverdueLoading, data: tpOverdueData, error: tpOverdueDataError } = useQuery(GET_USER_DATA_BEFORE_TP_INSURANCE_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate },
  skip: !utcDate,
});


const { loading: tpTodayLoading, data: tpTodayData, error: tpTodayDataError } = useQuery(GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate, input2: utcDate + 1 },
  skip: !utcDate,
});


const { loading: tpTomorrowDueLoading, data: tpTomorrowDuedata, error: tpTomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: tpWeekDueLoading, data: tpWeekDuedata, error: tpWeekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (7 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: tpMonthDueLoading, data: tpMonthDuedata, error: tpMonthDueError } = useQuery(GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (30 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: tpDueafterMonthLoading, data: tpDueafterMonthData, error: tpDueafterMonthError } = useQuery(GET_USER_DATA_AFTER_TP_INSURANCE_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate + (30 * 24 * 60 * 60 * 1000) },
  skip: !utcDate,
});

const { loading: tpDueNALoading, data: tpDueNAData, error: tpDueNAError } = useQuery(GET_USER_DATA_NA_TP_INSURANCE_DUE_DATE, {
  variables: { input: userId },     
  skip: !userId,  
});

// const { loading: fcDueNALoading, data: fcDueNAData, error: fcDueNAError } = useQuery(GET_USER_DATA_NA_FC_DUE_DATE, {
//   variables: { input: userId },   
//   skip: !userId,    
// });

// Emission Queries
// Emission Queries
// Emission Queries
// Emission Queries


const { loading: emissionOverdueLoading, data: emissionOverdueData, error: emissionOverdueDataError } = useQuery(GET_USER_DATA_BEFORE_EMISSION_DUE_DATE, {
  variables: {data_owner_id: userId,  input: utcDate },
  skip: !utcDate,
});

const { loading: emissionTodayLoading, data: emissionTodayData, error: emissionTodayDataError } = useQuery(GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate, input2: utcDate + 1 },
  skip: !utcDate,
});

const { loading: emissionTomorrowDueLoading, data: emissionTomorrowDuedata, error: emissionTomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: emissionWeekDueLoading, data: emissionWeekDuedata, error: emissionWeekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (7 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: emissionMonthDueLoading, data: emissionMonthDuedata, error: emissionMonthDueError } = useQuery(GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (30 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: emissionDueafterMonthLoading, data: emissionDueafterMonthData, error: emissionDueafterMonthError } = useQuery(GET_USER_DATA_AFTER_EMISSION_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate + (30 * 24 * 60 * 60 * 1000) },
  skip: !utcDate,
});

const { loading: emissionDueNALoading, data: emissionDueNAData, error: emissionDueNAError } = useQuery(GET_USER_DATA_NA_EMISSION_DUE_DATE, {
  variables: { input: userId },     
  skip: !userId, 
});
//{emissionDueNALoading && console.log(emissionDueNAData)}

// Tax Queries
// Tax Queries
// Tax Queries
// Tax Queries

const { loading: taxOverdueLoading, data: taxOverdueData, error: taxOverdueDataError } = useQuery(GET_USER_DATA_BEFORE_TAX_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate },
  skip: !utcDate,
});

const { loading: taxTodayLoading, data: taxTodayData, error: taxTodayDataError } = useQuery(GET_USER_DATA_BETWEEN_TAX_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate, input2: utcDate + 1 },
  skip: !utcDate,
});

const { loading: taxTomorrowDueLoading, data: taxTomorrowDuedata, error: taxTomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_TAX_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: taxWeekDueLoading, data: taxWeekDuedata, error: taxWeekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_TAX_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (7 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: taxMonthDueLoading, data: taxMonthDuedata, error: taxMonthDueError } = useQuery(GET_USER_DATA_BETWEEN_TAX_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (30 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: taxDueafterMonthLoading, data: taxDueafterMonthData, error: taxDueafterMonthError } = useQuery(GET_USER_DATA_AFTER_TAX_DUE_DATE, {
  variables: {data_owner_id: userId,  input: utcDate + (30 * 24 * 60 * 60 * 1000) },
  skip: !utcDate,
});

const { loading: taxDueNALoading, data: taxDueNAData, error: taxDueNAError } = useQuery(GET_USER_DATA_NA_TAX_DUE_DATE, {
  variables: { input: userId },     
  skip: !userId,  
});

//{taxDueNALoading && console.log(taxDueNAData)}

// FC Queries
// FC Queries
// FC Queries
// FC Queries


const { loading: fcOverdueLoading, data: fcOverdueData, error: fcOverdueDataError } = useQuery(GET_USER_DATA_BEFORE_FC_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate },
  skip: !utcDate,
});

const { loading: fcTodayLoading, data: fcTodayData, error: fcTodayDataError } = useQuery(GET_USER_DATA_BETWEEN_FC_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate, input2: utcDate + 1 },
  skip: !utcDate,
});

const { loading: fcTomorrowDueLoading, data: fcTomorrowDuedata, error: fcTomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_FC_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: fcWeekDueLoading, data: fcWeekDuedata, error: fcWeekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_FC_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (7 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: fcMonthDueLoading, data: fcMonthDuedata, error: fcMonthDueError } = useQuery(GET_USER_DATA_BETWEEN_FC_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (30 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: fcDueafterMonthLoading, data: fcDueafterMonthData, error: fcDueafterMonthError } = useQuery(GET_USER_DATA_AFTER_FC_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate + (30 * 24 * 60 * 60 * 1000) },
  skip: !utcDate,
});

const { loading: fcDueNALoading, data: fcDueNAData, error: fcDueNAError } = useQuery(GET_USER_DATA_NA_FC_DUE_DATE, {
  variables: { input: userId },   
  skip: !userId,    
});
//{fcDueNALoading && console.log(fcDueNAData)}


// Permit Queries
// Permit Queries
// Permit Queries
// Permit Queries

const { loading: permitOverdueLoading, data: permitOverdueData, error: permitOverdueDataError } = useQuery(GET_USER_DATA_BEFORE_PERMIT_DUE_DATE, {
  variables: { data_owner_id: userId, input: utcDate },
  skip: !utcDate,
});

const { loading: permitTodayLoading, data: permitTodayData, error: permitTodayDataError } = useQuery(GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate, input2: utcDate + 1 },
  skip: !utcDate,
});

const { loading: permitTomorrowDueLoading, data: permitTomorrowDuedata, error: permitTomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: permitWeekDueLoading, data: permitWeekDuedata, error: permitWeekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (7 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: permitMonthDueLoading, data: permitMonthDuedata, error: permitMonthDueError } = useQuery(GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES, {
  variables: { data_owner_id: userId, input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate + (30 * 24 * 60 * 60 * 1000) + 1 },
  skip: !utcDate,
});

const { loading: permitDueafterMonthLoading, data: permitDueafterMonthData, error: permitDueafterMonthError } = useQuery(GET_USER_DATA_AFTER_PERMIT_DUE_DATE, {
  variables: {data_owner_id: userId,  input: utcDate + (30 * 24 * 60 * 60 * 1000) },
  skip: !utcDate,
});

const { loading: permitDueNALoading, data: permitDueNAData, error: permitDueNAError } = useQuery(GET_USER_DATA_NA_PERMIT_DUE_DATE, {
  variables: { input: userId },      
  skip: !userId, 
});
//{permitDueNALoading && console.log(permitDueNAData)}


   const getTabData = () => {
    switch (activeTab) {
      case "0": // TP Insurance
        return [
          { loading: tpTodayLoading, data: tpTodayData?.user_data_betweenTPInsuranceDueDates },
          { loading: tpTomorrowDueLoading, data: tpTomorrowDuedata?.user_data_betweenTPInsuranceDueDates },
          { loading: tpWeekDueLoading, data: tpWeekDuedata?.user_data_betweenTPInsuranceDueDates },
          { loading: tpMonthDueLoading, data: tpMonthDuedata?.user_data_betweenTPInsuranceDueDates },
          { loading: tpDueafterMonthLoading, data: tpDueafterMonthData?.user_data_afterTPInsuranceDueDate },
          { loading: tpOverdueLoading, data: tpOverdueData?.user_data_beforeTPInsuranceDueDate },
          { loading: tpDueNALoading, data: tpDueNAData?.user_data_NaTPInsuranceDueDate },
        ];
      case "1": // OD Insurance
        return [
          { loading: todayLoading, data: todayData?.user_data_betweenInsuranceDueDates },
          { loading: tomorrowDueLoading, data: tomorrowDuedata?.user_data_betweenInsuranceDueDates },
          { loading: weekDueLoading, data: weekDuedata?.user_data_betweenInsuranceDueDates },
          { loading: monthDueLoading, data: monthDuedata?.user_data_betweenInsuranceDueDates },
          { loading: dueafterMonthLoading, data: dueafterMonthData?.user_data_afterInsuranceDueDate },
          { loading: overdueLoading, data: overdueData?.user_data_beforeInsuranceDueDate },
          { loading: dueNALoading, data: dueNAData?.user_data_NaInsuranceDueDate },
        ];
      case "2": // Emission
        return [
          { loading: emissionTodayLoading, data: emissionTodayData?.user_data_betweenEmissionDueDates },
          { loading: emissionTomorrowDueLoading, data: emissionTomorrowDuedata?.user_data_betweenEmissionDueDates },
          { loading: emissionWeekDueLoading, data: emissionWeekDuedata?.user_data_betweenEmissionDueDates },
          { loading: emissionMonthDueLoading, data: emissionMonthDuedata?.user_data_betweenEmissionDueDates },
          { loading: emissionDueafterMonthLoading, data: emissionDueafterMonthData?.user_data_afterEmissionDueDate },
          { loading: emissionOverdueLoading, data: emissionOverdueData?.user_data_beforeEmissionDueDate },
          { loading: emissionDueNALoading, data: emissionDueNAData?.user_data_NaEmissionDueDate },
        ];
      case "3": // Tax
        return [
          { loading: taxTodayLoading, data: taxTodayData?.user_data_betweenTaxDueDates },
          { loading: taxTomorrowDueLoading, data: taxTomorrowDuedata?.user_data_betweenTaxDueDates },
          { loading: taxWeekDueLoading, data: taxWeekDuedata?.user_data_betweenTaxDueDates },
          { loading: taxMonthDueLoading, data: taxMonthDuedata?.user_data_betweenTaxDueDates },
          { loading: taxDueafterMonthLoading, data: taxDueafterMonthData?.user_data_afterTaxDueDate },
          { loading: taxOverdueLoading, data: taxOverdueData?.user_data_beforeTaxDueDate },
          { loading: taxDueNALoading, data: taxDueNAData?.user_data_NaTaxDueDate },
        ];
      case "4": // FC
        return [
          { loading: fcTodayLoading, data: fcTodayData?.user_data_betweenFCDueDates },
          { loading: fcTomorrowDueLoading, data: fcTomorrowDuedata?.user_data_betweenFCDueDates },
          { loading: fcWeekDueLoading, data: fcWeekDuedata?.user_data_betweenFCDueDates },
          { loading: fcMonthDueLoading, data: fcMonthDuedata?.user_data_betweenFCDueDates },
          { loading: fcDueafterMonthLoading, data: fcDueafterMonthData?.user_data_afterFCDueDate },
          { loading: fcOverdueLoading, data: fcOverdueData?.user_data_beforeFCDueDate },
          { loading: fcDueNALoading, data: fcDueNAData?.user_data_NaFCDueDate },
        ];
      case "5": // Permit
        return [
          { loading: permitTodayLoading, data: permitTodayData?.user_data_betweenPermitDueDates },
          { loading: permitTomorrowDueLoading, data: permitTomorrowDuedata?.user_data_betweenPermitDueDates },
          { loading: permitWeekDueLoading, data: permitWeekDuedata?.user_data_betweenPermitDueDates },
          { loading: permitMonthDueLoading, data: permitMonthDuedata?.user_data_betweenPermitDueDates },
          { loading: permitDueafterMonthLoading, data: permitDueafterMonthData?.user_data_afterPermitDueDate },
          { loading: permitOverdueLoading, data: permitOverdueData?.user_data_beforePermitDueDate },
          { loading: permitDueNALoading, data: permitDueNAData?.user_data_NaPermitDueDate },
        ];
      default:
        return [];
    }
  };

  const tabData = getTabData();

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 md:px-8">
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
        {tabData[parseInt(activeSubTab)]?.loading ? (
          <div className="text-center text-purple-900 py-10">Loading...</div>
        ) : (
          <AgGrid data={tabData[parseInt(activeSubTab)]?.data} />
        )}
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);