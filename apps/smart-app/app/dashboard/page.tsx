"use client"
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Tabs, Tab, Box } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import AgGrid from '../components/AgGrid';
import { GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES, GET_USER_DATA_NA_INSURANCE_DUE_DATE }  from '../../graphql/queries';
import { GET_USER_DATA_BEFORE_TP_INSURANCE_DUE_DATE, GET_USER_DATA_AFTER_TP_INSURANCE_DUE_DATE, GET_USER_DATA_BETWEEN_TP_INSURANCE_DUE_DATES, GET_USER_DATA_NA_TP_INSURANCE_DUE_DATE } from '../../graphql/queries';
import { GET_USER_DATA_BEFORE_EMISSION_DUE_DATE, GET_USER_DATA_AFTER_EMISSION_DUE_DATE, GET_USER_DATA_BETWEEN_EMISSION_DUE_DATES, GET_USER_DATA_NA_EMISSION_DUE_DATE } from '../../graphql/queries';
import { GET_USER_DATA_BEFORE_TAX_DUE_DATE, GET_USER_DATA_AFTER_TAX_DUE_DATE, GET_USER_DATA_BETWEEN_TAX_DUE_DATES, GET_USER_DATA_NA_TAX_DUE_DATE } from '../../graphql/queries';
import { GET_USER_DATA_BEFORE_FC_DUE_DATE, GET_USER_DATA_AFTER_FC_DUE_DATE, GET_USER_DATA_BETWEEN_FC_DUE_DATES, GET_USER_DATA_NA_FC_DUE_DATE } from '../../graphql/queries';
import { GET_USER_DATA_BEFORE_PERMIT_DUE_DATE, GET_USER_DATA_AFTER_PERMIT_DUE_DATE, GET_USER_DATA_BETWEEN_PERMIT_DUE_DATES, GET_USER_DATA_NA_PERMIT_DUE_DATE } from '../../graphql/queries';
import withAuth from '../middleware/withAuth';
import { getUserFromCookie } from '../../utils/auth';


const DashboardPage: React.FC = () => {

  const [userId, setUserId] = useState('');
  useEffect(() => {        
      const decodedToken = getUserFromCookie();        
      if(decodedToken  && typeof decodedToken === 'object' ){
          //console.log('userid from token:' +  decodedToken.userid);
          setUserId(decodedToken.userid);
      }
    }, []);

  const [activeTab, setActiveTab] = useState<string>('0');
  const [activeOdInssuranceTab, setActiveOdInssurancTab] = useState<string>('0');
  const [activeTpInssuranceTab, setActiveTpInsuranceTab] = useState<string>('0');
  const [activeEmissionTab, setActiveEmissionTab] = useState<string>('0');
  const [activeFCTab, setActiveFCTab] = useState<string>('0');
  const [activePermitTab, setActivePermitTab] = useState<string>('0');
  const [activeTaxTab, setActiveTaxTab] = useState<string>('0');
  //const [utcDate, setUtcDate] = useState<number>(new Date().getTime() + 60 * 60 * 1000 * 5.5);

  // new Date() gets today's Date in Server(IST) Timezone, .setHours(0, 0, 0, 0) provide the milliseconds of 12:00:00 am IST of today.
  // The setHours(0, 0, 0, 0) gives the millisecods in UTC timezone which is 5.5hrs backward. ie is 18:30 hrs UTC of yesterday.
  const [utcDate, setUtcDate] = useState<number>(new  Date().setHours(0, 0, 0, 0)  + 60 * 60 * 1000 * 5.5 );


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {    
    setActiveTab(newValue);
    setActiveOdInssurancTab('0');
    setActiveTpInsuranceTab('0');
    setActiveEmissionTab('0');
    setActiveFCTab('0');
    setActiveTaxTab('0');
    setActivePermitTab('0')
  };


  //OD Insurance Queries
  //OD Insurance Queries
  //OD Insurance Queries
  //OD Insurance Queries
  const handleoDInsuranceTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveOdInssurancTab(newValue);
  };

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
const handletPInsuranceTabChange = (event: React.SyntheticEvent, newValue: string) => {
  setActiveTpInsuranceTab(newValue);
};

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
const handleEmissionTabChange = (event: React.SyntheticEvent, newValue: string) => {
  setActiveEmissionTab(newValue);
};

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
const handleTaxTabChange = (event: React.SyntheticEvent, newValue: string) => {
  setActiveTaxTab(newValue);
};

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
const handleFCTabChange = (event: React.SyntheticEvent, newValue: string) => {
  setActiveFCTab(newValue);
};

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
const handlePermitTabChange = (event: React.SyntheticEvent, newValue: string) => {
  setActivePermitTab(newValue);
};

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


  return (
    <div>
    <TabContext value={activeTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="TP Insurance" value="0" />
          <Tab label="OD Insurance" value="1" />
          <Tab label="PUC/Emission" value="2" />
          <Tab label="Tax" value="3" />
          <Tab label="REG/FC" value="4" />
          <Tab label="Permit" value="5" />
        </Tabs>
      </Box>
     
      <TabPanel value="0">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={activeTpInssuranceTab} onChange={handletPInsuranceTabChange}>
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
    {activeTpInssuranceTab === '0' && (
      <div>
        {tpOverdueLoading ? <p>Loading...</p> : <AgGrid data={tpOverdueData?.user_data_beforeTPInsuranceDueDate} />}        
      </div>
    )}

    {activeTpInssuranceTab === '1' && (
      <div>
        {tpTodayLoading ? <p>Loading...</p> : <AgGrid data={tpTodayData?.user_data_betweenTPInsuranceDueDates} />}
      </div>
    )}

    {activeTpInssuranceTab === '2' && (
      <div>
        {tpTomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={tpTomorrowDuedata?.user_data_betweenTPInsuranceDueDates} />}
      </div>
    )}

    {activeTpInssuranceTab === '3' && (
      <div>
        {tpWeekDueLoading ? <p>Loading...</p> : <AgGrid data={tpWeekDuedata?.user_data_betweenTPInsuranceDueDates} />}
      </div>
    )}

    {activeTpInssuranceTab === '4' && (
      <div>
        {tpMonthDueLoading ? <p>Loading...</p> : <AgGrid data={tpMonthDuedata?.user_data_betweenTPInsuranceDueDates} />}
      </div>
    )}

    {activeTpInssuranceTab === '5' && (
      <div>
        {tpDueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={tpDueafterMonthData?.user_data_afterTPInsuranceDueDate} />}
      </div>
    )}

    {activeTpInssuranceTab === '6' && (
      <div>
        {tpDueNALoading ? <p>Loading...</p> : <AgGrid data={tpDueNAData?.user_data_NaTPInsuranceDueDate} />}
      </div>
    )}
  </TabPanel>
  </TabPanel>


      <TabPanel value="1">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeOdInssuranceTab} onChange={handleoDInsuranceTabChange}>
              <Tab label="OverDue" value="0" />
              <Tab label="Due Today" value="1" />
              <Tab label="Due Tomorrow" value="2" />
              <Tab label="Due Within Week" value="3" />
              <Tab label="Due in Month" value="4" />            
              <Tab label="Due After Month" value="5" />    
              <Tab label="NA" value="6" />   
            </Tabs>
        </Box>

        <TabPanel value="1">
          {activeOdInssuranceTab === '0' && (
            <div>            
              {overdueLoading ? <p>Loading...</p> : <AgGrid data={overdueData?.user_data_beforeInsuranceDueDate} />}
            </div>
          )}
                    
          {activeOdInssuranceTab === '1' && (      
            <div>            
              {todayLoading ? <p>Loading...</p> : <AgGrid data={todayData?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}      

          {activeOdInssuranceTab === '2' && (      
            <div>            
              {tomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={tomorrowDuedata?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}   

           {activeOdInssuranceTab === '3' && (      
            <div>            
              {weekDueLoading ? <p>Loading...</p> : <AgGrid data={weekDuedata?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}  

           {activeOdInssuranceTab === '4' && (      
            <div>            
              {monthDueLoading ? <p>Loading...</p> : <AgGrid data={monthDuedata?.user_data_betweenInsuranceDueDates} />}
            </div>
          )}    

          {activeOdInssuranceTab === '5' && (      
            <div>            
              {dueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={dueafterMonthData?.user_data_afterInsuranceDueDate} />}
            </div>
          )}     

          {activeOdInssuranceTab === '6' && (      
            <div>            
              {dueNALoading ? <p>Loading...</p> : <AgGrid data={dueNAData?.user_data_NaInsuranceDueDate} />}
            </div>
          )}     
        </TabPanel>      
      </TabPanel>    

    

<TabPanel value="2">
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={activeEmissionTab} onChange={handleEmissionTabChange}>
      <Tab label="OverDue" value="0" />
      <Tab label="Due Today" value="1" />
      <Tab label="Due Tomorrow" value="2" />
      <Tab label="Due Within Week" value="3" />
      <Tab label="Due in Month" value="4" />
      <Tab label="Due After Month" value="5" />
      <Tab label="NA" value="6" />
    </Tabs>
  </Box>

  <TabPanel value="2">
    {activeEmissionTab === '0' && (
      <div>
        {emissionOverdueLoading ? <p>Loading...</p> : <AgGrid data={emissionOverdueData?.user_data_beforeEmissionDueDate} />}
      </div>
    )}

    {activeEmissionTab === '1' && (
      <div>
        {emissionTodayLoading ? <p>Loading...</p> : <AgGrid data={emissionTodayData?.user_data_betweenEmissionDueDates} />}
      </div>
    )}

    {activeEmissionTab === '2' && (
      <div>
        {emissionTomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={emissionTomorrowDuedata?.user_data_betweenEmissionDueDates} />}
      </div>
    )}

    {activeEmissionTab === '3' && (
      <div>
        {emissionWeekDueLoading ? <p>Loading...</p> : <AgGrid data={emissionWeekDuedata?.user_data_betweenEmissionDueDates} />}
      </div>
    )}

    {activeEmissionTab === '4' && (
      <div>
        {emissionMonthDueLoading ? <p>Loading...</p> : <AgGrid data={emissionMonthDuedata?.user_data_betweenEmissionDueDates} />}
      </div>
    )}

    {activeEmissionTab === '5' && (
      <div>
        {emissionDueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={emissionDueafterMonthData?.user_data_afterEmissionDueDate} />}
      </div>
    )}

    {activeEmissionTab === '6' && (
      <div>
        {emissionDueNALoading ? <p>Loading...</p> : <AgGrid data={emissionDueNAData?.user_data_NaEmissionDueDate} />}
      </div>
    )}
  </TabPanel>
</TabPanel>


         <TabPanel value="3">
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={activeTaxTab} onChange={handleTaxTabChange}>
      <Tab label="OverDue" value="0" />
      <Tab label="Due Today" value="1" />
      <Tab label="Due Tomorrow" value="2" />
      <Tab label="Due Within Week" value="3" />
      <Tab label="Due in Month" value="4" />
      <Tab label="Due After Month" value="5" />
      <Tab label="NA" value="6" />
    </Tabs>
  </Box>

  <TabPanel value="3">
    {activeTaxTab === '0' && (
      <div>
        {taxOverdueLoading ? <p>Loading...</p> : <AgGrid data={taxOverdueData?.user_data_beforeTaxDueDate} />}
      </div>
    )}

    {activeTaxTab === '1' && (
      <div>
        {taxTodayLoading ? <p>Loading...</p> : <AgGrid data={taxTodayData?.user_data_betweenTaxDueDates} />}
      </div>
    )}

    {activeTaxTab === '2' && (
      <div>
        {taxTomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={taxTomorrowDuedata?.user_data_betweenTaxDueDates} />}
      </div>
    )}

    {activeTaxTab === '3' && (
      <div>
        {taxWeekDueLoading ? <p>Loading...</p> : <AgGrid data={taxWeekDuedata?.user_data_betweenTaxDueDates} />}
      </div>
    )}

    {activeTaxTab === '4' && (
      <div>
        {taxMonthDueLoading ? <p>Loading...</p> : <AgGrid data={taxMonthDuedata?.user_data_betweenTaxDueDates} />}
      </div>
    )}

    {activeTaxTab === '5' && (
      <div>
        {taxDueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={taxDueafterMonthData?.user_data_afterTaxDueDate} />}
      </div>
    )}

    {activeTaxTab === '6' && (
      <div>
        {taxDueNALoading ? <p>Loading...</p> : <AgGrid data={taxDueNAData?.user_data_NaTaxDueDate} />}
      </div>
    )}
  </TabPanel>
</TabPanel> 

<TabPanel value="4">
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={activeFCTab} onChange={handleFCTabChange}>
      <Tab label="OverDue" value="0" />
      <Tab label="Due Today" value="1" />
      <Tab label="Due Tomorrow" value="2" />
      <Tab label="Due Within Week" value="3" />
      <Tab label="Due in Month" value="4" />
      <Tab label="Due After Month" value="5" />
      <Tab label="NA" value="6" />
    </Tabs>
  </Box>

  <TabPanel value="4">
    {activeFCTab === '0' && (
      <div>
        {fcOverdueLoading ? <p>Loading...</p> : <AgGrid data={fcOverdueData?.user_data_beforeFCDueDate} />}
      </div>
    )}

    {activeFCTab === '1' && (
      <div>
        {fcTodayLoading ? <p>Loading...</p> : <AgGrid data={fcTodayData?.user_data_betweenFCDueDates} />}
      </div>
    )}

    {activeFCTab === '2' && (
      <div>
        {fcTomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={fcTomorrowDuedata?.user_data_betweenFCDueDates} />}
      </div>
    )}

    {activeFCTab === '3' && (
      <div>
        {fcWeekDueLoading ? <p>Loading...</p> : <AgGrid data={fcWeekDuedata?.user_data_betweenFCDueDates} />}
      </div>
    )}

    {activeFCTab === '4' && (
      <div>
        {fcMonthDueLoading ? <p>Loading...</p> : <AgGrid data={fcMonthDuedata?.user_data_betweenFCDueDates} />}
      </div>
    )}

    {activeFCTab === '5' && (
      <div>
        {fcDueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={fcDueafterMonthData?.user_data_afterFCDueDate} />}
      </div>
    )}

    {activeFCTab === '6' && (
      <div>
        {fcDueNALoading ? <p>Loading...</p> : <AgGrid data={fcDueNAData?.user_data_NaFCDueDate} />}
      </div>
    )}
  </TabPanel>
</TabPanel>
      
<TabPanel value="5">
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={activePermitTab} onChange={handlePermitTabChange}>
      <Tab label="OverDue" value="0" />
      <Tab label="Due Today" value="1" />
      <Tab label="Due Tomorrow" value="2" />
      <Tab label="Due Within Week" value="3" />
      <Tab label="Due in Month" value="4" />
      <Tab label="Due After Month" value="5" />
      <Tab label="NA" value="6" />
    </Tabs>
  </Box>

  <TabPanel value="5">
    {activePermitTab === '0' && (
      <div>
        {permitOverdueLoading ? <p>Loading...</p> : <AgGrid data={permitOverdueData?.user_data_beforePermitDueDate} />}
      </div>
    )}

    {activePermitTab === '1' && (
      <div>
        {permitTodayLoading ? <p>Loading...</p> : <AgGrid data={permitTodayData?.user_data_betweenPermitDueDates} />}
      </div>
    )}

    {activePermitTab === '2' && (
      <div>
        {permitTomorrowDueLoading ? <p>Loading...</p> : <AgGrid data={permitTomorrowDuedata?.user_data_betweenPermitDueDates} />}
      </div>
    )}

    {activePermitTab === '3' && (
      <div>
        {permitWeekDueLoading ? <p>Loading...</p> : <AgGrid data={permitWeekDuedata?.user_data_betweenPermitDueDates} />}
      </div>
    )}

    {activePermitTab === '4' && (
      <div>
        {permitMonthDueLoading ? <p>Loading...</p> : <AgGrid data={permitMonthDuedata?.user_data_betweenPermitDueDates} />}
      </div>
    )}

    {activePermitTab === '5' && (
      <div>
        {permitDueafterMonthLoading ? <p>Loading...</p> : <AgGrid data={permitDueafterMonthData?.user_data_afterPermitDueDate} />}
      </div>
    )}

    {activePermitTab === '6' && (
      <div>
        {permitDueNALoading ? <p>Loading...</p> : <AgGrid data={permitDueNAData?.user_data_NaPermitDueDate} />}
      </div>
    )}
  </TabPanel>
</TabPanel>
                    
    </TabContext>
    </div>
  );
};

export default withAuth(DashboardPage);