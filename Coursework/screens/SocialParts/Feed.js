import React, { Component } from 'react';
import { Text, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Posts from '../SocialParts/Posts';
import { Container, Content} from 'native-base';




class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      loadingPrompt: true,
      info: []
    }
  }

  render(){
      return(
        <View> 
          <FlatList
          />
        </View>
      );
  }
}






export default HomeScreen;