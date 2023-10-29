export const typeDefs = `#graphql

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


  type Query {
    app_user: [app_user]
  }


############ Start of Mutation Block ############
############ Start of Mutation Block ############
############ Start of Mutation Block ############

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

  input UpdateAppuserInput {
    lastname: String
  }


  type Mutation{
    CreateAppuser(input: CreateAppuserInput!):CreateAppuserOutput
    UpdateAppuser(ID: ID!, input: UpdateAppuserInput!): String
    deletAppuser(id: ID!): String
  }


`;
