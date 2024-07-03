import { Pressable, StyleSheet ,TextInput, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  inputError: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.error,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    margin: 10
  },
  errorText: {
    color: theme.colors.error,
    marginLeft: 10,
  }
});

const initialValues = {
  username: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const usernameError = formik.touched.username && formik.errors.username ? formik.errors.username : "";
  const passwordError = formik.touched.password && formik.errors.password ? formik.errors.password : "";

  return (
    <View style={styles.container}>
      <TextInput
        style={usernameError ? styles.inputError : styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {usernameError && ( <Text style={styles.errorText}>{usernameError}</Text> )}
      <TextInput
        style={passwordError ? styles.inputError : styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {passwordError && ( <Text style={styles.errorText}>{passwordError}</Text> )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          style={styles.text}
          fontSize="subheading"
          fontWeight="bold"
        >
          {"Sign in"}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;