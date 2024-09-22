import { View, Box, Center, Text, Input, Button, Toast, Checkbox, HStack, Spinner } from 'native-base';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../axios/axiosInstance';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { setAuthUsers } from '../../redux/slices/userSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = ({ navigation }) => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/login', values);
      console.log('Login successful:', response.data.data);

      await AsyncStorage.setItem('userToken', response.data.data.user.token);
      dispatch(setAuthUsers(response.data.data.user));

      Toast.show({
        title: response.data.message || 'Login successful',
        status: 'success',
        duration: 3000,
      });

      navigation.navigate('Home');
      resetForm();
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Toast.show({
        title: error.response?.data?.message || 'Login Failed',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require('../../assets/auth-bg.png')}
      />
      <Center position="absolute" top={0} left={0} right={0} bottom="75%">
        <Text color="white" fontSize="heading1" fontWeight="bold">
          TinFin
        </Text>
      </Center>
      <Box
        safeArea
        p="5"
        w="100%"
        height="75%"
        py="8"
        bg="primary.50"
        position="absolute"
        bottom={0}
        borderTopLeftRadius="65px"
        borderTopRightRadius="65px"
        shadow={2}
        backgroundColor="primary.800"
      >
        <Text
          color="primary.700"
          fontSize="heading1"
          fontWeight="bold"
          mx="auto"
          my="20px"
        >
          Welcome Back 👋
        </Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <Text my={0} fontSize="bodyText2" fontWeight="semibold" mb={3}>
                Email
              </Text>
              <Input
                placeholder="Email"
                borderRadius="10px"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                backgroundColor="chatBubble.200"
                variant="outline"
                borderColor={errors.email && touched.email ? 'red.500' : 'accent.100'}
              />
              {errors.email && touched.email && (
                <Text color="red.500" fontSize="xs">
                  {errors.email}
                </Text>
              )}

              <Text fontSize="bodyText2" fontWeight="semibold" mt="25px" mb={3}>
                Password
              </Text>
              <Input
                placeholder="Password"
                borderRadius="10px"
                type={showPassword ? 'text' : 'password'}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                backgroundColor="chatBubble.200"
                variant="outline"
                borderColor={errors.password && touched.password ? 'red.500' : 'accent.100'}
                InputRightElement={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="#333" style={{ marginRight: 10 }} />
                  </TouchableOpacity>
                }
              />
              {errors.password && touched.password && (
                <Text color="red.500" fontSize="xs">
                  {errors.password}
                </Text>
              )}

              <HStack justifyContent="space-between" mt={4}>
                <Checkbox
                  value="keepLoggedIn"
                  isChecked={keepLoggedIn}
                  onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                >
                  <Text color="primary.700" fontSize="xs">
                    Keep me logged in
                  </Text>
                </Checkbox>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text color="primary.900" fontSize="xs">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </HStack>

              <Button
                onPress={handleSubmit}
                mt="30px"
                backgroundColor="primary.900"
                borderRadius="50px"
                py={3}
                disabled={isLoading}
              >
                {isLoading ? (
                  <HStack space={2} justifyContent="center">
                    <Spinner color="white" />
                    <Text color="white" fontSize="subHeading2" fontWeight="semibold">
                      Loading...
                    </Text>
                  </HStack>
                ) : (
                  <Text color="white" fontSize="subHeading2" fontWeight="semibold">
                    Login
                  </Text>
                )}
              </Button>

              <Text mt="10px" mx="auto">
                Don't have an account?
                <Text ml="5px" color="primary.900" onPress={() => navigation.navigate('Signup')}>
                  Sign up
                </Text>
              </Text>
            </>
          )}
        </Formik>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default LoginPage;
