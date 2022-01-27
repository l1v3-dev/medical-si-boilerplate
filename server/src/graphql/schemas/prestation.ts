import { gql } from "apollo-server-express";

export const prestationTypeDefs = gql`
  extend type Query {
    prestations(pageSize: Int, after: Int): [Prestation]!
    prestation(prestationID: ID!): Prestation
  }

  extend type Mutation {
    createPrestation(newPrestation: PrestationInput): Prestation
    updatePrestation(prestationID: ID!, updatedPrestation: PrestationInput): Prestation
  }

  type Prestation {
    _id: ID!
    name: String
    cout: Int
    service: Service
    type: String
    createdAt: String
    updatedAt: String
  }

  input PrestationInput {
    name: String
    cout: Int
    service: String
    type: String
    deleted: Boolean
  }
`