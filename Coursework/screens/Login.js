import React, { Component } from 'react';
import { Text, TextInput, View, Image,StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-web';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            keyath: ''
        }

    }
  
      Test = () => {
        console.log('going to homw now ');
        this.props.navigation.navigate('Home')
      }

      Login = () => {
        console.log("login button pressed");
        let loginInfo = {
          email: this.state.email,
          password: this.state.password
        }

        console.log(loginInfo);
        return fetch("http://localhost:3333/api/1.0.0/login", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginInfo)
        })
        .then((response) => 
        {
          if(response.status === 200){
              return response.json()
          }else if(response.status === 400){
              throw 'Invalid email or password';
          }else{
              throw 'Something went wrong';
          }
        })
        .then(async (responseJson) => 
        {
              await AsyncStorage.setItem('@token', responseJson.token);
              console.log(responseJson.token);
              await AsyncStorage.setItem('@id', responseJson.id);
              console.log(responseJson.id);
              this.props.navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
        })
      
      }



  render(){
    return(
      
        <View style={mainStyle.container}>
            <Image source={{uri:'https://i.etsystatic.com/20601149/r/il/d9db86/3027240731/il_fullxfull.3027240731_1mhn.jpg'}}
              style = {{ width: 150, height: 150 }}/>
          

              <View style={mainStyle.InputView}>  
                <TextInput
                      style={mainStyle.Input}
                      type="text"
                      onChangeText={text => this.setState({email: text})}
                      placeholder="Email"
                  />
                </View>  
                <View style={mainStyle.InputView}> 
                  <TextInput
                      style={mainStyle.Input}
                      onChangeText={text => this.setState({password: text})}
                      placeholder='Password'
                      secureTextEntry={true}
                  />
                  </View>

                  <Pressable style={mainStyle.Button} onPress={() => this.Login()}>
                    <Text style={mainStyle.ButtonText}>Login</Text>
                  </Pressable>

                  <Pressable style={mainStyle.Button} onPress={() => this.Test()}>
                    <Text style={mainStyle.ButtonText}>Bypass</Text>
                  </Pressable>

                  <TouchableOpacity style={mainStyle.smallText} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={mainStyle.smallText}>Dont have an account click here to sign up</Text> 
                  </TouchableOpacity>
               
                
            </View>
    );
  }
}

const mainStyle = StyleSheet.create(
  {
    container: 
    {
      flex: 1,
      backgroundColor: 'white',
      alignItems: "center",
      justifyContent: "center",
    },

    InputView: {
      backgroundColor: "#87ceeb",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
    },

    Input: {
      flex: 1,
      marginLeft:20,
      color: 'white',
      fontWeight: 'bold',
    },

   Button:
   {
      borderRadius: 30,
      height: 30,
      marginBottom: 10,
      width: 130,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
   },

   ButtonText:
   {
      color: 'white',
      fontWeight: 'bold',
   },

    smallText: {
      height: 30,
      marginBottom:30,
      color: 'grey',
      fontWeight: 'bold',
    },
  
    image: 
    {
      marginBottom: 40,
    }
  });



export default Login;
