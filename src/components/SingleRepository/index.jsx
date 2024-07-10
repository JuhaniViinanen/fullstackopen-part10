import { useParams } from "react-router-native";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";

const SingleRepository = () => {
  const { repositoryId } =  useParams();
  const { data } = useRepository(repositoryId);

  if (data) return <RepositoryItem item={data.repository} githubButton />;
  return null;
};

export default SingleRepository;