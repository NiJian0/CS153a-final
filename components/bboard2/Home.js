import React from "react";
import {StyleSheet, Text, View, Button, Image, TextInput, ImageBackground, ScrollView} from 'react-native';
import Animation from '../Animation';



const HomeScreen = ({ navigation }) => {
  return (
  //<ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>
      <View style={{flex:3, alignItems:'center',backgroundColor:'white',}}>
        <View>
          <ImageBackground style = {{ flex:1, width:1500, height: 800,}}
            source={{uri:'https://wwwcdn.coconut.is/s/jnhz/img/pc-start3.jpg'}}/>
          </View>
          <Text style={styles.header}>
              APP
          </Text>
      </View>
      <View style={{flex:2, flexDirection:'row'}}>
       <View style={styles.horizontal}>
          <Image
             style={{width:"80%",}}
             source={{uri:'https://wwwcdn.coconut.is/s/jnhz/img/wap/m1-logo.png'}}/>

        </View>
        <View style={{flex:1.5, flexDirection:'row'}}>
          <Text style={styles.subhead}>
            <Text>Jiangnan Landscape is an ancient-style simulation mobile game. </Text>
            <Text style={styles.subhead}>Players will play the role of ZhengmingWen, redraw the Ming Dynasty Jiangnan's prosperous scenery,
                                         and create your own Jiangnan landscape.
                                         Enjoy the daily life of the water village in the landscape painting.</Text>
          </Text>

        </View>

        <View style={{flex:1.5, flexDirection:'row'}}>
         <View style={styles.horizontal}>
            <Image
               style={{width:"100%",}}
               source={require('../images/1.gif')}/>

          </View>
        </View>
      </View>
      <View>
      </View>

     </View>
   // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    flex:1,
    alignItems:'center',
    fontSize:460,
    padding:25,
    color:"#fff",
  },
   subhead: {
   textAlign: 'center',
    fontSize:24,
    color:'black',
    fontFamily: "Cochin",
    fontWeight: 'bold',
    lineHeight: 38,
  },
  horizontal: {
    flex:1,
    flexDirection:'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  input:{
    color: 'black',
    height: 40,
    fontSize:18,
    backgroundColor: 'yellow',
  },
    //contentContainer: {
     //paddingVertical: 20
    //}
});

export default HomeScreen;
