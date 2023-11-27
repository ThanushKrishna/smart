

export const typeDefs = `#graphql

############ Start of APP_USER Query ############
############ Start of APP_USER Query ############
############ Start of APP_USER Query ############

scalar Date

  enum GENDER {
    MALE
    FEMALE
  }

  enum ROLE {
    USER
    ADMIN
  }
  
  type Address{
    street: String
    city:   String
    state:  String
    zip:    String
  }

  type app_user {
    userid: ID!
    firstname: String
    lastname: String
    emailid: String!
    password: String!
    gender: GENDER
    address: Address
    profile_pic: String
    mobile: String
    role: ROLE
  }


############ Start of APP_USER Mutation ############
############ Start of APP_USER Mutation ############
############ Start of APP_USER Mutation ############

  input CreateAddressInput{
    street: String
    city:   String
    state:  String
    zip:    String
  }
  
  input CreateAppuserInput {
    firstname: String
    lastname: String
    emailid: String!
    password: String!
    gender: GENDER
    address: CreateAddressInput
    profile_pic: String
    mobile: String
    role: ROLE
  }

  type CreateAppuserOutput {
    firstname: String
    lastname: String
    emailid: String!
    gender: GENDER
    password: String!
    address: Address  
    profile_pic: String
    mobile: String
    role: ROLE
  }

  type replaceAppuserInput {
    firstname: String
    lastname: String
    gender: GENDER
    address: CreateAddressInput  
    profile_pic: String
    mobile: String
  }

  type replaceAppuserOutput {
    firstname: String
    lastname: String
    gender: GENDER
    address: Address  
    profile_pic: String
    mobile: String
  }

  input UpdateAppuserInput {
    lastname: String
  }

  input replaceAppuserInput {
    lastname: String
    firstname: String
  }

 


############ Start of APP_USER_DATA Query ############
############ Start of APP_USER_DATA Query ############
############ Start of APP_USER_DATA Query ############



type user_data {
  id:                    String!   
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          String
  Year_of_manufacuring:  Date
  GVW:                   String
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         String
  Vehice_norms:          String
  Address:               Address
  CC:                    String
  Make:                  String
  Model:                 String
  Insurance_provider:    String
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       String
  Mobile_No1:            String
  Mobile_No2:            String
  Email_id:              String
  Adhar_No:              String
  Adhar_doc:             String
  PanCard_No:            String
  Pan_doc:               String
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             String
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         String
  Martial_status:        String
  TP_Insurance_provider: String
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        String
  createdAt:             Date               
  updatedAt:             Date               
}


type VEHICLE_COLOR {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type VEHICE_NORMS {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type TP_INSURANCE_PROVIDER {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type CC {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type MAKE {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type MODEL {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type INSURANCE_PROVIDER {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type PERMIT_CATEGORY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type VEHICLE_CLASS {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}
type CUSTOMER_TYPE {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}
type VEHICLE_DESCRIPTION {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}
type SEATING_CAPACITY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}
type STANDING_CAPACITY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}
type RTO {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}


type Query {
    user_data: [user_data]    
    app_user: [app_user]
    VEHICLE_COLOR: [VEHICLE_COLOR]
    VEHICE_NORMS: [VEHICE_NORMS]
    CC: [CC]
    MAKE: [MAKE]
    MODEL: [MODEL]
    INSURANCE_PROVIDER: [INSURANCE_PROVIDER]
    PERMIT_CATEGORY: [PERMIT_CATEGORY]
    TP_INSURANCE_PROVIDER: [TP_INSURANCE_PROVIDER]
    VEHICLE_CLASS: [VEHICLE_CLASS]
    CUSTOMER_TYPE: [CUSTOMER_TYPE]
    VEHICLE_DESCRIPTION: [VEHICLE_DESCRIPTION]
    SEATING_CAPACITY: [SEATING_CAPACITY]
    STANDING_CAPACITY: [STANDING_CAPACITY]
    RTO: [RTO]
  }


############ Start of USER_DATA_MUTATION ############
############ Start of USER_DATA_MUTATION ############
############ Start of USER_DATA_MUTATION ############
############ Start of USER_DATA_MUTATION ############


input createUserDataInput { 
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          String
  Year_of_manufacuring:  Date
  GVW:                   String
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         String
  Vehice_norms:          String
  Address:               CreateAddressInput
  CC:                    String
  Make:                  String
  Model:                 String
  Insurance_provider:    String
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       String
  Mobile_No1:            String
  Mobile_No2:            String
  Email_id:              String
  Adhar_No:              String
  Adhar_doc:             String
  PanCard_No:            String
  Pan_doc:               String
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             String
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         String
  Martial_status:        String
  TP_Insurance_provider: String
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        String
}

input updateUserDataInput { 
  id:                    String!   
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          String
  Year_of_manufacuring:  Date
  GVW:                   String
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         String
  Vehice_norms:          String
  Address:               CreateAddressInput
  CC:                    String
  Make:                  String
  Model:                 String
  Insurance_provider:    String
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       String
  Mobile_No1:            String
  Mobile_No2:            String
  Email_id:              String
  Adhar_No:              String
  Adhar_doc:             String
  PanCard_No:            String
  Pan_doc:               String
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             String
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         String
  Martial_status:        String
  TP_Insurance_provider: String
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        String
}


type createUserDataOutput {  
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          String
  Year_of_manufacuring:  Date
  GVW:                   String
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         String
  Vehice_norms:          String
  CC:                    String
  Make:                  String
  Model:                 String
  Insurance_provider:    String
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       String
  Mobile_No1:            String
  Mobile_No2:            String
  Email_id:              String
  Adhar_No:              String
  Adhar_doc:             String
  PanCard_No:            String
  Pan_doc:               String
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             String
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         String
  Martial_status:        String
  TP_Insurance_provider: String
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        String          
}

type updateUserDataOutput {  
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          String
  Year_of_manufacuring:  Date
  GVW:                   String
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         String
  Vehice_norms:          String
  Address:               Address
  CC:                    String
  Make:                  String
  Model:                 String
  Insurance_provider:    String
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       String
  Mobile_No1:            String
  Mobile_No2:            String
  Email_id:              String
  Adhar_No:              String
  Adhar_doc:             String
  PanCard_No:            String
  Pan_doc:               String
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             String
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         String
  Martial_status:        String
  TP_Insurance_provider: String
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        String          
}

input TestaddClientinput {
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
}


input DDinput {
  data_owner_id:         String!    
  value:                 String!
}



  type Mutation{
    createVehicleClass(input: DDinput!): VEHICLE_CLASS
    createCustomerType(input: DDinput!): CUSTOMER_TYPE
    createVehicleDescription(input: DDinput!): VEHICLE_DESCRIPTION
    createSeatingCapacity(input: DDinput!): SEATING_CAPACITY
    createStandingCapacity(input: DDinput!): STANDING_CAPACITY
    createRTO(input: DDinput!): RTO
    createVehicleColor(input: DDinput!): VEHICLE_COLOR
    createVehicleNorms(input: DDinput!): VEHICE_NORMS
    createCC(input: DDinput!): CC
    createMake(input: DDinput!): MAKE
    createModel(input: DDinput!): MODEL
    createInsuranceProvider(input: DDinput!): INSURANCE_PROVIDER
    createPermitCategory(input: DDinput!): PERMIT_CATEGORY
    createTpInsuranceProvider(input: DDinput!): TP_INSURANCE_PROVIDER
    createUserData(input: createUserDataInput!): createUserDataOutput
    testaddclient(data_owner_id: String!, Vehicle_No: String!, RC_No: String ): String
    deleteUserData(id: ID!): String
    updateUserData(input: updateUserDataInput!): updateUserDataOutput
    CreateAppuser(input: CreateAppuserInput!): CreateAppuserOutput
    replaceAppuser(id: ID!, input: replaceAppuserInput!): replaceAppuserOutput
    deleteAppuser(id: ID!): String
    
  }

`;
