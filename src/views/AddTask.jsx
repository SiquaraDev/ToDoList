import React from 'react';
import {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {styles} from '../styles/styleAddTask';

const initialState = {
  desc: '',
};

export default props => {
  const [desc, setDesc] = useState({...initialState});

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
          value={desc.desc}
          onChangeText={desc => setDesc(desc)}
        />
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
