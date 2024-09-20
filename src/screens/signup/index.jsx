import {
  View,
  Box,
  Center,
  Text,
  Input,
  Button,
  Toast,
  ScrollView,
  Checkbox,
  HStack,
} from 'native-base';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../../axios/axiosInstance';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    // .phone('Invalid phone number')
    .required('Phone No is required') ,
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = ({navigation}) => {
  // const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleSignup = async (values, {resetForm}) => {
    try {
      const response = await axiosInstance.post('/api/auth/signup', values);
      console.log('Signup successful:', response.data.data);
        navigation.navigate('Login')
      Toast.show({
        title: response.data.message || 'Login successful',
        status: 'success',
        duration: 3000,
      });

      resetForm();s
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);

      Toast.show({
        title: error.response?.data?.message || 'Login Failed',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require('../../assets/auth-bg.png')}
      />
      <Center position="absolute" top={0} left={0} right={0} bottom="82%">
        <Text color="white" fontSize="heading1" fontWeight="bold">
          TinFin
        </Text>
      </Center>
      <Box
        safeArea
        p="5"
        w="100%"
        height="82%"
        py="8"
        bg="primary.50"
        position="absolute"
        bottom={0}
        borderTopLeftRadius="65px"
        borderTopRightRadius="65px"
        backgroundColor='primary.800'
        shadow={2}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Text
            color="primary.700"
            fontSize="heading1"
            fontWeight="bold"
            mx="auto"
            my="20px">
            Signup
          </Text>

          <Formik
            initialValues={{name: '', username: '', email: '', phone: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSignup}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
               <Text fontSize="bodyText2" fontWeight="semibold" mb={3}>
                  Full Name
                </Text>
                <Input
                  placeholder="Enter Your Name"
                  borderRadius="10px"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  backgroundColor="chatBubble.200"
                  variant="outline"
                  borderColor={
                    errors.name && touched.name
                      ? 'red.500'
                      : 'accent.100'
                  }
                />
                {errors.name && touched.name && (
                  <Text color="red.500" fontSize="xs">
                    {errors.name}
                  </Text>
                )}
                <Text fontSize="bodyText2" fontWeight="semibold" my={3}>
                  Username
                </Text>
                <Input
                  placeholder="Username"
                  borderRadius="10px"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  backgroundColor="chatBubble.200"
                  variant="outline"
                  borderColor={
                    errors.username && touched.username
                      ? 'red.500'
                      : 'accent.100'
                  }
                />
                {errors.username && touched.username && (
                  <Text color="red.500" fontSize="xs">
                    {errors.username}
                  </Text>
                )}
                <Text my={0} fontSize="bodyText2" fontWeight="semibold" mt={3}>
                  Email
                </Text>
                <Input
                  mt={3}
                  placeholder="Email"
                  borderRadius="10px"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  backgroundColor="chatBubble.200"
                  variant="outline"
                  borderColor={
                    errors.email && touched.email ? 'red.500' : 'accent.100'
                  }
                />
                {errors.email && touched.email && (
                  <Text color="red.500" fontSize="xs">
                    {errors.email}
                  </Text>
                )}

                <Text my={0} fontSize="bodyText2" fontWeight="semibold" mt={3}>
                  Phone
                </Text>
                <Input
                  mt={3}
                  placeholder="Phone"
                  borderRadius="10px"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  backgroundColor="chatBubble.200"
                  variant="outline"
                  borderColor={
                    errors.phone && touched.phone ? 'red.500' : 'accent.100'
                  }
                />
                {errors.phone && touched.phone && (
                  <Text color="red.500" fontSize="xs">
                    {errors.phone}
                  </Text>
                )}

                <Text
                  fontSize="bodyText2"
                  fontWeight="semibold"
                  mt="25px"
                  m={0}>
                  Password
                </Text>
                <Input
                  mt={3}
                  placeholder="Password"
                  borderRadius="10px"
                  type="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  backgroundColor="chatBubble.200"
                  variant="outline"
                  borderColor={
                    errors.password && touched.password
                      ? 'red.500'
                      : 'accent.100'
                  }
                />
                {errors.password && touched.password && (
                  <Text color="red.500" fontSize="xs">
                    {errors.password}
                  </Text>
                )}

                <Button
                  onPress={handleSubmit}
                  mt="30px"
                  backgroundColor="primary.900"
                  borderRadius="50px"
                  py={3}>
                  <Text
                    color="white"
                    fontSize="subHeading2"
                    fontWeight="semibold">
                    Signup
                  </Text>
                </Button>
                <Text mt="10px" mx="auto">
                  Already have an account?
                  <Text
                    ml="5px"
                    color="primary.900"
                    onPress={() => navigation.navigate('Login')}>
                    Login
                  </Text>
                </Text>

                <Text
                  mx="auto"
                  fontSize="subHeading1"
                  color="primary.600"
                  my="14px">
                  OR
                </Text>

                <Button
                  backgroundColor="chatBubble.200"
                  borderRadius="50px"
                  py={3}
                  mb="20px">
                  <Text
                    color="primary.700"
                    fontSize="subHeading2"
                    fontWeight="semibold">
                    Login with Google
                  </Text>
                </Button>
              </>
            )}
          </Formik>
        </ScrollView>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'static',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Signup;
