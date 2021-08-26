import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/views/home_page';
import TakePicturePage from './src/views/takePicture_page';
import DisplayPicturePage from './src/views/displayPicture_page';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="TakePicture" component={TakePicturePage} />
        <Stack.Screen name="DisplayPicture" component={DisplayPicturePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


