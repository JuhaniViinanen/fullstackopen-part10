import { FlatList, View } from 'react-native';
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

import useDeleteReview from '../hooks/useDeleteReview';

import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const MyReviewsContainer = ({ reviews, deleteReviewItem }) => {
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item} withButtons deleteReviewItem={deleteReviewItem} />}
      keyExtractor={item => item.id}
    />
  );
};

const MyReviews = () => {
  const [deleteReview] = useDeleteReview();
  const { data, refetch } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    }
  });

  const deleteReviewItem = async ( deleteReviewId ) => {
    try {
      await deleteReview(deleteReviewId);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  return <MyReviewsContainer reviews={reviews} deleteReviewItem={deleteReviewItem} />;
};

export default MyReviews;