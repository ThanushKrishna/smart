import { gql } from "@apollo/client";



export const GET_VEHICLE_COLORS = gql`
    query vehicle_color{
              VEHICLE_COLOR {
              id
              data_owner_id
              value
          }
}
`;


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

export const TEST_ADD_CLIENT = gql`
   mutation testaddclient($dataOwnerId: String!, $vehicleNo: String!, $rcNo: String) {
  testaddclient(data_owner_id: $dataOwnerId, Vehicle_No: $vehicleNo, RC_No: $rcNo)
}

`;