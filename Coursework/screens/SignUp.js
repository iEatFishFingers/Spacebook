
import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, TextInput, Alert,StyleSheet } from 'react-native';


class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            Firstname:'',
            Surname:'',

        }

    }
    post =() => {
        console.log("working");
        let sendLoginInfo = {
            first_name: this.state.Firstname,
            last_name: this.state.Surname,
            email: this.state.email,
            password: this.state.password
        }

        console.log(sendLoginInfo);
        return fetch('http://localhost:3333/user', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendLoginInfo)
        })
        .then((response) => {
            Alert.alert("successfully signed up stylll");
            this.state.Firstname="";
            this.state.Surname="";
            this.state.email="";
            this.state.password="";
        })
        .catch((error) =>
        {
            console.log(error)
        })
    }



  render(){
    return(
        <View style={mainStyle.container}>
            
            <View style={mainStyle.InputView}>
              <TextInput 
                    type="text"
                    onChangeText={text => this.setState({Firstname: text})}
                    placeholder="Firstname"
                />
            </View>

            <View style={mainStyle.InputView}>
              <TextInput
                    type="text"
                    onChangeText={text => this.setState({Surname: text})}
                    placeholder="Surname"
              />
            </View>

            <View style={mainStyle.InputView}>
              <TextInput
                    type="text"
                    onChangeText={text => this.setState({email: text})}
                    placeholder="Email"
                />
            </View>

            <View style={mainStyle.InputView}>
                <TextInput
                    onChangeText={text => this.setState({password: text})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
            </View>
                <Button title="Sign Up" onPress={() => {this.post()}}/>
            
        </View>
    );
  }
}

const mainStyle = StyleSheet.create(
    {
      container: 
      {
        flex: 1,
        backgroundColor: "#00000",
        alignItems: "center",
        justifyContent: "center",
      },

      InputView: {
        backgroundColor: "#808080",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
  
      },
    }
)


export default SignUp;