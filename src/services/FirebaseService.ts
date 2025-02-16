import auth from '@react-native-firebase/auth';
import {removeStoreInfo} from './LocalStorage';
import {onUserLogout} from './ZegoService';

const handleSignOut = async () => {
  await auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
      removeStoreInfo();
      onUserLogout();
    });
};

// Email validation helper
const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export {handleSignOut, validateEmail};
