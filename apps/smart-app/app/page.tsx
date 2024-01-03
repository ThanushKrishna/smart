"use client"
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Tabs, Tab, Box } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import AgGrid from '@/app/components/AgGrid'
import { GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES }  from '@/graphql/queries'

const DashboardPage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<string>('0');
  const [activeSubTab, setActiveSubTab] = useState<string>('0');
  const [utcDate, setUtcDate] = useState<number>(new Date().getTime() + 60 * 60 * 1000 * 5.5);

  useEffect(() => {
    // Update utcDate when the component mounts or when dependencies change
    setUtcDate(new Date().getTime() + 60 * 60 * 1000 * 5.5);
  }, [activeTab, activeSubTab]); // Add any other dependencies as needed

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleSubTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveSubTab(newValue);
  };

  const { loading: overdueLoading, data: overdueData, error:overdueDataError } = useQuery(GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, {
    variables: { input: utcDate },
    skip: !utcDate,
  });

  const { loading: todayLoading, data: todayData, error: todayDataError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { input1: utcDate, input2: utcDate + (24 * 60 * 60 * 1000) },
      skip: !utcDate,
    });


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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeSubTab} onChange={handleSubTabChange}>
            <Tab label="OverDue" value="0" />
            <Tab label="Due Today" value="1" />
            <Tab label="Due Tomorrow" value="2" />
            <Tab label="Due Within Week" value="3" />
            <Tab label="Due in Month" value="4" />
            {/* Add more subtabs as needed */}
          </Tabs>
        </Box>

        <TabPanel value="0">        
        {overdueLoading ? <p>Loading...</p> : <AgGrid data={overdueData?.user_data_beforeInsuranceDueDate}/>}    
        </TabPanel>

        <TabPanel value="1">      
        {todayLoading ? <p>Loading...</p> : <AgGrid data={todayData?.user_data_betweenInsuranceDueDates}/>}  
        </TabPanel>     

      </TabPanel>



    </TabContext>
  );
};

export default DashboardPage;