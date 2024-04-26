import {StyleSheet} from 'react-native';

import cs from './commonStyles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  TaskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  title: {
    fontFamily: cs.fontFamily,
    fontSize: 50,
    color: cs.colors.secondary,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: cs.fontFamily,
    fontSize: 20,
    color: cs.colors.secondary,
  },
});
