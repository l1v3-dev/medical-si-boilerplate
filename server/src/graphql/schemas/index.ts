import { ApolloServerExpressConfig, gql } from "apollo-server-express";
import resolvers from "../resolvers";

import { authTypeDefs } from "./auth";
import { userTypeDefs } from "./user";

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
  ${authTypeDefs}
  ${userTypeDefs}
`;

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
};

export default schema;
