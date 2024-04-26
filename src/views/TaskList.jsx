import React from 'react';
import {SafeAreaView, View, Text, ImageBackground} from 'react-native';

import {styles} from '../styles/styleTaskList';

import todayImage from '../assets/images/today.jpg';

import moment from 'moment';

export default props => {
  const today = moment().format('dddd, MMM Do');
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.TaskList}>
        <Text>#Task 1</Text>
        <Text>#Task 2</Text>
        <Text>#Task 3</Text>
      </View>
    </SafeAreaView>
  );
};
