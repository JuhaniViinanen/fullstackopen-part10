import { gql } from "@apollo/client";

export const BASIC_REPO_FIELDS = gql`
  fragment BasicRepoFields on Repository {
    id
    fullName
    description
    language
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
  }
`;