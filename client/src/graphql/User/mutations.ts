import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CREATEUSER(
    $firstname: String
    $lastname: String
    $username: String
    $password: String
    $sexe: String
  ) {
    createUser(
      {firstname: $firstname
      lastname: $lastname
      username: $username
      password: $password
      sexe: $sexe}
    ) {
      _id
      username
      lastname
      firstname
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $userID: String!
    $username: String
    $firstname: String
    $lastname: String
    $sexe: String
    $age: Number
  ) {
    updateUser(
      userID: $userID
      username: $username
      firstname: $firstname
      lastname: $lastname
      age: $age
      sexe: $sexe
    ) {
      _id
      firstname
      lastname
      username
      sexe
    }
  }
`;
