import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query {
    users {
      _id
      username
      lastname
      firstname
      sexe
    }
  }
`;

export const GET_ONE_USER = gql`
  query GET_USER($userID: String!) {
    user(userID: $userID) {
      _id
      username
      firstname
      lastname
    }
  }
`;
