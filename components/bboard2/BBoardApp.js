import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, Icon} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import animation from '../Animation';


import ValueProvider from '../ValueContext';

import Gallery from './Gallery'
import Home from './Home'
import BBoards from './BBoards'
import Registration from './Registration'
import BBViewer from './BBViewer'
import Cities from './Cities'

const Tab = createBottomTabNavigator();

const App = () => {
  const data =
    {name:"",
     email:"",
     appURL: 'https://glacial-hamlet-05511.herokuapp.com',
     //appURL: 'http://127.0.0.1:3000',
     secret: "",
   }

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName = "Home"
        screenOptions={{
        tabBarActiveTintColor: 'purple',}}
        >
          <Tab.Screen name="Home" component= {Home}
          options={{  //title: 'Home',
                      headerShown: false,
                      tabBarLabel: 'Home',
                       tabBarIcon: ({ color, size }) => (
                       <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}/>
          <Tab.Screen name="Gallery" component= {Gallery}
           options = {{
                       tabBarIcon: ({ color, size }) => (
                       <MaterialCommunityIcons name="image" color={color} size={size} />
                       ),
           }}
          />
          <Tab.Screen name="Cities" component= {Cities}
           options = {{
                       tabBarIcon: ({ color, size }) => (
                       <MaterialCommunityIcons name="city" color={color} size={size} />
                       ),
           }}
          />
          <Tab.Screen name="BBoards" component= {BBoards}
           options = {{
                       tabBarIcon: ({ color, size }) => (
                       <MaterialCommunityIcons name="forum" color={color} size={size} />
                       ),
           }}
           />
          <Tab.Screen name="Register" component= {Registration}
           options = {{
                      tabBarLabel: 'Account',
                       tabBarIcon: ({ color, size }) => (
                       <MaterialCommunityIcons name="account" color={color} size={size} />
                       ),
           }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  )
}

export default App
