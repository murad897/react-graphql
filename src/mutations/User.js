import { gql } from "@apollo/client";

export const USER_REGISTRATE = gql`
  mutation userRegistrate($input: UserInput) {
    userRegistrate(input: $input) {
      first_name
    }
  }
`;

export const USER_LOGIN = gql`
  mutation loginUser($input: UserInput) {
    loginUser(input: $input) {
      first_name
      token
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      image
    }
  }
`;
