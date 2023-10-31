

export const typeDefs = `#graphql

############ Start of APP_USER Query ############
############ Start of APP_USER Query ############
############ Start of APP_USER Query ############

scalar Date

  type Event {
    id: Int
    date: Date!
  }

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
    profile_pic: Int
    mobile: Int
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
    profile_pic: Int
    mobile: Int
    role: ROLE
  }

  type CreateAppuserOutput {
    firstname: String
    lastname: String
    emailid: String!
    gender: GENDER
    password: String!
    address: Address  
    profile_pic: Int
    mobile: Int
    role: ROLE
  }

  type replaceAppuserInput {
    firstname: String
    lastname: String
    gender: GENDER
    address: CreateAddressInput  
    profile_pic: Int
    mobile: Int
  }

  type replaceAppuserOutput {
    firstname: String
    lastname: String
    gender: GENDER
    address: Address  
    profile_pic: Int
    mobile: Int
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

enum VEHICLE_TYPE {
  X
  Y
}

enum VEHICLE_COLOR {
  X
  Y
}

enum VEHICE_NORMS {
  X
  Y
}

enum CC {
  X
  Y
}

enum MAKE {
  X
  Y
}

enum MODEL {
  X
  Y
}

enum INSURANCE_PROVIDER {
  X
  Y
}

enum PERMIT_CATEGORY {
  X
  Y
}

enum FUEL_TYPE {
  X
  Y
}

enum CUSTOMER_TYPE {
  X
  Y
}

enum MARTIAL_STATUS {
  X
  Y
}

enum TP_INSURANCE_PROVIDER {
  X
  Y
}

enum INSURANCE_TYPE {
  X
  Y
}

type Address{
    street: String
    city:   String
    state:  String
    zip:    String
  }

type user_data {
  id:                    String!   
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          VEHICLE_TYPE
  Year_of_manufacuring:  Date
  GVW:                   Int
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         VEHICLE_COLOR
  Vehice_norms:          VEHICE_NORMS
  Address:               Address
  CC:                    CC
  Make:                  MAKE
  Model:                 MODEL
  Insurance_provider:    INSURANCE_PROVIDER
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       PERMIT_CATEGORY
  Mobile_No1:            Int
  Mobile_No2:            Int
  Email_id:              String
  Adhar_No:              Int
  Adhar_doc:             Int
  PanCard_No:            String
  Pan_doc:               Int
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             FUEL_TYPE
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         CUSTOMER_TYPE
  Martial_status:        MARTIAL_STATUS
  TP_Insurance_provider: TP_INSURANCE_PROVIDER
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        INSURANCE_TYPE
  createdAt:             Date               
  updatedAt:             Date               
}


type Query {
    user_data: [user_data]    
    app_user: [app_user]
    event: [Event]
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
  Vehicle_type:          VEHICLE_TYPE
  Year_of_manufacuring:  Date
  GVW:                   Int
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         VEHICLE_COLOR
  Vehice_norms:          VEHICE_NORMS
  Address:               CreateAddressInput
  CC:                    CC
  Make:                  MAKE
  Model:                 MODEL
  Insurance_provider:    INSURANCE_PROVIDER
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       PERMIT_CATEGORY
  Mobile_No1:            Int
  Mobile_No2:            Int
  Email_id:              String
  Adhar_No:              Int
  Adhar_doc:             Int
  PanCard_No:            String
  Pan_doc:               Int
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             FUEL_TYPE
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         CUSTOMER_TYPE
  Martial_status:        MARTIAL_STATUS
  TP_Insurance_provider: TP_INSURANCE_PROVIDER
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        INSURANCE_TYPE
}


type createUserDataOutput {  
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_type:          VEHICLE_TYPE
  Year_of_manufacuring:  Date
  GVW:                   Int
  Chasis_No:             String
  Engine_No:             String
  FC_due_Date:       	   Date
  tax_due_Date:       	 Date
  Vehicle_color:         VEHICLE_COLOR
  Vehice_norms:          VEHICE_NORMS
  Address:               Address
  CC:                    CC
  Make:                  MAKE
  Model:                 MODEL
  Insurance_provider:    INSURANCE_PROVIDER
  Insurance_dueDate:     Date
  Policy_No:             String
  Permit_No:             String
  Permit_category:       PERMIT_CATEGORY
  Mobile_No1:            Int
  Mobile_No2:            Int
  Email_id:              String
  Adhar_No:              Int
  Adhar_doc:             Int
  PanCard_No:            String
  Pan_doc:               Int
  Nominee:               String
  Nominee_dob:           Date
  Emission_dueDate:      Date
  Fuel_type:             FUEL_TYPE
  Hypothecation_bank:    String
  Hypothecation_city:    String
  RTO:                   String
  Referred_by:           String
  Comments:              String
  Customer_type:         CUSTOMER_TYPE
  Martial_status:        MARTIAL_STATUS
  TP_Insurance_provider: TP_INSURANCE_PROVIDER
  TP_dueDate:            Date
  GST_No:                String
  Insurance_type:        INSURANCE_TYPE          
}


  type Mutation{
    createUserData(input: createUserDataInput!): createUserDataOutput
    deleteUserData(id: ID!): String
    CreateAppuser(input: CreateAppuserInput!): CreateAppuserOutput
    UpdateAppuser(ID: ID!, input: UpdateAppuserInput!): String
    replaceAppuser(ID: ID!, input: replaceAppuserInput!): replaceAppuserOutput
    deleteAppuser(id: ID!): String
    createEvent(id: Int!, dt:Date!): String
    
  }


`;
