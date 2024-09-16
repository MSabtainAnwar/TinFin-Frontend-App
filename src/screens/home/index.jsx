import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, Button } from 'native-base';

const HomePage = ({ navigation }) => {
    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('userToken'); // Remove the token
          navigation.navigate('Login'); // Navigate back to the login page
        } catch (error) {
          console.log('Error logging out:', error);
        }
      };
      
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="lg" mb={4}>Welcome to the Home Page!</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default HomePage;
