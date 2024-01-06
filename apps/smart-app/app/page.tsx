"use client"
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Tabs, Tab, Box } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import AgGrid from '@/app/components/AgGrid'
import { GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, GET_USER_DATA_NA_INSURANCE_DUE_DATE }  from '@/graphql/queries'

const DashboardPage: React.FC = () => {

  const [activeTab, setActiveTab] = useState<string>('0');
  const [activeSubTab, setActiveSubTab] = useState<string>('0');
  //const [utcDate, setUtcDate] = useState<number>(new Date().getTime() + 60 * 60 * 1000 * 5.5);

  // new Date() gets today's Date in Server(IST) Timezone, .setHours(0, 0, 0, 0) provide the milliseconds of 12:00:00 am IST of today.
  // The setHours(0, 0, 0, 0) gives the millisecods in UTC timezone which is 5.5hrs backward. ie is 18:30 hrs UTC of yesterday.
  const [utcDate, setUtcDate] = useState<number>(new  Date().setHours(0, 0, 0, 0)  + 60 * 60 * 1000 * 5.5 );


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {    
    setActiveTab(newValue);
    setActiveSubTab('0');
  };

  const handleoDInsuranceTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveSubTab(newValue);
  };

    const { loading: overdueLoading, data: overdueData, error:overdueDataError } = useQuery(GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, {
    variables: { input: utcDate },
    skip: !utcDate,
  });
    const { loading: todayLoading, data: todayData, error: todayDataError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { input1: utcDate, input2: utcDate+1  },
      skip: !utcDate,
    });
    const { loading: tomorrowDueLoading, data: tomorrowDuedata, error: tomorrowDueError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate  + (24 * 60 * 60 * 1000) + 1 },
      skip: !utcDate,
    });
    const { loading: weekDueLoading, data: weekDuedata, error: weekDueDueError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate  + (7 * 24 * 60 * 60 * 1000) + 1 },
      skip: !utcDate,
    });
    const { loading: monthDueLoading, data: monthDuedata, error: monthDueError } = useQuery(GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, {
      variables: { input1: utcDate + (24 * 60 * 60 * 1000), input2: utcDate  + (30 * 24 * 60 * 60 * 1000) + 1 },
      skip: !utcDate,
    });

    const { loading: dueafterMonthLoading, data: dueafterMonthData, error:dueafterMonthError } = useQuery(GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, {
      variables: { input: utcDate  + (30 * 24 * 60 * 60 * 1000) },
      skip: !utcDate,
    });

    const { loading: dueNALoading, data: dueNAData, error:dueNAError } = useQuery(GET_USER_DATA_NA_INSURANCE_DUE_DATE);
    {dueNALoading && console.log(dueNAData)}
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
            <Tabs value={activeSubTab} onChange={handleoDInsuranceTabChange}>
              <Tab label="OverDue" value="0" />
              <Tab label="Due Today" value="1" />
              <Tab label="Due Tomorrow" value="2" />
              <Tab label="Due Within Week" value="3" />
              <Tab label="Due in Month" value="4" />            
              <Tab label="Due After Month" value="5" />    
              <Tab label="NA" value="6" />   
            </Tabs>
        </Box>

        <TabPanel value="0">
          {activeSubTab === '0' && (
            <div>            
              {overdueLoading ? <p>Loading...</p> : <AgGrid data={overdueData?.user_data_beforeInsuranceDueDate} />}
            </div>
          )}
                    
          {activeSubTab === '1' && (      
            <div>            
              {todayLoading ? <p>Loading...</p> : <AgGrid data={todayData?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}      

          {activeSubTab === '2' && (      
            <div>            
              {tomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={tomorrowDuedata?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}   

           {activeSubTab === '3' && (      
            <div>            
              {weekDueLoading ? <p>Loading...</p> : <AgGrid data={weekDuedata?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}  

           {activeSubTab === '4' && (      
            <div>            
              {monthDueLoading ? <p>Loading...</p> : <AgGrid data={monthDuedata?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}    

          {activeSubTab === '5' && (      
            <div>            
              {dueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={dueafterMonthData?.user_data_afterInsuranceDueDate} />}
            </div>
          )}     

        {activeSubTab === '6' && (      
            <div>            
              {dueNALoading ? <p>Loading...</p> : <AgGrid data={dueNAData?.user_data_NaInsuranceDueDate} />}
            </div>
          )}     
        </TabPanel>
      
      
      
      </TabPanel>    

          

                    
    </TabContext>
  );
};

export default DashboardPage;