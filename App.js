import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Rename this import
import OnLogIn from './WelcomePage';
import { HomePage, getRandomExercise } from './Homepage';
import CompletedExercisesPage from './Log';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import Log2 from './Log2';
import * as Linking from 'expo-linking';



const funChallengeExercises = [
  'Balance Beam Walk: Walk heel-to-toe along an imaginary balance beam.',
  'Statue Pose Challenge: Strike a unique pose and hold it for 30 seconds.',
  'Chair Squat Challenge: Sit and stand from a chair without using your hands.',
  'Hula Hoop Showdown: Hula hoop like a pro for 2 minutes.',
  'Penguin Waddle: Waddle around the room like a penguin for a minute.',
  'Jump Rope Challenge: Pretend to jump rope for a cardio workout.',
  'Invisible Jumping Jacks: Do jumping jacks without actually jumping.',
];



const Drawer = createDrawerNavigator();


const App = () => {
  const [startHour, setStartHour] = useState('09');
  const [endHour, setEndHour] = useState('21');
  const [isAlertingEnabled, setIsAlertingEnabled] = useState(true);
  const [tikTokUsername, setTikTokUsername] = useState(''); 
  

  const shareOnTikTok = () => {
    const tiktokShareUrl = `https://www.tiktok.com/@{tikTokUsername}/video/your_video_id?is_copy_url=1&is_from_webapp=v1&lang=en&share_app_id=1234567&share_item_id=1234567&share_link_id=1234567&source=h5_m`;
    Linking.openURL(tiktokShareUrl);
  };

  useEffect(() => {
    const startHourInt = parseInt(startHour, 10);
    const endHourInt = parseInt(endHour, 10);
  
    const now = new Date();
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHourInt, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHourInt, 0, 0);
  
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      if (isAlertingEnabled && currentTime >= startTime && currentTime <= endTime) {
        const randomExercise = getRandomExercise([...funChallengeExercises]);
        Alert.alert(
          'Exercise Reminder',
          `It's time to do a random exercise: ${randomExercise}`,
          [
            {
              text: 'Completed',
              onPress: () => {
                handleExerciseCompletion(randomExercise);
              },
            },
            {
              text: 'Not Completed',
              onPress: () => {
                // Handle not completed exercise
              },
            },
          ]
        );
      }
    }, 60000); // 1 minute interval
  
    return () => {
      clearInterval(intervalId);
    };
  }, [startHour, endHour, isAlertingEnabled]);  
  
  const saveTikTokUsername = async () => {
    try {
      await AsyncStorage.setItem('tikTokUsername', tikTokUsername);
      console.log('TikTok username saved successfully.');
    } catch (error) {
      console.error('Error saving TikTok username:', error);
    }

  }
  const handleExerciseCompletion = async (exercise) => {
    try {
      const completedExercisesJson = await AsyncStorage.getItem('completedExercises');
      const completedExercises = JSON.parse(completedExercisesJson) || [];

      completedExercises.push(exercise);

      await AsyncStorage.setItem('completedExercises', JSON.stringify(completedExercises));

      console.log('Exercise completion saved successfully.');

      Alert.alert(
        'Exercise Completion',
        'Do you want to share your achievement on social media?',
        [
          {
            text: 'Cancel',
            onPress: () => {
            },
          },
          {
            text: 'TikTok',
            onPress: () => {
              shareOnTikTok(exercise);
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error saving exercise completion:', error);
    }
  };

  const AlertingSettings = () => {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
        <Text style={styles.heading}>Alerting Settings Page</Text>
        <View style={styles.inputContainer}>
          <Text>Start Hour:</Text>
          <TextInput
            style={styles.input}
            value={startHour}
            onChangeText={setStartHour}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>End Hour:</Text>
          <TextInput
            style={styles.input}
            value={endHour}
            onChangeText={setEndHour}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Enable Alerting:</Text>
          <Button
            title={isAlertingEnabled ? 'Disable' : 'Enable'}
            onPress={() => setIsAlertingEnabled(!isAlertingEnabled)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>TikTok Username:</Text>
          <TextInput
            style={styles.input}
            value={tikTokUsername}
            onChangeText={setTikTokUsername}
            placeholder="Enter your @TikTok username"
          />
          <Button title="Save" onPress={saveTikTokUsername} />
        </View>
      </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
});


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Welcome" component={OnLogIn} />
        <Drawer.Screen name="Daily Checklist" component={HomePage} />
        <Drawer.Screen name="Checklist Log" component={CompletedExercisesPage} />
        <Drawer.Screen name="Alert Settings" component={AlertingSettings} />
        <Drawer.Screen name="Alert Log" component={Log2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
