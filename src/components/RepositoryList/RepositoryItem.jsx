import { View, StyleSheet, Image } from "react-native";
import Text from "../Text";
import theme from "../../theme";

import LanguageTag from "./LanguageTag";
import RepositoryStat from "./RepositoryStat";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 10,
    rowGap: 15
  },
  userImage: {
    width: theme.userImage.width,
    height: theme.userImage.height
  },
});

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", columnGap: 20 }}>
        <Image style={styles.userImage} source={{ uri: item.ownerAvatarUrl }} />
        <View style={{ rowGap: 10 , width: 0, flexGrow: 1}}>
          <Text fontWeight="bold" style={{ flex: 1 }} >{item.fullName}</Text>
          <Text color="textSecondary" style={{ flex: 1 }} >{item.description}</Text>
          <LanguageTag text={item.language} />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <RepositoryStat stat={item.stargazersCount} name="Stars" />
        <RepositoryStat stat={item.forksCount} name="Forks" />
        <RepositoryStat stat={item.reviewCount} name="Reviews" />
        <RepositoryStat stat={item.ratingAverage} name="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;