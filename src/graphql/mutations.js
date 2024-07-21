import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      createdAt
      rating
      repository {
        fullName
        ownerName
      }
      text
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
}
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    id
    createdAt
    username
  }
}
`;