import { gql } from "@apollo/client";
import { BASIC_REPO_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${BASIC_REPO_FIELDS}
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...BasicRepoFields
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${BASIC_REPO_FIELDS}
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...BasicRepoFields
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
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