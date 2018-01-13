import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Image,
  Picker
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import Camera from 'react-native-camera';
export default class camerahere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#000000', Absorbtion: 0, r: 1.0001, rsq: 1.0001, slope: .5001, yint: 1.0001, conc: ''
    };
    this.compute = this.compute.bind(this);
  }
  clickedme(){
  }
 
  compute(){
        let yint = parseFloat(this.state.yint)
        let slope = parseFloat(this.state.slope)
        let conc = parseFloat(this.state.conc);
        this.setState({Absorbtion: ((slope*conc)+yint)});
      }
 
 render() {
    return (
      <View style = {{flex: 1, flexDirection: 'row'}}>
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}
          /*source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/476-200.png'}}*/></Text>
        </Camera>
      </View>
      <View style = {{flexDirection:'column', justifyContent: 'flex-end', alignItems: 'center', marginBottom:30}}>
        <Text style={{fontSize: 15, color: 'black'}}>y = {this.state.slope.toFixed(4)}x+{parseFloat(this.state.yint.toFixed(4))}</Text>
        <Text style={{fontSize: 15, color: 'black'}}>r = {this.state.r.toFixed(4)}</Text>
        <Text style={{fontSize: 15, color: 'black'}}>r² = {this.state.rsq.toFixed(4)}</Text>
        <Picker
          mode= "dropdown"
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Green" value="green" />
          <Picker.Item label="Blue" value="blue" />
        </Picker>
        <TextInput
        value={this.state.text}
        onChangeText={(conc) => this.setState({conc})}
        onEndEditing ={this.compute}
         //style={styles.Input}
         style={{height: 50,color:'black',width: 150,textAlign:'center', marginHorizontal: 50}}
          keyboardType='numeric'
          maxLength={20}
          editable = {true}
          placeholderTextColor = 'gray'
          placeholder = 'Concentration'
         // disableFullscreenUI = {true}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Absorbtion = {this.state.Absorbtion.toFixed(4)}</Text>
      </View>
    </View>
    );
  }
 
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
      alert('Point was added!');
  }
}
 
 
 
const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
  Input: {
    flex:1,
    height: 50,
  //  borderColor: '#cccccc',
  //  borderWidth: 1,
    color:'black',
  //  padding:1,
    width: 100,
    textAlign: 'center',
    flexDirection: 'row'
  },
 
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: 250,
      height: 350
 
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  capture: {
    backgroundColor: '#4286f4',
    borderRadius: 15,
    color: '#ffffff',
    padding: 30,
    marginBottom: 40,
    marginHorizontal: 200
  }
}


 
 
);