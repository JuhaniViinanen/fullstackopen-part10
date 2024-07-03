import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  container: {
    padding: 20,
  },
});

const AppBarTab = ({ text, to, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Link style={styles.container} to={to}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;