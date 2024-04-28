import React from 'react';
import {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {styles} from '../styles/styleAddTask';

export default props => {
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(_, date) => {
          setDate(date);
          setShowDatePicker(false);
        }}
      />
    );

    const dateString = moment(date).format('ddd, MMM Do, YYYY');

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="slide">
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlay}>
          <View style={props.style}>{props.children}</View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>New Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Task"
          value={desc}
          onChangeText={desc => setDesc(desc)}
        />
        {getDatePicker()}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={props.onCancel}>
            <Text style={styles.button}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onAdd}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlay}>
          <View style={props.style}>{props.children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
