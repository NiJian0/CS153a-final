import { Button, Text, TextInput, View, FlatList, Image, StyleSheet, TouchableOpacity,StatusBar, ScrollView} from "react-native";
import React, { useState, useEffect } from "react";

const Gallery = (props) => {
  const [loading,setLoading] = useState(true)
  const [count, setCount] = useState();
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('1');
  const [data,setData] = useState([]);
  const onPress = () => {setId(text), setShow(!show)};
  const cursor = ["A6pm5YoNe2yxHCH0_IjZW4lMUmIt00EKulMygQNLGYU",
                  "sX2A4NbSVFvMEJqZnKCZwYdJCRgq_LvqRdDLODD3MCI",
                  "40UoM_U46H9gQfKln9Klcv0cuGxw9fNKO27-b-C-AAY",
                  "9uHyVpcwYKPLxmhS0cujdjaVWrU7Ckl2Zfv8iZfVrZM",
                  "7agQlkFJKDzgIMttzFywCLqX2VSHM2ejYsn4U0qes-4",
                  "JfK9v-vXj3eLKsm_QjioaVxiAxfv-fC6_dj2wb-Knz4",
                  "YbvTsiYcEx9Njy4fKtFr4cp1vjcB2joLieFQCdGMlGM",
                  "wagSOsXRw6LG2kSsNR8sfxq8yymW6-XKoZBBN_npeMI",
                  "N1Z6YBpVXbEI_SBysXI1QjlSjg33aex_eMXqx1AM7qw",
                  "z5RwneJ3A1TOAczUs1ZHRlxed5XwcRkLtnLUSGiH5eE"];


  const getReps = async (id) => {
    try{
      //let result = await fetch('https://data.cdc.gov/resource/9mfq-cb36.json?state='+state)
      let result = await fetch('https://cors-anywhere.herokuapp.com/www.xiaohongshu.com/web_api/sns/v3/page/notes?page_size=20&sort=hot&page_id=5e31a4cced7b61000137414e&cursor='+cursor[text]+'&sid=')
      //let result = await fetch('https://api.github.com/users/Kishanjvaghela/repos')
      let cdata = (await result.json()).data.notes
      //cdata = cdata.sort(covid_before)
      setData(cdata)
      setLoading(false)
      console.log(cdata)
    }catch(e){
      console.log(`error in getCovidData: ${JSON.stringify(e)}`)
    }

  }


  useEffect(() => {
    getReps(id)
  }, [id]);


  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection:'row', }}>
      <object  data={item['images_list'][0]['url']}  type="image/jpg" width="500" height="500" >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_dot_black.svg/1024px-Location_dot_black.svg.png" width="1" height="1"/>
      </object>

     </View>
  )}

    const debugView =
    (<View style={{flex:1, flexDirection:'column',justifyContent: 'flex-end',}}>
      <Text>
         DEBUGGING
      </Text>
      <Text>
         userId: {id}
      </Text>
      <Text>
         showreps: {!show?'false':'true'}
      </Text>
      <Text>
         repos.length={data.length}
      </Text>

  </View>);

    const flatListView = (
      <View>
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ItemSeparatorComponent={
            () => <View style={{ width: 16, backgroundColor: 'pink' }}/>
        }
        getItemLayout={(data, index) => (
        {length: 40, offset: 40 * index, index}
  )}
      />
      </View>
    )


  return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Photo Viewer
      </Text>

      <View style={{flexDirection:'row', justifyContent:'center', padding:10}}>
        <Button
          color='thistle' title='Previous'
          onPress = {() =>
               setText((parseInt(text)-1).toString())}
      />
        <Text style={{fontSize:24, color:'navy',}}>Page: </Text>
        <TextInput

          style={{height: 30, }}
          placeholder=""
          value={text}
          onChangeText={text => {setText(text)}}
        />
        <Button
          color='thistle' title='Next'
          onPress = {() =>
               setText((parseInt(text)+1).toString())}
      />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={{color:'grey', padding:10, marginVertical:10, fontSize:32,}}>{show?'hide photos':'show photos'}</Text>
      </TouchableOpacity>
      {show?flatListView: <Text></Text>
      }
      <Text style={{fontSize:20, backgroundColor:'wheat',color:'skyblue', width:150,height:30,marginHorizontal: 8,textAlign: "center",}}>End of List</Text>
    </View>
   </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  item: {
    fontSize:16,
    backgroundColor:'#aaa',
    padding: 5,
    width:200,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  paragraph: {
    fontSize:32,
    fontWeight:'bold',
    padding:25,
    color:"#87ceeb",
    backgroundColor:'wheat',
    textAlign: "center",

  },
      contentContainer: {
       paddingVertical: 10
      }

});

export default Gallery
