import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import  prisma  from "../../prisma/db";
import { typeDefs } from '@/graphql/schema'
import { resolvers } from '@/graphql/resolvers'
import Cors from 'micro-cors'

let serverStarted = false;

export type Context = {
  prisma: PrismaClient;
}

console.log("process.env.NEXT_PUBLIC_ORIGIN", process.env.NEXT_PUBLIC_ORIGIN);

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  origin: process.env.NEXT_PUBLIC_ORIGIN, // replace with your origins
});


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => ({ req, res, prisma }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

let handler:any;

(async () => {
  if (!serverStarted) {
    await apolloServer.start();
    serverStarted = true;
    handler = apolloServer.createHandler({ path: '/api/graphql' });
  }
})();

export default cors((req, res) => {
  if (serverStarted) {
    return handler(req, res);
  }
  // If the server is not started yet, end the response and return
  res.end();
  return;
});