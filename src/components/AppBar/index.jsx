import { useQuery } from "@apollo/client";
import { ME } from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
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
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network"
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal >
        <AppBarTab text={"Repositories"} to={"/"} onPress={null} />
        {
          data?.me ?
            <AppBarTab text={"Sign out"} to={null} onPress={signOut} /> :
            <AppBarTab text={"Sign in"} to={"/SignIn"} onPress={null} />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;