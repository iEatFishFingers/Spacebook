
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';


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


//sends info to the server
    post =() => {
        console.log("working");
        let sendLoginInfo = {
            first_name: this.state.Firstname,
            last_name: this.state.Surname,
            email: this.state.email,
            password: this.state.password
        }

        console.log(sendLoginInfo);
        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendLoginInfo)
        })
        .then((response) => {
            if(response.status === 201)
            {
                alert("Sign up successful returning to login page");
                this.state.Firstname="";
                this.state.Surname="";
                this.state.email="";
                this.state.password="";
                this.props.navigation.navigate('Login');
            }
            else if(response.status === 400)
            {
                console.log('Unable to sign up perhaps email already in use');
                throw 'Unable to sign up perhaps email already in use';
            }
            else
            {
                throw 'Something went wrong';
            }
            
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
                    style={mainStyle.Input} 
                    type="text"
                    onChangeText={text => this.setState({Firstname: text})}
                    placeholder="Firstname"
                />
            </View>

            <View style={mainStyle.InputView}>
              <TextInput
                    style={mainStyle.Input}
                    type="text"
                    onChangeText={text => this.setState({Surname: text})}
                    placeholder="Surname"
              />
            </View>

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
            <Pressable style={mainStyle.Button} onPress={() => {this.post()}}>
                    <Text style={mainStyle.ButtonText}>Sign Up</Text>
            </Pressable>
            
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

      Button: {
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

    }
)


export default SignUp;