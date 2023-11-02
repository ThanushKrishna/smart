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

export const ADD_CLIENT = gql`
    mutation addClient ($DATA_OWNER_ID: String!, $Vehicle_No: String!, $RC_No: String, $Registered_Date: Date, $Owner: String, $Owner_dob: Date, $Ownership_type: String, $Vehicle_type: VEHICLE_TYPE, 
    $Year_of_manufacuring: Date, $GVW: Int, $Chasis_No: String, $Engine_No: String, $FC_due_Date: Date, $tax_due_Date: Date, $Vehicle_color: VEHICLE_COLOR, $Vehice_norms: VEHICE_NORMS, 
    $Address: Address, $CC: CC, $Make: MAKE, $Model: MODEL, $Insurance_provider: NSURANCE_PROVIDER, $Insurance_dueDate: Date, $Policy_No: String, $Permit_No: String, 
    $Permit_category: PERMIT_CATEGORY, $Mobile_No1: Int, $Mobile_No2: Int, $Email_id: String, $Adhar_No: Int, $Adhar_doc: Int, $PanCard_No: String, $Pan_doc: Int, 
    $Nominee: String, $Nominee_dob: Date, $Emission_dueDate: Date, $Fuel_type: FUEL_TYPE, $Hypothecation_bank: String, $Hypothecation_city: String, $RTO: String, 
    $Referred_by: String, $Comments: String, $Customer_type: CUSTOMER_TYPE, $Martial_status: MARTIAL_STATUS, $TP_Insurance_provider: TP_INSURANCE_PROVIDER, $TP_dueDate: Date, 
    $GST_No: String, $Insurance_type: INSURANCE_TYPE)
            {
                addClient(DATA_OWNER_ID: $DATA_OWNER_ID, VEHICLE_NO: $VEHICLE_NO, RC_NO: $RC_NO, REGISTERED_DATE: $REGISTERED_DATE, OWNER: $OWNER, OWNER_DOB: $OWNER_DOB, OWNERSHIP_TYPE: $OWNERSHIP_TYPE, 
                VEHICLE_TYPE: $VEHICLE_TYPE, YEAR_OF_MANUFACURING: $YEAR_OF_MANUFACURING, GVW: $GVW, CHASIS_NO: $CHASIS_NO, ENGINE_NO: $ENGINE_NO, FC_DUE_DATE: $FC_DUE_DATE, TAX_DUE_DATE: $TAX_DUE_DATE, 
                VEHICLE_COLOR: $VEHICLE_COLOR, VEHICLE_NORMS: $VEHICLE_NORMS, ADDRESS: $ADDRESS, CC: $CC, MAKE: $MAKE, MODEL: $MODEL, INSURANCE_PROVIDER: $INSURANCE_PROVIDER, INSURANCE_DUEDATE: $INSURANCE_DUEDATE, 
                POLICY_NO: $POLICY_NO, PERMIT_NO: $PERMIT_NO, PERMIT_CATEGORY: $PERMIT_CATEGORY, MOBILE_NO1: $MOBILE_NO1, MOBILE_NO2: $MOBILE_NO2, EMAIL_ID: $EMAIL_ID, ADHAR_NO: $ADHAR_NO, ADHAR_DOC: $ADHAR_DOC, 
                PANCARD_NO: $PANCARD_NO, PAN_DOC: $PAN_DOC, NOMINEE: $NOMINEE, NOMINEE_DOB: $NOMINEE_DOB, EMISSION_DUEDATE: $EMISSION_DUEDATE, FUEL_TYPE: $FUEL_TYPE, HYPOTHECATION_BANK: $HYPOTHECATION_BANK, 
                HYPOTHECATION_CITY: $HYPOTHECATION_CITY, RTO: $RTO, REFERRED_BY: $REFERRED_BY, CUSTOMER_TYPE: $CUSTOMER_TYPE, MARTIAL_STATUS: $MARTIAL_STATUS, TP_INSURANCE_PROVIDER: $TP_INSURANCE_PROVIDER, 
                TP_DUEDATE: $TP_DUEDATE, GST_NO: $GST_NO, INSURANCE_TYPE: $INSURANCE_TYPE, COMMENTS: $COMMENTS)
                {
                    Vehicle_No
                    RC_No            
                    }
            }

`;