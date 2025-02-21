// App.js
import {NavigationContainer} from '@react-navigation/native';
import {ZegoCallInvitationDialog} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import React from 'react';
import AppNavigation from './src/navigators/AppNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />
      <ZegoUIKitPrebuiltLiveStreamingFloatingMinimizedView />
      <AppNavigation />
    </NavigationContainer>
  );
}
