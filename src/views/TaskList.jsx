import React from 'react';
import {SafeAreaView, View, Text, ImageBackground} from 'react-native';
import moment from 'moment';

import {styles} from '../styles/styleTaskList';

import todayImage from '../assets/images/today.jpg';

import Task from '../components/Task';

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
        <Task desc="Buy a book" estimateAt={new Date()} doneAt={new Date()} />
        <Task desc="Read a book" estimateAt={new Date()} doneAt={null} />
      </View>
    </SafeAreaView>
  );
};
