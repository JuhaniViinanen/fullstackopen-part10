import { FlatList, View } from 'react-native';
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

import ReviewItem from './ReviewItem';

const ItemSeparator = () => <View style={{ height: 10 }} />;

const MyReviewsContainer = ({ reviews }) => {
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      renderItem={ReviewItem}
      keyExtractor={item => item.id}
    />
  );
};

const MyReviews = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
    }
  });

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  return <MyReviewsContainer reviews={reviews} />;
};

export default MyReviews;