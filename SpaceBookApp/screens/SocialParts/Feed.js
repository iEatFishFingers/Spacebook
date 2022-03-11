import React, { Component } from 'react';
import { Text, View, FlatList, TextInput, Button, ScrollView, StyleSheet} from 'react-native';
import { Title, Caption, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';






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
      buttonstat: 'like post',
      buttoncolor: 'blue'
    }
  }

  componentDidMount()
  {
    this.getPosts();
  }


//gets all of the current user friends then calls getfriends function
//to get friend information
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

  //gets the user's friend information and stores 
  //after that calls another function to extract only 
  //the ids
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

  //using the variable that we created to store the friend info
  //we are going to create a loop that will loop around all of the 
  //user's info extracting only the id onto a seperate array
  //then call another function to use the API to get the post
  initFriendID =  () => {
    let temp = this.state.friends
    console.log(temp);
    for(let i = 0; i < temp.length; i++){
      this.state.fId.push((temp[i].user_id));
    }
    console.log(this.state.fId);
    this.getFriendPost();
  }

  //using the array from the last function we are going to get all the post from each user
  //by looping through the array of id till all of them have been through
  //while adding to the post array 
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

  //uses the info that the user provided as the body and post the information to the server 
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

  //this does not get called straight away
  //as i wanted this to be simular to facebook if this post is already liked
  //then this function will be called
  //and it will send a delete request to the server
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

  //sends a post request to the server using where there are parameters
  //that get sent through so then the right post and the right
  //user sends the post
  likePost = async (postid,id) => 
  {
    const auth = await AsyncStorage.getItem('@token');
    

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
        this.state.buttoncolor="grey";
        return response.json();
      }
      else if(response.status === 400){
        this.removePost();
      }
      else if(response.status === 403){
        this.removePost();
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
        <View style={FeedStyle.container}> 
          <View style={FeedStyle.postSection}>
            <TextInput
              multiline
              numberOfLines={5}
              type='text'
              onChangeText={text => this.setState({newpost: text})}
              placeholder='Update your status...'
            />
            <Button
              title='Upload Post'
              style={this.state.buttoncolor}
              onPress={() => this.Post()}
            />
                
            

          </View>
          
          <ScrollView >
          <FlatList scrollEnabled
          style={FeedStyle.FriendSection}
            data = {this.state.Posts}
            renderItem = {({item}) => 
              (
                <View style={FeedStyle.postCard}>
                  <Title>{item.author.first_name} {item.author.last_name}</Title>
                  <Caption>{item.timestamp}</Caption>
                  <Text>{item.text}</Text>
                  <Text>Likes: {item.numLikes}</Text>
                  <Button
                    title="like post"
                    onChangeText={text => this.setState({newpost: text})}
                    onPress={() => this.likePost(item.post_id,item.author.user_id)}
                  />
                  <Divider/>
                </View>
              )}
            keyExtractor={(item,index) => item.post_id}
          />
          </ScrollView>
                   
        </View>
      );
  }
}

const FeedStyle = StyleSheet.create(
  {
    container:
    {
      flex : 1,
      backgroundColor: '#d3d3d3'
    },

    postSection:
    {
      backgroundColor: "white",
      marginBottom: 10,
      borderRadius: 5,
    },

    FriendSection:
    {
      margin:5,
      backgroundColor: 'Light gray',
      
    },

    postCard:
    {
      margin:15,
      borderRadius:20,
      backgroundColor:'white',
    }



  }
)




export default HomeScreen;