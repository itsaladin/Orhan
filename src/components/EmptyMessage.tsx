import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const EmptyComponent = () => {
  const fadeAnim = new Animated.Value(0); // Fade animation

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={['#3498db', '#8e44ad']}
      style={styles.emptyContainer}>
      <Animated.Text style={[styles.emptyMessage, {opacity: fadeAnim}]}>
        🐻 No users found, come back later!
      </Animated.Text>
    </LinearGradient>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15%',
    borderRadius: 10,
    margin: '5%',
  },
  emptyMessage: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
