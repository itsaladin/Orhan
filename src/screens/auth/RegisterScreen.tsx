import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';
import {validateEmail} from '../../services/FirebaseService';
import firestore from '@react-native-firebase/firestore';
import {storeUserInfo} from '../../services/LocalStorage';
import {onUserLogin} from '../../services/ZegoService';
import CountryPicker from 'react-native-country-picker-modal';

// Initialize MMKV storage
const storage = new MMKV();

function RegisterScreen() {
  const navigation = useNavigation();

  // State variables
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle user registration
  const handleSignUp = async () => {
    if (!email || !userName || !password || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      if (user) {
        await firestore().collection('users').doc(user.uid).set({
          userName,
          email,
          phoneNumber,
          createdAt: firestore.FieldValue.serverTimestamp(), // Add a timestamp
        });
        Alert.alert('Success', 'Account created successfully!');
        await storeUserInfo({userName, email, phoneNumber});
        onUserLogin(phoneNumber, userName, navigation).then(async () => {
          navigation.navigate('HomeScreen');
        });
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Username Input */}
      <TextInput
        placeholder="Enter Username"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      {/* Email Input */}
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      {/* Phone no Input */}
      <TextInput
        placeholder="Enter phone-number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>
          Already have an account? Login here.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;

// Styles
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
    color: '#333',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  callingCode: {
    fontSize: 16,
    marginRight: 10,
    color: '#000',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});
