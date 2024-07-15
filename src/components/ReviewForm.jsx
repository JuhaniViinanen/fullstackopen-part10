import { Pressable, StyleSheet ,TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import useCreateReview from "../hooks/useCreateReview";
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
  ownerName: '',
  repositoryName: '',
  rating: undefined,
  text: '',
};

const validationSchema = yup.object({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number("Rating must be between 0 and 100")
    .required("Rating is required")
    .min(0, "Rating must be a number between 0 and 100")
    .max(100, "Rating must be a number between 0 and 100")
    .typeError("Rating must be a number between 0 and 100"),
  text: yup.string().notRequired(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const ownerNameError = formik.touched.ownerName && formik.errors.ownerName ? formik.errors.ownerName : '';
  const repositoryNameError = formik.touched.repositoryName && formik.errors.repositoryName ? formik.errors.repositoryName : '';
  const ratingError = formik.touched.rating && formik.errors.rating ? formik.errors.rating : '';
  const textError = formik.touched.text && formik.errors.text ? formik.errors.text : '';

  return (
    <View style={styles.container}>
      <TextInput
        style={ownerNameError ? styles.inputError : styles.input}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        autoCapitalize="none"
        inputMode="text"
      />
      {ownerNameError && ( <Text style={styles.errorText}>{ownerNameError}</Text> )}
      <TextInput
        style={repositoryNameError ? styles.inputError : styles.input}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        autoCapitalize="none"
        inputMode="text"
      />
      {repositoryNameError && ( <Text style={styles.errorText}>{repositoryNameError}</Text> )}
      <TextInput
        style={ratingError ? styles.inputError : styles.input}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        inputMode="numeric"
      />
      {ratingError && ( <Text style={styles.errorText}>{ratingError}</Text> )}
      <TextInput
        style={textError ? styles.inputError : styles.input}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline
        textAlignVertical="top"
        inputMode="text"
      />
      {textError && ( <Text style={styles.errorText}>{textError}</Text> )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text
          style={styles.text}
          fontSize="subheading"
          fontWeight="bold"
        >
          {"Create a review"}
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  
  return <ReviewFormContainer onSubmit={onSubmit} />;
  
};

export default ReviewForm;