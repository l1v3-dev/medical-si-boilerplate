import { gql } from "apollo-server-express";

export const centreTypeDefs = gql`
  extend type Query {
    centres(pageSize: Int, after: Int): [Centre]!
    centre(centreID: ID!): Centre
  }

  extend type Mutation {
    createCentre(newCentre: CentreInput): Centre
    updateCentre(centreID: ID!, updatedCentre: CentreInput): Centre
  }

  type Centre {
    _id: ID!
    name: String
    location: String
    createdAt: String
    updatedAt: String
  }

  input CentreInput {
    name: String
    location: String
  }
`;
