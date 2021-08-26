import React from 'react';
import { StyleSheet, Text,View, TouchableHighlight } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import BatteryComponent from '../components/battery_component';
import WifiComponent from '../components/wifi_component';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function TakePicturePage({ navigation}) {
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
          <TouchableHighlight style={[s.btnTouchable]}>
              <View style={[s.btn, s.btnInfo, {height:60, width: 80, marginBottom:10}]}>
                <Text style={[s.btnText, s.btnPrimaryText, {fontSize: 1.3 * c.REM}]}>Clear</Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>
      </View>

      {/* Picture frame */}
      <View style={{ flex: 3, backgroundColor: "skyblue"}} >
        <Text style={[s.btnText, s.btnPrimaryText, {fontSize: 1.3 * c.REM}]}>Picture Frame</Text>
      </View>

      {/* Buttons */}
      <View style={{ flex: 1}} >
        <View style={[ {flexDirection: "row", justifyContent:"space-between"}]}>
          
          <View style={[{flex:1, flexDirection: "row", }]}>
            <TouchableHighlight style={[s.btnTouchable,{flex:1}]} onPress={() => navigation.navigate('TakePicture')}>
              <View style={[s.btn, s.btnInfo, styles.buttons, {marginRight:10}]}>
                <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Flip Camera</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={[{flex:1, flexDirection: "row"}]}>
            <TouchableHighlight style={[s.btnTouchable,{flex:1}]} onPress={() => navigation.navigate('TakePicture')}>
              <View style={[s.btn, s.btnInfo, styles.buttons, {marginRight:10}]}>
                <Text style={[s.btnText, s.btnPrimaryText, styles.textbutton]}>Take Picture</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={[{flex:1.1, flexDirection: "row"}]}>
            <TouchableHighlight style={[s.btnTouchable,{flex:1.1}]} onPress={() => navigation.navigate('DisplayPicture')}>
              <View style={[s.btn, s.btnInfo, styles.buttons]}>
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