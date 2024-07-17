import { View, StyleSheet } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import theme from "../theme";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ReviewForm from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    padding: 10,
    flex: 1
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:repositoryId" element={<SingleRepository />} />
        <Route path='/ReviewForm' element={<ReviewForm />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </View>
  );
};

export default Main;