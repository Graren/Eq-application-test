import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import Camera from 'react-native-camera';
import { Images } from '../Themes'
// Styles
// import styles from './Styles/LaunchScreenStyles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default class LaunchScreen extends React.Component {
   takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.tron.log(data))
      .catch(err => console.tron.error(err));
    
  }

  render () {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    )
  }
}
