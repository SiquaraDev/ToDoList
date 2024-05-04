import {StyleSheet} from 'react-native';

import commonStyles from './commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#080',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
  },
  showPassword: {
    position: 'absolute',
    right: 15,
    top: 9,
  },
});
