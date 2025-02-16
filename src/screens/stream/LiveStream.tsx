import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getUserInfo} from '../../services/LocalStorage';

const LiveStream = () => {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [liveID, setLiveID] = useState('');
  const [userName, setUserName] = useState(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchUsers = async () => {
      const userInfoRes = await getUserInfo();
      setUserID(userInfoRes?.userEmail);
      setUserName(userInfoRes?.userName);
    };

    fetchUsers();
  }, []);

  const onHostJoin = () => {
    //@ts-ignore
    navigation.navigate('HostPage', {
      userID: userID,
      userName: userName,
      liveID: liveID,
    });
  };
  const onAudienceJoin = () => {
    //@ts-ignore
    navigation.navigate('AudiencePage', {
      userID: userID,
      userName: userName,
      liveID: liveID,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <Text style={styles.title}>Welcome, {userName || 'User'}!</Text>
      <Text style={styles.subtitle}>Your User ID: {userID}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Live ID</Text>
        <TextInput
          placeholder="e.g., 5555"
          style={styles.input}
          onChangeText={text => setLiveID(text.replace(/[^0-9A-Za-z_]/g, ''))}
          maxLength={4}
          value={liveID}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, liveID.length === 0 && styles.buttonDisabled]}
          disabled={liveID.length === 0}
          onPress={() => onHostJoin()}>
          <Text style={styles.buttonText}>Start a Live</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, liveID.length === 0 && styles.buttonDisabled]}
          disabled={liveID.length === 0}
          onPress={() => onAudienceJoin()}>
          <Text style={styles.buttonText}>Watch a Live</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.buttonText}>Got to home page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A2A2A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#2A2A2A',
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDD',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#2A2A2A',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
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
  buttonDisabled: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
