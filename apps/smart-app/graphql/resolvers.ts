import { Context } from '@/pages/api/graphql';
import { GraphQLScalarType, Kind } from 'graphql';


export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
//    console.log("serialize Block")
//  console.log(value)
    if (value instanceof Date) {      
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
//    console.log("parseValue Block")
//    console.log(value)
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    // console.log("parseLiteral Block")
    // console.log(ast)
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
    app_user: async (parent: any, args: any, context: Context) => {
      return await context.prisma.app_user.findMany();
    },
    user_data: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user_data.findMany();
    },

  },


  Mutation: {

    CreateAppuser: async (parent: any, args: any, context: Context) => {
      console.log("this is Createuser block");            
      return await context.prisma.app_user.create({
        data: {
          emailid: args.input.emailid,
          firstname: args.input.firstname,
          lastname: args.input.lastname,
          password: args.input.password,
          mobile: args.input.mobile,
          address: {
            street: args.input.address.street,
            city: args.input.address.city,
            state: args.input.address.state,
            zip: args.input.address.zip
          },
          role: args.input.role,
          profile_pic: args.input.profile_pic,
          gender: args.input.gender
        },
      });
    },


    replaceAppuser:  async (parent: any, args: any, context: Context) => {
      console.log("this is replaceAppuser block");      
      return await context.prisma.app_user.update({
        where: { userid: args.id },
        data: {
          firstname: args.input.firstname,
          lastname: args.input.lastname,
          mobile: args.input.mobile,
          address: {
            street: args.input.address.street,
            city: args.input.address.city,
            state: args.input.address.state,
            zip: args.input.address.zip
          },
          profile_pic: args.input.profile_pic,
          gender: args.input.gender
        },
      })      
      
    },

    deleteAppuser: async (parent: any, args: any, context: Context) => {
      console.log("this is deleteAppuser block");      
      await context.prisma.app_user.delete({
        where: { userid: args.id },        
      })
      
      return "App User Deleted Successfully!"
      
    },

    createUserData: async (parent: any, args: any, context: Context) => {
      console.log("this is CreateUserData block");            
      return await context.prisma.user_data.create({
        data: {
          Vehicle_No: args.input.Vehicle_No,   
          data_owner_id:args.input.data_owner_id,                 
          RC_No: args.input.RC_No,
          Registered_Date: args.input.Registered_Date,          	
          Owner: args.input.Owner,                 
          Owner_dob: args.input.Owner_dob,    
          Ownership_type: args.input.Ownership_type,                  
          Vehicle_type: args.input.Vehicle_type,          
          Year_of_manufacuring: args.input.Year_of_manufacuring,  
          GVW: args.input.GVW,                   
          Chasis_No: args.input.Chasis_No,             
          Engine_No: args.input.Engine_No,  
          FC_due_Date: args.input.FC_due_Date,
          tax_due_Date: args.input.tax_due_Date,
          Vehicle_color: args.input.Vehicle_color,         
          Vehice_norms: args.input.Vehice_norms,                     
          CC: args.input.CC,                    
          Make: args.input.Make,                  
          Model: args.input.Model,                 
          Insurance_provider: args.input.Insurance_provider,    
          Insurance_dueDate: args.input.Insurance_dueDate,  
          Policy_No: args.input.Policy_No,             
          Permit_No: args.input.Permit_No,             
          Permit_category: args.input.Permit_category,       
          Mobile_No1: args.input.Mobile_No1,            
          Mobile_No2: args.input.Mobile_No2,            
          Email_id: args.input.Email_id,              
          Adhar_No: args.input.Adhar_No,              
          Adhar_doc: args.input.Adhar_doc,             
          PanCard_No: args.input.PanCard_No,            
          Pan_doc: args.input.Pan_doc,               
          Nominee: args.input.Nominee,               
          Nominee_dob: args.input.Nominee_dob,  
          Emission_dueDate: args.input.Emission_dueDate,              
          Fuel_type: args.input.Fuel_type,             
          Hypothecation_bank: args.input.Hypothecation_bank,    
          Hypothecation_city: args.input.Hypothecation_city,    
          RTO: args.input.RTO,                   
          Referred_by: args.input.Referred_by,           
          Comments: args.input.Comments,              
          Customer_type: args.input.Customer_type,         
          Martial_status: args.input.Martial_status,        
          TP_Insurance_provider: args.input.TP_Insurance_provider,  
          TP_dueDate: args.input.TP_dueDate,          
          GST_No: args.input.GST_No,                
          Insurance_type: args.input.Insurance_type,
        },       
      })
    },
    
    testaddclient: async (parent: any, args: any, context: Context) => {
      console.log("this is updateUserdata block");        
        await context.prisma.user_data.create({
        data: {
          Vehicle_No: args.Vehicle_No,
          data_owner_id:args.data_owner_id, 
          RC_No: args.RC_NO
        },
    })
    return "Test Client created"
  },

    updateUserData: async (parent: any, args: any, context: Context) => {
      console.log("this is updateUserdata block");        
      return await context.prisma.user_data.update({
        where: { id: args.input.id },
        data: {
          Vehicle_No: args.input.Vehicle_No,                         
          RC_No: args.input.RC_No,
          Registered_Date: args.input.Registered_Date,          	
          Owner: args.input.Owner,                 
          Owner_dob: args.input.Owner_dob,    
          Ownership_type: args.input.Ownership_type, 
          Address: {
            street: args.input.Address.street,
            city: args.input.Address.city,
            state: args.input.Address.state,
            zip: args.input.Address.zip
          },                
          Vehicle_type: args.input.Vehicle_type,          
          Year_of_manufacuring: args.input.Year_of_manufacuring,  
          GVW: args.input.GVW,                   
          Chasis_No: args.input.Chasis_No,             
          Engine_No: args.input.Engine_No,  
          FC_due_Date: args.input.FC_due_Date,
          tax_due_Date: args.input.tax_due_Date,
          Vehicle_color: args.input.Vehicle_color,         
          Vehice_norms: args.input.Vehice_norms,                     
          CC: args.input.CC,                    
          Make: args.input.Make,                  
          Model: args.input.Model,                 
          Insurance_provider: args.input.Insurance_provider,    
          Insurance_dueDate: args.input.Insurance_dueDate,  
          Policy_No: args.input.Policy_No,             
          Permit_No: args.input.Permit_No,             
          Permit_category: args.input.Permit_category,       
          Mobile_No1: args.input.Mobile_No1,            
          Mobile_No2: args.input.Mobile_No2,            
          Email_id: args.input.Email_id,              
          Adhar_No: args.input.Adhar_No,              
          Adhar_doc: args.input.Adhar_doc,             
          PanCard_No: args.input.PanCard_No,            
          Pan_doc: args.input.Pan_doc,               
          Nominee: args.input.Nominee,               
          Nominee_dob: args.input.Nominee_dob,  
          Emission_dueDate: args.input.Emission_dueDate,              
          Fuel_type: args.input.Fuel_type,             
          Hypothecation_bank: args.input.Hypothecation_bank,    
          Hypothecation_city: args.input.Hypothecation_city,    
          RTO: args.input.RTO,                   
          Referred_by: args.input.Referred_by,           
          Comments: args.input.Comments,              
          Customer_type: args.input.Customer_type,         
          Martial_status: args.input.Martial_status,        
          TP_Insurance_provider: args.input.TP_Insurance_provider,  
          TP_dueDate: args.input.TP_dueDate,          
          GST_No: args.input.GST_No,                
          Insurance_type: args.input.Insurance_type,
        }, 
      })    
    },

  deleteUserData: async (parent: any, args: any, context: Context) => {
    console.log("this is deleteAppuser block");    
    await context.prisma.user_data.delete({
      where: { id: args.id },      
    })
    return "UserData Deleted Successfully!"
    
  }

  }
};
