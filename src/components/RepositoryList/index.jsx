import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

// eslint-disable-next-line no-unused-vars
export const RepositoryListContainer = ({ repositories, onPress = (_) => null }) => {

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data } = useRepositories();
  const navigate = useNavigate();

  const onPress = (itemId) => navigate(`/${itemId}`);

  return <RepositoryListContainer repositories={data?.repositories} onPress={onPress} />;
};

export default RepositoryList;