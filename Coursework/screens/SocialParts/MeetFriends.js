import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stackv2 from '../bottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Caption } from 'react-native-paper';




const Stack = createBottomTabNavigator();

class Friends extends Component{
  constructor(props){
    super(props);
    this.state={
      data: []
    }
  }

  componentDidMount(){
    this.getListOfUsers();
  }


  getListOfUsers = async () => 
  {
    const auth = await AsyncStorage.getItem('@token');


    return fetch("http://localhost:3333/api/1.0.0/search", {
      method: 'GET',
      headers: {
        'X-Authorization':  auth,
      }
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
        alert('successfull');
        return response.json();
      }
      else if(response.status === 400){
        alert('Bad request');
      }
      else
      {
        alert('something went wrong');
      }
    })
    .then( (responseJson) => {
      console.log(responseJson);
      this.setState({
        data: responseJson
      })
      console.log(this.state.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  SendReq = async (id) => {
    const auth = await AsyncStorage.getItem('@token');
    console.log(id);
    return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization':  auth,
      }
      })
      .then( (response) => 
      {
        if(response.status === 200){
          alert('successfull');
        }
        else if(response.status === 400){
          alert('Bad request');
        }
        else
        {
          alert('something went wrong');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }







  render(){
    return(
      <View>
        <View>
          <Text> People you may know ....</Text>
          <FlatList
          data = {this.state.data}
          renderItem = {({item}) => 
          
          (
            <View>
              <Text>{item.user_givenname} {item.user_familyname}</Text>
              <Caption>{item.user_email}</Caption>
              <Button
                title='Send Friend Request'
                onPress={() => this.SendReq(item.user_id)}
              />
            </View>
          )}

          keyExtractor={(item,index) => item.user_id}
          />
        </View>
      </View>
    );
  }
}

export default Friends;