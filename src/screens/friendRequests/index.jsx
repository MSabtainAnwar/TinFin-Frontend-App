import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  HStack,
  Box,
  Button,
  VStack,
  Image,
  useToast,
  ScrollView,
  Spinner
} from 'native-base';
import { StyleSheet, ImageBackground } from 'react-native';
import axiosInstance from '../../axios/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, setFriends, setFriendsReq } from '../../redux/slices/userSlice'; 

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading , setLoading ] = useState(false);
  const user = useSelector(state => state.user.users);
  // const friends = useSelector(state => state.user.friendRequests);
  const dispatch = useDispatch(); 
  const toast = useToast();

  const fetchFriendRequests = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/users/${user._id}/friend-requests`,
      );
      setFriendRequests(response.data);
      dispatch(setFriendsReq(response.data));
    } catch (error) {
      console.error('Error fetching friend requests:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const acceptFriendRequest = async (friendId) => {
    setLoading(friendId)
    try {
      const response = await axiosInstance.post('/api/users/accept-friend-request', {
        userId: user._id,
        friendId: friendId,
      });
  
      if (response.status === 200) {
        setAcceptedRequests([...acceptedRequests, friendId]);
  
        const friendsResponse = await axiosInstance.get(`/api/users/${user._id}/friends`);
        dispatch(setFriends(friendsResponse.data)); 
  
        toast.show({
          title: 'Request Accepted!',
          status: 'success',
          description: 'Friend request accepted successfully.',
        });
  
        fetchFriendRequests(); 
      }
    } catch (error) {
      console.error('Error accepting friend request:', error.response ? error.response.data : error.message);
      toast.show({
        status: 'error',
        description: 'Unable to accept friend request!',
      });
    }finally{
      setLoading(null)
    }
  };
  
  
  // const fetchFriends = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/api/users/${user._id}/friends`);
  //     dispatch(setFriends(response.data));
  //   } catch (error) {
  //     console.error('Error fetching friends:', error.message);
  //   }
  // };
  

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/pages-bg.png')}>
      <View flex={1} px={5}>
        <Box py="20px">
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="heading1" fontWeight="bold" color="primary.700">
              Friend Requests
            </Text>
          </HStack>
        </Box>
        <ScrollView
        contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
        <VStack space={4} mt={5}>
          {friendRequests.map(request => (
            <HStack
              key={request._id}
              bg="white"
              p="15px"
              borderRadius="15px"
              justifyContent="space-between"
              alignItems="center"
              shadow={2}>
              <HStack space={4} alignItems="center">
                <Image
                  source={require('../../assets/images/IMG_1040~2.jpg')}
                  style={styles.friendImage}
                  alt="profile"
                />
                <View>
                  <Text fontSize="18px" fontWeight="bold" color="primary.900">
                    {request.name}
                  </Text>
                  <Text fontSize="14px" color="primary.600">
                    {request.username}
                  </Text>
                </View>
              </HStack>
              {
                loading === request._id ? (
                  <Spinner size="small" color="white" />
                ) :
                (
                  <Button
                  borderRadius="20px"
                  backgroundColor={
                    acceptedRequests.includes(request._id) ? 'primary.900' : 'primary.900'
                  }
                  _text={{ color: 'white', fontWeight: 'bold' }}
                  px="20px"
                  onPress={() => acceptFriendRequest(request._id)}
                  isDisabled={acceptedRequests.includes(request._id)}>
                  {acceptedRequests.includes(request._id) ? 'Accepted' : 'Accept'}
                </Button>
                )
              }
             
            </HStack>
          ))}
        </VStack>
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
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});

export default FriendRequests;