// FriendPlaceholder.js
import React from 'react';
import { Box, HStack, View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const FriendPlaceholder = () => {
  return (
    <Box
      width="100%"
      backgroundColor="white"
      my="5px"
      p="15px"
      borderRadius="10px"
      style={styles.placeholder}>
      <HStack justifyContent="space-between">
        <HStack space={3} alignItems="center">
          <View style={styles.placeholderImage} />
          <View>
            <Text style={styles.placeholderText} />
            <Box style={styles.placeholderText} />
          </View>
        </HStack>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    height: 80,
    opacity: 0.6,
    overflow: 'hidden',
    backgroundColor: '#DBDBDB'
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ADADAD',
    animation: 'shimmer 1.5s infinite',
  },
  placeholderText: {
    height: 10,
    width: '80%',
    backgroundColor: '#ADADAD',
    animation: 'shimmer 1.5s infinite',
  },
});

export default FriendPlaceholder;
