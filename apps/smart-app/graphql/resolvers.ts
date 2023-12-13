import { Context } from '@/pages/api/graphql';
import { GraphQLScalarType, Kind } from 'graphql';


export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
//    console.log("serialize Block")
    if (value instanceof Date) {      
      //console.log( value.getTime())
      return value; // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
//    console.log("parseValue Block")
    console.log(value)
    if (value instanceof Date) value = new Date(value).getTime();
    console.log(value)
      //const changedValue = value.getTime();
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
      try{
        return await context.prisma.app_user.findMany();
      }
      catch(err){
          console.log(err);
      }
      
    },   

    user_data: async (parent: any, args: any, context: Context) => {
      
      try{
        return await context.prisma.user_data.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

    user_data_byid: async (parent: any, args: any, context: Context) => {
      console.log("this is user_data_byid block");  
      try{
        return await context.prisma.user_data.findUnique({
          where: {
            Vehicle_No: args.vechicle_id,
          },
        })
      }

      catch(err){
        console.log(err);
      }
    },

  VEHICLE_COLOR : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICLE_COLOR.findMany();
      }
      catch(err){
          console.log(err);
      }
    },


	VEHICE_NORMS : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICE_NORMS.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

	CC : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.cC.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

	MAKE : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.mAKE.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

	MODEL : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.mODEL.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

	INSURANCE_PROVIDER : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.iNSURANCE_PROVIDER.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

	PERMIT_CATEGORY : async (parent: any, args: any, context: Context) => {      
      try{        
        return await context.prisma.pERMIT_CATEGORY.findMany();
      }
      catch(err){
          console.log(err);
      }
    },	

	TP_INSURANCE_PROVIDER : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.tP_INSURANCE_PROVIDER.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

    VEHICLE_CLASS : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICLE_CLASS.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

CUSTOMER_TYPE : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.cUSTOMER_TYPE.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

VEHICLE_DESCRIPTION : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICLE_DESCRIPTION.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

SEATING_CAPACITY : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.sEATING_CAPACITY.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

STANDING_CAPACITY : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.sTANDING_CAPACITY.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

  RTO : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.rTO.findMany();
      }
      catch(err){
          console.log(err);
      }
    },
  
  DELETED_BLOBS : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.dELETED_BLOBS.findMany();
      }
      catch(err){
          console.log(err);
      }
    },

  },


  Mutation: {

    createRTO: async (parent: any, args: any, context: Context) => {
      console.log("this is createRTO block");            
      return await context.prisma.rTO.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createVehicleClass: async (parent: any, args: any, context: Context) => {
        console.log("this is createVehicleClass block");            
        return await context.prisma.vEHICLE_CLASS.create({
          data: {
            data_owner_id: args.input.data_owner_id,
            value: args.input.value
          },
        })
      },
    createCustomerType: async (parent: any, args: any, context: Context) => {
          console.log("this is createCustomerType block");            
          return await context.prisma.cUSTOMER_TYPE.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },
    createVehicleDescription: async (parent: any, args: any, context: Context) => {
          console.log("this is createVehicleDescription block");            
          return await context.prisma.vEHICLE_DESCRIPTION.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },
    createSeatingCapacity: async (parent: any, args: any, context: Context) => {
          console.log("this is createSeatingCapacity block");            
          return await context.prisma.sEATING_CAPACITY.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },
    createStandingCapacity: async (parent: any, args: any, context: Context) => {
          console.log("this is createStandingCapacity block");            
          return await context.prisma.sTANDING_CAPACITY.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },	


    createVehicleColor: async (parent: any, args: any, context: Context) => {
      console.log("this is CreateVehicleColor block");            
      return await context.prisma.vEHICLE_COLOR.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createVehicleNorms: async (parent: any, args: any, context: Context) => {
      console.log("this is createVehicleNorms block");            
      return await context.prisma.vEHICE_NORMS.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createCC: async (parent: any, args: any, context: Context) => {
      console.log("this is createCC block");            
      return await context.prisma.cC.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createMake: async (parent: any, args: any, context: Context) => {
      console.log("this is createMake block");            
      return await context.prisma.mAKE.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createModel: async (parent: any, args: any, context: Context) => {
      console.log("this is createModel block");            
      return await context.prisma.mODEL.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createInsuranceProvider: async (parent: any, args: any, context: Context) => {
      console.log("this is createInsuranceProvider block");            
      return await context.prisma.iNSURANCE_PROVIDER.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

	createPermitCategory: async (parent: any, args: any, context: Context) => {
      console.log("this is createPermitCategory block");            
      return await context.prisma.pERMIT_CATEGORY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createTpInsuranceProvider: async (parent: any, args: any, context: Context) => {
      console.log("this is createTpInsuranceProvider block");            
      return await context.prisma.tP_INSURANCE_PROVIDER.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createDeletedBlobs: async (parent: any, args: any, context: Context) => {
      console.log("this is createDeletedBlobs block");            
      return await context.prisma.dELETED_BLOBS.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
    
    
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
      try{        
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
            Address: {
              street: args.input.Address.street,
              city: args.input.Address.city,
              state: args.input.Address.state,
              zip: args.input.Address.zip
            },
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
            Mobile_No3 : args.input.Mobile_No3,
            Nominee_Relationship: args.input.Nominee_Relationship,
            Son_Wife_Daughter_Of: args.input.Son_Wife_Daughter_Of,
            Vehicle_Body          : args.input.Vehicle_Body,
            Wheel_Base            : args.input.Wheel_Base,
            No_Of_Cylinder        : args.input.No_Of_Cylinder,
            Unladen_Weight        : args.input.Unladen_Weight,
            Sleeper_Capacity      : args.input.Sleeper_Capacity,
            PUCC_Emission_No      : args.input.PUCC_Emission_No,
            updated_by            : args.input.updated_by,
            TP_Policy_No          : args.input.TP_Policy_No,
            Insurance_Start       : args.input.Insurance_Start,
            TP_Insurance_Start    : args.input.TP_Insurance_Start,
            Vehicle_Reg_Doc       : args.input.Vehicle_Reg_Doc,
            OD_Policy_Doc         : args.input.OD_Policy_Doc,
            TP_Policy_Doc         : args.input.TP_Policy_Doc,
            GST_Cer_Doc           : args.input.GST_Cer_Doc,
            Vehicle_Description:   args.input.Vehicle_Description,
            Seating_Capacity:      args.input.Seating_Capacity,
            Standing_Capacity:     args.input.Standing_Capacity,

          },       
      })
    }
    catch(err){
      console.log(err);
    }
  },
    
    testaddclient: async (parent: any, args: any, context: Context) => {
      console.log("this is testCreateUserdata block");        
        await context.prisma.user_data.create({
        data: {
          Vehicle_No: args.Vehicle_No,
          data_owner_id:args.data_owner_id, 
          RC_No: args.RC_No
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
          Mobile_No3 : args.input.Mobile_No3,
          Nominee_Relationship: args.input.Nominee_Relationship,
          Son_Wife_Daughter_Of: args.input.Son_Wife_Daughter_Of,
          Vehicle_Body          : args.input.Vehicle_Body,
          Wheel_Base            : args.input.Wheel_Base,
          No_Of_Cylinder        : args.input.No_Of_Cylinder,
          Unladen_Weight        : args.input.Unladen_Weight,
          Sleeper_Capacity      : args.input.Sleeper_Capacity,
          PUCC_Emission_No      : args.input.PUCC_Emission_No,
          updated_by            : args.input.updated_by,
          TP_Policy_No          : args.input.TP_Policy_No,
          Insurance_Start       : args.input.Insurance_Start,
          TP_Insurance_Start    : args.input.TP_Insurance_Start,
          Vehicle_Reg_Doc       : args.input.Vehicle_Reg_Doc,
          OD_Policy_Doc         : args.input.OD_Policy_Doc,
          TP_Policy_Doc         : args.input.TP_Policy_Doc,
          GST_Cer_Doc           : args.input.GST_Cer_Doc,
          Vehicle_Description:   args.input.Vehicle_Description,
          Seating_Capacity:      args.input.Seating_Capacity,
          Standing_Capacity:     args.input.Standing_Capacity,
        }, 
      })    
    },

  updateUserData1: async (parent: any, args: any, context: Context) => {
      console.log("this is updateUserdata1 block");   
      await context.prisma.user_data.update({
          where: { id: args.input.id },
          data: {      
      Vehicle_Reg_Doc       : args.input.Vehicle_Reg_Doc,
      Owner: args.input.Owner,
      Son_Wife_Daughter_Of: args.input.Son_Wife_Daughter_Of,		
      RC_No: args.input.RC_No,
      Chasis_No: args.input.Chasis_No, 
      Engine_No: args.input.Engine_No, 	
      Make: args.input.Make, 
      Model: args.input.Model,    		
      Registered_Date: args.input.Registered_Date, 
      tax_due_Date: args.input.tax_due_Date,
      Vehicle_type: args.input.Vehicle_type,          
      Vehicle_Description:   args.input.Vehicle_Description,
      Fuel_type: args.input.Fuel_type,   
      Vehice_norms: args.input.Vehice_norms,
      Vehicle_color: args.input.Vehicle_color,         
      Seating_Capacity:      args.input.Seating_Capacity,
      Standing_Capacity:     args.input.Standing_Capacity,
      Hypothecation_bank: args.input.Hypothecation_bank,    
      Hypothecation_city: args.input.Hypothecation_city,    
          }, 
        })  
    return "Updated !"    
  },
    
  updateUserData2: async (parent: any, args: any, context: Context) => {
    console.log("this is updateUserdata2 block");   		
    await context.prisma.user_data.update({
          where: { id: args.input.id },
          data: {		
          Vehicle_No: args.input.Vehicle_No, 
      Insurance_type: args.input.Insurance_type,
      Policy_No: args.input.Policy_No,
      OD_Policy_Doc         : args.input.OD_Policy_Doc,
      Insurance_provider: args.input.Insurance_provider, 
      Insurance_Start       : args.input.Insurance_Start,
      Insurance_dueDate: args.input.Insurance_dueDate,  
      TP_Policy_No          : args.input.TP_Policy_No,
      TP_Policy_Doc         : args.input.TP_Policy_Doc,
      TP_Insurance_provider: args.input.TP_Insurance_provider,  
      TP_Insurance_Start    : args.input.TP_Insurance_Start,
      TP_dueDate: args.input.TP_dueDate, 
      RTO: args.input.RTO,  
      Unladen_Weight        : args.input.Unladen_Weight,
      GVW: args.input.GVW, 
      Vehicle_Body          : args.input.Vehicle_Body,
      Wheel_Base            : args.input.Wheel_Base,
      No_Of_Cylinder        : args.input.No_Of_Cylinder,
      Sleeper_Capacity      : args.input.Sleeper_Capacity,
          }, 
        })  
    return "Updated !"    
  },		
        
  updateUserData3: async (parent: any, args: any, context: Context) => {
     console.log("this is updateUserdata3 block");   			
     await context.prisma.user_data.update({
          where: { id: args.input.id },
          data: {                   	        
        Vehicle_No: args.input.Vehicle_No, 
            Owner_dob: args.input.Owner_dob,    
            Ownership_type: args.input.Ownership_type, 
            Address: {
              street: args.input.Address.street,
              city: args.input.Address.city,
              state: args.input.Address.state,
              zip: args.input.Address.zip
            },                          
            Year_of_manufacuring: args.input.Year_of_manufacuring,                
            FC_due_Date: args.input.FC_due_Date, CC: args.input.CC,                         
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
            Referred_by: args.input.Referred_by,           
            Comments: args.input.Comments,              
            Customer_type: args.input.Customer_type,         
            Martial_status: args.input.Martial_status,        
            GST_No: args.input.GST_No,                          
            Mobile_No3 : args.input.Mobile_No3,
            Nominee_Relationship: args.input.Nominee_Relationship,          
            No_Of_Cylinder        : args.input.No_Of_Cylinder,
            PUCC_Emission_No      : args.input.PUCC_Emission_No,
            updated_by            : args.input.updated_by,          
            GST_Cer_Doc           : args.input.GST_Cer_Doc,                              
          }, 
        })   
      return "Updated !"     
  },	    

  deleteUserData: async (parent: any, args: any, context: Context) => {
    console.log("this is deleteAppuser block");    
    await context.prisma.user_data.delete({
      where: { Vehicle_No: args.vehicleid },      
    })
    return "UserData Deleted Successfully!"
    
  }

  }
};
