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

export const GET_HYPOTHECATION_CITY = gql`
    query HYPOTHECATION_CITY {
              HYPOTHECATION_CITY {
              id
              data_owner_id
              value
  }
}
`;

export const GET_HYPOTHECATION_BANK = gql`
    query HYPOTHECATION_BANK {
              HYPOTHECATION_BANK {
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
    Vehicle_Kind
    Gender
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
    Permit_dueDate
    CAddress {
      street
      city
      state
      zip
    }
    Prospect
    photo_links
    Nominee_Doc
    createdAt
    updatedAt
    }
  }
`;


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
    Vehicle_Kind
    Gender
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
    Permit_dueDate
    CAddress {
      street
      city
      state
      zip
    }
    Prospect
    photo_links
    Nominee_Doc
    createdAt
    updatedAt
  }
}
`;


export const GET_MAKE_BY_VALUE = gql`
    query MAKE_BY_VALUE($input: String!) {
      MAKE_BY_VALUE(input: $input) {
        id
        data_owner_id
        value
  }
}
`;

export const GET_VEHICLE_COLOR_BY_VALUE = gql`
  query VEHICLE_COLOR_BY_VALUE($input: String!) {
    VEHICLE_COLOR_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_VEHICLE_NORMS_BY_VALUE = gql`
  query VEHICLE_NORMS_BY_VALUE($input: String!) {
    VEHICLE_NORMS_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_CC_BY_VALUE = gql`
  query CC_BY_VALUE($input: String!) {
    CC_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_MODEL_BY_VALUE = gql`
  query MODEL_BY_VALUE($input: String!) {
    MODEL_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_INSURANCE_PROVIDER_BY_VALUE = gql`
  query INSURANCE_PROVIDER_BY_VALUE($input: String!) {
    INSURANCE_PROVIDER_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_PERMIT_CATEGORY_BY_VALUE = gql`
  query PERMIT_CATEGORY_BY_VALUE($input: String!) {
    PERMIT_CATEGORY_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_TP_INSURANCE_PROVIDER_BY_VALUE = gql`
  query TP_INSURANCE_PROVIDER_BY_VALUE($input: String!) {
    TP_INSURANCE_PROVIDER_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_VEHICLE_CLASS_BY_VALUE = gql`
  query VEHICLE_CLASS_BY_VALUE($input: String!) {
    VEHICLE_CLASS_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_CUSTOMER_TYPE_BY_VALUE = gql`
  query CUSTOMER_TYPE_BY_VALUE($input: String!) {
    CUSTOMER_TYPE_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_VEHICLE_DESCRIPTION_BY_VALUE = gql`
  query VEHICLE_DESCRIPTION_BY_VALUE($input: String!) {
    VEHICLE_DESCRIPTION_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_SEATING_CAPACITY_BY_VALUE = gql`
  query SEATING_CAPACITY_BY_VALUE($input: String!) {
    SEATING_CAPACITY_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_STANDING_CAPACITY_BY_VALUE = gql`
  query STANDING_CAPACITY_BY_VALUE($input: String!) {
    STANDING_CAPACITY_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_RTO_BY_VALUE = gql`
  query RTO_BY_VALUE($input: String!) {
    RTO_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_HYPOTHECATION_BANK_BY_VALUE = gql`
  query HYPOTHECATION_BANK_BY_VALUE($input: String!) {
    HYPOTHECATION_BANK_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_HYPOTHECATION_CITY_BY_VALUE = gql`
  query HYPOTHECATION_CITY_BY_VALUE($input: String!) {
    HYPOTHECATION_CITY_BY_VALUE(input: $input) {
      id      
      data_owner_id
      value
    }
  }
`;

export const GET_UNLADEN_WEIGHT_BY_VALUE = gql`
  query UNLADEN_WEIGHT_BY_VALUE($input: String!) {
    UNLADEN_WEIGHT_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_GVW_BY_VALUE = gql`
  query GVW_BY_VALUE($input: String!) {
    GVW_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_VEHICLE_BODY_BY_VALUE = gql`
  query VEHICLE_BODY_BY_VALUE($input: String!) {
    VEHICLE_BODY_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_WHEEL_BASE_BY_VALUE = gql`
  query WHEEL_BASE_BY_VALUE($input: String!) {
    WHEEL_BASE_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_NO_OF_CYLINDER_BY_VALUE = gql`
  query NO_OF_CYLINDER_BY_VALUE($input: String!) {
    NO_OF_CYLINDER_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_SLEEPER_CAPACITY_BY_VALUE = gql`
  query SLEEPER_CAPACITY_BY_VALUE($input: String!) {
    SLEEPER_CAPACITY_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_UPDATED_BY_BY_VALUE = gql`
  query UPDATED_BY_BY_VALUE($input: String!) {
    UPDATED_BY_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const GET_REFERRED_BY_BY_VALUE = gql`
  query REFERRED_BY_BY_VALUE($input: String!) {
    REFERRED_BY_BY_VALUE(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

// Dashboard Queries

export const GET_USER_DATA_BEFORE_INSURANCE_DUE_DATE = gql`
query User_data_beforeInsuranceDueDate($input: Date!) {
  user_data_beforeInsuranceDueDate(input: $input) {
    id
    data_owner_id
    Vehicle_No
    RC_No
    Registered_Date
    Owner
    Owner_dob
    Ownership_type
    Vehicle_type
    Vehicle_Kind
    Gender
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
    Permit_dueDate
    CAddress {
      street
      city
      state
      zip
    }
    Prospect
    photo_links
    Nominee_Doc
    createdAt
    updatedAt
  }
}
`;



export const GET_USER_DATA_BETWEEN_INSURANCE_DUE_DATES = gql`
query User_data_betweenInsuranceDueDates($input1: Date!, $input2: Date!) {
  user_data_betweenInsuranceDueDates(input1: $input1, input2: $input2) {
    id
    data_owner_id
    Vehicle_No
    RC_No
    Registered_Date
    Owner
    Owner_dob
    Ownership_type
    Vehicle_type
    Vehicle_Kind
    Gender
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
    Permit_dueDate
    CAddress {
      street
      city
      state
      zip
    }
    Prospect
    photo_links
    Nominee_Doc
    createdAt
    updatedAt
  }
}
`;


export const GET_USER_DATA_AFTER_INSURANCE_DUE_DATE = gql`
query User_data_afterInsuranceDueDate($input: Date!) {
  user_data_afterInsuranceDueDate(input: $input) {
    id
    data_owner_id
    Vehicle_No
    RC_No
    Registered_Date
    Owner
    Owner_dob
    Ownership_type
    Vehicle_type
    Vehicle_Kind
    Gender
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
    Permit_dueDate
    CAddress {
      street
      city
      state
      zip
    }
    Prospect
    photo_links
    Nominee_Doc
    createdAt
    updatedAt
  }
}
`;


export const CHECK_VEHICLE_UNIQUE = gql` 
  query checkvehicleNoUniqueness($VechicleId: String!) {
  CheckvehicleNoUniqueness(vechicle_id: $VechicleId)
}
`;


export const ADD_CLIENT = gql` 
    mutation CreateUserData($input: createUserDataInput!) {
     createUserData(input: $input) {
      data_owner_id
      Vehicle_No
      }
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

export const ADD_HYPOTHECATION_CITY = gql` 
    mutation CreateHypothecationCity($input: DDinput!) {
      createHypothecationCity(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_HYPOTHECATION_BANK = gql` 
    mutation CreateHypothecationBank($input: DDinput!) {
      createHypothecationBank(input: $input) {
        id
        data_owner_id
        value
      }
    }
`;

export const ADD_UNLADEN_WEIGHT = gql`
  mutation CreateUnladenWeight($input: DDinput!) {
    createUnladenWeight(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_GVW = gql`
  mutation CreateGvw($input: DDinput!) {
    createGvw(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_VEHICLE_BODY = gql`
  mutation CreateVehicleBody($input: DDinput!) {
    createVehicleBody(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_WHEEL_BASE = gql`
  mutation CreateWheelBase($input: DDinput!) {
    createWheelBase(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_NO_OF_CYLINDER = gql`
  mutation CreateNoOfCylinder($input: DDinput!) {
    createNoOfCylinder(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_SLEEPER_CAPACITY = gql`
  mutation CreateSleeperCapacity($input: DDinput!) {
    createSleeperCapacity(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_UPDATED_BY = gql`
  mutation CreateUpdatedBy($input: DDinput!) {
    createUpdatedBy(input: $input) {
      id
      data_owner_id
      value
    }
  }
`;

export const ADD_REFERRED_BY = gql`
  mutation CreateReferredBy($input: DDinput!) {
    createReferredBy(input: $input) {
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


export const UPDATE_CLIENT = gql` 
    mutation UpdateUserData($input: updateUserDataInput!) {
      updateUserData(input: $input)
  }
`;

// export const UPDATE_CLIENT_01 = gql` 
//     mutation UpdateUserData_01($input: updateUserDataInput1!) {
//       updateUserData1(input: $input)
//     }
// `;

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

export const UPDATE_MAKE = gql` 
    mutation UpdateMake($input: DDUpdateInput!) {
      updateMake(input: $input)
}
`;

export const UPDATE_VEHICLE_COLOR = gql`
  mutation UpdateVehicleColor($input: DDUpdateInput!) {
    updateVehicleColor(input: $input)
  }
`;

export const UPDATE_VEHICLE_NORMS = gql`
  mutation UpdateVehicleNorms($input: DDUpdateInput!) {
    updateVehicleNorms(input: $input)
  }
`;

export const UPDATE_CC = gql`
  mutation UpdateCC($input: DDUpdateInput!) {
    updateCC(input: $input)
  }
`;

export const UPDATE_MODEL = gql`
  mutation UpdateModel($input: DDUpdateInput!) {
    updateModel(input: $input)
  }
`;

export const UPDATE_INSURANCE_PROVIDER = gql`
  mutation UpdateInsuranceProvider($input: DDUpdateInput!) {
    updateInsuranceProvider(input: $input)
  }
`;

export const UPDATE_PERMIT_CATEGORY = gql`
  mutation UpdatePermitCategory($input: DDUpdateInput!) {
    updatePermitCategory(input: $input)
  }
`;

export const UPDATE_TP_INSURANCE_PROVIDER = gql`
  mutation UpdateTpInsuranceProvider($input: DDUpdateInput!) {
    updateTpInsuranceProvider(input: $input)
  }
`;

export const UPDATE_VEHICLE_CLASS = gql`
  mutation UpdateVehicleClass($input: DDUpdateInput!) {
    updateVehicleClass(input: $input)
  }
`;

export const UPDATE_CUSTOMER_TYPE = gql`
  mutation UpdateCustomerType($input: DDUpdateInput!) {
    updateCustomerType(input: $input)
  }
`;

export const UPDATE_VEHICLE_DESCRIPTION = gql`
  mutation UpdateVehicleDescription($input: DDUpdateInput!) {
    updateVehicleDescription(input: $input)
  }
`;

export const UPDATE_SEATING_CAPACITY = gql`
  mutation UpdateSeatingCapacity($input: DDUpdateInput!) {
    updateSeatingCapacity(input: $input)
  }
`;

export const UPDATE_STANDING_CAPACITY = gql`
  mutation UpdateStandingCapacity($input: DDUpdateInput!) {
    updateStandingCapacity(input: $input)
  }
`;

export const UPDATE_RTO = gql`
  mutation UpdateRTO($input: DDUpdateInput!) {
    updateRTO(input: $input)
  }
`;

export const UPDATE_HYPOTHECATION_BANK = gql`
  mutation UpdateHypothecationBank($input: DDUpdateInput!) {
    updateHypothecationBank(input: $input)
  }
`;

export const UPDATE_HYPOTHECATION_CITY = gql`
  mutation UpdateHypothecationCity($input: DDUpdateInput!) {
    updateHypothecationCity(input: $input)
  }
`;

export const UPDATE_UNLADEN_WEIGHT = gql`
  mutation UpdateUnladenWeight($input: DDUpdateInput!) {
    updateUnladenWeight(input: $input)
  }
`;

export const UPDATE_GVW = gql`
  mutation UpdateGvw($input: DDUpdateInput!) {
    updateGvw(input: $input)
  }
`;

export const UPDATE_VEHICLE_BODY = gql`
  mutation UpdateVehicleBody($input: DDUpdateInput!) {
    updateVehicleBody(input: $input)
  }
`;

export const UPDATE_WHEEL_BASE = gql`
  mutation UpdateWheelBase($input: DDUpdateInput!) {
    updateWheelBase(input: $input)
  }
`;

export const UPDATE_NO_OF_CYLINDER = gql`
  mutation UpdateNoOfCylinder($input: DDUpdateInput!) {
    updateNoOfCylinder(input: $input)
  }
`;

export const UPDATE_SLEEPER_CAPACITY = gql`
  mutation UpdateSleeperCapacity($input: DDUpdateInput!) {
    updateSleeperCapacity(input: $input)
  }
`;

export const UPDATE_UPDATED_BY = gql`
  mutation UpdateUpdatedBy($input: DDUpdateInput!) {
    updateUpdatedBy(input: $input)
  }
`;

export const UPDATE_REFERRED_BY = gql`
  mutation UpdateReferredBy($input: DDUpdateInput!) {
    updateReferredBy(input: $input)
  }
`;






export const DELETE_CLIENT_BYID = gql` 
    mutation DeleteUserData($vehicleid: String!) {
      deleteUserData(vehicleid: $vehicleid)
    }
`;



export const DELETE_MAKEDATA = gql` 
    mutation DeleteMakeData($id: ID!) {
      deleteMakeData(id: $id)
}
`;

export const DELETE_VEHICLE_COLOR_DATA = gql`
  mutation DeleteVehicleColorData($id: ID!) {
    deleteVehicleColorData(id: $id)
  }
`;

export const DELETE_VEHICLE_NORMS_DATA = gql`
  mutation DeleteVehicleNormsData($id: ID!) {
    deleteVehicleNormsData(id: $id)
  }
`;

export const DELETE_CC_DATA = gql`
  mutation DeleteCCData($id: ID!) {
    deleteCCData(id: $id)
  }
`;

export const DELETE_MODEL_DATA = gql`
  mutation DeleteModelData($id: ID!) {
    deleteModelData(id: $id)
  }
`;

export const DELETE_INSURANCE_PROVIDER_DATA = gql`
  mutation DeleteInsuranceProviderData($id: ID!) {
    deleteInsuranceProviderData(id: $id)
  }
`;

export const DELETE_PERMIT_CATEGORY_DATA = gql`
  mutation DeletePermitCategoryData($id: ID!) {
    deletePermitCategoryData(id: $id)
  }
`;

export const DELETE_TP_INSURANCE_PROVIDER_DATA = gql`
  mutation DeleteTpInsuranceProviderData($id: ID!) {
    deleteTpInsuranceProviderData(id: $id)
  }
`;

export const DELETE_VEHICLE_CLASS_DATA = gql`
  mutation DeleteVehicleClassData($id: ID!) {
    deleteVehicleClassData(id: $id)
  }
`;

export const DELETE_CUSTOMER_TYPE_DATA = gql`
  mutation DeleteCustomerTypeData($id: ID!) {
    deleteCustomerTypeData(id: $id)
  }
`;

export const DELETE_VEHICLE_DESCRIPTION_DATA = gql`
  mutation DeleteVehicleDescriptionData($id: ID!) {
    deleteVehicleDescriptionData(id: $id)
  }
`;

export const DELETE_SEATING_CAPACITY_DATA = gql`
  mutation DeleteSeatingCapacityData($id: ID!) {
    deleteSeatingCapacityData(id: $id)
  }
`;

export const DELETE_STANDING_CAPACITY_DATA = gql`
  mutation DeleteStandingCapacityData($id: ID!) {
    deleteStandingCapacityData(id: $id)
  }
`;

export const DELETE_RTO_DATA = gql`
  mutation DeleteRTOData($id: ID!) {
    deleteRTOData(id: $id)
  }
`;

export const DELETE_HYPOTHECATION_BANK_DATA = gql`
  mutation DeleteHypothecationBankData($id: ID!) {
    deleteHypothecationBankData(id: $id)
  }
`;

export const DELETE_HYPOTHECATION_CITY_DATA = gql`
  mutation DeleteHypothecationCityData($id: ID!) {
    deleteHypothecationCityData(id: $id)
  }
`;

export const DELETE_UNLADEN_WEIGHT_DATA = gql`
  mutation DeleteUnladenWeightData($id: ID!) {
    deleteUnladenWeightData(id: $id)
  }
`;

export const DELETE_GVW_DATA = gql`
  mutation DeleteGvwData($id: ID!) {
    deleteGvwData(id: $id)
  }
`;

export const DELETE_VEHICLE_BODY_DATA = gql`
  mutation DeleteVehicleBodyData($id: ID!) {
    deleteVehicleBodyData(id: $id)
  }
`;

export const DELETE_WHEEL_BASE_DATA = gql`
  mutation DeleteWheelBaseData($id: ID!) {
    deleteWheelBaseData(id: $id)
  }
`;

export const DELETE_NO_OF_CYLINDER_DATA = gql`
  mutation DeleteNoOfCylinderData($id: ID!) {
    deleteNoOfCylinderData(id: $id)
  }
`;

export const DELETE_SLEEPER_CAPACITY_DATA = gql`
  mutation DeleteSleeperCapacityData($id: ID!) {
    deleteSleeperCapacityData(id: $id)
  }
`;

export const DELETE_UPDATED_BY_DATA = gql`
  mutation DeleteUpdatedByData($id: ID!) {
    deleteUpdatedByData(id: $id)
  }
`;

export const DELETE_REFERRED_BY_DATA = gql`
  mutation DeleteReferredByData($id: ID!) {
    deleteReferredByData(id: $id)
  }
`;