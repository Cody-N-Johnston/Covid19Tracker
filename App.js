// In App.js in a new project

import * as React from 'react';
import {StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/Home.js'

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2E3440',
                },
                headerTitleAlign: 'center',
                headerTintColor: '#8FBCBB',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
          <Stack.Screen name="COVID19 Tracker" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
