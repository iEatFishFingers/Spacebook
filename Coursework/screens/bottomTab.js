import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Feed from './SocialParts/Feed'
import Profile from './SocialParts/Profile';
import Friends from './SocialParts/MeetFriends';
import EditProfile from './SocialParts/EditProfile';


const Stackv2 = createBottomTabNavigator();

class bottomTab extends Component{
  render(){
    return(
      <Stackv2.Navigator screenOptions={{headerShown: false}}>
        <Stackv2.Screen name="Feed" component={Feed}/>
        <Stackv2.Screen name="Profile" component={Profile}/>
        <Stackv2.Screen name="Friends" component={Friends}/>
        <Stackv2.Screen name="EditProfile" component={EditProfile}/>
      </Stackv2.Navigator>
    );
  }
}



export default bottomTab;
