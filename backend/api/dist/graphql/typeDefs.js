export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type User {
    firstname: String!
    lastname: String
    emailid: String!
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
    books: [Book]
    users: [User]
    app_user: [app_user]
  }

  type Mutation{
    CreateAppuser(input: CreateAppuserInput!):CreateAppuserOutput
    UpdateAppuser(ID: ID!, input: UpdateAppuserInput!): String
    deletAppuser(id: ID!): String
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
    profile_pic: Int
    mobile: Int
    role: ROLE
  }

  input CreateAddressInput{
    street: String
    city:   String
    state:  String
    zip:    String
  }

  input UpdateAppuserInput {
    lastname: String
  }


  enum GENDER {
    MALE
    FEMALE
  }

  enum ROLE {
    USER
    ADMIN
}

`;
