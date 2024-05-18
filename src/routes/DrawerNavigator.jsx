import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import commonStyles from '../styles/commonStyles';

import TaskList from '../views/TaskList';
import UserInfo from '../components/UserInfo';

const Drawer = createDrawerNavigator();

export default props => {
  const options = {
    headerShown: false,
    drawerLabelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'bold',
      fontSize: 20,
    },
    drawerActiveTintColor: '#080',
  };

  return (
    <Drawer.Navigator
      initialRouteName="Today"
      drawerContent={props => <UserInfo {...props} />}
      screenOptions={options}>
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
