import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const sortingOptions = [
  {
    orderBy: "CREATED_AT",
    orderDirection: "DESC"
  },
  {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC"
  },
  {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC"
  }
];

const ItemSeparator = () => <View style={styles.separator} />;

const HeaderPicker = ({ value, setValue }) => {
  return <Picker
    selectedValue={value}
    onValueChange={(itemValue) => setValue(itemValue)}
  >
    <Picker.Item label='Latest repositories' value={0} />
    <Picker.Item label='Highest rated repositories' value={1} />
    <Picker.Item label='Lowest rated repositories' value={2} />
  </Picker>;
};

// eslint-disable-next-line no-unused-vars
export const RepositoryListContainer = ({
  repositories,
  onPress = () => null,
  value = 0,
  setValue = () => null,
}) => {

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
      ListHeaderComponent={<HeaderPicker value={value} setValue={setValue} />}
      ListHeaderComponentStyle={{ marginVertical: 10 }}
    />
  );
};

const RepositoryList = () => {
  const [sorting, setSorting] = useState(0);
  const { data } = useRepositories(sortingOptions[sorting]);
  const navigate = useNavigate();

  const onPress = (itemId) => navigate(`/${itemId}`);

  return <RepositoryListContainer
    repositories={data?.repositories}
    onPress={onPress}
    value={sorting}
    setValue={setSorting}
  />;
};

export default RepositoryList;