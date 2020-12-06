import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Game from './components/Game';
import Finish from './components/Finish';
import { Provider } from 'react-redux';
import store from './store/index';

export default function App() {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Sugoku by Agung Setya Pratama'
            component={Home} 
            options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name='Game'
            component={Game}
            options={{ headerShown: false }} />
          <Stack.Screen name='Result'
            component={Finish}
            options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

