import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  return useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId },
    skip: !repositoryId,
  });
};

export default useRepository;