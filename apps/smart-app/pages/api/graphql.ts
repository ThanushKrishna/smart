import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';
import  prisma  from "../../prisma/db";
import { typeDefs } from '@/graphql/schema'
import { resolvers } from '@/graphql/resolvers'

export type Context = {
  prisma: PrismaClient;
}

export const config = {
  api: {
    responseLimit: '4mb',
  },
}

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(apolloServer, {
	context: async (req, res) => ({ req, res, prisma }),
});