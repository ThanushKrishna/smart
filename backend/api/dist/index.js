import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { prisma } from '../../db/dist/index.js';
// const user = await prisma.user.create({
//   data: { emailid: 'jinkin@prisma.io',
//           firstname:'Jan',
//           lastname:'month'
//   },
// })
// const app_user = await prisma.app_user.create({
//   data: { emailid: 'jinkin@prisma.io',
//           firstname:'Jan',
//           lastname:'month',
//           password: 'welcome123'
//   },
// })
// const users = prisma.user.findFirst({
//   where: { 
//       firstname: 'Thanush'
//   },
// })
const users = prisma.user.findMany();
const app_users = prisma.app_user.findMany();
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    users: [User]
    app_user: [app_user]
  }

  enum GENDER {
    MALE
    FEMALE
  }

  enum ROLE {
    USER
    ADMIN
}

  input UpdateAppuserName{
    id: ID!
    firstname: String!
  }

  type Mutation{
    CreateAppuser(input: CreateAppuserInput!):app_user,
    UpdateAppuser(input: UpdateAppuserName!): app_user,
    deletAppuser(id: ID!): app_user
  }

`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        users: () => users,
        books: () => books,
        app_user: () => app_users,
    },
    Mutation: {
        CreateAppuser: (parent, args) => {
            const user = args.input;
            console.log(user);
        }
    }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
