declare module '@zegocloud/zego-uikit-prebuilt-call-rn' {
  import {ReactNode} from 'react';

  export interface ZegoUIKitPrebuiltCallProps {
    // Define the expected props here
    appID: number;
    appSign: string;
    userID: string;
    userName: string;
    callID: string;
    config?: any;
  }

  const ZegoUIKitPrebuiltCall: React.FC<ZegoUIKitPrebuiltCallProps>;
  export default ZegoUIKitPrebuiltCall;
}
