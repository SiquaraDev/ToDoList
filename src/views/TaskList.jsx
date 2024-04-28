import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import moment from 'moment';

import {styles} from '../styles/styleTaskList';

import todayImage from '../assets/images/today.jpg';

import Task from '../components/Task';

const initialTasks = [
  {
    id: Math.random(),
    desc: 'Buy a book',
    estimateAt: new Date(),
    doneAt: new Date(),
  },
  {
    id: Math.random(),
    desc: 'Read a book',
    estimateAt: new Date(),
    doneAt: null,
  },
];

export default props => {
  const today = moment().format('dddd, MMM Do');

  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = id => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.doneAt = task.doneAt ? null : new Date();
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.TaskList}>
        <FlatList
          data={tasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Task {...item} toggleTask={toggleTask} />}
        />
      </View>
    </SafeAreaView>
  );
};
