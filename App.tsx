import { Image, StyleSheet, Platform } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { RoundedRectangle } from './components/RoundedRectangle'
import { NavigationBar } from './components/NavigationBar'

export default function HomeScreen() {

  return (
    <LinearGradient
      colors={["#ABCDEF", "#FEDCBA"]}
      style={styles.gradientBackground}
    >
      <NavigationBar></NavigationBar>
      <RoundedRectangle></RoundedRectangle>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
