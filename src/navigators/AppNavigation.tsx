import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoUIKitPrebuiltCallWaitingScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, useColorScheme, View} from 'react-native';
import ActiveUser from '../screens/ActiveUser';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import AudiencePage from '../screens/stream/AudiencePage';
import HostPage from '../screens/stream/HostPage';
import LiveStream from '../screens/stream/LiveStream';
import {getUserInfo} from '../services/LocalStorage';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const colorScheme = useColorScheme();
  const [isLogin, setIsLogin] = useState(null); // Use `null` initially for better state handling
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (colorScheme !== 'dark') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('black');
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f5f5f5');
    }

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setIsLogin(userInfo); // Set `isLogin` to the user info
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserInfo();
  }, [colorScheme]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={
        isLogin?.userName === null || isLogin?.userName === undefined
          ? 'LoginScreen'
          : 'HomeScreen'
      }>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Active User" component={ActiveUser} />
      <Stack.Screen name="Register User" component={RegisterScreen} />

      {/* @ts-ignore */}
      <Stack.Screen
        options={{headerShown: false}}
        headerMode="none"
        name="LiveStream"
        component={LiveStream}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="HostPage"
        component={HostPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AudiencePage"
        component={AudiencePage}
      />

      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallWaitingScreen"
        component={ZegoUIKitPrebuiltCallWaitingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        // DO NOT change the name
        name="ZegoUIKitPrebuiltCallInCallScreen"
        component={ZegoUIKitPrebuiltCallInCallScreen}
      />
    </Stack.Navigator>
  );
}
