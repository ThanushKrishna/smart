import { app_user, user_data } from '@prisma/client';

export interface iappUser extends app_user{
    app_users: app_user[];
}


export  type tAddress = {
      street: String
      city:   String
      state:  String
      zip:    String
    }

export interface AddClientType {
    data_owner_id:         String!
    Vehicle_No:            String!  
    RC_No:                 String
    Registered_Date:       Date
    Owner:                 String
    Owner_dob:             Date
    Ownership_type:        String
    Vehicle_type:          String
    Year_of_manufacuring:  Date
    GVW:                   Int
    Chasis_No:             String
    Engine_No:             String
    FC_due_Date:       	   Date
    tax_due_Date:       	 Date
    Vehicle_color:         String
    Vehice_norms:          String
    Address:               tAddress
    CC:                    String
    Make:                  String
    Model:                 String
    Insurance_provider:    String
    Insurance_dueDate:     Date
    Policy_No:             String
    Permit_No:             String
    Permit_category:       String
    Mobile_No1:            Int
    Mobile_No2:            Int
    Mobile_No3:            Int
    Email_id:              String
    Adhar_No:              Int
    Adhar_doc:             Int
    PanCard_No:            String
    Pan_doc:               Int
    Nominee:               String
    Nominee_Relationship:  String
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
    Vehicle_Description:   String
    Seating_Capacity:      String
    Standing_Capacity:     String   
    Mobile_No3: 			     String
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
    Permit_No:             String   
    Insurance_Start:		   Date
    TP_Insurance_Start:		 Date
    Vehicle_Reg_Doc:	     String
    OD_Policy_Doc:         String
    TP_Policy_Doc:         String
    GST_Cer_Doc:           String
  }
  

  export interface TestAddClientType {
    data_owner_id:         String!
    Vehicle_No:            String!  
    RC_No:                 String
  }