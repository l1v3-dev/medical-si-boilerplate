import { ApolloServerExpressConfig, gql } from "apollo-server-express";
import resolvers from "../resolvers";

import { authTypeDefs } from "./auth";
import { userTypeDefs } from "./user";
import { centreTypeDefs } from "./centre";
import { serviceTypeDefs } from "./service";
import { prestationTypeDefs } from "./prestation";

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
  ${centreTypeDefs}
  ${prestationTypeDefs}
  ${serviceTypeDefs}
  ${userTypeDefs}
`;

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
};

export default schema;
