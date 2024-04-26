import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {styles} from '../styles/styleTaskList';

export default props => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
    </SafeAreaView>
  );
};
