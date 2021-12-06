import React, {useRef, useState } from "react";
import {StyleSheet, Text, View, Button, Image, TextInput, ImageBackground,TouchableHighlight,Picker, Dimensions, TouchableOpacity} from 'react-native';
import Animation from '../Animation';
import Swiper from 'react-native-swiper';
import region1 from '../images/region1.jpeg'
import region2 from '../images/region2.jpeg'
import region3 from '../images/region3.jpeg'
import region4 from '../images/region4.jpeg'
import region5 from '../images/region5.jpeg'
import region6 from '../images/region6.jpeg'
import region7 from '../images/region7.jpeg'
import region8 from '../images/region8.jpeg'

const SongjiangScreen = ({ navigation }) => {
  //const images = ["region1","region2","region3","region4"];

  const [image, setImage] = useState('../images/region1.jpeg');
  const [selectedValue, setSelectedValue] = useState("Songjiang");
  const [show, setShow] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const swiper = useRef(null);
  const [enable, setEnable] = useState(true);
  const onPress = (id) => {setOpacity(1-opacity),
        setImage((id==1)?region1:((id==2)?region2:((id==3)?region3:((id==4)?region4
                :((id==5)?region5:((id==6)?region6:((id==7)?region7:region8)))))))
        ,setShow(!show),console.log(id)
  console.log(opacity)
  };

    const SongjiangView =
    (    <Swiper
           ref={swiper}
           containerStyle={styles.wrapper}
           scrollEnabled={enable}
           showsButtons
         >
           <View style={{ flex: 1, height: Dimensions.get('window').height }}>
             <View>
               <Swiper
                 onTouchStart={e => {
                   setEnable(false)
                 }}
                 onTouchEnd={e => {
                   setEnable(true)
                 }}
                 onMomentumScrollEnd={e => {
                   setEnable(true)
                 }}
               >
           <View style={styles.slide}>

             <View>
               <Image style = {{ flex:1, width:1000, height: 800,}}
                 source={require('../images/full11.jpeg')}/>
             </View>
            </View>


             </Swiper>
             </View>
           </View>
           <View style={styles.slide}>
               <ImageBackground style = {{ flex:1, width:1000, height: 800, opacity:opacity}}
                 source={require('../images/full1.jpeg')}>
                 <TouchableOpacity style ={styles.button1}
                   onPress={()=>onPress(1)}
                 >
                   <Text> Region1</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style ={styles.button2}
                   onPress={()=>onPress(2)}
                 >
                   <Text> Region2</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style ={styles.button3}
                   onPress={()=>onPress(3)}
                 >
                   <Text> Region3</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style ={styles.button4}
                   onPress={()=>onPress(4)}
                 >
                   <Text> Region4</Text>
                 </TouchableOpacity>
                </ImageBackground>
             {show?
               <View>
               <Image style = {{ flex:1, width:400, height: 600,}}
                 source={image}/>
               </View>
             :<View></View>}
           </View>


         </Swiper>
);

    const HuizhouView =
    (    <Swiper
           ref={swiper}
           containerStyle={styles.wrapper}
           scrollEnabled={enable}
           index={0}
           showsButtons
         >
           <View style={{ flex: 1, height: Dimensions.get('window').height }}>
             <View>
               <Swiper
                index={1}
                 onTouchStart={e => {
                   setEnable(false)
                 }}
                 onTouchEnd={e => {
                   setEnable(true)
                 }}
                 onMomentumScrollEnd={e => {
                   setEnable(true)
                 }}
               >
           <View style={styles.slide}>
             <View>
               <Image style = {{ flex:1, width:1000, height: 800,}}
                 source={require('../images/full21.jpeg')}/>
             </View>
            </View>

             </Swiper>
             </View>
           </View>
           <View style={styles.slide}>
               <ImageBackground style = {{ flex:1, width:1000, height: 600, opacity:opacity}}
                 source={require('../images/full2.jpeg')}>
                 <TouchableOpacity style ={styles.button5}
                   onPress={()=>onPress(5)}
                 >
                   <Text> Region1</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style ={styles.button6}
                   onPress={()=>onPress(6)}
                 >
                   <Text> Region2</Text>
                 </TouchableOpacity>

                 <TouchableOpacity style ={styles.button7}
                   onPress={()=>onPress(7)}
                 >
                   <Text> Region3</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style ={styles.button8}
                   onPress={()=>onPress(8)}
                 >
                   <Text> Region4</Text>
                 </TouchableOpacity>
                </ImageBackground>
             {show?
               <View>
               <Image style = {{ flex:1, width:600, height: 600,}}
                 source={image}/>
               </View>
             :<View></View>}
           </View>


         </Swiper>
);


  return (
  //<ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>

          <Picker
            selectedValue={selectedValue}
            style={{ height: 40, width: 130, textAlign:'center', }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Songjiang" selectedValue="Songjiang" />
            <Picker.Item label="Huizhou" selectedValue="Huizhou" />
            <Picker.Item label="Highlight" selectedValue="Highlight" />
          </Picker>


        {(selectedValue =="Songjiang")?SongjiangView:HuizhouView}

     </View>
   // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  horizontal: {
    flex:1,
    flexDirection:'row',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  input:{
    color: 'black',
    height: 40,
    fontSize:18,
    backgroundColor: 'yellow',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent:'flex-end',
  },
    button1:{
      backgroundColor:'transparent',
      height: 45,
      marginTop:100,
      marginRight:5,
      marginLeft:250,
      alignItems: 'center',
    },
    button2:{
      backgroundColor:'transparent',
      height: 45,
      marginTop:350,
      marginRight:5,
      marginLeft:600,
      alignItems: 'center',
    },
    button3:{
      backgroundColor:'transparent',
      height: 45,
      marginTop: -130,
      marginLeft:-850,
      alignItems: 'center',
    },
    button4:{
      backgroundColor:'transparent',
      height: 45,
      marginTop: -10,
      marginLeft:-200,
      alignItems: 'center',
    },
    button5:{
      backgroundColor:'transparent',
      height: 45,
      marginTop:200,
      marginLeft:0,
      alignItems: 'center',
    },
    button6:{
      backgroundColor:'transparent',
      height: 45,
      marginTop:200,
      marginLeft:300,
      alignItems: 'center',
    },
    button7:{
      backgroundColor:'transparent',
      height: 45,
      marginTop: -100,
      marginLeft:-850,
      alignItems: 'center',
    },
    button8:{
      backgroundColor:'transparent',
      height: 45,
      marginTop: 50,
      marginLeft:-100,
      alignItems: 'center',
    },
});

export default SongjiangScreen;
