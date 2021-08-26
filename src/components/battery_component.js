import React from 'react';
import * as Battery from 'expo-battery';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default class BatteryComponent extends React.Component {
  state = {
    batteryLevel: null,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    const batteryLevel = await Battery.getBatteryLevelAsync() * 100;
    this.setState({ batteryLevel: Math.trunc(batteryLevel)});
   
    this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      this.setState({ batteryLevel });
    });
  }

  _unsubscribe() {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render(){
      return(
          <View style={[styles.box, {flexDirection: "row" }]}>
            {this.state.batteryLevel > 20 
              ? <Ionicons name="md-battery-half" size={23} color="#80deea" /> 
              : <Ionicons name="md-battery-half" size={23} color="red" />}
            <Text style={[s.btnPrimaryText, {marginVertical : 4, marginLeft:10}]}>Battery level: {this.state.batteryLevel}%</Text>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 40,
    width: 150
  }
});