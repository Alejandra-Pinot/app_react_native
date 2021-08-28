import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,View, TouchableHighlight, ScrollView, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import BatteryComponent from '../components/battery_component';
import WifiComponent from '../components/wifi_component';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function DisplayPicturePage({route, navigation}) {
  const { pictureUri } = route.params;
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  global.isPickerPicture=false;

  useEffect(() => {
      getData.call();
  }, []);
  

  const getData = async () => {
    const apiKey = 'acc_2f06a399cceaac8';
    const apiSecret = '1e6dae909b089927a78c2c40ddffc989';
    const authorization = 'Basic YWNjXzJmMDZhMzk5Y2NlYWFjODoxZTZkYWU5MDliMDg5OTI3YTc4YzJjNDBkZGZmYzk4OQ==';
    const endPoint = 'https://api.imagga.com/v2/tags';
    const pictureBase64 = await FileSystem.readAsStringAsync(pictureUri, { encoding: 'base64' });
    
    var formData = new FormData()
    formData.append("image_base64", pictureBase64);
    
    const options = {
      headers: {
        'apiKey': apiKey,
        'apiSecret': apiSecret,
        'Authorization': authorization
      },
      body:formData,
      method: 'POST'
    };

    fetch(endPoint, options)
    .then((response) => response.json())
    .then((responseJson) => {
      setResult(JSON.stringify(responseJson));
      setIsLoading(true);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const savePicture = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        await MediaLibrary.createAssetAsync(pictureUri);
        alert("Image saved successfully");
      }
  }

  return (
    <View style={[styles.container, {flexDirection: "column"}]}>

      {/* Battery and connection status */}
      <View style={{ flex: 1}} >
        <BatteryComponent/>
        <WifiComponent/>
      </View>

      {/* Picture frame */}
      <View style={styles.pictureframe} >
        <Image source={{ uri: pictureUri }} style={{ flex: 1 }} />
      </View>

      {/* Json frame */}
      <View style={styles.jsonframe} >
        <ScrollView style={styles.scrollView}>
          { isLoading
              ? <Text style={styles.textScrollView}> {result} </Text>
              : <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}} >
                  <Text style={styles.textScrollView}> Cargando ... </Text>
                </View>
          }
        </ScrollView>
      </View>

      {/* Button */}
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}} >
        <TouchableHighlight style={[s.btnTouchable,]} onPress={ savePicture }>
          <View style={[s.btn, s.btnInfo, styles.button]}>
            <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Save this picture from gallery</Text>
          </View>
        </TouchableHighlight>  
        {/* </View> */}
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
    jsonframe:{
      flex: 1.5, 
      backgroundColor: "white", 
      marginTop: 20
    },
    pictureframe:{
      flex: 2.5, 
      backgroundColor: "skyblue"
    },
    button:{
        height:80, 
        width: 200, 
        marginTop:20
    },
    textbutton:{
        fontSize: 1.3 * c.REM
    },
    scrollView:{
      margin: 10,

    },
    textScrollView:{
      fontSize: 1.1 * c.REM
  },
});