import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import _ from 'lodash';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SigninScreen'}
      screenOptions={({route}) => {
        return {
          headerShown: false,
          cardStyle: {backgroundColor: 'white'},
        };
      }}>
      <Stack.Screen name={'SigninScreen'} component={Signin} />
      <Stack.Screen name={'SignupScreen'} component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;
