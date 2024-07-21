import { FlatList, View } from 'react-native';
import { useParams } from "react-router-native";

import ReviewItem from '../ReviewItem';
import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";

const ItemSeparator = () => <View style={{ height: 10 }} />;

const SingleRepositoryContainer = ({ data }) => {
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
    />
  );
};

const SingleRepository = () => {
  const { repositoryId } =  useParams();
  const { data } = useRepository(repositoryId);
  
  return data
    ? <SingleRepositoryContainer data={data} />
    : null;
};

export default SingleRepository;