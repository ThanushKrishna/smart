import { app_user, user_data } from '@prisma/client';

export interface iappUser extends app_user{
    app_users: app_user[];
}

export interface AddClientType {
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
  