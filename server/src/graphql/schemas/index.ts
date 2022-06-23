import { gql } from "apollo-server-express";
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

export default typeDefs;
