import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccProfile from './AccProfile';
import EditProfile from './EditProfile';
import Cam from './Cam';


const Stack = createNativeStackNavigator();

function App() {
  return (
    //this holds all the possible pages the user is able to go to through the profile
    <NavigationContainer independent='true'>
      <Stack.Navigator initialRouteName="Profile" screenOptions={{
        tabBarShowLabel:false,
        headerShown:false,}}>
        <Stack.Screen name="Profile" component={AccProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Cam" component={Cam} screenOptions={{
        tabBarShowLabel:false,
        headerShown:true,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;