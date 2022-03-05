import React, { Component } from 'react';
import {Text, View, StyleSheet, Pressable, FlatList, Button } from 'react-native';
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
      req: [],
      post: []
    }
  }

componentDidMount()
{
  this.getInfo();
  this.getProfilePic();
  this.getReq();
  this.getPosts();
}


getInfo = async () => {
  const auth = await AsyncStorage.getItem('@token');
  const user_id = await AsyncStorage.getItem('@id');
  return fetch("http://localhost:3333/api/1.0.0/user/"+user_id, {
    method: 'GET',
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
    method: 'GET',
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
  
getReq = async () => {
  const auth = await AsyncStorage.getItem('@token');
  const id = await AsyncStorage.getItem('@id');
  
  return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
    method: 'GET',
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

  .then(async (responseJson) =>
  {
    console.log(responseJson);
    this.setState({
      req: responseJson
    })
    this.state.FriendReq = (this.state.req).length;
  })

  .catch((error) => {
    console.log(error);
  })

  
}

getPosts = async () => {
  const auth = await AsyncStorage.getItem('@token');
  const id = await AsyncStorage.getItem('@id');

  return fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post", 
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
        Posts: responseJson
    })
  })
  .catch((error) => {
      console.log(error)
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
                      <Text style={ProfileStyle.btnTxt}>Requests: {this.state.FriendReq}</Text>
                </Pressable>

                <Pressable style={ProfileStyle.Button}>
                  <Text style={ProfileStyle.btnTxt}> Edit Profile </Text>
                </Pressable>

              </View>

              <Divider style={ProfileStyle.Divider} />

              <View>

              <FlatList
                data = {this.state.Posts}
                renderItem = {({item}) => 
          
                (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Avatar.Image/>
                      <View>
                        <Title style={ProfileStyle.postname}>{item.author.first_name} {item.author.last_name}</Title>
                        <Caption style={ProfileStyle.time}>{item.timestamp}</Caption>
                      </View>
                    </View>
                    
                    <Text style={ProfileStyle.Posttxt}>{item.text}</Text>
                    <Text>Likes: {item.numLikes}</Text>
                    <Pressable style={ProfileStyle.likebtn} onPress={() => this.likePost(item.user_id,post_id)}>
                      <Text style={ProfileStyle.btnPostTxt}>Like</Text>
                    </Pressable>
                    <Divider style={ProfileStyle.Divider}/>
                    
            </View>
          )}

          keyExtractor={(item,index) => item.post_id}
          />
              </View>

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

    btnPostTxt:
    {
      color: 'white',
      fontWeight:'bold'
    },

    likebtn:
    {
      borderRadius: 30,
      height: 30,
      marginTop: 10,
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#87ceeb',
    },
    

    Posttxt:
    {
      fontSize: 15,
      fontWeight: "bold",
    },

    postname:
    {
      marginLeft: 10,
      marginTop:10,
      fontSize: 15,
    },

    time:
    {
      marginBottom: 10,
      marginLeft: 10,
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