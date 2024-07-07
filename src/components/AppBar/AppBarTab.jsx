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
  if (to) return (
    <Link style={styles.container} to={to}>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
  if (onPress) return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;