import React, { Component } from 'react';
import { Text, View, FlatList, TextInput, Button, ScrollView} from 'react-native';
import { Title, Caption } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from '../SocialParts/Posts';

import TouchHistoryMath from 'react-native/Libraries/Interaction/TouchHistoryMath';





class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loadingPrompt: true,
      Posts: [],
      newpost: '',
      friends: [],
      fId: [],
    }
  }

  componentDidMount()
  {
    this.getPosts();
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
      this.getFriends();
    })
    .catch((error) => {
        console.log(error)
    })
     
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
      else if(response.status === 400){
        alert('Bad request');
      }
      else
      {
        alert('something went wrong');
      }
    })
    .then( (responseJson) => {
      console.log(responseJson.user_id)
      this.setState({
        friends: responseJson
      })
      this.initFriendID();
      console.log(this.state.friends.user_id)
      console.log(this.state.friends)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  initFriendID =  () => {
    let temp = this.state.friends
    console.log(temp);
    for(let i = 0; i < temp.length; i++){
      this.state.fId.push((temp[i].user_id));
    }
    console.log(this.state.fId);
    this.getFriendPost();
  }

  getFriendPost = async () => {
    const auth = await AsyncStorage.getItem('@token');
    
    for(let i = 0; i<=this.state.fId.length; i++)
    {
      return fetch("http://localhost:3333/api/1.0.0/user/"+this.state.fId[i]+"/post", 
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
        else if(response.status === 404){
          console.log("no friends")
        }
        else
        {
          alert('something went wrong');
        }
    })
    .then( (responseJson) => {
        console.log(responseJson);
        let temp = responseJson;
        for(i = 0; i< temp.length; i++)
        {
          this.state.Posts.push(temp[i]);
        }
        console.log(this.state.Posts)
    })
    .catch((error) => {
        console.log(error)
    })
    }
    
     
  }

  Post = async () => 
  {
    const auth = await AsyncStorage.getItem('@token');
    const id = await AsyncStorage.getItem('@id');

    let postinfo = {
      text: this.state.newpost
    }

    return fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization' : auth,
      },
      body: JSON.stringify(postinfo)
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 201){
        this.state.newpost ="";
        this.getPosts();
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

  removePost = async (postid) =>
  {
    const auth = await AsyncStorage.getItem('@token');
    const id = await AsyncStorage.getItem('@id');

    return fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post/"+postid+"/like", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization' : auth,
      }
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
        this.getPosts();
        return response.json();
      }
      else if(response.status === 401){
        alert('Bad request');
      }
      else if(response.status === 403){
        console.log("you have not liked this post")
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

  likePost = async (postid) => 
  {
    const auth = await AsyncStorage.getItem('@token');
    const id = await AsyncStorage.getItem('@id');

    return fetch("http://localhost:3333/api/1.0.0/user/"+id+"/post/"+postid+"/like", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization' : auth,
      }
    })
    .then( (response) => 
    {
      console.log(response);
      if(response.status === 200){
        this.getPosts();
        return response.json();
      }
      else if(response.status === 400){
        alert('Bad request');
      }
      else if(response.status === 403){
        this.removePost(postid);
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
          <View>
            <TextInput
              type='text'
              onChangeText={text => this.setState({newpost: text})}
              placeholder='Update your status...'
            />
            <Button
              title="Post"
              onPress={() => this.Post()}
            />
                
            

          </View>
          <ScrollView>
          <FlatList scrollEnabled
            data = {this.state.Posts}
            renderItem = {({item}) => 
              (
                <View>
                  <Title>{item.author.first_name} {item.author.last_name}</Title>
                  <Caption>{item.timestamp}</Caption>
                  <Text>{item.text}</Text>
                  <Text>Likes: {item.numLikes}</Text>
                  <Button
                    title="like post"
                    onChangeText={text => this.setState({newpost: text})}
                    onPress={() => this.likePost(item.post_id)}
                  />
                </View>
              )}
            keyExtractor={(item,index) => item.post_id}
          />
          </ScrollView>
                    
        </View>
      );
  }
}






export default HomeScreen;