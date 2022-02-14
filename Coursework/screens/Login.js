import React, { Component } from 'react';
import { Text, TextInput, View, Button, Image } from 'react-native';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

    }

    binding = () => {
        let email123 = this.state.email
        let passowrd123 = this.state.password
        return email123;
      }
  
      Login = () => {
        alert(
          "email is : " + this.state.email +
          " password is: " + this.state.password
        );
      }


  render(){
    return(
        <View>
            <Image source='./assets/logo.png'/>
          <form>
              <TextInput
                    type="text"
                    onChangeText={text => this.setState({email: text})}
                    placeholder="Email"
                />
                <TextInput
                    onChangeText={text => this.setState({password: text})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <Button title="Real Login" onPress={() => this.props.navigation.navigate('Home')}/>
            </form>
        </View>
    );
  }
}


export default Login;
