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
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: cs.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
