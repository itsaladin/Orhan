import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {handleSignOut} from '../services/FirebaseService';
import {getUserInfo} from '../services/LocalStorage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  const fetchUsers = async () => {
    const userInfoRes = await getUserInfo();
    setUserInfo(userInfoRes);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to go back?',
      [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true; // Prevent default behavior (e.g., closing the app)
  };

  // Add the event listener when the component mounts
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Home Screen</Text>
        <Text>User Information</Text>
        <View style={styles.infoItem}>
          <Icon name="person" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.text}>
            {userInfo?.userName || 'No Name Available'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="email" size={24} color="#28a745" style={styles.icon} />
          <Text style={styles.text}>
            {userInfo?.userEmail || 'No Email Available'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="phone" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.text}>
            {userInfo?.phoneNumber || 'No Phone Number Available'}
          </Text>
        </View>
        <Text style={styles.userId}>User ID: {userInfo?.userID || 'N/A'}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={styles.activeUser}
            onPress={() => {
              navigation.navigate('Active User');
            }}>
            <Text style={styles.switchText}>Availabe active user</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={() => {
              handleSignOut();
              navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.switchText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.liveStreamButton}
          onPress={() => {
            navigation.navigate('LiveStream');
          }}>
          <Text style={styles.switchText}>Live Stream</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    // padding: 10,
  },
  card: {
    width: '95%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowRadius: 4,
  },
  button: {
    width: '30%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  switchText: {
    textAlign: 'center',
    color: 'white',
  },
  signOutBtn: {
    backgroundColor: 'red',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: '30%',
  },
  activeUser: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: '50%',
  },
  liveStreamButton: {
    backgroundColor: 'green',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    width: '40%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#343a40',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    color: '#495057',
    fontWeight: '500',
  },
  userId: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 12,
  },
});
export default HomeScreen;
