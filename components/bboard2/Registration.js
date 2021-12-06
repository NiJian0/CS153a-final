import React, { useState, useEffect } from "react";
import {View,Text,TextInput,Button,TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'

import ValueProvider,{useValue} from '../ValueContext';

const Registration = () => {
    const {currentValue,setCurrentValue} = useValue()
    const [debugging,setDebugging] = useState(true)
    const [email,setEmail] = useState("")
    const [checkedRegistration, setCheckedRegistration] = useState(false)
    const [data,setData] = useState("");
    const [posts,setPosts] = useState([]);
    const [bboard,setBboard] = useState("");
    const [show, setShow] = useState(false);
    const [numNewPosts,setNumNewPosts] = useState(0);
    const onPress = (item) => {setBboard(item), setShow(true),refresh()};

    useEffect(() => { getUserData(),
                      refresh()
                      getBBoardNames()
                      }, [bboard,numNewPosts])

    const registerEmail = async (email) => {
      try{
          let appURL = currentValue.appURL
          let result = await Axios.post(appURL+'/register',{email:email})
          let secret = result.data.secret
          let userid = result.data.userid

          await AsyncStorage.setItem(
            '@userData',
            JSON.stringify({...currentValue,email,secret,userid}))
          setEmail(email)
          setCurrentValue({...currentValue, email,secret,userid})
        }catch(e){
          console.log('error'+e)
          console.dir(e)

        }
    }

      const refresh = async () => {
        let result = {data:[]}
        result =
          await Axios.post(
            currentValue.appURL+"/posts",
            {bboard:bboard}
          )
        setPosts(result.data)
        return result.data
      };


    const getBBoardNames = async (id) => {
      try{
        const result = await Axios.get(currentValue.appURL+"/bboardNames")
                console.log(result.data)
        setData(result.data)

        //setLoading(false)
      }catch(e){
        console.log(`error : ${JSON.stringify(e)}`)
      }
    }

  const RenderItem = ( item,index) => {
    return (
      <View style={{flexDirection:'row'}}>
       <TouchableOpacity style={styles.item}
        onPress={() => onPress(JSON.stringify(item.item).replaceAll('"',''))}>
                <Text style={{color:'red', padding:5,}}>{JSON.stringify(item.item).replaceAll('"','')}</Text>
       </TouchableOpacity>
     </View>
  )}
    const flatListView = (
      <View>
        <FlatList     horizontal={true}   style={{flex:1}}
        data={data}
        renderItem = {RenderItem}
        keyExtractor={item => item}
      />
      </View>
    )

    const getUserData = async () => {
      let email = currentValue.email
      let secret = currentValue.secret
      const appURL = currentValue.appURL
      // this function gets the userKey from asyncStorage if it is there
      // if not, it goes to the appURL to get a userKey which it stores in asyncStorage
       try {
         console.log('in getUserData')
         let jsonValue = await AsyncStorage.getItem('@userData')
         //jsonValue=null
         console.log('jsonValue = '+jsonValue)

         let userData = null
         if (jsonValue!=null) {
           userData = JSON.parse(jsonValue)
           let newData =
            {appURL:currentValue.appURL,
              email:userData.email,
              userid:userData.userid,
              secret:userData.secret}
           setCurrentValue(newData)
           setEmail(userData.email)
           setCheckedRegistration(true)

         } else {
              console.log('else clause of Registration')
              setCheckedRegistration(true)
              console.log('no async, set checked to true')
         }
       } catch(e) {
         console.dir(e)
       }
    }

  let ui = <Text>nodebug</Text>
  if (debugging) {
    ui = (
      <View>
        <Text>
            currentValue={JSON.stringify(currentValue,null,5)}
        </Text>
      </View>
    )
  }

  const Item = ({item}) => {
       const userid = currentValue.userid;
       const isAuthor = userid === item.author;

    return (
      <View>
        <Text style={{fontSize:20, backgroundColor:'#aaa', width:300,marginHorizontal: 8,marginVertical: 10,textAlign: "center",}}
        >{isAuthor && item.text}</Text>

      </View>
    )
  }

  return (
    <View><Text style={{fontSize:24}}>Mobile Bulletin Board</Text>
        <View style={{padding:10,margin:10,backgroundColor:"#ddd"}}>

             <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Text style={{fontSize:24}}>email: </Text>
                <TextInput
                     style={{fontSize:24}}
                     placeholder="Enter your email "
                     value={email}
                     onChangeText={text =>{ setEmail(text) }}
                />
             </View>

             {currentValue.email==""?
             (<TouchableOpacity
                onPress = {() => registerEmail(email)}
             >
               <Text style={{fontSize:20}}> Register </Text>
             </TouchableOpacity>)
             :
             (<TouchableOpacity
                onPress={async () => {
                  AsyncStorage.clear()
                  setEmail("")
                  setCurrentValue(
                    {appURL:currentValue.appURL,email:"",secret:""})
                }}
             >
               <Text style={{fontSize:20}}> Logout </Text>
             </TouchableOpacity>
           )}

        </View>
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <Button
          title="REFRESH BBOARDS"
          onPress={(item) => refresh(item)}
        />
      </View>

     {flatListView}
      <Text style={{fontSize:32,}}>
        Selected bboard: <Text style={{backgroundColor:'black', color:'red'}}>{bboard}</Text>
      </Text>
      <Text style={{fontSize:24, color:'blue'}}>Post History</Text>
      {show?<View>
          <FlatList
             style={{flex:1}}
             data = {posts}
             renderItem = {({item}) => (<Item item={item}/>)}
             keyExtractor = {(item) => item._id}
          />
      </View>: <Text></Text>}

    </View>
     </View>)
}

const styles = StyleSheet.create({
  input:{
    borderColor:'red',
    borderWidth:5,
    borderRadius:20,
    backgroundColor:'#fcc',
    padding:5,
    margin:5,

  },
  posts:{
    borderColor:'blue',
    borderWidth:5,
    borderRadius:20,
    backgroundColor:'#ccf',
    padding:5,
    margin:5,
  },
    paragraph: {
      fontSize:32,
      padding:25,
      color:"red",
      backgroundColor:'black',
      textAlign: "center",
    },
})

export default Registration;
