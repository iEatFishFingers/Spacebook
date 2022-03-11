import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, StyleSheet } from 'react-native';
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
      SuggestedFriends: [],
      Friendrequests: [],
      FriendsList: []
    }
  }

  componentDidMount(){
    this.getFriends();
    this.getListOfUsers();
    this.getFriendReq();
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
        SuggestedFriends: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  SendReq = async (id) => {
    const auth = await AsyncStorage.getItem('@token');
    console.log(id);
    return fetch("http://localhost:3333/api/1.0.0/user/"+id+"/friends", {
      method: 'POST',
      headers: {
        'X-Authorization':  auth,
      }
      })
      .then( (response) => 
      {
        if(response.status === 201){
          alert('successfull');
        }
        else if(response.status === 400){
          alert('Bad request');
        }
        else if(response.status === 403){
          alert('Request has already been sent')
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

  getFriends = async () => 
  {
    const auth = await AsyncStorage.getItem('@token');
    const id = await AsyncStorage.getItem('@id');

    return fetch('http://localhost:3333/api/1.0.0/user/'+id+'/friends', {
      method: 'GET',
      headers: {
        'X-Authorization':  auth,
      }
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
        return response.json();
      }
      else if(response.status === 404){
        throw 'got no friends'
      }
      else
      {
        alert('something went wrong');
      }
    })
    .then( (responseJson) => {
      console.log(responseJson);
      this.setState({
        FriendsList: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getFriendReq = async () => {
    const  auth = await AsyncStorage.getItem('@token');

    return fetch("http://localhost:3333/api/1.0.0/friendrequests", 
  {
    method: 'GET',
    headers: {
      'X-Authorization':  auth,
    }
  })
  .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
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
        Friendrequests: responseJson
    })
  })
  .catch((error) => {
      console.log(error)
  })
  }

  AccReq = async (id) => {
    const auth = await AsyncStorage.getItem('@token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+id, 
    {
      method: 'POST',
      headers: {
        'X-Authorization':  auth,
      }
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
        this.getFriendReq();
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
    .catch((error) => {
      console.log(error)
    })

    
  }

  DecReq = async (id) => {
    const auth = await AsyncStorage.getItem('@token');
    return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+id, 
    {
      method: 'DELETE',
      headers: {
        'X-Authorization':  auth,
      }
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
        this.getFriendReq();
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
    .catch((error) => {
      console.log(error)
    })
  }

  render(){
    return(
        <View>

          <View style={FriendStyl.FriendSec}>
            <Text style={FriendStyl.FriendTitle}> --- Friends --- </Text>
            <FlatList
            data = {this.state.FriendsList}
            renderItem = {({item}) => 
            
            (
              <View style={{flexDirection: 'row'}}>
                <View sytle={{alignItems: 'flex-start'}}>
                  <Text>{item.user_givenname} {item.user_familyname}</Text>
                  <Caption>{item.email}</Caption>
                </View>
                <View sytle={{alignItems: 'flex-end'}}>  
                  <Button
                      title="View Profile"
                      onPress={() => this.ViewProfile(item.user_id)}
                    />
                </View>
                
              </View>
              
              
              
            )}

            keyExtractor={(item,index) => item.user_id}
            />
          </View>

          <View style={FriendStyl.FriendSec}>
            <Text style={FriendStyl.FriendTitle}> Friend Requests </Text>
            <FlatList
            data = {this.state.Friendrequests}
            renderItem = {({item}) => 
            (
              <View>
                <Text>{item.first_name} {item.last_name}</Text>
                <Caption>{item.email}</Caption>
                <Button
                  title="Accept"
                  onPress={() => this.AccReq(item.user_id)}
                />
                <Button
                  title="Decline"
                  onPress={() => this.DecReq(item.user_id)}
                />
              </View>
            )}

            keyExtractor={(item,index) => item.user_id}
            />
          </View>

          <View style={FriendStyl.FriendSec}>
            <Text style={FriendStyl.FriendTitle}> People you may know ....</Text>
            <FlatList
            data = {this.state.SuggestedFriends}
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

const FriendStyl = StyleSheet.create(
  {
    container:{
      flex:1,
    },

    FriendSec:
    {
      margin:10,
      alignItems: 'center',
      justifyContent: 'center',
    },

    FriendTitle:
    {
      fontSize:25,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
    },

  }
)

export default Friends;