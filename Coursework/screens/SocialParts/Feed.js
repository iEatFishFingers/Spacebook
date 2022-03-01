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
    })
    .catch((error) => {
        console.log(error)
    })
     
  }


  //create a function that gets all of the users friends id in an array
  //and store in constructor (global var)

  //using the array loop through each user and get the post and push the values 
  //into the post constructor value

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