import React from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import backgroundImage from '../assets/images/login.jpg';
import {styles} from '../styles/styleAuth';

import AuthInput from '../components/AuthInput';

export default props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSignInOrUp = () => {
    const msg = isRegister ? 'Account created.' : 'Logged in.';
    Alert.alert('Success!', msg);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {isRegister ? 'Create your account:' : 'Access your account:'}
          </Text>
          {isRegister ? (
            <AuthInput
              icon="user"
              placeholder="Name"
              value={name}
              onChangeText={name => setName(name)}
            />
          ) : null}
          <AuthInput
            icon="at"
            placeholder="E-mail"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <View>
            <AuthInput
              icon="lock"
              placeholder="Password"
              value={password}
              onChangeText={password => setPassword(password)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showPassword}
              onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color={'#333'}
              />
            </TouchableOpacity>
          </View>
          {isRegister ? (
            <View>
              <AuthInput
                icon="lock"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={cp => setConfirmPassword(cp)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.showPassword}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? 'eye' : 'eye-slash'}
                  size={20}
                  color={'#333'}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={onSignInOrUp}>
            <Text style={styles.buttonText}>
              {isRegister ? 'Register' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => setIsRegister(!isRegister)}>
          <Text style={styles.buttonText}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};
