import React from 'react';
import ZegoUIKitPrebuiltLiveStreaming, {
  AUDIENCE_DEFAULT_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import {StyleSheet, View} from 'react-native';
import * as ZIM from 'zego-zim-react-native';
import KeyCenter from '../../utilities/KeyCenter';

export default function AudiencePage(props: any) {
  const {route} = props;
  const {params} = route;
  const {userID, userName, liveID} = params;
  console.log('Audience params ...>>>', props);

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={KeyCenter.appIdStream}
        appSign={KeyCenter.appSignStream}
        userID={userID}
        userName={userName}
        liveID={liveID}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            props.navigation.navigate('HomeScreen');
          },
          topMenuBarConfig: {
            buttons: [
              ZegoMenuBarButtonName.minimizingButton,
              ZegoMenuBarButtonName.leaveButton,
            ],
          },
          onWindowMinimized: () => {
            console.log('[Testing>>>]AudiencePage onWindowMinimized');
            props.navigation.navigate('HomeScreen');
          },
          onWindowMaximized: () => {
            console.log('[Testing>>>]AudiencePage onWindowMaximized');
            props.navigation.navigate('AudiencePage', {
              userID: userID,
              userName: userName,
              liveID: liveID,
            });
          },
        }}
        plugins={[ZIM]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});
