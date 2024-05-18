import React from 'react';
import {useCallback} from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/styleAuthOrApp';

export default props => {
  useFocusEffect(
    useCallback(() => {
      checkUserData();
    }, []),
  );

  const navigation = useNavigation();

  const checkUserData = async () => {
    const userDataJason = await AsyncStorage.getItem('userData');
    let userData = null;

    try {
      userData = JSON.parse(userDataJason);
    } catch (e) {
      console.warn(e);
    }

    if (userData) {
      axios.defaults.headers.common[
        'authorization'
      ] = `bearer ${userData.token}`;
      navigation.navigate('Home', userData);
    } else {
      navigation.navigate('Auth');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};
