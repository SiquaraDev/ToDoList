import React from 'react';
import {View, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from '../styles/styleAuthIpunt';

export default props => {
  return (
    <View style={[styles.container, props.style]}>
      <Icon name={props.icon} size={20} styles={styles.icon} />
      <TextInput {...props} style={styles.input} />
    </View>
  );
};
