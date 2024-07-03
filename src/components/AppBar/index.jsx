import Constants from "expo-constants";
import theme from "../../theme";
import { View, StyleSheet, ScrollView } from "react-native";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    backgroundColor: theme.colors.appBar,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal >
        <AppBarTab text={"Repositories"} to={"/"} onPress={null} />
        <AppBarTab text={"Sign in"} to={"/SignIn"} onPress={null} />
      </ScrollView>
    </View>
  );
};

export default AppBar;