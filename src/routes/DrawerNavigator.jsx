import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TaskList from '../views/TaskList';

const Drawer = createDrawerNavigator();

export default props => {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Today"
        component={TaskList}
        initialParams={{title: 'Today', daysAhead: 0}}
      />
      <Drawer.Screen
        name="Tomorrow"
        component={TaskList}
        initialParams={{title: 'Tomorrow', daysAhead: 1}}
      />
      <Drawer.Screen
        name="Week"
        component={TaskList}
        initialParams={{title: 'Week', daysAhead: 7}}
      />
      <Drawer.Screen
        name="Month"
        component={TaskList}
        initialParams={{title: 'Month', daysAhead: 30}}
      />
    </Drawer.Navigator>
  );
};
