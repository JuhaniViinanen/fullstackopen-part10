import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  return useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
};

export default useRepositories;