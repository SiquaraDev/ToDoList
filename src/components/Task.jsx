import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import {styles} from '../styles/styleTask';

export default props => {
  const doneOrNotStyle =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formattedDate = moment(date).format('dddd, MMM Do');

  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
      <View>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const getCheckView = doneAt => {
  if (doneAt !== null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#FFF" />
      </View>
    );
  } else {
    return <View style={styles.pending}></View>;
  }
};
