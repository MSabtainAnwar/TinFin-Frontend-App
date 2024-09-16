import { View, Box, Center, Text, Input, Button, Toast } from 'native-base';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../axios/axiosInstance';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage = ({navigation}) => {
  const handleLogin = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', values);
      console.log('Login successful:', response.data.data.user.token);
  
      Toast.show({
        title: response.data.message || "Login successful",
        status: "success",
        duration: 3000,
      });

      navigation.navigate('Home');
  
      resetForm();
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
  
      Toast.show({
        title: error.response?.data?.message || "Login Failed",
        status: "error",
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
      <Center position="absolute" top={0} left={0} right={0} bottom="75%">
        <Text color="white" fontSize="heading1" fontWeight="bold">TinFin</Text>
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
      >
        <Text color="primary.500" fontSize="heading1" fontWeight="bold" mx="auto" my="20px">
          Welcome Back 👋
        </Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Text my={0} fontSize="bodyText2" fontWeight="semibold" mb={3}>Email</Text>
              <Input
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                backgroundColor="chatBubble.200"
                variant="outline"
                borderColor={errors.email && touched.email ? 'red.500' : 'accent.100'}
              />
              {errors.email && touched.email && (
                <Text color="red.500" fontSize="xs">{errors.email}</Text>
              )}

              <Text fontSize="bodyText2" fontWeight="semibold" mt="25px" mb={3}>Password</Text>
              <Input
                placeholder="Password"
                type="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                backgroundColor="chatBubble.200"
                variant="outline"
                borderColor={errors.password && touched.password ? 'red.500' : 'accent.100'}
              />
              {errors.password && touched.password && (
                <Text color="red.500" fontSize="xs">{errors.password}</Text>
              )}

              <Button onPress={handleSubmit} mt="30px" backgroundColor="primary.500" borderRadius="50px" py={3}>
                <Text color="primary.50" fontSize="subHeading2" fontWeight="semibold">Login</Text>
              </Button>
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
    position: 'static',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default LoginPage;
