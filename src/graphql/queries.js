import { gql } from "@apollo/client";
import { BASIC_REPO_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${BASIC_REPO_FIELDS}
  query Repositories(
  $orderBy: AllRepositoriesOrderBy,
  $orderDirection: OrderDirection,
  $searchKeyword: String,
  $first: Int,
  $after: String
  ) {
    repositories(
    orderBy: $orderBy,
    orderDirection: $orderDirection,
    searchKeyword: $searchKeyword,
    first: $first,
    after: $after
    ) {
      edges {
        node {
          ...BasicRepoFields
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${BASIC_REPO_FIELDS}
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...BasicRepoFields
      url
      reviews(first: $first, after: $after) {
        edges {
          cursor
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
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;