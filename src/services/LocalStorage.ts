import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const storeUserInfo = async info => {
  storage.set('userName', info.userName);
  storage.set('userEmail', info.email);
  storage.set('phoneNumber', info.phoneNumber);

  console.log('After saving storage:', {
    userName: storage.getString('userName'),
    userEmail: storage.getString('userEmail'),
    phoneNumber: storage.getString('phoneNumber'),
  });
};
// Example of retrieving data
const getUserInfo = () => {
  const userName = storage.getString('userName');
  const userEmail = storage.getString('userEmail');
  const phoneNumber = storage.getString('phoneNumber');
  return {userName, userEmail, phoneNumber};
};
const removeStoreInfo = () => {
  console.log('Before clearing storage:', {
    userName: storage.getString('userName'),
    userEmail: storage.getString('userEmail'),
    phoneNumber: storage.getString('phoneNumber'),
  });
  storage.clearAll();
  console.log('After clearing storage:', {
    userName: storage.getString('userName'),
    userEmail: storage.getString('userEmail'),
    phoneNumber: storage.getString('phoneNumber'),
  });
  console.log('Clear All storage!');
};

export {getUserInfo, removeStoreInfo, storeUserInfo};
