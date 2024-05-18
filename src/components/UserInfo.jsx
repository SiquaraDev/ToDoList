import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {DrawerItemList} from '@react-navigation/drawer';
import {Gravatar} from 'react-native-gravatar';

import {styles} from '../styles/styleUserInfo';

export default props => {
  const route = useRoute();

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
      </View>
      <DrawerItemList {...props} />
    </ScrollView>
  );
};
