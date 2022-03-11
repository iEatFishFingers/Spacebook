import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stackv2 from './bottomTab';



const Stack = createBottomTabNavigator();

class Main extends Component{
  render(){
    return(
      //so then the program is able to navigate to different pages
      //the stackv2 holds the custom bottom tab
      <NavigationContainer independent={true}>
        <Stackv2/>
      </NavigationContainer>
    );
  }
}






export default Main;
