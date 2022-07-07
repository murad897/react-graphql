import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($token: String) {
    getUser(token: $token) {
      first_name
    }
  }
`;
