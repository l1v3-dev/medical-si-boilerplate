import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers($pageSize: Int $after: Int) {
    users(pageSize: $pageSize, after: $after) {
      _id
      username
      lastname
      firstname
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
