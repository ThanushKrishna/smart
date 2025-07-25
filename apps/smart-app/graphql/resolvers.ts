import { Context } from '@/pages/api/graphql';
import { GraphQLScalarType, Kind } from 'graphql';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { app_user } from '@prisma/client';
import { setToken } from '../utils/auth';


export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
//console.log("serialize Block")
    if (value instanceof Date) {      
      ////console.log( value.getTime())
      return value; // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
//console.log("parseValue Block")
    //console.log(value)
    if (value instanceof Date) value = new Date(value).getTime();
    //console.log(value)
      //const changedValue = value.getTime();
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    //console.log("parseLiteral Block")
    //console.log(ast)
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

//null --> is a value, that can be stored in DB if no value is provided.
//undefined --> is no value and suggests to do nothing

export const resolvers = {
  
  Date: dateScalar,

  Query: {
    app_user: async (parent: any, args: any, context: Context) => {
      try{
        return await context.prisma.app_user.findMany();
      }
      catch(err){
          //console.log(err);
      }
      
    },   

    getNotesForUser: async (parent: any, args: any, context: Context) => {
      try {
        const userWithNotes = await context.prisma.app_user.findUnique({
          where: { userid: args.input },
          select: { notes: true },
        });
    
        if (!userWithNotes) {
          //console.error('User not found');
          return null;
        }
    
        return userWithNotes.notes;
      } catch (error) {
        //console.error('Error fetching notes for user:', error);
        throw error;
      }
    },

    user_data: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          orderBy: {
            createdAt: 'desc' // 'desc' for descending order (most recent first)
          }
        });
      } catch (err) {
        //console.log(err);
      }
    },


    user_data_byuserid: async (parent: any, args: any, context: Context) => {
      try {
        const offset = (args.pageNumber - 1) * args.pageSize;
        //console.log("User Data By User ID: " + args.pageSize, args.pageNumber, args.data_owner_id);

         // Count the total number of rows
        const totalCount = await context.prisma.user_data.count({
          where: {
            data_owner_id: args.data_owner_id
          }
        });

        const userData = await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id
          },    
          take: args.pageSize,
          skip: offset,      
          orderBy: {
            createdAt: 'desc' // 'desc' for descending order (most recent first)
          }
        });

        const response = {
          data: userData,
          count: totalCount
        };
    
        return response;

      } catch (err) {
        //console.log(err);
      }
    },


    user_data_byid: async (parent: any, args: any, context: Context) => {
      //console.log("this is user_data_byid block");  
      try{
        return await context.prisma.user_data.findFirst({
          where: {
            data_owner_id: args.data_owner_id,
            Vehicle_No: args.vechicle_id,
          },
        })
      }

      catch(err){
        //console.log(err);
      }
    },


  VEHICLE_COLOR : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICLE_COLOR.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },


	VEHICE_NORMS : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICE_NORMS.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

	CC : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.cC.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

	MAKE : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.mAKE.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },
   

	MODEL : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.mODEL.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

	INSURANCE_PROVIDER : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.iNSURANCE_PROVIDER.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

	PERMIT_CATEGORY : async (parent: any, args: any, context: Context) => {      
      try{        
        return await context.prisma.pERMIT_CATEGORY.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },	

	TP_INSURANCE_PROVIDER : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.tP_INSURANCE_PROVIDER.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

    VEHICLE_CLASS : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICLE_CLASS.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

CUSTOMER_TYPE : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.cUSTOMER_TYPE.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

VEHICLE_DESCRIPTION : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.vEHICLE_DESCRIPTION.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

SEATING_CAPACITY : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.sEATING_CAPACITY.findMany({
          orderBy: {            
            value: 'desc', // 'asc' for ascending order, 'desc' for descending order
          },
        })
      }
      catch(err){
          //console.log(err);
      }
    },

STANDING_CAPACITY : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.sTANDING_CAPACITY.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

  RTO : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.rTO.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

    HYPOTHECATION_CITY : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.hYPOTHECATION_CITY.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

    HYPOTHECATION_BANK : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.hYPOTHECATION_BANK.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },
  
  DELETED_BLOBS : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.dELETED_BLOBS.findMany({
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
          },
        });
      }
      catch(err){
          //console.log(err);
      }
    },

    MAKE_BY_VALUE : async (parent: any, args: any, context: Context) => {      
      try{
        return await context.prisma.mAKE.findMany({
          where: {          
            data_owner_id: args.data_owner_id,
            value: args.input
            ? {
              contains: args.input,
              mode: 'insensitive',
            }
            : undefined, // If searchValue is falsy, don't apply any search condition
        },
          orderBy: {            
            value: 'asc', // 'asc' for ascending order, 'desc' for descending order
        },
      })
      }
      catch(err){
          //console.log(err);
      }
    },

    VEHICLE_COLOR_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.vEHICLE_COLOR.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    VEHICLE_NORMS_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.vEHICE_NORMS.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },  
	
	
	CC_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.cC.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    MODEL_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.mODEL.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    INSURANCE_PROVIDER_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.iNSURANCE_PROVIDER.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    PERMIT_CATEGORY_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.pERMIT_CATEGORY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    TP_INSURANCE_PROVIDER_BY_VALUE: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.tP_INSURANCE_PROVIDER.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    VEHICLE_CLASS_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.vEHICLE_CLASS.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    CUSTOMER_TYPE_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.cUSTOMER_TYPE.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    VEHICLE_DESCRIPTION_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.vEHICLE_DESCRIPTION.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    SEATING_CAPACITY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.sEATING_CAPACITY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    STANDING_CAPACITY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.sTANDING_CAPACITY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    RTO_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.rTO.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    HYPOTHECATION_BANK_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.hYPOTHECATION_BANK.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    HYPOTHECATION_CITY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.hYPOTHECATION_CITY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },   
    
    UNLADEN_WEIGHT_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.uNLADEN_WEIGHT.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    GVW_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.gVW.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    VEHICLE_BODY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.vEHICLE_BODY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    WHEEL_BASE_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.wHEEL_BASE.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    NO_OF_CYLINDER_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.nO_OF_CYLINDER.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    SLEEPER_CAPACITY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.sLEEPER_CAPACITY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    UPDATED_BY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.uPDATED_BY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    REFERRED_BY_BY_VALUE: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.rEFERRED_BY.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            value: args.input
              ? {
                  contains: args.input,
                  mode: 'insensitive',
                }
              : undefined,
          },
          orderBy: {
            value: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    user_data_beforeInsuranceDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Insurance_dueDate: args.input
              ? {
                  lt: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Insurance_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    user_data_betweenInsuranceDueDates: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Insurance_dueDate: args.input1 && args.input2
              ? {
                  gte: args.input1,
                  lt: args.input2,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Insurance_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    user_data_afterInsuranceDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Insurance_dueDate: args.input
              ? {
                  gte: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Insurance_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    user_data_NaInsuranceDueDate: async (parent: any, args: any, context: Context) => {
      //console.log("this user_data_NaInsuranceDueDate Block")
      try {
        return await context.prisma.user_data.findMany({
          where: {
            Insurance_dueDate: null,
            data_owner_id: args.input, // Replace with the actual input variable
          },
          orderBy: {
            Insurance_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    
    user_data_beforeTPInsuranceDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            TP_dueDate: args.input
              ? {
                  lt: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            TP_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_betweenTPInsuranceDueDates: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            TP_dueDate: args.input1 && args.input2
              ? {
                  gte: args.input1,
                  lt: args.input2,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            TP_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_afterTPInsuranceDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            TP_dueDate: args.input
              ? {
                  gte: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            TP_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_NaTPInsuranceDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            TP_dueDate: null,
            data_owner_id: args.input
          },
          orderBy: {
            TP_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    // user_data_NaEmissionDueDate: async (parent: any, args: any, context: Context) => {
    //   try {
    //     return await context.prisma.user_data.findMany({
    //       where: {            
    //         Emission_dueDate: null,
    //         data_owner_id: args.input,
    //       },
    //       orderBy: {
    //         Emission_dueDate: 'asc',
    //       },
    //     });
    //   } catch (err) {
    //     //console.log(err);
    //   }
    // },
    

    user_data_beforeEmissionDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Emission_dueDate: args.input
              ? {
                  lt: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Emission_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_betweenEmissionDueDates: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Emission_dueDate: args.input1 && args.input2
              ? {
                  gte: args.input1,
                  lt: args.input2,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Emission_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_afterEmissionDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Emission_dueDate: args.input
              ? {
                  gte: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Emission_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_NaEmissionDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {            
            Emission_dueDate: null,
            data_owner_id: args.input,
          },
          orderBy: {
            Emission_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    user_data_beforeTaxDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            tax_due_Date: args.input
              ? {
                  lt: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            tax_due_Date: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_betweenTaxDueDates: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            tax_due_Date: args.input1 && args.input2
              ? {
                  gte: args.input1,
                  lt: args.input2,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            tax_due_Date: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_afterTaxDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            tax_due_Date: args.input
              ? {
                  gte: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            tax_due_Date: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_NaTaxDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            tax_due_Date: null,
            data_owner_id: args.input,
          },
          orderBy: {
            tax_due_Date: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

    user_data_beforeFCDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            FC_due_Date: args.input
              ? {
                  lt: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            FC_due_Date: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_betweenFCDueDates: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            FC_due_Date: args.input1 && args.input2
              ? {
                  gte: args.input1,
                  lt: args.input2,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            FC_due_Date: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_afterFCDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            FC_due_Date: args.input
              ? {
                  gte: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            FC_due_Date: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_NaFCDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            FC_due_Date: null,
            data_owner_id: args.input,
          },
          orderBy: {
            FC_due_Date: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },
    

    user_data_beforePermitDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Permit_dueDate: args.input
              ? {
                  lt: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Permit_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_betweenPermitDueDates: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Permit_dueDate: args.input1 && args.input2
              ? {
                  gte: args.input1,
                  lt: args.input2,
                  not: null,
                }
              : undefined,
          },
          orderBy: {
            Permit_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_afterPermitDueDate: async (parent: any, args: any, context: Context) => {
      try {
        return await context.prisma.user_data.findMany({
          where: {
            data_owner_id: args.data_owner_id,
            Permit_dueDate: args.input
              ? {
                  gte: args.input,
                  not: null,
                }
              : undefined,
          },
          orderBy: {            
            Permit_dueDate: 'asc',
          },
        });
      } catch (err) {
        // Handle errors
      }
    },
    
    user_data_NaPermitDueDate: async (parent: any, args: any, context: Context) => {      
      try {
        return await context.prisma.user_data.findMany({
          where: {
            Permit_dueDate: null,
            data_owner_id: args.input,
          },
          orderBy: {
            Permit_dueDate: 'asc',
          },
        });
      } catch (err) {
        //console.log(err);
      }
    },

     phoneNumberFromEmail: async (parent: any, args: any, context: Context) => {      

      //console.log("this is phoneNumberFromEmail block");
      try {

         const user = await context.prisma.app_user.findUnique({
          where: {            
            emailid: args.emailid
          },
        }) 

        //console.log(user!.mobile);
        if(user)
          return user!.mobile;
        else
          return null;

      } catch (err) {
        console.log(err);
      }
    },

    login:async (parent: any, args: any, context: Context) => {
      //console.log("this is login block");         
      
      const secretKey = process.env.SECRET_KEY || 'default_secret_key'; 
      //console.log("SECRETKEY from resolver: " + secretKey);

      function generateToken(user: app_user) {          
        const token = jwt.sign(
          {
            userid: user.userid,
            firstname: user.firstname,
            lastname: user.lastname,
            emailid: user.emailid,
          },
          secretKey,           
        );
      
        return token;
      }
      
      try {        

         const user = await context.prisma.app_user.findUnique({
          where: {            
            emailid: args.input1
          },
        }) 
		
        if (!user) {
          throw new Error("User not found");
        }

        //console.log(user);
		
        const passwordMatch = await bcrypt.compare(args.input2, user.password);


        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        const token = generateToken(user);

        const result = {
                        userid: user.userid,
                        emailid:user.emailid,
                        token: token
                      }

        setToken(token);                         
        return result;  
            

      } catch (error) {
        //console.error('Error Login user:', error);
      }   
           

    },      

  },



  Mutation: {

  // forgotPassword: async (parent: any, args: any, context: Context) => {
  //   try {
  //     // Find user by email
  //     const user = await context.prisma.app_user.findUnique({
  //       where: { emailid: args.email },
  //     });

  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     // Generate a reset token (short-lived)
  //     const secretKey = process.env.SECRET_KEY || 'default_secret_key';
  //     const resetToken = jwt.sign(
  //       { userid: user.userid, emailid: user.emailid },
  //       secretKey,
  //       { expiresIn: '15m' }
  //     );

  //     // Construct reset link (adjust URL as needed)
  //     const resetLink = `https://your-app-domain.com/reset-password?token=${resetToken}`;

  //     // Send email (replace with your email sending logic)
  //     await context.sendMail({
  //       to: user.emailid,
  //       subject: 'Password Reset Request',
  //       text: `Click the link to reset your password: ${resetLink}`,
  //       html: `<p>Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  //     });

  //     return true;
  //   } catch (error) {
  //     //console.error('Error in forgotPassword:', error);
  //     throw new Error('Failed to send reset email');
  //   }
  // },

    updatePasswordByEmail: async (parent: any, args: any, context: Context) => {
      //console.log("this is SignUp block");         
      
      const secretKey = process.env.SECRET_KEY || 'default_secret_key'; 

      function generateToken(user: app_user) {          
        const token = jwt.sign(
          {
            userid: user.userid,
            firstname: user.firstname,
            lastname: user.lastname,
            emailid: user.emailid,
          },
          secretKey, 
          {
            expiresIn: '1h', // Token expiration time (adjust as needed)
          }
        );
      
        return token;
      }
      
      try {
        const hashedPassword = await bcrypt.hash(args.password, 10);

        const updatedUser = await context.prisma.app_user.update({
          where: { emailid: args.emailid },
          data: {
            password: hashedPassword,

          },

        })

        const token = generateToken(updatedUser);

        const result = {
                        userid: updatedUser.userid,
                        emailid:updatedUser.emailid,
                        token: token
                      }

     // Save the authentication token in cookies        
        setToken(token); 
                
        console.log("password updated");
        return result;  
            

      } catch (error) {
        console.error('Error updating password:', error);
      }   
           

    },

    signUp: async (parent: any, args: any, context: Context) => {
      //console.log("this is SignUp block");         
      
      const secretKey = process.env.SECRET_KEY || 'default_secret_key'; 

      function generateToken(userCreated: app_user) {          
        const token = jwt.sign(
          {
            userid: userCreated.userid,
            firstname: userCreated.firstname,
            lastname: userCreated.lastname,
            emailid: userCreated.emailid,
          },
          secretKey, 
          {
            expiresIn: '1h', // Token expiration time (adjust as needed)
          }
        );
      
        return token;
      }
      
      try {
        const hashedPassword = await bcrypt.hash(args.input.password, 10);

        const userCreated = await context.prisma.app_user.create({
          data: {
            emailid: args.input.emailid,
            firstname: args.input.firstname,
            lastname: args.input.lastname,
            password: hashedPassword,  
            mobile: args.input.mobile ?  args.input.mobile : undefined,      
          },
        })

        const token = generateToken(userCreated);

        const result = {
                        userid: userCreated.userid,
                        emailid:userCreated.emailid,
                        token: token
                      }

     // Save the authentication token in cookies        
        setToken(token); 
                
        //console.log(userCreated);
        return result;  
            

      } catch (error) {
        //console.error('Error creating user:', error);
      }   
           

    },

    addNotesForUser: async (parent: any, args: any, context: Context) => {
      try {
        await context.prisma.app_user.update({
          where: { userid: args.input1 },
          data: {            
            notes: args.input2
          },          
        });
    
        return 'Notes added successfully'; // Replace with your desired success message
      } catch (error) {
        //console.error('Error adding notes for user:', error);
        throw error;
      }
    },


    createRTO: async (parent: any, args: any, context: Context) => {
      //console.log("this is createRTO block");            
      return await context.prisma.rTO.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createVehicleClass: async (parent: any, args: any, context: Context) => {
        //console.log("this is createVehicleClass block");            
        return await context.prisma.vEHICLE_CLASS.create({
          data: {
            data_owner_id: args.input.data_owner_id,
            value: args.input.value
          },
        })
      },
    createCustomerType: async (parent: any, args: any, context: Context) => {
          //console.log("this is createCustomerType block");            
          return await context.prisma.cUSTOMER_TYPE.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },
    createVehicleDescription: async (parent: any, args: any, context: Context) => {
          //console.log("this is createVehicleDescription block");            
          return await context.prisma.vEHICLE_DESCRIPTION.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },
    createSeatingCapacity: async (parent: any, args: any, context: Context) => {
          //console.log("this is createSeatingCapacity block");            
          return await context.prisma.sEATING_CAPACITY.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },
    createStandingCapacity: async (parent: any, args: any, context: Context) => {
          //console.log("this is createStandingCapacity block");            
          return await context.prisma.sTANDING_CAPACITY.create({
            data: {
              data_owner_id: args.input.data_owner_id,
              value: args.input.value
            },
          })
        },	


    createVehicleColor: async (parent: any, args: any, context: Context) => {
      //console.log("this is CreateVehicleColor block");            
      return await context.prisma.vEHICLE_COLOR.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createVehicleNorms: async (parent: any, args: any, context: Context) => {
      //console.log("this is createVehicleNorms block");            
      return await context.prisma.vEHICE_NORMS.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createCC: async (parent: any, args: any, context: Context) => {
      //console.log("this is createCC block");            
      return await context.prisma.cC.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createMake: async (parent: any, args: any, context: Context) => {
      //console.log("this is createMake block");            
      return await context.prisma.mAKE.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createModel: async (parent: any, args: any, context: Context) => {
      //console.log("this is createModel block");            
      return await context.prisma.mODEL.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createInsuranceProvider: async (parent: any, args: any, context: Context) => {
      //console.log("this is createInsuranceProvider block");            
      return await context.prisma.iNSURANCE_PROVIDER.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

	createPermitCategory: async (parent: any, args: any, context: Context) => {
      //console.log("this is createPermitCategory block");            
      return await context.prisma.pERMIT_CATEGORY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
	
	createTpInsuranceProvider: async (parent: any, args: any, context: Context) => {
      //console.log("this is createTpInsuranceProvider block");            
      return await context.prisma.tP_INSURANCE_PROVIDER.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createHypothecationCity: async (parent: any, args: any, context: Context) => {
      //console.log("this is createHypothecationCity block");            
      return await context.prisma.hYPOTHECATION_CITY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createHypothecationBank: async (parent: any, args: any, context: Context) => {
      //console.log("this is createHypothecationBank block");            
      return await context.prisma.hYPOTHECATION_BANK.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },

    createUnladenWeight: async (parent: any, args: any, context: Context) => {
      //console.log("this is createUnladenWeight block");
      return await context.prisma.uNLADEN_WEIGHT.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createGvw: async (parent: any, args: any, context: Context) => {
      //console.log("this is createGvw block");
      return await context.prisma.gVW.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createVehicleBody: async (parent: any, args: any, context: Context) => {
      //console.log("this is createVehicleBody block");
      return await context.prisma.vEHICLE_BODY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createWheelBase: async (parent: any, args: any, context: Context) => {
      //console.log("this is createWheelBase block");
      return await context.prisma.wHEEL_BASE.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createNoOfCylinder: async (parent: any, args: any, context: Context) => {
      //console.log("this is createNoOfCylinder block");
      return await context.prisma.nO_OF_CYLINDER.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createSleeperCapacity: async (parent: any, args: any, context: Context) => {
      //console.log("this is createSleeperCapacity block");
      return await context.prisma.sLEEPER_CAPACITY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createUpdatedBy: async (parent: any, args: any, context: Context) => {
      //console.log("this is createUpdatedBy block");
      return await context.prisma.uPDATED_BY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },
    createReferredBy: async (parent: any, args: any, context: Context) => {
      //console.log("this is createReferredBy block");
      return await context.prisma.rEFERRED_BY.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value,
        },
      });
    },


    createDeletedBlobs: async (parent: any, args: any, context: Context) => {
      //console.log("this is createDeletedBlobs block");            
      return await context.prisma.dELETED_BLOBS.create({
        data: {
          data_owner_id: args.input.data_owner_id,
          value: args.input.value
        },
      })
    },
    
    
    CreateAppuser: async (parent: any, args: any, context: Context) => {
      //console.log("this is Createuser block");            
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
      //console.log("this is replaceAppuser block");      
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

    createUserData: async (parent: any, args: any, context: Context) => {
      //console.log("this is CreateUserData block");    
      try{        
        return await context.prisma.user_data.create({
          data: {
            Vehicle_No: args.input.Vehicle_No,   
            data_owner_id:args.input.data_owner_id,                 
            RC_No: args.input.RC_No,
            Registered_Date: args.input.Registered_Date,          	
            Owner: args.input.Owner,                 
            Customer: args.input.Customer, 
            Owner_dob: args.input.Owner_dob,    
            Ownership_type: args.input.Ownership_type,                  
            Gender: args.input.Gender,        
            Vehicle_Kind: args.input.Vehicle_Kind,    
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
            Permit_dueDate:        args.input.Permit_dueDate,
            CAddress: {
                        street: args.input.CAddress.street,
                        city: args.input.CAddress.city,
                        state: args.input.CAddress.state,
                        zip: args.input.CAddress.zip
                      },
            Prospect:              args.input.Prospect,
            photo_links:           args.input.photo_links,
            Nominee_Doc:           args.input.Nominee_Doc
          },       
      })
    }
    catch(err){
      //console.log(err);
    }
  },
    
    testaddclient: async (parent: any, args: any, context: Context) => {
      //console.log("this is testCreateUserdata block");        
        await context.prisma.user_data.create({
        data: {
          Vehicle_No: args.Vehicle_No,
          data_owner_id:args.data_owner_id, 
          RC_No: args.RC_No
        },
    })
    return "Test Client created"
  },

  //   updateUserData: async (parent: any, args: any, context: Context) => {
  //     //console.log("this is updateUserdata block");   
  //     await context.prisma.user_data.update({
  //         where: { id: args.input.id },
  //         data: {      
  //     Vehicle_Reg_Doc       : args.input.Vehicle_Reg_Doc !== undefined ? args.input.Vehicle_Reg_Doc: null,
  //     Owner: args.input.Owner!== undefined ? args.input.Owner: null,
  //     Gender: args.input.Gender!== undefined ? args.input.Gender: null,
  //     Vehicle_Kind: args.input.Vehicle_Kind!== undefined ? args.input.Vehicle_Kind: null,
  //     Son_Wife_Daughter_Of: args.input.Son_Wife_Daughter_Of !== undefined ? args.input.Son_Wife_Daughter_Of: null,
  //     RC_No: args.input.RC_No !== undefined ? args.input.RC_No: null,
  //     Chasis_No: args.input.Chasis_No !== undefined ? args.input.Chasis_No: null,
  //     Engine_No: args.input.Engine_No !== undefined ? args.input.Engine_No: null,
  //     Make: args.input.Make !== undefined ? args.input.Make: null,
  //     Model: args.input.Model !== undefined ? args.input.Model: null,
  //     Registered_Date: args.input.Registered_Date !== undefined ? args.input.Registered_Date: null,
  //     tax_due_Date: args.input.tax_due_Date !== undefined ? args.input.tax_due_Date: null,
  //     Vehicle_type: args.input.Vehicle_type !== undefined ? args.input.Vehicle_type: null,
  //     Vehicle_Description:   args.input.Vehicle_Description !== undefined ? args.input.Vehicle_Description: null,
  //     Fuel_type: args.input.Fuel_type !== undefined ? args.input.Fuel_type: null,
  //     Vehice_norms: args.input.Vehice_norms !== undefined ? args.input.Vehice_norms: null,
  //     Vehicle_color: args.input.Vehicle_color !== undefined ? args.input.Vehicle_color: null,
  //     Seating_Capacity:      args.input.Seating_Capacity !== undefined ? args.input.Seating_Capacity: null,
  //     Standing_Capacity:     args.input.Standing_Capacity !== undefined ? args.input.Standing_Capacity: null,
  //     Hypothecation_bank: args.input.Hypothecation_bank !== undefined ? args.input.Hypothecation_bank: null,
  //     Hypothecation_city: args.input.Hypothecation_city !== undefined ? args.input.Hypothecation_city: null,
  //     Ownership_type: args.input.Ownership_type !== undefined ? args.input.Ownership_type: null,
  //     Sleeper_Capacity      : args.input.Sleeper_Capacity !== undefined ? args.input.Sleeper_Capacity: null,	          
  //     Insurance_type: args.input.Insurance_type !== undefined ? args.input.Insurance_type: null,
  //     Policy_No: args.input.Policy_No !== undefined ? args.input.Policy_No: null,
  //     OD_Policy_Doc         : args.input.OD_Policy_Doc !== undefined ? args.input.OD_Policy_Doc: null,
  //     Insurance_provider: args.input.Insurance_provider !== undefined ? args.input.Insurance_provider: null,
  //     Insurance_Start       : args.input.Insurance_Start !== undefined ? args.input.Insurance_Start: null,
  //     Insurance_dueDate: args.input.Insurance_dueDate !== undefined ? args.input.Insurance_dueDate: null,
  //     TP_Policy_No          : args.input.TP_Policy_No !== undefined ? args.input.TP_Policy_No: null,
  //     TP_Policy_Doc         : args.input.TP_Policy_Doc !== undefined ? args.input.TP_Policy_Doc: null,
  //     TP_Insurance_provider: args.input.TP_Insurance_provider !== undefined ? args.input.TP_Insurance_provider: null,
  //     TP_Insurance_Start    : args.input.TP_Insurance_Start !== undefined ? args.input.TP_Insurance_Start: null,
  //     TP_dueDate: args.input.TP_dueDate !== undefined ? args.input.TP_dueDate: null,
  //     RTO: args.input.RTO !== undefined ? args.input.RTO: null,
  //     Unladen_Weight        : args.input.Unladen_Weight !== undefined ? args.input.Unladen_Weight: null,
  //     GVW: args.input.GVW !== undefined ? args.input.GVW: null,
  //     Vehicle_Body          : args.input.Vehicle_Body !== undefined ? args.input.Vehicle_Body: null,
  //     Wheel_Base            : args.input.Wheel_Base !== undefined ? args.input.Wheel_Base: null,
  //     No_Of_Cylinder        : args.input.No_Of_Cylinder !== undefined ? args.input.No_Of_Cylinder: null,                       	                
  //     Owner_dob: args.input.Owner_dob !== undefined ? args.input.Owner_dob: null,             
  //     Address: {
  //       street: args.input.Address.street !== undefined ? args.input.Address.street: null,
  //       city: args.input.Address.city !== undefined ? args.input.Address.city: null,
  //       state: args.input.Address.state !== undefined ? args.input.Address.state: null,
  //       zip: args.input.Address.zip !== undefined ? args.input.Address.zip: null,
  //     },                          
  //     Year_of_manufacuring: args.input.Year_of_manufacuring !== undefined ? args.input.Year_of_manufacuring: null,
  //     FC_due_Date: args.input.FC_due_Date !== undefined ? args.input.FC_due_Date: null,
  //     Permit_No: args.input.Permit_No !== undefined ? args.input.Permit_No: null,
  //     Permit_category: args.input.Permit_category !== undefined ? args.input.Permit_category: null,
  //     Mobile_No1: args.input.Mobile_No1 !== undefined ? args.input.Mobile_No1: null,
  //     Mobile_No2: args.input.Mobile_No2 !== undefined ? args.input.Mobile_No2: null,
  //     Email_id: args.input.Email_id !== undefined ? args.input.Email_id: null,
  //     Adhar_No: args.input.Adhar_No !== undefined ? args.input.Adhar_No: null,
  //     Adhar_doc: args.input.Adhar_doc !== undefined ? args.input.Adhar_doc: null,
  //     PanCard_No: args.input.PanCard_No !== undefined ? args.input.PanCard_No: null,
  //     Pan_doc: args.input.Pan_doc !== undefined ? args.input.Pan_doc: null,
  //     Nominee: args.input.Nominee !== undefined ? args.input.Nominee: null,
  //     Nominee_dob: args.input.Nominee_dob !== undefined ? args.input.Nominee_dob: null,
  //     Emission_dueDate: args.input.Emission_dueDate !== undefined ? args.input.Emission_dueDate: null,                                        
  //     Referred_by: args.input.Referred_by !== undefined ? args.input.Referred_by: null,
  //     Comments: args.input.Comments !== undefined ? args.input.Comments: null,
  //     Customer_type: args.input.Customer_type !== undefined ? args.input.Customer_type: null,
  //     Martial_status: args.input.Martial_status !== undefined ? args.input.Martial_status: null,
  //     GST_No: args.input.GST_No !== undefined ? args.input.GST_No: null,                          
  //     Mobile_No3 : args.input.Mobile_No3 !== undefined ? args.input.Mobile_No3: null,
  //     Nominee_Relationship: args.input.Nominee_Relationship !== undefined ? args.input.Nominee_Relationship: null,            
  //     CC : args.input.CC !== undefined ? args.input.CC: null,
  //     PUCC_Emission_No      : args.input.PUCC_Emission_No !== undefined ? args.input.PUCC_Emission_No: null,
  //     updated_by            : args.input.updated_by !== undefined ? args.input.updated_by: null,
  //     GST_Cer_Doc           : args.input.GST_Cer_Doc !== undefined ? args.input.GST_Cer_Doc: null,
  //     Permit_dueDate:        args.input.Permit_dueDate,
  //     CAddress: {
  //       street: args.input.Address.street !== undefined ? args.input.CAddress.street: null,
  //       city: args.input.Address.city !== undefined ? args.input.CAddress.city: null,
  //       state: args.input.Address.state !== undefined ? args.input.CAddress.state: null,
  //       zip: args.input.Address.zip !== undefined ? args.input.CAddress.zip: null,
  //               },
  //     Prospect:              args.input.Prospect !== undefined ? args.input.Prospect: null,
  //     photo_links:           args.input.photo_links !== undefined ? args.input.photo_links: null,
  //     Nominee_Doc:           args.input.Nominee_Doc !== undefined ? args.input.Nominee_Doc: null,
  //         }, 
  //       })   
  //     return "Updated !"     
  // },	   

  updateUserData1: async (parent: any, args: any, context: Context) => {
      //console.log("this is updateUserdata1 block");   
      await context.prisma.user_data.update({
          where: { id: args.input.id },
          data: {      
      Vehicle_Reg_Doc       : args.input.Vehicle_Reg_Doc !== undefined ? args.input.Vehicle_Reg_Doc: null,
      Owner: args.input.Owner!== undefined ? args.input.Owner: null,
      Gender: args.input.Gender!== undefined ? args.input.Gender: null,
      Vehicle_Kind: args.input.Vehicle_Kind!== undefined ? args.input.Vehicle_Kind: null,
      Son_Wife_Daughter_Of: args.input.Son_Wife_Daughter_Of !== undefined ? args.input.Son_Wife_Daughter_Of: null,
      RC_No: args.input.RC_No !== undefined ? args.input.RC_No: null,
      Chasis_No: args.input.Chasis_No !== undefined ? args.input.Chasis_No: null,
      Engine_No: args.input.Engine_No !== undefined ? args.input.Engine_No: null,
      Make: args.input.Make !== undefined ? args.input.Make: null,
      Model: args.input.Model !== undefined ? args.input.Model: null,
      Registered_Date: args.input.Registered_Date !== undefined ? args.input.Registered_Date: null,
      tax_due_Date: args.input.tax_due_Date !== undefined ? args.input.tax_due_Date: null,
      Vehicle_type: args.input.Vehicle_type !== undefined ? args.input.Vehicle_type: null,
      Vehicle_Description:   args.input.Vehicle_Description !== undefined ? args.input.Vehicle_Description: null,
      Fuel_type: args.input.Fuel_type !== undefined ? args.input.Fuel_type: null,
      Vehice_norms: args.input.Vehice_norms !== undefined ? args.input.Vehice_norms: null,
      Vehicle_color: args.input.Vehicle_color !== undefined ? args.input.Vehicle_color: null,
      Seating_Capacity:      args.input.Seating_Capacity !== undefined ? args.input.Seating_Capacity: null,
      Standing_Capacity:     args.input.Standing_Capacity !== undefined ? args.input.Standing_Capacity: null,
      Hypothecation_bank: args.input.Hypothecation_bank !== undefined ? args.input.Hypothecation_bank: null,
      Hypothecation_city: args.input.Hypothecation_city !== undefined ? args.input.Hypothecation_city: null,
      Ownership_type: args.input.Ownership_type !== undefined ? args.input.Ownership_type: null,
      Sleeper_Capacity      : args.input.Sleeper_Capacity !== undefined ? args.input.Sleeper_Capacity: null,
          }, 
        })  
    return "Updated !"    
  },
    
  updateUserData2: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateUserdata2 block");   		
    await context.prisma.user_data.update({
          where: { id: args.input.id },
          data: {		          
      Insurance_type: args.input.Insurance_type !== undefined ? args.input.Insurance_type: null,
      Policy_No: args.input.Policy_No !== undefined ? args.input.Policy_No: null,
      OD_Policy_Doc         : args.input.OD_Policy_Doc !== undefined ? args.input.OD_Policy_Doc: null,
      Insurance_provider: args.input.Insurance_provider !== undefined ? args.input.Insurance_provider: null,
      Insurance_Start       : args.input.Insurance_Start !== undefined ? args.input.Insurance_Start: null,
      Insurance_dueDate: args.input.Insurance_dueDate !== undefined ? args.input.Insurance_dueDate: null,
      TP_Policy_No          : args.input.TP_Policy_No !== undefined ? args.input.TP_Policy_No: null,
      TP_Policy_Doc         : args.input.TP_Policy_Doc !== undefined ? args.input.TP_Policy_Doc: null,
      TP_Insurance_provider: args.input.TP_Insurance_provider !== undefined ? args.input.TP_Insurance_provider: null,
      TP_Insurance_Start    : args.input.TP_Insurance_Start !== undefined ? args.input.TP_Insurance_Start: null,
      TP_dueDate: args.input.TP_dueDate !== undefined ? args.input.TP_dueDate: null,
      RTO: args.input.RTO !== undefined ? args.input.RTO: null,
      Unladen_Weight        : args.input.Unladen_Weight !== undefined ? args.input.Unladen_Weight: null,
      GVW: args.input.GVW !== undefined ? args.input.GVW: null,
      Vehicle_Body          : args.input.Vehicle_Body !== undefined ? args.input.Vehicle_Body: null,
      Wheel_Base            : args.input.Wheel_Base !== undefined ? args.input.Wheel_Base: null,
      No_Of_Cylinder        : args.input.No_Of_Cylinder !== undefined ? args.input.No_Of_Cylinder: null,      
          }, 
        })  
    return "Updated !"    
  },		
        
  updateUserData3: async (parent: any, args: any, context: Context) => {
     //console.log("this is updateUserdata3 block");   			
     await context.prisma.user_data.update({
          where: { id: args.input.id },
          data: {                   	                
            Owner_dob: args.input.Owner_dob !== undefined ? args.input.Owner_dob: null,             
            Address: {
              street: args.input.Address.street !== undefined ? args.input.Address.street: null,
              city: args.input.Address.city !== undefined ? args.input.Address.city: null,
              state: args.input.Address.state !== undefined ? args.input.Address.state: null,
              zip: args.input.Address.zip !== undefined ? args.input.Address.zip: null,
            },                          
            Year_of_manufacuring: args.input.Year_of_manufacuring !== undefined ? args.input.Year_of_manufacuring: null,
            FC_due_Date: args.input.FC_due_Date !== undefined ? args.input.FC_due_Date: null,
            Permit_No: args.input.Permit_No !== undefined ? args.input.Permit_No: null,
            Permit_category: args.input.Permit_category !== undefined ? args.input.Permit_category: null,
            Mobile_No1: args.input.Mobile_No1 !== undefined ? args.input.Mobile_No1: null,
            Mobile_No2: args.input.Mobile_No2 !== undefined ? args.input.Mobile_No2: null,
            Email_id: args.input.Email_id !== undefined ? args.input.Email_id: null,
            Adhar_No: args.input.Adhar_No !== undefined ? args.input.Adhar_No: null,
            Adhar_doc: args.input.Adhar_doc !== undefined ? args.input.Adhar_doc: null,
            PanCard_No: args.input.PanCard_No !== undefined ? args.input.PanCard_No: null,
            Pan_doc: args.input.Pan_doc !== undefined ? args.input.Pan_doc: null,
            Nominee: args.input.Nominee !== undefined ? args.input.Nominee: null,
            Nominee_dob: args.input.Nominee_dob !== undefined ? args.input.Nominee_dob: null,
            Emission_dueDate: args.input.Emission_dueDate !== undefined ? args.input.Emission_dueDate: null,                                        
            Referred_by: args.input.Referred_by !== undefined ? args.input.Referred_by: null,
            Comments: args.input.Comments !== undefined ? args.input.Comments: null,
            Customer_type: args.input.Customer_type !== undefined ? args.input.Customer_type: null,
            Martial_status: args.input.Martial_status !== undefined ? args.input.Martial_status: null,
            GST_No: args.input.GST_No !== undefined ? args.input.GST_No: null,                          
            Mobile_No3 : args.input.Mobile_No3 !== undefined ? args.input.Mobile_No3: null,
            Nominee_Relationship: args.input.Nominee_Relationship !== undefined ? args.input.Nominee_Relationship: null,            
            CC : args.input.CC !== undefined ? args.input.CC: null,
            PUCC_Emission_No      : args.input.PUCC_Emission_No !== undefined ? args.input.PUCC_Emission_No: null,
            updated_by            : args.input.updated_by !== undefined ? args.input.updated_by: null,
            GST_Cer_Doc           : args.input.GST_Cer_Doc !== undefined ? args.input.GST_Cer_Doc: null,
            Permit_dueDate:        args.input.Permit_dueDate,
            CAddress: {
              street: args.input.Address.street !== undefined ? args.input.CAddress.street: null,
              city: args.input.Address.city !== undefined ? args.input.CAddress.city: null,
              state: args.input.Address.state !== undefined ? args.input.CAddress.state: null,
              zip: args.input.Address.zip !== undefined ? args.input.CAddress.zip: null,
                      },
            Prospect:              args.input.Prospect !== undefined ? args.input.Prospect: null,
            photo_links:           args.input.photo_links !== undefined ? args.input.photo_links: null,
            Nominee_Doc:           args.input.Nominee_Doc !== undefined ? args.input.Nominee_Doc: null,
          }, 
        })   
      return "Updated !"     
  },	   
  
  updateMake: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateMake block");    
    await context.prisma.mAKE.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,              
      },
    })      
  return "Updated !!"
  },

  updateVehicleColor: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateVehicleColor block");
    await context.prisma.vEHICLE_COLOR.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateVehicleNorms: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateVehicleNorms block");
    await context.prisma.vEHICE_NORMS.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateCC: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateCC block");
    await context.prisma.cC.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateModel: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateModel block");
    await context.prisma.mODEL.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateInsuranceProvider: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateInsuranceProvider block");
    await context.prisma.iNSURANCE_PROVIDER.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updatePermitCategory: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdatePermitCategory block");
    await context.prisma.pERMIT_CATEGORY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateTpInsuranceProvider: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateTpInsuranceProvider block");
    await context.prisma.tP_INSURANCE_PROVIDER.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateVehicleClass: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateVehicleClass block");
    await context.prisma.vEHICLE_CLASS.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateCustomerType: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateCustomerType block");
    await context.prisma.cUSTOMER_TYPE.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateVehicleDescription: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateVehicleDescription block");
    await context.prisma.vEHICLE_DESCRIPTION.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateSeatingCapacity: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateSeatingCapacity block");
    await context.prisma.sEATING_CAPACITY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateStandingCapacity: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateStandingCapacity block");
    await context.prisma.sTANDING_CAPACITY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateRTO: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateRTO block");
    await context.prisma.rTO.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateHypothecationBank: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateHypothecationBank block");
    await context.prisma.hYPOTHECATION_BANK.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateHypothecationCity: async (parent: any, args: any, context: Context) => {
    //console.log("this is UpdateHypothecationCity block");
    await context.prisma.hYPOTHECATION_CITY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateUnladenWeight: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateUnladenWeight block");
    await context.prisma.uNLADEN_WEIGHT.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateGvw: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateGvw block");
    await context.prisma.gVW.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateVehicleBody: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateVehicleBody block");
    await context.prisma.vEHICLE_BODY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateWheelBase: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateWheelBase block");
    await context.prisma.wHEEL_BASE.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateNoOfCylinder: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateNoOfCylinder block");
    await context.prisma.nO_OF_CYLINDER.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateSleeperCapacity: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateSleeperCapacity block");
    await context.prisma.sLEEPER_CAPACITY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateUpdatedBy: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateUpdatedBy block");
    await context.prisma.uPDATED_BY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },
  updateReferredBy: async (parent: any, args: any, context: Context) => {
    //console.log("this is updateReferredBy block");
    await context.prisma.rEFERRED_BY.update({
      where: { id: args.input.id },
      data: {
        value: args.input.value,
      },
    });
    return "Updated !!";
  },






  deleteAppuser: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteAppuser block");      
    await context.prisma.app_user.delete({
      where: { userid: args.id },        
    })
    
    return "App User Deleted Successfully!"
    
  },

  deleteUserData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteAppuser block");    
    await context.prisma.user_data.delete({
      where: { id: args.id },      
    })
    return "UserData Deleted Successfully!"
    
  },

  deleteMakeData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteMakeData block");    
    await context.prisma.mAKE.delete({
      where: { id: args.id },      
    })
    return "MakeData Deleted Successfully!"    
  },
  deleteVehicleColorData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteVehicleColorData block");
    await context.prisma.vEHICLE_COLOR.delete({
      where: { id: args.id },
    });
    return "VehicleColorData Deleted Successfully!";
  },
  deleteVehicleNormsData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteVehicleNormsData block");
    await context.prisma.vEHICE_NORMS.delete({
      where: { id: args.id },
    });
    return "VehicleNormsData Deleted Successfully!";
  },
  deleteCCData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteCCData block");
    await context.prisma.cC.delete({
      where: { id: args.id },
    });
    return "CCData Deleted Successfully!";
  },
  deleteModelData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteModelData block");
    await context.prisma.mODEL.delete({
      where: { id: args.id },
    });
    return "ModelData Deleted Successfully!";
  },
  deleteInsuranceProviderData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteInsuranceProviderData block");
    await context.prisma.iNSURANCE_PROVIDER.delete({
      where: { id: args.id },
    });
    return "InsuranceProviderData Deleted Successfully!";
  },
  deletePermitCategoryData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deletePermitCategoryData block");
    await context.prisma.pERMIT_CATEGORY.delete({
      where: { id: args.id },
    });
    return "PermitCategoryData Deleted Successfully!";
  },
  deleteTpInsuranceProviderData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteTpInsuranceProviderData block");
    await context.prisma.tP_INSURANCE_PROVIDER.delete({
      where: { id: args.id },
    });
    return "TpInsuranceProviderData Deleted Successfully!";
  },
  deleteVehicleClassData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteVehicleClassData block");
    await context.prisma.vEHICLE_CLASS.delete({
      where: { id: args.id },
    });
    return "VehicleClassData Deleted Successfully!";
  },
  deleteCustomerTypeData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteCustomerTypeData block");
    await context.prisma.cUSTOMER_TYPE.delete({
      where: { id: args.id },
    });
    return "CustomerTypeData Deleted Successfully!";
  },
  deleteVehicleDescriptionData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteVehicleDescriptionData block");
    await context.prisma.vEHICLE_DESCRIPTION.delete({
      where: { id: args.id },
    });
    return "VehicleDescriptionData Deleted Successfully!";
  },
  deleteSeatingCapacityData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteSeatingCapacityData block");
    await context.prisma.sEATING_CAPACITY.delete({
      where: { id: args.id },
    });
    return "SeatingCapacityData Deleted Successfully!";
  },
  deleteStandingCapacityData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteStandingCapacityData block");
    await context.prisma.sTANDING_CAPACITY.delete({
      where: { id: args.id },
    });
    return "StandingCapacityData Deleted Successfully!";
  },
  deleteRTOData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteRTOData block");
    await context.prisma.rTO.delete({
      where: { id: args.id },
    });
    return "RTOData Deleted Successfully!";
  },
  deleteHypothecationBankData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteHypothecationBankData block");
    await context.prisma.hYPOTHECATION_BANK.delete({
      where: { id: args.id },
    });
    return "HypothecationBankData Deleted Successfully!";
  },
  deleteHypothecationCityData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteHypothecationCityData block");
    await context.prisma.hYPOTHECATION_CITY.delete({
      where: { id: args.id },
    });
    return "HypothecationCityData Deleted Successfully!";
  },
  deleteUnladenWeightData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteUnladenWeightData block");
    await context.prisma.uNLADEN_WEIGHT.delete({
      where: { id: args.id },
    });
    return "UnladenWeightData Deleted Successfully!";
  },
  deleteGvwData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteGvwData block");
    await context.prisma.gVW.delete({
      where: { id: args.id },
    });
    return "GvwData Deleted Successfully!";
  },
  deleteVehicleBodyData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteVehicleBodyData block");
    await context.prisma.vEHICLE_BODY.delete({
      where: { id: args.id },
    });
    return "VehicleBodyData Deleted Successfully!";
  },
  deleteWheelBaseData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteWheelBaseData block");
    await context.prisma.wHEEL_BASE.delete({
      where: { id: args.id },
    });
    return "WheelBaseData Deleted Successfully!";
  },
  deleteNoOfCylinderData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteNoOfCylinderData block");
    await context.prisma.nO_OF_CYLINDER.delete({
      where: { id: args.id },
    });
    return "NoOfCylinderData Deleted Successfully!";
  },
  deleteSleeperCapacityData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteSleeperCapacityData block");
    await context.prisma.sLEEPER_CAPACITY.delete({
      where: { id: args.id },
    });
    return "SleeperCapacityData Deleted Successfully!";
  },
  deleteUpdatedByData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteUpdatedByData block");
    await context.prisma.uPDATED_BY.delete({
      where: { id: args.id },
    });
    return "UpdatedByData Deleted Successfully!";
  },
  deleteReferredByData: async (parent: any, args: any, context: Context) => {
    //console.log("this is deleteReferredByData block");
    await context.prisma.rEFERRED_BY.delete({
      where: { id: args.id },
    });
    return "ReferredByData Deleted Successfully!";
  },

  updateUserData: async (parent: any, args: any, context: Context) => {
    const updateData = {
      Vehicle_Reg_Doc: args.input.Vehicle_Reg_Doc !== undefined ? args.input.Vehicle_Reg_Doc : null,
      Owner: args.input.Owner !== undefined ? args.input.Owner : null,
      Customer: args.input.Customer !== undefined ? args.input.Customer : null,
      Gender: args.input.Gender !== undefined ? args.input.Gender : null,
      Vehicle_Kind: args.input.Vehicle_Kind !== undefined ? args.input.Vehicle_Kind : null,
      Son_Wife_Daughter_Of: args.input.Son_Wife_Daughter_Of !== undefined ? args.input.Son_Wife_Daughter_Of : null,
      RC_No: args.input.RC_No !== undefined ? args.input.RC_No : null,
      Chasis_No: args.input.Chasis_No !== undefined ? args.input.Chasis_No : null,
      Engine_No: args.input.Engine_No !== undefined ? args.input.Engine_No : null,
      Make: args.input.Make !== undefined ? args.input.Make : null,
      Model: args.input.Model !== undefined ? args.input.Model : null,
      Registered_Date: args.input.Registered_Date !== undefined ? args.input.Registered_Date : null,
      tax_due_Date: args.input.tax_due_Date !== undefined ? args.input.tax_due_Date : null,
      Vehicle_type: args.input.Vehicle_type !== undefined ? args.input.Vehicle_type : null,
      Vehicle_Description: args.input.Vehicle_Description !== undefined ? args.input.Vehicle_Description : null,
      Fuel_type: args.input.Fuel_type !== undefined ? args.input.Fuel_type : null,
      Vehice_norms: args.input.Vehice_norms !== undefined ? args.input.Vehice_norms : null,
      Vehicle_color: args.input.Vehicle_color !== undefined ? args.input.Vehicle_color : null,
      Seating_Capacity: args.input.Seating_Capacity !== undefined ? args.input.Seating_Capacity : null,
      Standing_Capacity: args.input.Standing_Capacity !== undefined ? args.input.Standing_Capacity : null,
      Hypothecation_bank: args.input.Hypothecation_bank !== undefined ? args.input.Hypothecation_bank : null,
      Hypothecation_city: args.input.Hypothecation_city !== undefined ? args.input.Hypothecation_city : null,
      Ownership_type: args.input.Ownership_type !== undefined ? args.input.Ownership_type : null,
      Sleeper_Capacity: args.input.Sleeper_Capacity !== undefined ? args.input.Sleeper_Capacity : null,
      Insurance_type: args.input.Insurance_type !== undefined ? args.input.Insurance_type : null,
      Policy_No: args.input.Policy_No !== undefined ? args.input.Policy_No : null,
      OD_Policy_Doc: args.input.OD_Policy_Doc !== undefined ? args.input.OD_Policy_Doc : null,
      Insurance_provider: args.input.Insurance_provider !== undefined ? args.input.Insurance_provider : null,
      Insurance_Start: args.input.Insurance_Start !== undefined ? args.input.Insurance_Start : null,
      Insurance_dueDate: args.input.Insurance_dueDate !== undefined ? args.input.Insurance_dueDate : null,
      TP_Policy_No: args.input.TP_Policy_No !== undefined ? args.input.TP_Policy_No : null,
      TP_Policy_Doc: args.input.TP_Policy_Doc !== undefined ? args.input.TP_Policy_Doc : null,
      TP_Insurance_provider: args.input.TP_Insurance_provider !== undefined ? args.input.TP_Insurance_provider : null,
      TP_Insurance_Start: args.input.TP_Insurance_Start !== undefined ? args.input.TP_Insurance_Start : null,
      TP_dueDate: args.input.TP_dueDate !== undefined ? args.input.TP_dueDate : null,
      RTO: args.input.RTO !== undefined ? args.input.RTO : null,
      Unladen_Weight: args.input.Unladen_Weight !== undefined ? args.input.Unladen_Weight : null,
      GVW: args.input.GVW !== undefined ? args.input.GVW : null,
      Vehicle_Body: args.input.Vehicle_Body !== undefined ? args.input.Vehicle_Body : null,
      Wheel_Base: args.input.Wheel_Base !== undefined ? args.input.Wheel_Base : null,
      No_Of_Cylinder: args.input.No_Of_Cylinder !== undefined ? args.input.No_Of_Cylinder : null,
      Owner_dob: args.input.Owner_dob !== undefined ? args.input.Owner_dob : null,
      Year_of_manufacuring: args.input.Year_of_manufacuring !== undefined ? args.input.Year_of_manufacuring: null,
      FC_due_Date: args.input.FC_due_Date !== undefined ? args.input.FC_due_Date: null,
      Permit_No: args.input.Permit_No !== undefined ? args.input.Permit_No: null,
      Permit_category: args.input.Permit_category !== undefined ? args.input.Permit_category: null,
      Mobile_No1: args.input.Mobile_No1 !== undefined ? args.input.Mobile_No1: null,
      Mobile_No2: args.input.Mobile_No2 !== undefined ? args.input.Mobile_No2: null,
      Email_id: args.input.Email_id !== undefined ? args.input.Email_id: null,
      Adhar_No: args.input.Adhar_No !== undefined ? args.input.Adhar_No: null,
      Adhar_doc: args.input.Adhar_doc !== undefined ? args.input.Adhar_doc: null,
      PanCard_No: args.input.PanCard_No !== undefined ? args.input.PanCard_No: null,
      Pan_doc: args.input.Pan_doc !== undefined ? args.input.Pan_doc: null,
      Nominee: args.input.Nominee !== undefined ? args.input.Nominee: null,
      Nominee_dob: args.input.Nominee_dob !== undefined ? args.input.Nominee_dob: null,
      Emission_dueDate: args.input.Emission_dueDate !== undefined ? args.input.Emission_dueDate: null,                                        
      Referred_by: args.input.Referred_by !== undefined ? args.input.Referred_by: null,
      Comments: args.input.Comments !== undefined ? args.input.Comments: null,
      Customer_type: args.input.Customer_type !== undefined ? args.input.Customer_type: null,
      Martial_status: args.input.Martial_status !== undefined ? args.input.Martial_status: null,
      GST_No: args.input.GST_No !== undefined ? args.input.GST_No: null,                          
      Mobile_No3 : args.input.Mobile_No3 !== undefined ? args.input.Mobile_No3: null,
      Nominee_Relationship: args.input.Nominee_Relationship !== undefined ? args.input.Nominee_Relationship: null,            
      CC : args.input.CC !== undefined ? args.input.CC: null,
      PUCC_Emission_No      : args.input.PUCC_Emission_No !== undefined ? args.input.PUCC_Emission_No: null,
      updated_by            : args.input.updated_by !== undefined ? args.input.updated_by: null,
      GST_Cer_Doc           : args.input.GST_Cer_Doc !== undefined ? args.input.GST_Cer_Doc: null,
      Permit_dueDate:        args.input.Permit_dueDate,
      Prospect:              args.input.Prospect !== undefined ? args.input.Prospect: null,
      photo_links:           args.input.photo_links !== undefined ? args.input.photo_links: null,
      Nominee_Doc:           args.input.Nominee_Doc !== undefined ? args.input.Nominee_Doc: null,
    };
  
    const addressData = {
      street: args.input.Address.street !== undefined ? args.input.Address.street : null,
      city: args.input.Address.city !== undefined ? args.input.Address.city : null,
      state: args.input.Address.state !== undefined ? args.input.Address.state : null,
      zip: args.input.Address.zip !== undefined ? args.input.Address.zip : null,
    };
  
    const cAddressData = {
      street: args.input.CAddress.street !== undefined ? args.input.CAddress.street : null,
      city: args.input.CAddress.city !== undefined ? args.input.CAddress.city : null,
      state: args.input.CAddress.state !== undefined ? args.input.CAddress.state : null,
      zip: args.input.CAddress.zip !== undefined ? args.input.CAddress.zip : null,
    };
  
    // MongoDB Connection URI
    const uri = process.env?.DATABASE_URL;    
    //console.log("id: " +  args.input.id);
  
    const client = new MongoClient(uri!);
  
    if (uri) {
    try {
      await client.connect();
  
      const databaseName = client.db().databaseName;   
      const collectionName = 'user_data'; // Adjust collection name as needed
      const collection = client.db(databaseName).collection(collectionName);
            
  
    //console.log("Connected to database: " + JSON.stringify(databaseName, null, 2));              
    const objectId = new ObjectId(args.input.id);
    
    //Test DataFetch from the collection
    //const result = await collection.findOne({ _id: objectId });


      const result = await collection.updateOne(
        { _id: objectId },
        {
          $set: {
            ...updateData,
            Address: { ...addressData },
            CAddress: { ...cAddressData },
            updatedAt: new Date()
          },
        }
      );
                        
      //console.log("ResultByID:  " + JSON.stringify(result, null, 2))
  
      return 'Updated !!!';
    } catch(e){
      //console.log(e);
    }finally {
      await client.close();
    }
  }
  },

  }
};
