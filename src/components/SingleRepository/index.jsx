import { FlatList, View } from 'react-native';
import { useParams } from "react-router-native";

import ReviewItem from '../ReviewItem';
import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const SingleRepositoryContainer = ({ data, onEndReached }) => {
  const reviewNodes = data
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} githubButton />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const { repositoryId } =  useParams();
  const { data, fetchMore } = useRepository({
    repositoryId,
    first: 8,
    after: '',
  });
  
  return data
    ? <SingleRepositoryContainer data={data} onEndReached={fetchMore} />
    : null;
};

export default SingleRepository;