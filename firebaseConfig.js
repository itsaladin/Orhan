import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import KeyCenter from './src/utilities/KeyCenter';

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARDA4rKPxWGWgcInFWB_IDKYrSy-GY3DA',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'mmcaller',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: KeyCenter.appID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
