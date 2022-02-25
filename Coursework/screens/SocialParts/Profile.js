import React, { Component } from 'react';
import {Text, View, StyleSheet, Pressable } from 'react-native';
import {Avatar, Caption, Divider, Title} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Friends from './MeetFriends';




class Profile extends Component{
  constructor(props)
  {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      Friends: 0,
      FriendReq: 0,
    }
  }

componentDidMount()
{
  this.getInfo();
  this.getProfilePic();
  }


getInfo = async () => {
  const auth = await AsyncStorage.getItem('@token');
  const user_id = await AsyncStorage.getItem('@id');
  return fetch("http://localhost:3333/api/1.0.0/user/"+user_id, {
    headers: {
      'X-Authorization':  auth
    }
  })
  .then( (response) => {
    if(response.status === 200){
      console.log(response);
      return response.json()
    }
    else if(response.status === 401){
      console.log("user not found")
    }
    else{
      throw 'Something went wrong'
    }
  })
  .then( (responseJson) => {
    console.log("omg it got this far maud");
    this.setState({
      firstname: responseJson.first_name,
      lastname: responseJson.last_name,
      email: responseJson.email,
      Friends: responseJson.friend_count
    })
    console.log(this.state);
    console.log(responseJson);
  })
  .catch((error) => {
    console.log(error);
})
}

getProfilePic = async () =>{
  const auth = await AsyncStorage.getItem('@token');
  const user_id = await AsyncStorage.getItem('@id');
  return fetch("http://localhost:3333/api/1.0.0/user/"+user_id+"/photo", {
    method: 'get',
    headers: {
      'X-Authorization':  auth
    }
  })
  .then( (response) => {
    if(response.status === 200)
    {
      return response.json()
    }
    else if(response.status === 400)
    {

      throw 'Invalid email or password';
    }
    else
    {
      throw 'Something went wrong';
    }
  })
  .catch( (error) => {
    console.log(error);
  })
}
  





  render(){
    return(
      
        <SafeAreaView style={ProfileStyle.container}>
            <View style={ProfileStyle.ProfileInfo}>
              <View style={{flexDirection: 'row', marginTop: 15}}>

                <Avatar.Image/>

                <View style={{marginLeft: 20}} >
                  <Title style={ProfileStyle.name}>{this.state.firstname} {this.state.lastname} </Title>

                  <Caption>{this.state.email}</Caption>

                </View>

              </View>


              <View style={ProfileStyle.ProfileBtns}>
                
                <Pressable style={ProfileStyle.Button} onPress={() => this.props.navigation.navigate('Friends')}>
                      <Text style={ProfileStyle.btnTxt}>Friends: {this.state.Friends}</Text>
                </Pressable>

                <Divider orientation="vertical" />

                <Pressable style={ProfileStyle.Button}>
                      <Text style={ProfileStyle.btnTxt}>Requests: XX</Text>
                </Pressable>

                <Pressable style={ProfileStyle.Button}>
                  <Text style={ProfileStyle.btnTxt}> Edit Profile </Text>
                </Pressable>

              </View>

              <Divider style={ProfileStyle.Divider} />

            </View>
        </SafeAreaView>

      
        
      
    );
  }
}

const ProfileStyle = StyleSheet.create(
  {
    container: 
    {
      flex:1,
    },


    Divider:
    {
      marginTop:10,
    },

    Button:
    {
      flex: 1,
      borderRadius: 4,
      marginLeft: 10,

    },

    btnTxt:
    {
      color: 'black',
      fontWeight:'bold'
    },

    ProfileBtns:
    {
      flexDirection: 'row', 
      marginTop: 15,
    },

    ProfileInfo: 
    {
      paddingHorizontal: 30,
      marginBottom:25,
    },
  }
)

export default Profile;