import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import Camera from 'react-native-camera'
import { Images,Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import ImageActions from '../Redux/ImageRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Styles
// import styles from './Styles/LaunchScreenStyles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 1,
    borderRadius: 100,
    borderWidth:2,
    borderColor: Colors.snow,
    margin:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class LaunchScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      src:null
    }
  }
   takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log(data.path)
        // this.setState({src:data.path})
        this.attemptImage(data.path)
      })
      .catch(err => console.error(err));
    
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex:9}}>
          <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
        </Camera>
        </View>
        <View style={{backgroundColor:Colors.coal,padding:30,flex:1,justifyContent: 'center',alignItems: 'center',flexDirection:'row'}}>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
              <View style={{borderRadius:4, margin:10,minHeight:64,minWidth:64,flex:1}}>
              {this.state.src && <Image style={{flex:0,height:64,width:64}} source={{uri:this.state.src}}></Image>}
            </View>
            {/*{
             this.state.src && (<View style={{height:100,width:100}}><Image style={{height:64,width:64,flex:0}} source={{uri:this.state.src}}></Image></View>)
            }*/}
          
              <TouchableOpacity style={[styles.capture,{minHeight:64}]} onPress={this.takePicture.bind(this)}>
                <Icon name="camera" size={24} color={Colors.snow} />
              </TouchableOpacity>
          
            </View>
          </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptImage: (path) => dispatch(ImageActions.imageRequest(path))
  }
}

export default connect(null, mapDispatchToProps)(LaunchScreen)
