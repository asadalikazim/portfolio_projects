import { gql } from "@apollo/client";

const LOGOUTUSER = gql`query logout {
    logout
  }`;

export default LOGOUTUSER;
