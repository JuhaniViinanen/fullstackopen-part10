import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy = "CREATED_AT", orderDirection = "DESC" }) => {
  return useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection },
  });
};

export default useRepositories;