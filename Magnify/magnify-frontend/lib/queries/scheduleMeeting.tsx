import { gql } from "@apollo/client";

const SCHEDULE = gql`query schedule($user: ScheduleMeetingInput!) {
    schedule(ScheduleMeetingInput: $user)
  }`;

export default SCHEDULE;