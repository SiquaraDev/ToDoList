import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './routes/StakeNavigator';

export default props => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
