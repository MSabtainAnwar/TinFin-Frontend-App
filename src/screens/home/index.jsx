import React, {useState, useEffect} from 'react';
import {
  View,
  Input,
  Button,
  HStack,
  Box,
  ScrollView,
  Text,
  Pressable,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAuthUsers,
  setFriends,
  setFriendsReq,
} from '../../redux/slices/userSlice'; // Add setFriendsReq
import axiosInstance from '../../axios/axiosInstance';
import TopNav from '../../components/TopNav/index';
import {Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FriendPlaceholder from '../../components/Placeholder/index';

const HomePage = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.users);
  const friendsData = useSelector(state => state.user.friends);
  // const friendsReq = useSelector(state => state.user.friendRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        if (user && user._id) {
          const response = await axiosInstance.get(
            `/api/users/${user._id}/friends`,
          );
          dispatch(setFriends(response.data));
          setFilteredFriends(response.data);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user, dispatch]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        if (user && user._id) {
          const response = await axiosInstance.get(
            `/api/users/${user._id}/friend-requests`,
          );
          dispatch(setFriendsReq(response.data));
        }
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, [user, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      setFilteredFriends(
        friendsData.filter(
          friend => friend.username.match(regex) || friend.name.match(regex),
        ),
      );
    } else {
      setFilteredFriends(friendsData);
    }
  }, [searchTerm, friendsData]);

  return (
    <View flex={1} px={5}>
      <TopNav navigation={navigation} />

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
            leftIcon={<Icon name="person-add" size={24} color="white" />}>
            <Text color="white" fontSize="16px" fontWeight="semibold">
              Add Connection
            </Text>
          </Button>
          <Button
            width="49%"
            borderRadius="50px"
            backgroundColor="primary.300"
            leftIcon={<Icon name="filter-list" size={24} />}>
            <Text color="primary.900" fontSize="16px" fontWeight="semibold">
              Filter Chats
            </Text>
          </Button>
        </HStack>
      </Box>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          Array.from({length: 5}).map((_, index) => (
            <FriendPlaceholder key={index} />
          ))
        ) : filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            // HomePage.js

            <Pressable
              key={index}
              onPress={() => navigation.navigate('Chat', {friend})} // Pass friend data to Chat page
            >
              <Box
                width="100%"
                backgroundColor="white"
                my="5px"
                p="15px"
                borderRadius="10px">
                <HStack justifyContent="space-between">
                  <HStack space={3} alignItems="center">
                    <Image
                      source={require('../../assets/images/IMG_1040~2.jpg')}
                      style={styles.chatImage}
                    />
                    <View>
                      <Text
                        fontSize="16px"
                        fontWeight="bold"
                        color="primary.700">
                        {friend.name}
                      </Text>
                      <Text fontSize="14px" color="primary.500">
                        {friend.username}
                      </Text>
                    </View>
                  </HStack>
                </HStack>
              </Box>
            </Pressable>
          ))
        ) : (
          <Text>No friends found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
});

export default HomePage;
