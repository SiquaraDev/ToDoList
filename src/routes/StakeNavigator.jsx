import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Auth from '../views/Auth';

import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default props => {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
