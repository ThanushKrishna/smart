import { gql } from "@apollo/client";



export const GET_VEHICLE_CLASS = gql`
    query vehicle_class{
              VEHICLE_CLASS {
              id
              data_owner_id
              value
          }
}
`;
export const GET_CUSTOMER_TYPE = gql`
    query customer_type{
              CUSTOMER_TYPE {
              id
              data_owner_id
              value
          }
}
`;
export const GET_VEHICLE_DESCRIPTION = gql`
    query vehicle_description{
              VEHICLE_DESCRIPTION {
              id
              data_owner_id
              value
          }
}
`;
export const GET_SEATING_CAPACITY = gql`
    query seating_capacity{
              SEATING_CAPACITY {
              id
              data_owner_id
              value
          }
}
`;
export const GET_STANDING_CAPACITY = gql`
    query standing_capacity{
              STANDING_CAPACITY {
              id
              data_owner_id
              value
          }
}
`;

export const GET_RTO = gql`
    query rto{
              RTO {
              id
              data_owner_id
              value
          }
}
`;

export const GET_VEHICLE_COLORS = gql`
    query vehicle_color{
              VEHICLE_COLOR {
              id
              data_owner_id
              value
          }
}
`;

export const GET_VEHICLE_NORMS = gql`
    query vehice_norms{
              VEHICE_NORMS {
              id
              data_owner_id
              value
          }
}
`;
export const GET_CC = gql`
    query cc{
              CC {
              id
              data_owner_id
              value
          }
}
`;

export const GET_MAKE = gql`
    query make{
              MAKE {
              id
              data_owner_id
              value
          }
}
`;
export const GET_MODEL = gql`
    query model{
              MODEL {
              id
              data_owner_id
              value
          }
}
`;

export const GET_INSURANCE_PROVIDER = gql`
    query insurance_provider{
              INSURANCE_PROVIDER {
              id
              data_owner_id
              value
          }
}
`;
export const GET_PERMIT_CATEGORY = gql`
    query permit_category{
              PERMIT_CATEGORY {
              id
              data_owner_id
              value
          }
}
`;

export const GET_TP_INSURANCE_PROVIDER = gql`
    query tp_insurance_provider{
              TP_INSURANCE_PROVIDER {
              id
              data_owner_id
              value
          }
}
`;


export const GET_APP_USERS = gql`
    query App_user {
        app_user {
            userid
            firstname
            lastname
            emailid
            gender
            address {
                street
                city
                state
                zip
            }
            profile_pic
            mobile
            role
    }
  }
`;

export const GET_USER_DATA = gql`
  query user_data {
    user_data {
      id
    data_owner_id
    Vehicle_No
    Registered_Date
    RC_No
    Owner
    Owner_dob
    Ownership_type
    Vehicle_type
    Year_of_manufacuring
    GVW
    Chasis_No
    Engine_No
    FC_due_Date
    tax_due_Date
    Vehicle_color
    Vehice_norms
    Address {
      street
      city
      state
      zip
    }
    CC
    Make
    Model
    Insurance_provider
    Insurance_dueDate
    Policy_No
    Permit_No
    Permit_category
    Mobile_No1
    Mobile_No2
    Email_id
    Adhar_No
    Adhar_doc
    PanCard_No
    Pan_doc
    Nominee
    Nominee_dob
    Emission_dueDate
    Fuel_type
    Hypothecation_bank
    Hypothecation_city
    RTO
    Referred_by
    Comments
    Customer_type
    Martial_status
    TP_Insurance_provider
    TP_dueDate
    GST_No
    Insurance_type
    Mobile_No3          
    Nominee_Relationship
    Son_Wife_Daughter_Of
    Vehicle_Body        
    Wheel_Base          
    No_Of_Cylinder      
    Unladen_Weight      
    Sleeper_Capacity    
    PUCC_Emission_No    
    updated_by          
    TP_Policy_No        
    Insurance_Start     
    TP_Insurance_Start  
    Vehicle_Reg_Doc     
    OD_Policy_Doc       
    TP_Policy_Doc       
    GST_Cer_Doc      
    Vehicle_Description
    Seating_Capacity
    Standing_Capacity   
    createdAt
    updatedAt
    }
  }
`



export const GET_USER_DATA_BYID = gql`
query User_data_byid($vechicleId: String!) {
  user_data_byid(vechicle_id: $vechicleId) {
    id
    data_owner_id
    Vehicle_No
    RC_No
    Registered_Date
    Owner
    Owner_dob
    Ownership_type
    Vehicle_type
    Year_of_manufacuring
    GVW
    Chasis_No
    Engine_No
    FC_due_Date
    tax_due_Date
    Vehicle_color
    Vehice_norms
    Address {
      street
      city
      state
      zip
    }
    CC
    Make
    Model
    Insurance_provider
    Insurance_dueDate
    Policy_No
    Permit_No
    Permit_category
    Mobile_No1
    Mobile_No2
    Email_id
    Adhar_No
    Adhar_doc
    PanCard_No
    Pan_doc
    Nominee
    Nominee_dob
    Emission_dueDate
    Fuel_type
    Hypothecation_bank
    Hypothecation_city
    RTO
    Referred_by
    Comments
    Customer_type
    Martial_status
    TP_Insurance_provider
    TP_dueDate
    GST_No
    Insurance_type
    Mobile_No3
    Nominee_Relationship
    Son_Wife_Daughter_Of
    Vehicle_Body
    Wheel_Base
    No_Of_Cylinder
    Unladen_Weight
    Sleeper_Capacity
    PUCC_Emission_No
    updated_by
    TP_Policy_No
    Insurance_Start
    TP_Insurance_Start
    Vehicle_Reg_Doc
    OD_Policy_Doc
    TP_Policy_Doc
    GST_Cer_Doc
    Vehicle_Description
    Seating_Capacity
    Standing_Capacity
    createdAt
    updatedAt
  }
}
`
export const ADD_CLIENT = gql` 
    mutation CreateUserData($input: createUserDataInput!) {
     createUserData(input: $input) {
      data_owner_id
      Vehicle_No
      }
    }
`;

export const UPDATE_CLIENT = gql` 
    mutation UpdateUserData($input: updateUserDataInput!) {
      updateUserData(input: $input) {      
      Vehicle_No
      }
    }
`;

export const UPDATE_CLIENT_01 = gql` 
    mutation UpdateUserData_01($input: updateUserDataInput1!) {
      updateUserData1(input: $input)
    }
`;

export const UPDATE_CLIENT_02 = gql` 
    mutation UpdateUserData_02($input: updateUserDataInput2!) {
      updateUserData2(input: $input) 
    }
`;

export const UPDATE_CLIENT_03 = gql` 
    mutation UpdateUserData_03($input: updateUserDataInput3!) {
      updateUserData3(input: $input)
    }
`;

export const DELETE_CLIENT_BYID = gql` 
    mutation DeleteUserData($vehicleid: String!) {
      deleteUserData(vehicleid: $vehicleid)
    }
`;

export const ADD_VEHICLE_COLORS = gql` 
    mutation CreateVehicleColor($input: DDinput!) {
      createVehicleColor(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_VEHICE_NORMS = gql` 
    mutation CreateVehicleNorms($input: DDinput!) {
      createVehicleNorms(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_CC = gql` 
    mutation CreateCC($input: DDinput!) {
      createCC(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_MAKE = gql` 
    mutation CreateMake($input: DDinput!) {
      createMake(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_MODEL = gql` 
    mutation CreateModel($input: DDinput!) {
      createModel(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_INSURANCE_PROVIDER = gql` 
    mutation CreateInsuranceProvider($input: DDinput!) {
      createInsuranceProvider(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_PERMIT_CATEGORY = gql` 
    mutation CreatePermitCategory($input: DDinput!) {
      createPermitCategory(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_TP_INSURANCE_PROVIDER = gql` 
    mutation CreateTpInsuranceProvider($input: DDinput!) {
      createTpInsuranceProvider(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;


export const ADD_VEHICLE_CLASS = gql` 
    mutation CreateVehicleClass($input: DDinput!) {
      createVehicleClass(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;
export const ADD_CUSTOMER_TYPE = gql` 
    mutation CreateCustomerType($input: DDinput!) {
      createCustomerType(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;
export const ADD_VEHICLE_DESCRIPTION = gql` 
    mutation CreateVehicleDescription($input: DDinput!) {
      createVehicleDescription(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;
export const ADD_SEATING_CAPACITY = gql` 
    mutation CreateSeatingCapacity($input: DDinput!) {
      createSeatingCapacity(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;
export const ADD_STANDING_CAPACITY = gql` 
    mutation CreateStandingCapacity($input: DDinput!) {
      createStandingCapacity(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_RTO = gql` 
    mutation CreateRTO($input: DDinput!) {
      createRTO(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_DELETED_BLOBS = gql` 
    mutation CreateDeletedBlobs($input: DDinput!) {
      createDeletedBlobs(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const TEST_ADD_CLIENT = gql`
   mutation testaddclient($dataOwnerId: String!, $vehicleNo: String!, $rcNo: String) {
  testaddclient(data_owner_id: $dataOwnerId, Vehicle_No: $vehicleNo, RC_No: $rcNo)
}

`;