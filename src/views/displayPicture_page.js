import React from 'react';
import { StyleSheet, Text,View, TouchableHighlight, ScrollView } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import BatteryComponent from '../components/battery_component';
import WifiComponent from '../components/wifi_component';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default function DisplayPicturePage({ navigation}) {
  return (
    <View style={[styles.container, {flexDirection: "column"}]}>

      {/* Battery and connection status */}
      <View style={{ flex: 1}} >
        <BatteryComponent/>
        <WifiComponent/>
      </View>

      {/* Picture frame */}
      <View style={{ flex: 2, backgroundColor: "skyblue"}} >
        <Text style={[s.btnText, s.btnPrimaryText, {fontSize: 1.3 * c.REM}]}>Picture Frame</Text>
      </View>

      {/* Json frame */}
      <View style={{ flex: 2, backgroundColor: "skyblue", marginTop: 10}} >
        {/* <Text style={[s.btnText, s.btnPrimaryText, {fontSize: 1.3 * c.REM}]}>Scrolable Panel</Text> */}
        <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>
      </ScrollView>
      </View>

      {/* Button */}
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center"}} >
        {/* <View style={[ {flexDirection: "row", justifyContent:"center"}]}> */}
        <TouchableHighlight style={[s.btnTouchable,]}>
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
    button:{
        height:80, 
        width: 200, 
        marginTop:20
    },
    textbutton:{
        fontSize: 1.3 * c.REM
    }
});