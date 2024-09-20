import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from '../screens/login/index'; 
import HomePage from '../screens/home/index'; 
import Signup from '../screens/signup';
import AddFriendPage from '../screens/addConnection';
import { useSelector } from 'react-redux';
import FriendRequests from '../screens/friendRequests';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get the user from Redux
  const user = useSelector((state) => state.user.users);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (user && user.token) {
          setIsLoggedIn(true);
        } 
      } catch (error) {
        console.log('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [user]); 

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{ headerShown: false }}
          />
             <Stack.Screen
            name="AddFriend"
            component={AddFriendPage}
            options={{ headerShown: false }}
          />
              <Stack.Screen
            name="Friends"
            component={FriendRequests}
            options={{ headerShown: false }}
          />
          </>

        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
