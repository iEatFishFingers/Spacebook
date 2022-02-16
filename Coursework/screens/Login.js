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
  
      Test = () => {
        alert(
          "login successful now going to the homescreen "
        );
        console.log(response);
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
        .then((response) => {
          console.log(response);
          this.state.email = '';
          this.state.password = '';
          this.Test();
        })
        .catch((error) => {
          console.log(error)
        })
      }


  render(){
    return(
        <View>
            <Image source={'@/assets/logo.png'}/>
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
                <Button title="Real Login" onPress={() => this.Login()}/>
                <Button title="Test values" onPress={() => this.Test()}/>
                <Button title="Dont have an account click here to sign up" onPress={() => this.props.navigation.navigate('SignUp')}/>
            </form>
        </View>
    );
  }
}


export default Login;
