import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  Input,
  ScrollView,
  Badge,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axios/axiosInstance';

const ChatPage = ({ route, navigation }) => {
    const [textMessage , setTextMessage] = useState("")
  const { friend } = route.params;

  const onlineUsers = useSelector(state => state.chat.onlineUsers);

  const isOnline = onlineUsers && onlineUsers[friend._id] !== undefined;

  const sendMessageHandler = async () =>{
    try{
      const response =   await axiosInstance.post('/api/chats/send-message' , {
      
      }) 
    }catch(err){
        console.log(err)
    }
  }

  return (
    <Box flex={1} bg="primary.800">
      <Box bg="white" py={4} px={4} shadow={1}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={28} />
            </TouchableOpacity>
            <Box position="relative" mr={3}>
              <Avatar
                size="md"
                source={{ uri: friend.avatarUri || '../../assets/images/IMG_1040~2.jpg' }}
              />
              {/* Badge to show online status */}
              <Badge
                bg={isOnline ? "green.500" : "gray.400"}
                rounded="full"
                position="absolute"
                bottom={0}
                right={0}
                width={3}
                height={3}
              />
            </Box>
            <VStack>
              <Text fontSize="md" fontWeight="bold">
                {friend.name}
              </Text>
              <Text color="gray.500" fontSize="xs">
                {isOnline ? "Online" : "Last Seen 1m ago"}
              </Text>
            </VStack>
          </HStack>
          <HStack>
            <TouchableOpacity>
              <Icon name="call" size={28} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="more-vert" size={28} />
            </TouchableOpacity>
          </HStack>
        </HStack>
      </Box>

      <ScrollView flex={1} px={4}>
        <VStack space={3} mt={5}>
          <HStack space={2} alignItems="flex-start">
            <Box
              bg="chatBubble.100"
              px={5}
              py={3}
              borderBottomRadius="20px"
              borderTopRightRadius="20px"
              maxW="70%">
              <Text color="white">Hey {friend.name}! How are you?</Text>
              <Text alignSelf="flex-end" color="white" fontSize="xs" mt={1}>
                10:02 AM
              </Text>
            </Box>
          </HStack>

          <HStack space={2} alignItems="flex-start" justifyContent="flex-end">
            <Box
              bg="chatBubble.200"
              px={5}
              py={3}
              borderBottomRadius="20px"
              borderTopLeftRadius="20px"
              maxW="70%">
              <Text color="primary.900">I am Good! And You?</Text>
              <Text alignSelf="flex-end" color="gray.500" fontSize="xs" mt={1}>
                10:03 AM
              </Text>
            </Box>
          </HStack>
        </VStack>
      </ScrollView>

      <HStack bg="white" alignItems="center" px={4} py={3} shadow={2}>
        <Input
          flex={1}
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          variant="unstyled"
          placeholder="Message"
          fontSize="md"
          bg="coolGray.100"
          py={2}
          px={4}
          rounded="full"
        />
        <TouchableOpacity>
          <Icon name="attach-file" size={28} />
        </TouchableOpacity>
        <TouchableOpacity onPress={sendMessageHandler}>
          <Icon name="send" size={28} color="primary.900" />
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default ChatPage;
