import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,View, TouchableHighlight, Image } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { Camera } from 'expo-camera';

import BatteryComponent from '../components/battery_component';
import WifiComponent from '../components/wifi_component';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function TakePicturePage({ navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [pictureUri, setPictureUri] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back);

  //Permissions
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  //Flip camera
  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //Teke picture
  const takePicture = async () => {
    if (camera) {
      const picture = await camera.takePictureAsync();
      setPictureUri(picture.uri);
      setPreviewPicture(true);
    }
  };

  //Clear
  const clear = () => {
    setPreviewPicture(false);
    setPictureUri(null);
  }

  return (
    <View style={[styles.container, {flexDirection: "column"}]}>

      {/* Battery, connection status and botton clear */}
      <View style={{ flex: 1 }} >
        <View style={[{flexDirection: "row", justifyContent:"space-between"}]}>
          
          <View style={[{flex:2, flexDirection: "column"}]}>
            <BatteryComponent/>
            <WifiComponent/>
          </View>

          <View style={[{flex:2, flexDirection: "column", justifyContent:"flex-end", alignItems:"flex-end"}]}>
          <TouchableHighlight style={[s.btnTouchable]} disabled={!previewPicture} onPress={clear}>
              <View style={[s.btn, !previewPicture ? s.btnSecondary: s.btnInfo, {height:60, width: 80, marginBottom:10}]}>
                <Text style={[s.btnText, s.btnPrimaryText, {fontSize: 1.3 * c.REM}]}>Clear</Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>
      </View>

      {/* Picture frame */}
      <View style={{ flex: 3, backgroundColor: "skyblue"}} >
        {!previewPicture
          ? <Camera style={{flex:1}} type={type} ref={(ref) => setCamera(ref)} ratio={'1:1'}/>
          : <Image source={{ uri: pictureUri }} style={{ flex: 1 }} />
        }
      </View>

      {/* Buttons */}
      <View style={{ flex: 1}} >
        <View style={[ {flexDirection: "row", justifyContent:"space-between"}]}>
          
          <View style={[{flex:1, flexDirection: "row", }]}>
            <TouchableHighlight style={[s.btnTouchable,{flex:1}]} disabled={previewPicture || !hasPermission} onPress={flipCamera}>
              <View style={[s.btn, previewPicture || !hasPermission ? s.btnSecondary: s.btnInfo, styles.buttons, {marginRight:10}]}>
                <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Flip Camera</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={[{flex:1, flexDirection: "row"}]}>
            <TouchableHighlight style={[s.btnTouchable,{flex:1}]} disabled={previewPicture || !hasPermission} onPress={takePicture}>
              <View style={[s.btn, previewPicture || !hasPermission ? s.btnSecondary: s.btnInfo, styles.buttons, {marginRight:10}]}>
                <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Take Picture</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={[{flex:1.1, flexDirection: "row"}]}>
            <TouchableHighlight style={[s.btnTouchable,{flex:1.1}]} disabled={!previewPicture } onPress={() => navigation.navigate('DisplayPicture', {pictureUri: pictureUri})}>
              <View style={[s.btn, !previewPicture ? s.btnSecondary: s.btnInfo, styles.buttons]}>
                <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Next</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
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
  buttons:{
    height:60,  
    marginTop:10
  },
  textbutton:{
    fontSize: 1.3 * c.REM
  }
});