import { gql } from "@apollo/client";
import { BASIC_REPO_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${BASIC_REPO_FIELDS}
  query {
    repositories {
      edges {
        node {
          ...BasicRepoFields
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;