import React, {Component} from "react";
import {Animated, View, StyleSheet, Text, Platform, TouchableOpacity,Easing, Dimensions, Image,ImageBackground} from "react-native";


var {width, height} = Dimensions.get('window');

export default class Animation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      xValue: new Animated.Value(0),

    }
  }
  _fadeAnimation =() =>{
    Animated.timing(this.state.fadeValue,{
      toValue:1,
      duration:1000,
    }).start();
  }
  _moveAnimation =() =>{
    Animated.timing(this.state.xValue,{
      toValue: 150,
      duration:1000,
      easing: Easing.cubic
    }).start();
  }

  functionOne(){
  // do something
  }
  render() {

    return (
      <View style = {styles.container}>
             <View>
          <ImageBackground style = {{ flex:1, width:550, height: 300,}}
            source={require('../image/map.jpeg')}/>
          </View>
        <Animated.Image
        source = {require('../image/boat.jpeg')}
        style = {[styles.imageView,
        {left: this.state.xValue}]}>
        </Animated.Image>
        <TouchableOpacity style ={styles.button1}
          onPress = {this._moveAnimation}
        >
          <Text> Huizhou</Text>
        </TouchableOpacity>
        <TouchableOpacity style ={styles.button2}
          onPress = {this._moveAnimation}
        >
          <Text> Songjiang</Text>
        </TouchableOpacity>
        <TouchableOpacity style ={styles.button3}
          onPress = {this._moveAnimation}
        >
          <Text> Hangzhou</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  animationView:{
    width:100,
    height:100,
    backgroundColor:'blue',
  },
  button1:{
    backgroundColor:'transparent',
    height: 45,
    marginLeft:40,
    alignItems: 'center',
  },
  button2:{
    backgroundColor:'transparent',
    height: 40,
    marginRight:20,
    alignItems: 'flex-end',
  },
  button3:{
    backgroundColor:'transparent',
    height: 45,
    marginLeft:30,
    marginTop:50,
    alignItems: 'flex-start',
  },
    imageView:{
    width:190,
    height:90,
    backgroundColor:'transparent',
  },
});