import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Image, View } from 'react-native';
import Feed from './SocialParts/Feed'
import Profile from './SocialParts/Profile';
import Friends from './SocialParts/MeetFriends';
import EditProfile from './SocialParts/EditProfile';
import Cam from './SocialParts/Cam';


const Stackv2 = createBottomTabNavigator();

class bottomTab extends Component{
  render(){
    return(
      <Stackv2.Navigator 
      screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 90,
        }
      }}
      >
        <Stackv2.Screen name="Profile" component={Profile}options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
              <Image source={require('../assets/profile.png')}
              resizeMode='contain'
              style={{width: 25,
              height: 25,
            tintColor: focused ? 'SkyBlue' : '#748c94',
          }}
              />
              <Text>Profile</Text>
            </View>
          ),
        }}/>
        <Stackv2.Screen name="Feed" component={Feed} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
              <Image source={require('../assets/home.png')}
              resizeMode='contain'
              style={{width: 25,
              height: 25,
            tintColor: focused ? 'SkyBlue' : '#748c94',
          }}
              />
              <Text>Home</Text>
            </View>
          ),
        }}/>
        <Stackv2.Screen name="Friends" component={Friends} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent:'center', top:10}}>
              <Image source={require('../assets/friends.png')}
              resizeMode='contain'
              style={{width: 25,
              height: 25,
            tintColor: focused ? 'SkyBlue' : '#748c94',
          }}
              />
              <Text>Friends</Text>
            </View>
          ),
        }}/>
      </Stackv2.Navigator>
    );
  }
}



export default bottomTab;

const NavStyle = StyleSheet.create(
  {
    main:
    {
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
      elevation: 0,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      height: 90,
    }
  }
)
