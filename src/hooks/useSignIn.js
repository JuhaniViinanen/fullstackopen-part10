import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password }
      }
    });
    if (response?.data?.authenticate?.accessToken) {
      console.log("User signed in");
      await authStorage.setAccessToken(response.data.authenticate.accessToken);
      await client.resetStore();
    }
    return response;
  };

  return [signIn, result];
};

export default useSignIn;