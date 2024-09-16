import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../screens/login/index'; 
import HomePage from '../screens/home/index';  

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Login Page */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }} 
        />
        {/* Home Page */}
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Home' }}    
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
