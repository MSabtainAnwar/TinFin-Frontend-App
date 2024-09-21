import React, { useState } from 'react';
import { HStack, Text, Pressable, VStack, Box, Badge } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Animated, Easing, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUsers } from '../../redux/slices/userSlice';

const TopNav = ({ navigation }) => {
    const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  
  const friendRequests = useSelector((state) => state.user.friendRequests);
  const friendRequestCount = friendRequests.length;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(menuAnimation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const dropdownStyle = {
    opacity: menuAnimation,
    transform: [
      {
        scale: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  const handleLogout = () => {
    dispatch(setAuthUsers(null));
    // navigation.replace('Login');
  };
  
  return (
    <Box py="20px">
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="heading1" fontWeight="bold" color="primary.700">
          TinFin
        </Text>
        <HStack alignItems="center" space={3}>
          <Pressable onPress={() => navigation.navigate('Friends')}>
            <Box position="relative">
              <Icon name="person-add" size={28} color="primary.700" />
              {friendRequestCount > 0 && (
                <Badge
                  colorScheme="danger"
                  rounded="full"
                  position="absolute"
                  left="18px"
                  bottom="30px"
                  mb={-4}
                  mr={-4}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                  _text={{
                    fontSize: 10,
                  }}
                >
                  {friendRequestCount}
                </Badge>
              )}
            </Box>
          </Pressable>
          
          <Pressable>
            <Icon name="notifications" size={28} color="primary.700" />
          </Pressable>

          <Pressable onPress={toggleMenu}>
            <Icon name="more-vert" size={30} color="primary.700" />
          </Pressable>
        </HStack>
      </HStack>

      {/* Dropdown Menu */}
      {menuOpen && (
        <Animated.View style={[styles.dropdownMenu, dropdownStyle]}>
          <VStack space={2}>
            <Pressable onPress={handleLogout}>
              <Text fontSize="16px" fontWeight="bold" color="primary.700">
                Logout
              </Text>
            </Pressable>
          </VStack>
        </Animated.View>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdownMenu: {
    position: 'absolute',
    zIndex: 100,
    right: 15,
    top: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
});

export default TopNav;
