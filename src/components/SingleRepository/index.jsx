import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from "react-router-native";

import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 10
  },
  ratingText: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    height: 50,
    width: 50,
    paddingTop: 14,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item }) => {
  const date = new Date(item.createdAt).toISOString().substring(0,10);
  return (
    <View style={styles.container} >
      <View style={{ flexDirection: "row", columnGap: 10 }}>
        <View>
          <Text fontSize="subheading" fontWeight="bold" style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={{ rowGap: 5 , width: 0, flexGrow: 1}}>
          <View>
            <Text fontWeight="bold" >{item.user.username}</Text>
            <Text color="textSecondary" >{date}</Text>
          </View>
          <View>
            <Text>{item.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SingleRepositoryContainer = ({ data }) => {
  const reviewNodes = data
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={({ id }) => id}
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