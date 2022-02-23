import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native-web';




const Stack = createBottomTabNavigator();

class HomeScreen extends Component{

componentDidMount()
{
  this.getData();
  this.checkLoggedIn();
}

  getData = async () => 
  {
    const value = await AsyncStorage.getItem('@token');
    return fetch("http://localhost:3333/api/1.0.0/search", 
      {
        'headers': {
          'X-Authorization':  value
        }
      })

      .then((response) => {
        if(response.status === 200){
          console.log(value);
            return response.json()
        }else if(response.status === 401){
          this.props.navigation.navigate("Login");
        }else{
            throw 'Something went wrong';
        }
    })
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        listData: responseJson
      })
    })
    .catch((error) => {
        console.log(error);
    })

  }
    
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@token');
    if (value == null) {
        this.props.navigation.navigate('Login');
    }
  };

  render(){
    return(
      <View></View>
    );
  }
}

export default HomeScreen;