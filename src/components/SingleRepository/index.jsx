import { useParams } from "react-router-native";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import useRepository from "../../hooks/useRepository";

const SingleRepository = () => {
  const { repositoryId } =  useParams();
  const { repository } = useRepository(repositoryId);

  return <RepositoryItem item={repository} />;
};

export default SingleRepository;