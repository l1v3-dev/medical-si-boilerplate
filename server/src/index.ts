import connectDB from "config/db";
import typeDefs from "graphql/schemas";
import resolvers from 'graphql/resolvers'
import { startApolloServer } from "config/server";

connectDB();
startApolloServer(typeDefs, resolvers)
