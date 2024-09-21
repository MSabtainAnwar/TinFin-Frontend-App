import React, { useState, useEffect } from 'react';
import { View, Text, HStack, Box, Input, Button, Image, VStack, useToast, Spinner, ScrollView } from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux'; 
import axiosInstance from '../../axios/axiosInstance';
import Toast from 'react-native-toast-message';
import TopNav from '../../components/TopNav';
import { setAuthUsers } from '../../redux/slices/userSlice';

const AddFriendPage = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [sentRequests, setSentRequests] = useState([]); 
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null); // Track the loading state of the specific user

  const user = useSelector((state) => state.user.users);
  const friends = useSelector((state) => state.user.friends);
  const toast = useToast();

  const handleSearch = async () => {
    if (!searchTerm) {
      setFriendList([]);
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/users/search?searchTerm=${searchTerm}`);
      const allFriends = response.data;
      const filteredFriends = allFriends.filter(friend => friend._id !== user._id);
      setFriendList(filteredFriends);
    } catch (error) {
      console.error('Error fetching friends:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 100);

    setDebounceTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const sendFriendRequest = async (receiverId) => {
    setLoadingUserId(receiverId);
    try {
      const response = await axiosInstance.post('/api/users/send-friend-request', {
        senderId: user._id,  
        receiverId,         
      });

      if (response.status === 200) {
        setSentRequests([...sentRequests, receiverId]); 
        toast.show({
          title: 'Request Sent!',
          status: 'success',
          description: 'Friend request has been sent successfully.',
        });
      }
    } catch (error) {
      console.error('Error sending friend request:', error.response ? error.response.data : error.message);
      const errorMessage = error.response?.data?.message || 'An error occurred';

      toast.show({
        status: 'error',
        description: errorMessage,
      });
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleLogout = () => {
    dispatch(setAuthUsers(null));
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/pages-bg.png')}
    >
      <View flex={1} px={5}>
        <TopNav navigation={navigation} handleLogout={handleLogout} />
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="primary.700" mb={2}>
            Search Friend
          </Text>
          <Input
            placeholder="Search"
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
            InputRightElement={
              <MaterialIcons 
                name="search" 
                size={24} 
                color="primary.500" 
                style={{ marginRight: 15 }} 
              />
            }
          />
        </Box>
        <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
          
        <VStack space={4} mt={5}>
          {friendList.map((friend) => (
            <HStack
              key={friend._id} 
              bg="white"
              p="10px"
              borderRadius="10px"
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack space={3} alignItems="center">
                <Image
                  source={require('../../assets/images/IMG_1040~2.jpg')}
                  style={styles.friendImage}
                  alt="profile"
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
              {
                loadingUserId === friend._id ? (
                  <Spinner size="small" color="primary.900" mr={3} />
                ) : (
                  <Button
                    borderRadius="50px"
                    backgroundColor="none"
                    leftIcon={
                      sentRequests.includes(friend._id) 
                        ? <MaterialIcons name="check" size={24} color="primary.900" />
                        : <MaterialIcons name="person-add" size={24} color="primary.900" />
                    }
                    onPress={() => {
                      const isFriend = friends.some(f => f._id === friend._id);
                      if (!isFriend && !sentRequests.includes(friend._id)) {
                        sendFriendRequest(friend._id);
                      }
                    }}
                    isDisabled={sentRequests.includes(friend._id) || friends.some(f => f._id === friend._id)}
                  />
                )
              }
            </HStack>
          ))}
        </VStack>
        </ScrollView>
      </View>

      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});

export default AddFriendPage;
