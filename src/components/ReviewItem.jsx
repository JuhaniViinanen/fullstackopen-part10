import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.itemBackground,
    padding: 10
  },
  ratingText: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    height: 50,
    width: 50,
    paddingTop: 14,
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
  }
});

const ReviewItem = ({ item }) => {
  const date = new Date(item.createdAt).toISOString().substring(0,10);
  return (
    <View style={styles.container} >
      <View style={{ flexDirection: "row", columnGap: 10 }}>
        <View>
          <Text fontSize="subheading" fontWeight="bold" style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={{ rowGap: 5 , width: 0, flexGrow: 1}}>
          <View>
            {item?.user?.username && <Text fontWeight="bold" >{item.user.username}</Text>}
            {item?.repository?.fullName && <Text fontWeight="bold" >{item.repository.fullName}</Text>}
            <Text color="textSecondary" >{date}</Text>
          </View>
          <View>
            <Text>{item.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;