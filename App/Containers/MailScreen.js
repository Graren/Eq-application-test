import React from 'react'
import { ScrollView, Text, Image, View, StyleSheet, Button, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Images, Colors, Metrics, Fonts } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {  RNMail as Mailer } from 'NativeModules';
import { connect } from 'react-redux'
var RNGRP = require('react-native-get-real-path');
// Styles
// import styles from './Styles/MailScreenStyles'


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonPad:{
    width: Metrics.screenWidth * 0.9,
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

class MailScreen extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      path: this.props.path ? this.props.path : null,
      mailTo: '',
      subject: '',
      content: '',
    }
  }

  componentWillReceiveProps(newProps){
    if (newProps.path){
      this.setState({path:newProps.path})
    }
  }

  onCameraPress(){
    console.tron.log('SHIT')
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleHelp = () => {
    if(this.validateEmail(this.state.mailTo)){
      Mailer.mail({
                subject: this.state.subject === ''? 'Envio Archivo': this.state.subject,
                recipients: [this.state.mailTo],
                body: this.state.content,
                attachment: {
                  path:  this.state.path,  // The absolute path of the file from which to read data.
                  type: 'jpg',   // Mime Type: jpg, png, doc, ppt, html, pdf
                  name: '',   // Optional: Custom filename for attachment
                }
              }, (error, event) => {
                  if(error) {
                    console.tron.log('bad')
                  }
              });   
      NavigationActions.pop({popNum: 2})
    }
    else{
      Alert.alert(
        'Invalid mail',
        'Type a valid email address',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={ styles.header}>
          <Text style={ [styles.text,{fontSize: Fonts.size.h5}] }>Emqu-test</Text>
        </View>

        <View style={{flex:2, alignContent:'center',justifyContent:'center',padding:10}}>
          <View style={{flex:1,backgroundColor:'#F5F5F5',borderRadius:4}}>
            <View style={{flex:1, flexDirection:'column',alignContent:'center',padding:10, paddingTop:0}}>
            <Text style={{fontSize:Fonts.size.input}}>Mail</Text>
            <TextInput
              style={{height: 40,fontSize:Fonts.size.input}}
              onChangeText={(mailTo) => this.setState({mailTo})}
              value={this.state.mailTo}
            />
            </View>
            <View style={{flex:1, flexDirection:'column',alignContent:'center',paddingHorizontal:10, paddingTop:5}}>
            <Text style={{fontSize:Fonts.size.input}}>Subject</Text>
            <TextInput
              style={{height: 40,fontSize:Fonts.size.input}}
              onChangeText={(subject) => this.setState({subject})}
              value={this.state.subject}
            />
            </View>
            <View style={{flex:1, flexDirection:'column',alignContent:'center',padding:10, paddingTop:0}}>
            <Text style={{fontSize:Fonts.size.input}}>Body</Text>
            <TextInput
              style={{height: 40,fontSize:Fonts.size.input}}
              onChangeText={(content) => this.setState({content})}
              value={this.state.content}
            />
            </View>
          </View>
          <View style={styles.buttonPad}>
          {this.state.path && <Image style={{flex:0,height:64,width:64}} source={{uri:this.state.path}}></Image>}
          <TouchableOpacity  onPress={this.handleHelp} style={styles.button}>
            <Text style={styles.text}>Enviar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    path: state.image.path
  }
}

export default connect(mapStateToProps, null)(MailScreen)

