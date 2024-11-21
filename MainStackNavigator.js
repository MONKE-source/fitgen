import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnLogIn from './WelcomePage';
import { HomePage, CompletedPage, AlertingSettings } from './Homepage';


const Stack = createStackNavigator();


const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="OnLogIn" component={OnLogIn} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Manage alerts" component={CompletedPage} />
    </Stack.Navigator>
  );
};



export default MainStackNavigator;
