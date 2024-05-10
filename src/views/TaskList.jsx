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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {server, showError} from '../server/commonServer';

import {styles} from '../styles/styleTaskList';
import commonStyles from '../styles/commonStyles';

import todayImage from '../assets/images/today.jpg';

import Task from '../components/Task';
import AddTask from './AddTask';

export default props => {
  const [tasks, setTasks] = useState([]);
  const [showDone, setShowDone] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    getShowDone();
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [showDone, tasks]);

  const getShowDone = async () => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const savedState = JSON.parse(stateString) || true;
    setShowDone(savedState.showDoneTasks);
  };

  const toggleShowDone = () => {
    setShowDone(!showDone);
  };

  const loadTasks = async () => {
    try {
      const maxDate = moment().format('YYYY-MM-DD 23:59:59');
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      setTasks(res.data);
    } catch (e) {
      showError(e);
    }
  };

  const filterTasks = async () => {
    let visibleTasks = null;
    if (showDone) {
      visibleTasks = [...tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = tasks.filter(pending);
    }

    setVisibleTasks(visibleTasks);
    await AsyncStorage.setItem(
      'tasksState',
      JSON.stringify({
        showDoneTasks: showDone,
      }),
    );
  };

  const toggleTask = async taskId => {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  const addTask = async newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Invalid Data', 'Description is required.');
      return;
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      });

      setShowAddTask(false);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  const deleteTask = async taskId => {
    try {
      await axios.delete(`${server}/tasks/${taskId}`);
      loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  const today = moment().format('dddd, MMM Do');

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
