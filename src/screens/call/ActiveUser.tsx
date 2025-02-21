import firestore from '@react-native-firebase/firestore';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyComponent from '../../components/EmptyMessage';
import {getUserInfo} from '../../services/LocalStorage';

function ActiveUser({navigation}) {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    const snapshot = await firestore().collection('users').get();
    const userList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('userList', userList);
    setUsers(userList);
    const userInfoRes = await getUserInfo();
    setUserInfo(userInfoRes);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

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
      <FlatList
        data={users}
        keyExtractor={item => item?.id}
        ListEmptyComponent={<EmptyComponent />}
        renderItem={({item}) => {
          if (item?.email === userInfo?.userEmail) {
            return null;
          }
          return (
            <View style={styles.userCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>Name: {item?.userName}</Text>
                <Text style={styles.userEmail}>Email: {item?.email}</Text>
                <Text style={styles.userEmail}>Phone: {item?.phoneNumber}</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={{paddingRight: 10}}>
                  <ZegoSendCallInvitationButton
                    invitees={[
                      {userID: item?.phoneNumber, userName: item?.userName},
                    ]}
                    isVideoCall={false}
                    resourceID={'MMCaller'} // Unique resource ID for the call
                    onSuccess={() => {
                      console.log('Call invitation sent successfully!');
                    }}
                    onFailed={error => {
                      console.log('Failed to send call invitation:', error);
                    }}
                    onCancel={() => {
                      console.log('Call invitation canceled.');
                    }}
                  />
                </View>

                <ZegoSendCallInvitationButton
                  invitees={[
                    {userID: item?.phoneNumber, userName: item?.userName},
                  ]}
                  isVideoCall={true}
                  resourceID={'MMCaller'} // Unique resource ID for the call
                  onSuccess={() => {
                    console.log('Call invitation sent successfully!');
                  }}
                  onFailed={error => {
                    console.log('Failed to send call invitation:', error);
                  }}
                  onCancel={() => {
                    console.log('Call invitation canceled.');
                  }}
                />
              </View>
            </View>
          );
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonText}>Got to home page</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ActiveUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 10,
  },
  userCard: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 12,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#2f3542',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  userEmail: {
    color: '#57606f',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyMessage: {
    color: '#636e72',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  buttonBack: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
