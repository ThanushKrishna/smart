import { gql } from "@apollo/client";

enum VEHICLE_TYPE {
    X,
    Y
  }
  
  enum VEHICLE_COLOR {
    X,
    Y
  }
  
  enum VEHICE_NORMS {
    X,
    Y
  }
  
  enum CC {
    X,
    Y
  }
  
  enum MAKE {
    X,
    Y
  }
  
  enum MODEL {
    X,
    Y
  }
  
  enum INSURANCE_PROVIDER {
    X,
    Y
  }
  
  enum PERMIT_CATEGORY {
    X,
    Y
  }
  
  enum FUEL_TYPE {
    X,
    Y
  }
  
  enum CUSTOMER_TYPE {
    X,
    Y
  }
  
  enum MARTIAL_STATUS {
    X,
    Y
  }
  
  enum TP_INSURANCE_PROVIDER {
    X,
    Y
  }
  
  enum INSURANCE_TYPE {
    X,
    Y
  }
  
  type Address = {
      street: String
      city:   String
      state:  String
      zip:    String
    }

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

export const TEST_ADD_CLIENT = gql`
   mutation testaddclient($dataOwnerId: String!, $vehicleNo: String!, $rcNo: String) {
  testaddclient(data_owner_id: $dataOwnerId, Vehicle_No: $vehicleNo, RC_No: $rcNo)
}

`;