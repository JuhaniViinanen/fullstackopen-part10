import { View, StyleSheet, Image, Pressable } from "react-native";
import { openURL } from "expo-linking";

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
  buttonText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    padding: 15,
    alignSelf: "stretch",
    textAlign: "center",
    borderRadius: 5,
  },
});

const RepositoryItem = ({ item, githubButton = false }) => {
  return (
    <View style={styles.container} testID="repositoryItem" >
      <View style={{ flexDirection: "row", columnGap: 20 }}>
        <Image style={styles.userImage} source={{ uri: item.ownerAvatarUrl }} />
        <View style={{ rowGap: 10 , width: 0, flexGrow: 1}}>
          <View>
            <Text fontWeight="bold">{item.fullName}</Text>
          </View>
          <View>
            <Text color="textSecondary">{item.description}</Text>
          </View>
          <LanguageTag text={item.language} />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <RepositoryStat stat={item.stargazersCount} name="Stars" />
        <RepositoryStat stat={item.forksCount} name="Forks" />
        <RepositoryStat stat={item.reviewCount} name="Reviews" />
        <RepositoryStat stat={item.ratingAverage} name="Rating" />
      </View>
      {githubButton &&
        <Pressable onPress={() => openURL(item.url)} >
          <Text fontSize="subheading" fontWeight="bold" style={styles.buttonText} >{"Open in GitHub"}</Text>
        </Pressable>
      }
    </View>
  );
};

export default RepositoryItem;