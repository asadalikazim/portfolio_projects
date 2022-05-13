import { gql } from "@apollo/client";

const GETUSER = gql`query getUser($email: String!) {
    user(email: $email){
      email
      username
      firstName
      lastName
    }
  }`;

export default GETUSER;