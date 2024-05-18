import React from 'react';
import {useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import backgroundImage from '../assets/images/login.jpg';
import {styles} from '../styles/styleAuth';

import {server, showError, showSuccess} from '../server/commonServer';

import AuthInput from '../components/AuthInput';

export default props => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    const validations = [];

    validations.push(email && email.includes('@'));
    validations.push(password && password.length >= 6);
    if (isRegister) {
      validations.push(name && name.trim().length >= 3);
      validations.push(confirmPassword && confirmPassword === password);
    }
    const isValid = validations.reduce((t, a) => t && a);
    setValidForm(isValid);
  }, [name, email, password, confirmPassword, isRegister]);

  const resetData = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsRegister(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const signUp = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      showSuccess('Account created.');
      resetData();
    } catch (e) {
      showError(e);
    }
  };

  const signIn = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem('userData', JSON.stringify(res.data));
      axios.defaults.headers.common[
        'authorization'
      ] = `bearer ${res.data.token}`;

      navigation.navigate('Home', res.data);
      resetData();
    } catch (e) {
      showError(e);
    }
  };

  const onSignInOrUp = () => {
    isRegister ? signUp() : signIn();
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
            disabled={!validForm}
            style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}
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
