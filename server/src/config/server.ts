import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  // ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

import express from 'express';
import http from 'http';
import config from '.'

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ApolloServerPluginLandingPageGraphQLPlayground({endpoint: '/pl'}),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, path: '/' });
  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT || config.port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
