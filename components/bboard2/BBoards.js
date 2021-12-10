import React, { useState, useEffect } from "react";
import {SafeAreaView, View,Text,TextInput,
        Button,TouchableOpacity,
        FlatList,StyleSheet, ScrollView} from 'react-native'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValueProvider,{useValue} from '../ValueContext';





const BBoards = () => {
  const {currentValue} = useValue();
  const [title,setTitle] = useState("");
  const [text,setText] = useState("");
  const [keyWords,setKeyWords] = useState("");
  const [bboard,setBboard] = useState("");
  const [posts,setPosts] = useState([]);
  const [numNewPosts,setNumNewPosts] = useState(0)
  const flag = [];

  useEffect(() => {
    // go out to the server and get the posts for the current bboard

    const getPosts = async () => {
      let result = {data:[]}
      result =
        await Axios.post(
          currentValue.appURL+"/posts",
          {bboard:bboard}
        )
      setPosts(result.data)
      return result.data
    }

    const ps = getPosts()

  },[bboard,numNewPosts])

  const addPost = async () =>{

    await Axios.post(currentValue.appURL+"/addComment",
        {email:currentValue.email,
         secret:currentValue.secret,
         bboard:bboard,
         title:title,
         text:text,
       });
    setTitle("");
    setText("");

    setNumNewPosts(numNewPosts+1)
  }

  const remove = async (item) => {
    console.log('remove is called on item: ')
    console.log(item)
    const result = await Axios.post(currentValue.appURL+"/deletePost",
       {email:currentValue.email,
        secret:currentValue.secret,
        postid:item._id})
        console.log(result)
        setNumNewPosts(numNewPosts+1)
  }


  const flagPost = (item) => {return this.flag.push(item)}

  const Item = ({item}) => {
       const userid = currentValue.userid;
       const isAuthor = userid === item.author;
       const isIncluded =(item.text).includes(keyWords);
       //if (keyWords!=null){
        //}
       console.log(isIncluded);

    if(isIncluded)
    return (

      <View style={{padding:10,margin:10,backgroundColor:"#ddd"}}>
        <Text style={{fontSize:24}}>{item.title}</Text>
        <Text>{item.text}</Text>
        <Text>{item.createdAt}</Text>

        {isAuthor &&
          <Button
            title="Delete"
            onPress={()=>remove(item)}/> }

      </View>
    )
    else
    return (<View/>)
  }


  return (
    <ScrollView style={{flex:1}}>

      <View style={styles.input}>
        <Text style={{marginRight:10}}>Bboard</Text>
        <TextInput
            onChangeText={(text) => setBboard(text)}
            placeholder="bboard name"/>
      </View>

      <View style={styles.input}>
          <Text> Add your own post</Text>
          <Text> You've made  {numNewPosts} new posts</Text>
          <TextInput
              onChangeText={(text) => setTitle(text)}
              value={title}
              placeholder="title"/>
          <TextInput
              onChangeText={(text) => setText(text)}
              value={text}
              placeholder="body of the post"/>
          <TouchableOpacity
              onPress = {() => addPost()}
              style={{width:200,backgroundColor:"#fca"}}>
              <Text>Submit</Text>
          </TouchableOpacity>
      </View>


      <View style={styles.posts}>
          <Text>
            BBoard n={""+posts.length}
          </Text>
      <View style={{flexDirection:'row', justifyContent:'flext-start', padding:10}}>
          <TextInput
              style={{height: 30, width:200}}
              value={keyWords}
              onChangeText={(text) => setKeyWords(text)}
              placeholder="Search"/>
      </View>
          <FlatList
             style={{flex:1}}
             data = {posts}
             renderItem = {({item}) => (<Item item={item}/>)}
             keyExtractor = {(item) => item._id}
          />

          <Text>end of flatlist </Text>


      </View>



    </ScrollView>
  )
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
})

export default BBoards;