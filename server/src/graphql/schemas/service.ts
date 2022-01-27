import { gql } from "apollo-server-express";

export const serviceTypeDefs = gql`
  extend type Query {
    services(pageSize: Int, after: Int): [Service]!
    service(serviceID: ID!): Service
  }

  extend type Mutation {
    createService(newService: ServiceInput): Service
    updateService(serviceID: ID!, updatedService: ServiceInput): Service
  }

  type Service {
    _id: ID!
    name: String
    centre: Centre
    porte: Int
    type: String
    prestations: [Prestation]
    deleted: Boolean!
    createdAt: String
    updatedAt: String
  }

  input ServiceInput {
    name: String
    centre: String
    porte: Int
    type: String
    prestations: [String]
    deleted: Boolean
  }
`;
