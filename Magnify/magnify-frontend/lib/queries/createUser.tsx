import { gql } from "@apollo/client";

const CREATEUSER = gql`mutation createUser($user: CreateUserInput!) {
    createUser(createUserInput: $user) {
      username
      email
    }
  }`;

export default CREATEUSER;