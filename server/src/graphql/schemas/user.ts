import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  extend type Query {
    users(pageSize: Int, after: Int): [User]!
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
    role: [String]!
    deleted: Boolean!
    createdAt: String
    updatedAt: String
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
