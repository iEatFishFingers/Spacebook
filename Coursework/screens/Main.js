import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stackv2 from './bottomTab';
import EditProfile from './EditProfile';



const Stack = createBottomTabNavigator();

class Main extends Component{
  render(){
    return(
      <NavigationContainer independent={true}>
        <Stackv2/>
      </NavigationContainer>
    );
  }
}

export default Main;
