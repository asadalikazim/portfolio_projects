import { gql } from "@apollo/client";

const LOGINUSER = gql`query login($user: LoginUserInput!) {
    login(LoginUserInput: $user){
      username
    }
  }`;

export default LOGINUSER;