"use client"
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Tabs, Tab, Box } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import { GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES }  from '@/graphql/queries'

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('0');
  const [utcDate, setutcDate] = useState(new Date('2024-01-03').getTime() + 60 * 60 *1000 * 5.5);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  //const currentDate = Date.now(); // Get current date in milliseconds
  //const utcDate = currentDate + 60 * 60 * 1000 * 5.5; // Add 5.5 hours to convert to UTC


  console.log("millisec: " + utcDate);

  const { loading: overdueLoading, data: overdueData, error:overdueDataError } = useQuery(GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, {
    variables: { input: utcDate },
    skip: !utcDate,
  });

  // const { loading: gusrbyidload, error:gusrbyiderror, data:gusrdatabyid } = useQuery(GET_USER_DATA_BYID, {
  //   variables: { vechicleId: vehicleno },
  //   skip: !vehicleno, // Skip the query if vehicleno is not provided            
  //   });

  {overdueDataError && <p>{overdueDataError.message}</p> }
  console.log(overdueData);


  
  // const { loading: todayLoading, data: todayData } = useQuery(GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, {
  //   variables: { input: utcDate },
  // });

  // const { loading: tomorrowLoading, data: tomorrowData } = useQuery(GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, {
  //   variables: { inputDate: utcDate },
  // });

  // const { loading: betweenDatesLoading, data: betweenDatesData } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
  //   variables: { inputDate1: utcDate, inputDate2: utcDate + 60 * 60 * 1000 * 24 * 7 }, // Example: Add 7 days to the date
  // });


  // Similar queries for Due in Week and Due in Month can be added

  return (
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="OD Insurance" value="0" />
          <Tab label="TP Insurance" value="1" />
          <Tab label="PUC/Emission" value="2" />
          <Tab label="Tax" value="3" />
          <Tab label="REG/FC" value="4" />
          <Tab label="Permit" value="5" />
        </Tabs>
      </Box>

      <TabPanel value="0">
        {/* Render OverDue data */}
        {overdueLoading ? <p>Loading...</p> : <p>{JSON.stringify(overdueData?.user_data_beforeInsuranceDueDate)}</p>}
        {/* {overdueLoading && <p>Loading...</p>}         */}
      </TabPanel>
      <TabPanel value="1">
        {/* Render Due Today data */}
        {/* {todayLoading ? <p>Loading...</p> : <p>{JSON.stringify(todayData)}</p>} */}
      </TabPanel>
      <TabPanel value="2">
        {/* Render Due Tomorrow data */}
        {/* {tomorrowLoading ? <p>Loading...</p> : <p>{JSON.stringify(tomorrowData)}</p>} */}
      </TabPanel>
      <TabPanel value="3">
        {/* Render data between two dates */}
        {/* {betweenDatesLoading ? <p>Loading...</p> : <p>{JSON.stringify(betweenDatesData)}</p>} */}
      </TabPanel>
      {/* Similar TabPanels for Due in Week and Due in Month */}
    </TabContext>
  );
};

export default DashboardPage;