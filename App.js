import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppState } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/views/home_page';
import TakePicturePage from './src/views/takePicture_page';
import DisplayPicturePage from './src/views/displayPicture_page';

const Stack = createNativeStackNavigator();

function App() {
  global.isPickerPicture=false;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      console.log(global.isPickerPicture);
      if (nextAppState !== "active" && !global.isPickerPicture) {
        console.log("MANDAR NOTIFICACIÓN");
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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


