import React from 'react';
import { View, Text, Button } from 'native-base';

const HomePage = ({ navigation }) => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text fontSize="lg" mb={4}>Welcome to the Home Page!</Text>
      <Button onPress={() => navigation.navigate('Login')}>Logout</Button>
    </View>
  );
};

export default HomePage;
