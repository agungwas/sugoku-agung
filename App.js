import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Game from './components/Game';
import Finish from './components/Finish';

export default function App() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Sugoku by Agung Setya Pratama' component={Home} />
        <Stack.Screen name='Game' component={Game} />
        <Stack.Screen name='Result' component={Finish} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

