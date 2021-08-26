import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default class WifiComponent extends React.Component {
  render(){
      return(
          <View style={[styles.box, {flexDirection: "row" }]}>
              <Ionicons name="md-wifi" size={26} color="#80deea" />
              <Text style={[s.btnPrimaryText, {marginVertical : 4, marginLeft:10}]}>Internet connection status: OFF</Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 80,
    width: 150
  },
});