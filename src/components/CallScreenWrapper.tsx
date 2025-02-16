import {RouteProp, useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import CallScreen from '../screens/Call';

type RootStackParamList = {
  Home: undefined;
  CallPage: {userID: string; userName: string};
};
type CallScreenRouteProp = RouteProp<RootStackParamList, 'CallPage'>;
type CallScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CallPage'
>;

interface CallScreenWrapperProps {
  route: CallScreenRouteProp;
  navigation: CallScreenNavigationProp;
}

const CallScreenWrapper: React.FC<CallScreenWrapperProps> = ({
  route,
  navigation,
}) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true); // Make status bar translucent
      }
      return () => {
        StatusBar.setBarStyle('dark-content'); // Reset to default
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('#f5f5f5'); // Reset to default
          StatusBar.setTranslucent(false); // Reset to default
        }
      };
    }, []),
  );

  return <CallScreen route={route} navigation={navigation} />;
};

export default CallScreenWrapper;
