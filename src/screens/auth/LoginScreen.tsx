import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getUserInfo,
  removeStoreInfo,
  storeUserInfo,
} from '../../services/LocalStorage';
import {onUserLogin} from '../../services/ZegoService';
import {handleSignOut, validateEmail} from '../../services/FirebaseService';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters.',
      );
      return;
    }
    setLoading(true);

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      Alert.alert('Success', 'Logged in successfully!');

      if (userCredential?.user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .get();

        if (userDoc.exists) {
          let fireData = userDoc.data();

          await storeUserInfo({
            userName: fireData?.userName,
            email: fireData?.email,
            phoneNumber: fireData?.phoneNumber,
          });

          onUserLogin(
            fireData?.phoneNumber,
            fireData?.userName,
            navigation,
          ).then(async () => {
            navigation.navigate('HomeScreen');
          });
        }
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email address.');
      } else if (error.code === 'auth/invalid-credential') {
        Alert.alert(
          'Error',
          'The supplied auth credential is incorrect,Please Signup.',
        );
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      } else {
        Alert.alert('Error', error.message); // Generic error message for other cases
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Login</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={'black'}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor={'black'}
      />
      {loading && <ActivityIndicator />}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register User')}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6200ea',
  },
});
