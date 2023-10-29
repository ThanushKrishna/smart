import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();


const users = prisma.user.findMany();
const app_users = prisma.app_user.findMany();

export const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

export const resolvers = {
  Query: {
    users: () => users,
    books: () => books,
    app_user: () => app_users,
  },
  Mutation: {
    CreateAppuser: async (_, { input: { emailid, firstname, lastname, password, mobile } }) => {
      console.log("this is Createuser block");
      const res = { emailid, password, firstname, lastname, mobile };
      console.log({ res });
      await prisma.app_user.create({
        data: {
          emailid: emailid,
          firstname: firstname,
          lastname: lastname,
          password: password,
          mobile: mobile
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

    deletAppuser: async (_, { id }) => {
      console.log("this is updateAppuser block");
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
  }
};
