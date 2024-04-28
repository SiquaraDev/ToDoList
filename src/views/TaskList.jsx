import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from '../styles/styleTaskList';
import commonStyles from '../styles/commonStyles';

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
  const [showDone, setShowDone] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState([]);

  useEffect(() => {
    filterTasks();
  }, [showDone, tasks]);

  const toggleShowDone = () => {
    setShowDone(!showDone);
  };

  const filterTasks = () => {
    let visibleTasks = null;
    if (showDone) {
      visibleTasks = [...tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = tasks.filter(pending);
    }

    setVisibleTasks(visibleTasks);
  };

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
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleShowDone}>
            <Icon
              name={showDone ? 'eye' : 'eye-slash'}
              size={20}
              color={commonStyles.colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.TaskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Task {...item} toggleTask={toggleTask} />}
        />
      </View>
    </SafeAreaView>
  );
};
