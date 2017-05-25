import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Styles
// import styles from './Styles/LaunchScreenStyles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonPad:{
    width: Metrics.screenWidth * 0.9,
    backgroundColor: Colors.coal,
    height:100,
    maxHeight:100,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    alignSelf:'center',
  },
  navBar: {
    padding:10,
    alignSelf:'flex-start',
    height: Metrics.navBarHeight,
    maxHeight:Metrics.navBarHeight,
    flex:1,
    backgroundColor:Colors.blue,
  },
  header: {
    padding:0,
    paddingHorizontal:20,
    margin:0,
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    borderBottomWidth:1,
    borderBottomColor: Colors.coal,
    alignItems:'center'
  },
  text:{
    fontSize: Fonts.size.input,
    color: Colors.snow,
  },
  button:{
    flex:1,
    backgroundColor: Colors.blue,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
    marginHorizontal:5
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 10
  }
});

export default class LaunchScreen extends React.Component {
  
  onCameraPress(){
    NavigationActions.launchScreen()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={ styles.header}>
          <Text style={ [styles.text,{fontSize: Fonts.size.h5}] }>Emqu-test</Text>
        </View>
        <View style={{flex:1, alignContent:'center',justifyContent:'center'}}>
          <View style={styles.buttonPad}>
          <TouchableOpacity  onPress={this.onCameraPress} style={styles.button}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.onCameraPress} style={styles.button}>
            <Text style={styles.text}>Nfc</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
}
