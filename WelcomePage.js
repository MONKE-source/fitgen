import React from "react";
import { View, Text, Image } from "react-native"; // Import the Image component
import logInPageStyles from "./WelcomePageStyles";
import { NavigationContainer } from '@react-navigation/native';
import welcomePagebg from './assets/welcomePagebg.jpeg'; // Import your background image

const resetStorage = async () => {
  try {
    await AsyncStorage.clear();

    console.log('Storage has been reset.');
  } catch (error) {
    console.error('Error resetting storage:', error);
  }
};

const OnLogIn = () => {
  return (
<View style={logInPageStyles.onLogIn}>
  <Image
    source={welcomePagebg}
    style={logInPageStyles.backgroundImage}
    resizeMode="cover"
  />

  <View style={logInPageStyles.overlay} />

  <View style={logInPageStyles.div}>
    <View style={logInPageStyles.overlap}>
      <Text style={logInPageStyles.welcome}>
        <Text style={logInPageStyles.textWrapper}>Welcome</Text>
        <Text style={logInPageStyles.span}>&nbsp;</Text>
      </Text>
      <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>
    </View>
  </View>
</View>

  );
};


export default OnLogIn;
