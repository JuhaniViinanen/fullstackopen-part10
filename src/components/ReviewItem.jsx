import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native'; 

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
    textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 15,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  openButton: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 15,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 5,
  },
  deleteButton: {
    color: 'white',
    backgroundColor: theme.colors.error,
    padding: 15,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderRadius: 5,
  }
});

const ReviewItem = ({
  item,
  withButtons = false,
  deleteReviewItem = () => console.log('This is the default delete function!'),
}) => {
  const navigate = useNavigate();
  const date = new Date(item.createdAt).toISOString().substring(0,10);

  const onPressDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          onPress: null,
        },
        {
          text: 'DELETE',
          onPress: () => deleteReviewItem(item.id),
        }
      ],
      { cancelable: true },
    );
  };

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
      {withButtons &&
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.openButton} onPress={() => navigate(`/${item.repositoryId}`)}>
            <Text style={styles.buttonText} fontSize="subheading" fontWeight="bold" >{"View repository"}</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={onPressDelete} >
            <Text style={styles.buttonText} fontSize="subheading" fontWeight="bold" >{"Delete review"}</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

export default ReviewItem;