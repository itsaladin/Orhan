import ZegoUIKitPrebuiltCallService, {
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoInvitationType,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-call-rn'; // Import all required constants
import {Alert} from 'react-native'; // Import Alert from react-native
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import KeyCenter from '../utilities/KeyCenter';

const onUserLogin = async (phoneNumber, userName, navigation) => {
  return ZegoUIKitPrebuiltCallService.init(
    KeyCenter.appID, // You can get it from ZEGOCLOUD's console
    KeyCenter.appSign, // You can get it from ZEGOCLOUD's console
    phoneNumber, // It can be any valid characters, but we recommend using a phone number.
    userName,
    [ZIM, ZPNs],
    {
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
      requireConfig: data => {
        const callConfig =
          data.invitees.length > 1
            ? ZegoInvitationType.videoCall === data.type
              ? GROUP_VIDEO_CALL_CONFIG
              : GROUP_VOICE_CALL_CONFIG
            : ZegoInvitationType.videoCall === data.type
            ? ONE_ON_ONE_VIDEO_CALL_CONFIG
            : ONE_ON_ONE_VOICE_CALL_CONFIG;

        return {
          ...callConfig,
          onHangUpConfirmation: () => {
            return new Promise((resolve, reject) => {
              Alert.alert(
                'End Call Confirmation',
                'Do you really want to end the call?',
                [
                  {
                    text: 'Stay on Call',
                    onPress: () => reject(),
                    style: 'cancel',
                  },
                  {
                    text: 'End Call',
                    onPress: () => {
                      ZegoUIKitPrebuiltCallService.hangUp();
                      resolve();
                      onUserLogout();
                      navigation.navigate('HomeScreen'); // Navigate to HomeScreen
                    },
                    style: 'destructive',
                  },
                ],
                {cancelable: false},
              );
            });
          },
          onCallEnd: (callID, reason, duration) => {
            // ZegoUIKitPrebuiltCallService.hangUp();
            navigation.navigate('HomeScreen');
          },
          onHangUp: () => {
            // ZegoUIKitPrebuiltCallService.hangUp();
            navigation.navigate('HomeScreen');
          },
          topMenuBarConfig: {
            buttons: [ZegoMenuBarButtonName.minimizingButton],
          },
        };
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      isIOSSandboxEnvironment: true,
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
    },
  ).then(() => {
    ZegoUIKitPrebuiltCallService.requestSystemAlertWindow({
      message:
        'We need your consent for the following permissions in order to use the offline call function properly',
      allow: 'Allow',
      deny: 'Deny',
    });
  });
};

const onUserLogout = async () => {
  return ZegoUIKitPrebuiltCallService.uninit();
};

export {onUserLogin, onUserLogout};
