import React, { useState, useEffect } from 'react';
import { View, Text, HStack, Box, Input, Button, Pressable, VStack, ScrollView } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, ImageBackground, StyleSheet, Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUsers } from '../../redux/slices/userSlice';
import { setFriends } from '../../redux/slices/userSlice'; 
import axiosInstance from '../../axios/axiosInstance';

const HomePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.users);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [friends, setFriendsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (user && user._id) {
          const response = await axiosInstance.get(`/api/users/${user._id}/friends`);
          setFriendsList(response.data);
          dispatch(setFriends(response.data));
          setFilteredFriends(response.data); 
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [user, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      setFilteredFriends(
        friends.filter(friend => 
          friend.username.match(regex) || friend.name.match(regex)
        )
      );
    } else {
      setFilteredFriends(friends);
    }
  }, [searchTerm, friends]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(menuAnimation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = () => {
    dispatch(setAuthUsers(null));
    navigation.navigate('Login');
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

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/pages-bg.png')}
    >
      <View flex={1} px={5}>
        <Box py="20px">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="heading1" fontWeight="bold" color="primary.700">
              TinFin
            </Text>
            <HStack alignItems="center" space={3}>
              <Pressable>
                <Icon name="notifications" size={30} color="primary.700" />
              </Pressable>
              <Pressable onPress={toggleMenu}>
                <Icon name="more-vert" size={34} color="primary.700" />
              </Pressable>
            </HStack>
          </HStack>

          {menuOpen && (
            <Animated.View style={[styles.dropdownMenu, dropdownStyle]}>
              <VStack space={2}>
                <Pressable onPress={() => navigation.navigate('Friends')}>
                  <Text fontSize="16px" fontWeight="bold" color="primary.700">
                    Friends
                  </Text>
                </Pressable>
                <Pressable onPress={handleLogout}>
                  <Text fontSize="16px" fontWeight="bold" color="primary.700">
                    Logout
                  </Text>
                </Pressable>
              </VStack>
            </Animated.View>
          )}
        </Box>

        <Input
          placeholder="Search..."
          borderRadius="10px"
          borderColor="transparent"
          backgroundColor="primary.300"
          borderWidth={0}
          px="20px"
          py="13px"
          fontSize="14px"
          fontWeight="semibold"
          placeholderTextColor="primary.500"
          onChangeText={setSearchTerm} 
        />

        <Box py={4}>
          <HStack justifyContent="space-between">
            <Button
              width="49%"
              onPress={() => navigation.navigate('AddFriend')}
              borderRadius="50px"
              backgroundColor="primary.900"
              leftIcon={<Icon name="person-add" size={24} color="white" />}
            >
              <Text color="white" fontSize="16px" fontWeight="semibold">
                Add Connection
              </Text>
            </Button>
            <Button
              width="49%"
              borderRadius="50px"
              backgroundColor="primary.300"
              leftIcon={<Icon name="filter-list" size={24} color="primary.900" />}
            >
              <Text color="primary.900" fontSize="16px" fontWeight="semibold">
                Filter Chats
              </Text>
            </Button>
          </HStack>
        </Box>

        <ScrollView
        contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>

        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <Box
              key={index}
              width="100%"
              backgroundColor="white"
              my="5px"
              p="15px"
              borderRadius="10px"
            >
              <HStack justifyContent="space-between">
                <HStack space={3} alignItems="center">
                  <Image
                    source={require('../../assets/images/IMG_1040~2.jpg')}
                    style={styles.chatImage}
                  />
                  <View>
                    <Text fontSize="16px" fontWeight="bold" color="primary.700">
                      {friend.name}
                    </Text>
                    <Text fontSize="14px" color="primary.500">
                      {friend.username}
                    </Text>
                  </View>
                </HStack>
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No friends found.</Text>
        )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
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

export default HomePage;
