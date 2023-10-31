import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();
import { GraphQLScalarType, Kind } from 'graphql';

const app_users = prisma.app_user.findMany({});
const user_data = prisma.user_data.findMany({});

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    console.log("serialize Block")
    console.log(value)
    if (value instanceof Date) {      
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    console.log("parseValue Block")
    console.log(value)
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    console.log("parseLiteral Block")
    console.log(ast)
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

export const resolvers = {
  
  Date: dateScalar,

  Query: {
    app_user: () => app_users,
    user_data: () => user_data,

  },


  Mutation: {

    CreateAppuser: async (_, { input: { emailid, firstname, lastname, password, mobile, address:{ street, city, state, zip}, gender, profile_pic, role } }) => {
      console.log("this is Createuser block");
      const res = { emailid, firstname, lastname, password, mobile, address: { street, city, state, zip}, gender, profile_pic, role};
      console.log({ res });
      await prisma.app_user.create({
        data: {
          emailid: emailid,
          firstname: firstname,
          lastname: lastname,
          password: password,
          mobile: mobile,
          address: {
            street,
            city,
            state,
            zip
          },
          role: role,
          profile_pic: profile_pic,
          gender: gender
        },
      });
      return res;
    },

    UpdateAppuser: async (_, { ID, input: { lastname } }) => {
      console.log("this is updateAppuser block");
      const res = { lastname };
      console.log({ ID, res });
      await prisma.app_user.update({
        where: { userid: ID },
        data: { lastname: lastname },
      });
      return "Done";
    },

    replaceAppuser: async (_, { ID, input: { firstname, lastname, mobile, address:{ street, city, state, zip}, gender, profile_pic } }) => {
      console.log("this is replaceAppuser block");
      const res = { firstname, lastname,  mobile, address: { street, city, state, zip}, gender, profile_pic};
      console.log({ res });
      await prisma.app_user.update({
        where: { userid: ID },
        data: {
          firstname: firstname,
          lastname: lastname,
          mobile: mobile,
          address: {
            street,
            city,
            state,
            zip
          },
          profile_pic: profile_pic,
          gender: gender
        },
      })      
      return res;
    },

    deleteAppuser: async (_, { id }) => {
      console.log("this is deleteAppuser block");
      const res = { id };
      console.log({ id, res });
      const delteduser = await prisma.app_user.delete({
        where: { userid: id },
        select: {
          emailid: true,
        },
      });
      return "Done";
    },

    createUserData: async (_, { input: { Vehicle_No, data_owner_id, RC_No, Registered_Date, Owner, Owner_dob, Ownership_type, Address:{ street, city, state, zip}, Vehicle_type, Year_of_manufacuring, GVW, Chasis_No, Engine_No, FC_due_Date, tax_due_Date, Vehicle_color, Vehice_norms, CC, Make, Model, Insurance_provider, Insurance_dueDate, Policy_No, Permit_No, Permit_category, Mobile_No1, Mobile_No2, Email_id, Adhar_No, Adhar_doc, PanCard_No, Pan_doc, Nominee, Nominee_dob, Emission_dueDate, Fuel_type, Hypothecation_bank, Hypothecation_city, RTO, Referred_by, Comments, Customer_type, Martial_status, TP_Insurance_provider, TP_dueDate, GST_No, Insurance_type } }) => {
      console.log("this is CreateUserData block");
      const res = { Vehicle_No, data_owner_id, RC_No, Registered_Date, Owner, Owner_dob, Ownership_type, Address:{ street, city, state, zip},Vehicle_type, Year_of_manufacuring, GVW, Chasis_No, Engine_No, FC_due_Date, tax_due_Date, Vehicle_color, Vehice_norms, CC, Make, Model, Insurance_provider, Insurance_dueDate, Policy_No, Permit_No, Permit_category, Mobile_No1, Mobile_No2, Email_id, Adhar_No, Adhar_doc, PanCard_No, Pan_doc, Nominee, Nominee_dob, Emission_dueDate, Fuel_type, Hypothecation_bank, Hypothecation_city, RTO, Referred_by, Comments, Customer_type, Martial_status, TP_Insurance_provider, TP_dueDate, GST_No, Insurance_type };
      console.log(res);
      const result = await prisma.user_data.create({
        data: {
          Vehicle_No,   
          data_owner_id,                 
          RC_No,
          Registered_Date,          	
          Owner,                 
          Owner_dob,    
          Ownership_type, 
          Address: {
            street,
            city,
            state,
            zip
          },                
          Vehicle_type,          
          Year_of_manufacuring,  
          GVW,                   
          Chasis_No,             
          Engine_No,  
          FC_due_Date,
          tax_due_Date,
          Vehicle_color,         
          Vehice_norms,                     
          CC,                    
          Make,                  
          Model,                 
          Insurance_provider,    
          Insurance_dueDate,  
          Policy_No,             
          Permit_No,             
          Permit_category,       
          Mobile_No1,            
          Mobile_No2,            
          Email_id,              
          Adhar_No,              
          Adhar_doc,             
          PanCard_No,            
          Pan_doc,               
          Nominee,               
          Nominee_dob,  
          Emission_dueDate,              
          Fuel_type,             
          Hypothecation_bank,    
          Hypothecation_city,    
          RTO,                   
          Referred_by,           
          Comments,              
          Customer_type,         
          Martial_status,        
          TP_Insurance_provider,  
          TP_dueDate,          
          GST_No,                
          Insurance_type,
        },       
      })
      return res;
    },
  
    updateUserData: async (_, { input: { id, Vehicle_No, RC_No, Registered_Date, Owner, Owner_dob, Ownership_type, Address:{ street, city, state, zip}, Vehicle_type, Year_of_manufacuring, GVW, Chasis_No, Engine_No, FC_due_Date, tax_due_Date, Vehicle_color, Vehice_norms, CC, Make, Model, Insurance_provider, Insurance_dueDate, Policy_No, Permit_No, Permit_category, Mobile_No1, Mobile_No2, Email_id, Adhar_No, Adhar_doc, PanCard_No, Pan_doc, Nominee, Nominee_dob, Emission_dueDate, Fuel_type, Hypothecation_bank, Hypothecation_city, RTO, Referred_by, Comments, Customer_type, Martial_status, TP_Insurance_provider, TP_dueDate, GST_No, Insurance_type } }) => {
      console.log("this is updateUserdata block");
      const res = {  Vehicle_No, RC_No, Registered_Date, Owner, Owner_dob, Ownership_type, Address:{ street, city, state, zip}, Vehicle_type, Year_of_manufacuring, GVW, Chasis_No, Engine_No, FC_due_Date, tax_due_Date, Vehicle_color, Vehice_norms, CC, Make, Model, Insurance_provider, Insurance_dueDate, Policy_No, Permit_No, Permit_category, Mobile_No1, Mobile_No2, Email_id, Adhar_No, Adhar_doc, PanCard_No, Pan_doc, Nominee, Nominee_dob, Emission_dueDate, Fuel_type, Hypothecation_bank, Hypothecation_city, RTO, Referred_by, Comments, Customer_type, Martial_status, TP_Insurance_provider, TP_dueDate, GST_No, Insurance_type };
      console.log(res);
      const result = await prisma.user_data.update({
        where: { id: id },
        data: {
          Vehicle_No,   
          RC_No,
          Registered_Date,          	
          Owner,                 
          Owner_dob,    
          Ownership_type, 
          Address: {
            street,
            city,
            state,
            zip
          },                
          Vehicle_type,          
          Year_of_manufacuring,  
          GVW,                   
          Chasis_No,             
          Engine_No,  
          FC_due_Date,
          tax_due_Date,
          Vehicle_color,         
          Vehice_norms,                     
          CC,                    
          Make,                  
          Model,                 
          Insurance_provider,    
          Insurance_dueDate,  
          Policy_No,             
          Permit_No,             
          Permit_category,       
          Mobile_No1,            
          Mobile_No2,            
          Email_id,              
          Adhar_No,              
          Adhar_doc,             
          PanCard_No,            
          Pan_doc,               
          Nominee,               
          Nominee_dob,  
          Emission_dueDate,              
          Fuel_type,             
          Hypothecation_bank,    
          Hypothecation_city,    
          RTO,                   
          Referred_by,           
          Comments,              
          Customer_type,         
          Martial_status,        
          TP_Insurance_provider,  
          TP_dueDate,          
          GST_No,                
          Insurance_type,
        },       
      })
      return res;
    },

  deleteUserData: async (_, { id }) => {
    console.log("this is deleteAppuser block");
    const res = { id };
    console.log({ id, res });
    const delteduser = await prisma.user_data.delete({
      where: { id: id },      
    });
    return "Done";

  }

  }
};
