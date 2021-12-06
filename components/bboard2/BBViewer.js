import React, { useState, useEffect } from "react";
import {SafeAreaView, View,Text,TextInput,
        Button,TouchableOpacity,
        FlatList,StyleSheet, ScrollView} from 'react-native'
import Axios from 'axios'
import ValueProvider,{useValue} from '../ValueContext';



const BBoards = () => {
  const {currentValue} = useValue();
  const [title,setTitle] = useState("");
  const [text,setText] = useState("");
  const [data,setData] = useState("");
  const [posts,setPosts] = useState([]);
  const [bboard,setBboard] = useState("");
  const [show, setShow] = useState(false);

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

  const onPress = (item) => {setBboard(item), setShow(true),refresh()};

  const [numNewPosts,setNumNewPosts] = useState(0)

  useEffect(() => {



    const ps = refresh()
    const names = getBBoardNames()

  },[bboard,numNewPosts])

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

    const debugView =
    (<View style={{ flexDirection:'column',justifyContent: 'flex-end',}}>
      <Text>
         DEBUGGING
      </Text>
      <Text>
         bb: {bboard}
      </Text>
      <Text>
         show: false
      </Text>
      <Text>
         bb.length={""+posts.length}
      </Text>
      <Text>
         post=
      </Text>
      <Text>
      {JSON.stringify(posts,null,5)}
      </Text>
  </View>);

  const Item = ({item}) => {
       const userid = currentValue.userid;
       const isAuthor = userid === item.author;


    return (
      <View>
        <Text style={{fontSize:20, backgroundColor:'#aaa', width:300,marginHorizontal: 8,marginVertical: 10,textAlign: "center",}}
        >{item.text}</Text>

      </View>
    )
  }


  return (
  <ScrollView style={{flex:1}}>
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        BBViewer
      </Text>
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
      {show?<View>
          <FlatList
             style={{flex:1}}
             data = {posts}
             renderItem = {({item}) => (<Item item={item}/>)}
             keyExtractor = {(item) => item._id}
          />
      </View>: <Text></Text>}
      {debugView}

    </View>
  </ScrollView>

  );
}


const styles = StyleSheet.create({
  item: {
    backgroundColor:'black',
    textAlign: "center",
    fontSize:5,
    padding: 5,
    width:50,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'space-around',
    justifyContent: 'flex-start',
  },
    paragraph: {
      fontSize:32,
      padding:25,
      color:"red",
      backgroundColor:'black',
      textAlign: "center",
    },
  input:{
    borderColor:'red',
    borderWidth:5,
    borderRadius:20,
    backgroundColor:'#fcc',
    padding:5,
    margin:5,

  },

})

export default BBoards;
