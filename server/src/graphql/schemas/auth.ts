import { gql } from "apollo-server-express";

export const authTypeDefs = gql`
  extend type Mutation {
    login(loginParams: LoginInput): LoginResponse
    seed(nbUsers: Int): [User]
  }

  input LoginInput {
    email: String
    tel: String
    password: String!
  }

  type LoginResponse {
    access_token: String
    refresh_token: String
  }
`;
