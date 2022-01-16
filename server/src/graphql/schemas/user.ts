import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  extend type Query {
    users: [User]!
    user(userID: ID!): User
  }

  extend type Mutation {
    createUser(newUser: UserInput): User
    updateUser(userID: ID!, updatedUser: UserInput): User
  }

  type User {
    _id: ID!
    firstname: String
    lastname: String
    username: String
    image: [String]
    role: [String!]!
    deleted: Boolean!
  }

  input UserInput {
    firstname: String
    lastname: String
    username: String
    password: String
    image: [String]
    role: [String]
    deleted: Boolean
  }
`;
