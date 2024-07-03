import { View, StyleSheet } from "react-native";
import Text from "../Text";

const styles = StyleSheet.create({
  text: {
    textAlign: "center"
  }
});

const RepositoryStat = ({stat, name}) => {

  const statDisplay = stat < 1000 ? `${stat}` : `${(stat/1000).toFixed(1)}k`;

  return (
    <View >
      <Text fontWeight="bold" style={styles.text}>{statDisplay}</Text>
      <Text color="textSecondary" style={styles.text}>{name}</Text>
    </View>
  );
};

export default RepositoryStat;