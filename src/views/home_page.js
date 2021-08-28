import React from 'react';
import { StyleSheet, Text,View, TouchableHighlight, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import BatteryComponent from '../components/battery_component';
import WifiComponent from '../components/wifi_component';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function HomePage({ navigation}) {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    navigation.navigate('DisplayPicture', {pictureUri: selectedImage.localUri})
    console.log("Diferente de null");
    
  }

  return (
    <View style={[styles.container, {flexDirection: "column"}]}>

      {/* Battery and connection status */}
      <View style={{ flex: 1}} >
        <BatteryComponent/>
        <WifiComponent/>
      </View>

      {/* Buttons */}
      <View style={{ flex: 2, alignItems: "center",}} >
        <TouchableHighlight style={[s.btnTouchable,]} onPress={() => navigation.navigate('TakePicture')}>
          <View style={[s.btn, s.btnInfo, styles.button]}>
            <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Take new picture</Text>
          </View>
        </TouchableHighlight>
        
        <TouchableHighlight style={[s.btnTouchable,]} onPress={openImagePickerAsync}>
          {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
          <View style={[s.btn, s.btnInfo, styles.button]}>
            <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Load picture from gallery</Text>
          </View>
        </TouchableHighlight> 
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#263238"
  },
  button:{
    height:80, 
    width: 150, 
    margin:10
  },
  textbutton:{
    fontSize: 1.3 * c.REM
  }
});