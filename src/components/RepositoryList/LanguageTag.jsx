import { StyleSheet, View } from "react-native";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  LanguageTag: {
    color: "white",
    backgroundColor: theme.colors.primary,
    padding: 5,
    alignSelf: "baseline",
    borderRadius: 5
  }
});

const LanguageTag = ({ text }) => {
  return (
    <View>
      <Text style={styles.LanguageTag}>{text}</Text>
    </View>
  );
};

export default LanguageTag;