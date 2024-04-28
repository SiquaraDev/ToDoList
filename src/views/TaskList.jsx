import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import {styles} from '../styles/styleTaskList';
import commonStyles from '../styles/commonStyles';

import todayImage from '../assets/images/today.jpg';

import Task from '../components/Task';
import AddTask from './AddTask';

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
  const [showAddTask, setShowAddTask] = useState(false);

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

  const addTask = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      console.warn(newTask.desc, newTask.desc.trim() === '');
      Alert.alert('Invalid Data', 'Description is required.');
      return;
    }
    const newTasks = [...tasks];
    newTasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: null,
    });

    setTasks(newTasks);
    setShowAddTask(false);
  };

  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSave={addTask}
      />
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
          renderItem={({item}) => (
            <Task {...item} onToggleTask={toggleTask} onDelete={deleteTask} />
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => setShowAddTask(true)}>
        <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
