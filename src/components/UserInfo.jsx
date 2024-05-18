import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {DrawerItemList} from '@react-navigation/drawer';
import {Gravatar} from 'react-native-gravatar';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/styleUserInfo';

export default props => {
  const navigation = useNavigation();
  const route = useRoute();

  const onLogout = async () => {
    delete axios.defaults.headers.common['authorization'];
    await AsyncStorage.removeItem('userData');
    navigation.navigate('AuthOrApp');
  };

  return (
    <ScrollView {...props}>
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.header}>
        <Gravatar
          style={styles.avatar}
          options={{email: route.params.email, secure: true}}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{route.params.name}</Text>
          <Text style={styles.email}>{route.params.email}</Text>
        </View>
        <TouchableOpacity onPress={() => onLogout()}>
          <View style={styles.logoutIcon}>
            <Icon name="sign-out" size={30} color="#800" />
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </ScrollView>
  );
};
