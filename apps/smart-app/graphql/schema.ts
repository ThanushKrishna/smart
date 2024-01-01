

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
  Mobile_No3:            String
  Nominee_Relationship:  String
  Son_Wife_Daughter_Of:  String
  Vehicle_Body:          String
  Wheel_Base:            String
  No_Of_Cylinder:        String
  Unladen_Weight:        String
  Sleeper_Capacity:      String
  PUCC_Emission_No:      String
  updated_by:            String
  TP_Policy_No:          String
  Insurance_Start:       Date
  TP_Insurance_Start:    Date
  Vehicle_Reg_Doc:       String
  OD_Policy_Doc:         String
  TP_Policy_Doc:         String
  GST_Cer_Doc:           String
  Vehicle_Description:   String
  Seating_Capacity:      String
  Standing_Capacity:     String   
  Permit_dueDate:        Date
  CAddress:              Address
  Prospect:              String
  Vehicle_Kind:          String
  Gender:                String
  photo_links:           String
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

type HYPOTHECATION_CITY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type HYPOTHECATION_BANK {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}
type DELETED_BLOBS {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type UNLADEN_WEIGHT {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type GVW {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type VEHICLE_BODY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type WHEEL_BASE {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type NO_OF_CYLINDER {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type SLEEPER_CAPACITY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type UPDATED_BY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}



type REFERRED_BY {
  id:                    String!
  data_owner_id:         String!    
  value:                 String!
}

type Query {
    user_data: [user_data]    
    app_user: [app_user]
    CheckvehicleNoUniqueness(vechicle_id: String!): Boolean
    user_data_byid(vechicle_id: String!): user_data
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
    HYPOTHECATION_CITY: [HYPOTHECATION_CITY]
    HYPOTHECATION_BANK: [HYPOTHECATION_BANK]
    DELETED_BLOBS: [DELETED_BLOBS]
    UNLADEN_WEIGHT: [UNLADEN_WEIGHT]
    GVW: [GVW]
    VEHICLE_BODY: [VEHICLE_BODY]
    WHEEL_BASE: [WHEEL_BASE]
    NO_OF_CYLINDER: [NO_OF_CYLINDER]
    SLEEPER_CAPACITY: [SLEEPER_CAPACITY]
    UPDATED_BY: [UPDATED_BY]
    REFERRED_BY: [REFERRED_BY]

    MAKE_BY_VALUE(input: String!): [MAKE]
    VEHICLE_COLOR_BY_VALUE(input: String!): [VEHICLE_COLOR]
    VEHICLE_NORMS_BY_VALUE(input: String!): [VEHICE_NORMS]
    CC_BY_VALUE(input: String!): [CC]
    MODEL_BY_VALUE(input: String!): [MODEL]
    INSURANCE_PROVIDER_BY_VALUE(input: String!): [INSURANCE_PROVIDER]
    PERMIT_CATEGORY_BY_VALUE(input: String!): [PERMIT_CATEGORY]
    TP_INSURANCE_PROVIDER_BY_VALUE(input: String!): [TP_INSURANCE_PROVIDER]
    VEHICLE_CLASS_BY_VALUE(input: String!): [VEHICLE_CLASS]
    CUSTOMER_TYPE_BY_VALUE(input: String!): [CUSTOMER_TYPE]
    VEHICLE_DESCRIPTION_BY_VALUE(input: String!): [VEHICLE_DESCRIPTION]
    SEATING_CAPACITY_BY_VALUE(input: String!): [SEATING_CAPACITY]
    STANDING_CAPACITY_BY_VALUE(input: String!): [STANDING_CAPACITY]
    RTO_BY_VALUE(input: String!): [RTO]
    HYPOTHECATION_BANK_BY_VALUE(input: String!): [HYPOTHECATION_BANK]
    HYPOTHECATION_CITY_BY_VALUE(input: String!): [HYPOTHECATION_CITY]
    UNLADEN_WEIGHT_BY_VALUE(input: String!): [UNLADEN_WEIGHT]
    GVW_BY_VALUE(input: String!): [GVW]
    VEHICLE_BODY_BY_VALUE(input: String!): [VEHICLE_BODY]
    WHEEL_BASE_BY_VALUE(input: String!): [WHEEL_BASE]
    NO_OF_CYLINDER_BY_VALUE(input: String!): [NO_OF_CYLINDER]
    SLEEPER_CAPACITY_BY_VALUE(input: String!): [SLEEPER_CAPACITY]
    UPDATED_BY_BY_VALUE(input: String!): [UPDATED_BY]
    REFERRED_BY_BY_VALUE(input: String!): [REFERRED_BY]
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
  Vehicle_Kind:          String
  Gender:                String
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
  Mobile_No3:            String
  Nominee_Relationship:  String
  Son_Wife_Daughter_Of:  String
  Vehicle_Body:          String
  Wheel_Base:            String
  No_Of_Cylinder:        String
  Unladen_Weight:        String
  Sleeper_Capacity:      String
  PUCC_Emission_No:      String
  updated_by:            String
  TP_Policy_No:          String
  Insurance_Start:       Date
  TP_Insurance_Start:    Date
  Vehicle_Reg_Doc:       String
  OD_Policy_Doc:         String
  TP_Policy_Doc:         String
  GST_Cer_Doc:           String
  Vehicle_Description:   String
  Seating_Capacity:      String
  Standing_Capacity:     String   
  Permit_dueDate:        Date
  photo_links:           String
  CAddress:              CreateAddressInput
  Prospect:              String
}

input updateUserDataInput { 
  id:                    String!   
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Vehicle_Kind:          String
  Gender:                String
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
  Mobile_No3:            String
  Nominee_Relationship:  String
  Son_Wife_Daughter_Of:  String
  Vehicle_Body:          String
  Wheel_Base:            String
  No_Of_Cylinder:        String
  Unladen_Weight:        String
  Sleeper_Capacity:      String
  PUCC_Emission_No:      String
  updated_by:            String
  TP_Policy_No:          String
  Insurance_Start:       Date
  TP_Insurance_Start:    Date
  Vehicle_Reg_Doc:       String
  OD_Policy_Doc:         String
  TP_Policy_Doc:         String
  GST_Cer_Doc:           String
  Vehicle_Description:   String
  Seating_Capacity:      String
  Standing_Capacity:     String   
  Permit_dueDate:        Date
  CAddress:              CreateAddressInput
  photo_links:           String
  Prospect:              String
}

input updateUserDataInput1 {
id:                    	String!
Vehicle_Reg_Doc:   	   	String
Owner:                 	String
Ownership_type:         String
Vehicle_Kind:          String
Gender:                String
Son_Wife_Daughter_Of:  	String
RC_No:                 	String
Chasis_No:             	String
Engine_No:             	String
Make:             		String
Model:             		String
Registered_Date:       	Date
tax_due_Date:       	Date
Vehicle_type:           String
Vehicle_Description:    String
Fuel_type:             	String
Vehice_norms:           String
Vehicle_color:          String
Seating_Capacity:       String
Standing_Capacity:      String
Hypothecation_bank:     String
Hypothecation_city:     String
}

input updateUserDataInput2 {
id:                    	String!
Insurance_type:        	String
Policy_No:             	String
OD_Policy_Doc:         	String
Insurance_provider:    	String
Insurance_Start:       	Date
Insurance_dueDate:     	Date
TP_Policy_No:          	String
TP_Policy_Doc:         	String
TP_Insurance_provider: 	String
TP_Insurance_Start:    	Date
TP_dueDate:       		Date
RTO:             		String
Unladen_Weight:         String
GVW:             		String
Vehicle_Body:           String
Wheel_Base:             String
No_Of_Cylinder:         String
Sleeper_Capacity:       String
}


input updateUserDataInput3 {
id:                    	String!
Owner_dob:      		Date
Martial_status:         String
Year_of_manufacuring:   Date
FC_due_Date: 			Date
CC:             		String
Permit_No:             	String
Permit_category:        String
Permit_dueDate:        Date  
Mobile_No1:             String
Mobile_No2:             String
Mobile_No3:             String
Email_id:             	String
Adhar_No:             	String
Adhar_doc:             String
PanCard_No:             String
Pan_doc:             	String
Nominee:             	String
Nominee_Relationship:   String
Nominee_dob: 			Date
PUCC_Emission_No:       String
Emission_dueDate:       Date
GST_No:               	String
GST_Cer_Doc:            String
Address:              	CreateAddressInput
CAddress:               CreateAddressInput
Prospect:               String
Referred_by:            String
updated_by:             String
Customer_type:          String
Comments:             	String
photo_links:           String
}



type createUserDataOutput {  
  data_owner_id:         String!
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_Kind:          String
  Gender:                String
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
  Mobile_No3:            String
  Nominee_Relationship:  String
  Son_Wife_Daughter_Of:  String
  Vehicle_Body:          String
  Wheel_Base:            String
  No_Of_Cylinder:        String
  Unladen_Weight:        String
  Sleeper_Capacity:      String
  PUCC_Emission_No:      String
  updated_by:            String
  TP_Policy_No:          String
  Insurance_Start:       Date
  TP_Insurance_Start:    Date
  Vehicle_Reg_Doc:       String
  OD_Policy_Doc:         String
  TP_Policy_Doc:         String
  GST_Cer_Doc:           String  
  Vehicle_Description:   String
  Seating_Capacity:      String
  Standing_Capacity:     String      
  Permit_dueDate:        Date
  CAddress:              Address
  Prospect:              String  
  photo_links:           String  
}

type updateUserDataOutput {  
  Vehicle_No:            String!  
  RC_No:                 String
  Registered_Date:       Date
  Owner:                 String
  Owner_dob:             Date
  Ownership_type:        String
  Vehicle_Kind:          String
  Gender:                String
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
  Mobile_No3:            String
  Nominee_Relationship:  String
  Son_Wife_Daughter_Of:  String
  Vehicle_Body:          String
  Wheel_Base:            String
  No_Of_Cylinder:        String
  Unladen_Weight:        String
  Sleeper_Capacity:      String
  PUCC_Emission_No:      String
  updated_by:            String
  TP_Policy_No:          String
  Insurance_Start:       Date
  TP_Insurance_Start:    Date
  Vehicle_Reg_Doc:       String
  OD_Policy_Doc:         String
  TP_Policy_Doc:         String
  GST_Cer_Doc:           String  
  Vehicle_Description:   String
  Seating_Capacity:      String
  Standing_Capacity:     String   
  Permit_dueDate:        Date
  CAddress:              Address
  Prospect:              String  
  photo_links:           String         
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

input DDUpdateInput {
  id:                    String!    
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
    createHypothecationCity(input:DDinput!): HYPOTHECATION_CITY
    createHypothecationBank(input:DDinput!): HYPOTHECATION_BANK
    createUnladenWeight(input: DDinput!): UNLADEN_WEIGHT
    createGvw(input: DDinput!): GVW
    createVehicleBody(input: DDinput!): VEHICLE_BODY
    createWheelBase(input: DDinput!): WHEEL_BASE
    createNoOfCylinder(input: DDinput!): NO_OF_CYLINDER
    createSleeperCapacity(input: DDinput!): SLEEPER_CAPACITY
    createUpdatedBy(input: DDinput!): UPDATED_BY
    createReferredBy(input: DDinput!): REFERRED_BY
    createDeletedBlobs(input: DDinput!): DELETED_BLOBS
    createUserData(input: createUserDataInput!): createUserDataOutput
    testaddclient(data_owner_id: String!, Vehicle_No: String!, RC_No: String ): String
    CreateAppuser(input: CreateAppuserInput!): CreateAppuserOutput


    updateUserData(input: updateUserDataInput!): updateUserDataOutput
    updateUserData1(input: updateUserDataInput1!): String
    updateUserData2(input: updateUserDataInput2!): String
    updateUserData3(input: updateUserDataInput3!): String
    replaceAppuser(id: ID!, input: replaceAppuserInput!): replaceAppuserOutput
    updateMake(input: DDUpdateInput!): String
    updateVehicleColor(input: DDUpdateInput!): String
    updateVehicleNorms(input: DDUpdateInput!): String
    updateCC(input: DDUpdateInput!): String
    updateModel(input: DDUpdateInput!): String
    updateInsuranceProvider(input: DDUpdateInput!): String
    updatePermitCategory(input: DDUpdateInput!): String
    updateTpInsuranceProvider(input: DDUpdateInput!): String
    updateVehicleClass(input: DDUpdateInput!): String
    updateCustomerType(input: DDUpdateInput!): String
    updateVehicleDescription(input: DDUpdateInput!): String
    updateSeatingCapacity(input: DDUpdateInput!): String
    updateStandingCapacity(input: DDUpdateInput!): String
    updateRTO(input: DDUpdateInput!): String
    updateHypothecationBank(input: DDUpdateInput!): String
    updateHypothecationCity(input: DDUpdateInput!): String
    updateUnladenWeight(input: DDUpdateInput!): String
    updateGvw(input: DDUpdateInput!): String
    updateVehicleBody(input: DDUpdateInput!): String
    updateWheelBase(input: DDUpdateInput!): String
    updateNoOfCylinder(input: DDUpdateInput!): String
    updateSleeperCapacity(input: DDUpdateInput!): String
    updateUpdatedBy(input: DDUpdateInput!): String
    updateReferredBy(input: DDUpdateInput!): String
    
    deleteAppuser(id: ID!): String    
    deleteUserData(vehicleid: String!): String
    deleteMakeData(id: ID!): String
    deleteVehicleColorData(id: ID!): String
    deleteVehicleNormsData(id: ID!): String
    deleteCCData(id: ID!): String
    deleteModelData(id: ID!): String
    deleteInsuranceProviderData(id: ID!): String
    deletePermitCategoryData(id: ID!): String
    deleteTpInsuranceProviderData(id: ID!): String
    deleteVehicleClassData(id: ID!): String
    deleteCustomerTypeData(id: ID!): String
    deleteVehicleDescriptionData(id: ID!): String
    deleteSeatingCapacityData(id: ID!): String
    deleteStandingCapacityData(id: ID!): String
    deleteRTOData(id: ID!): String
    deleteHypothecationBankData(id: ID!): String
    deleteHypothecationCityData(id: ID!): String
    deleteUnladenWeightData(id: ID!): String
    deleteGvwData(id: ID!): String
    deleteVehicleBodyData(id: ID!): String
    deleteWheelBaseData(id: ID!): String
    deleteNoOfCylinderData(id: ID!): String
    deleteSleeperCapacityData(id: ID!): String
    deleteUpdatedByData(id: ID!): String
    deleteReferredByData(id: ID!): String
  }

`;
