import { Pressable, StyleSheet ,TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
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
  passwordconfirmation:"",
};

const validationSchema = yup.object({
  username: yup.string()
    .required("Username is required")
    .min(5, "Username is too short")
    .max(30, "Username is too long"),
  password: yup.string()
    .required("Password is required")
    .min(5, "Password is too short")
    .max(30, "Password is too long"),
  passwordconfirmation: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Password confimation is required")
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const usernameError = formik.touched.username && formik.errors.username ? formik.errors.username : "";
  const passwordError = formik.touched.password && formik.errors.password ? formik.errors.password : "";
  const passwordconfirmationError = formik.touched.passwordconfirmation && formik.errors.passwordconfirmation ? formik.errors.passwordconfirmation : "";

  return (
    <View style={styles.container}>
      <TextInput
        style={usernameError ? styles.inputError : styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        inputMode="text"
        autoCapitalize="none"
      />
      {usernameError && ( <Text style={styles.errorText}>{usernameError}</Text> )}
      <TextInput
        style={passwordError ? styles.inputError : styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        inputMode="text"
        autoCapitalize="none"
      />
      {passwordError && ( <Text style={styles.errorText}>{passwordError}</Text> )}
      <TextInput
        style={passwordconfirmationError ? styles.inputError : styles.input}
        placeholder="Password confirmation"
        value={formik.values.passwordconfirmation}
        onChangeText={formik.handleChange("passwordconfirmation")}
        secureTextEntry
        inputMode="text"
        autoCapitalize="none"
      />
      {passwordconfirmationError && ( <Text style={styles.errorText}>{passwordconfirmationError}</Text> )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          style={styles.text}
          fontSize="subheading"
          fontWeight="bold"
        >
          {"Sign up"}
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useSignUp();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    try {
      await createUser(values);
      await signIn(values);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  
  return <SignUpContainer onSubmit={onSubmit} />;
  
};

export default SignUp;