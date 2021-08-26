import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default class WifiComponent extends React.Component {
  state = {
    connectionState: null,
  };

  componentDidMount() {
    this._subscribe();
  }

  _subscribe() {
    const connectionState = NetInfo.addEventListener(state => {
      if (state.isConnected){
        this.setState({connectionState:"connected"});
      }else{
        this.setState({connectionState:"disconnected"});
      }
    })
  }
  
  render(){
      return(
          <View style={[styles.box, {flexDirection: "row" }]}>
            {this.state.connectionState == "connected" 
              ? <Ionicons name="md-wifi" size={26} color="#80deea" /> 
              : <Ionicons name="md-wifi" size={26} color="red" />
            }
            <Text style={[s.btnPrimaryText, {marginVertical : 4, marginLeft:10}]}>Internet connection status: {this.state.connectionState}</Text>
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