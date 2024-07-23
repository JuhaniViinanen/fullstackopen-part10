import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {

  const {data, loading, fetchMore, ...result} = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (canFetchMore) {
      fetchMore({
        variables: {
          ...variables,
          after: data?.repository.reviews.pageInfo.endCursor,
        },
      });
    }
  };

  return {
    data,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };

};

export default useRepository;