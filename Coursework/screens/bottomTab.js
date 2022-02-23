import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-web';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from './SocialParts/Feed'
import Chats from './SocialParts/Chats';
import Profile from './SocialParts/Profile';
import Friends from './SocialParts/MeetFriends';


const Stackv2 = createBottomTabNavigator();

class bottomTab extends Component{
  render(){
    return(
      <Stackv2.Navigator screenOptions={{headerShown: false}}>
        <Stackv2.Screen name="Feed" component={Feed}/>
        <Stackv2.Screen name="Chats" component={Chats}/>
        <Stackv2.Screen name="Profile" component={Profile}/>
        <Stackv2.Screen name="Friends" component={Friends}/>
      </Stackv2.Navigator>
    );
  }
}

export default bottomTab;
