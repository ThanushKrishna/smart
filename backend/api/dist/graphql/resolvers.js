import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
const app_users = prisma.app_user.findMany();
export const resolvers = {
    Query: {
        app_user: () => app_users,
    },
    Mutation: {
        CreateAppuser: async (_, { input: { emailid, firstname, lastname, password, mobile, address: { street, city, state, zip }, gender, profile_pic, role } }) => {
            console.log("this is Createuser block");
            const res = { emailid, firstname, lastname, password, mobile, address: { street, city, state, zip }, gender, profile_pic, role };
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
        deletAppuser: async (_, { id }) => {
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
    }
};
