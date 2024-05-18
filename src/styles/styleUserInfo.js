import {StyleSheet} from 'react-native';
import commonStyles from './commonStyles';

export const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  title: {
    color: '#000',
    fontSize: 30,
    paddingTop: 30,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 25,
    margin: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 20,
    marginBottom: 5,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 16,
    marginBottom: 10,
  },
});
