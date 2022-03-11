
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';


class EditProfile extends Component{
    constructor(props)
    {
        super();
        this.state = {
            firstnameU: '',
            lastnameU: '',
            emailU: '',
            passwordU: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    componentDidMount()
    {
       this.getInfo(); 
    }

    //this was intended to get all the user information 
    //and put the already existing information into the textinputs to
    //which the user can edit it as they wish
    getInfo = async () => {
      const auth = await AsyncStorage.getItem('@token');
      const userid = await AsyncStorage.getItem('@id');
      return fetch("http://localhost:3333/api/1.0.0/user/"+userid, {
              method: 'GET',
              headers: {
                'X-Authorization':  auth,
              },
      })
      .then( (response) => 
          {
              
              console.log(response);
              if(response.status === 200){
                  console.log('info loaded... ');
                  return response.json();
              }
              else if(response.status === 400){
                  alert("No changes has been made please make sure you have updated something");
                  throw 'Bad Request';
              }
              else{
                  alert('something went wrong check console');
                  throw 'Something went wrong';
              }
          })
          .then( (responseJSON) => 
          {
              this.state.firstname = responseJSON.first_name;
              this.state.lastname = responseJSON.last_name;
              this.state.email = responseJSON.email;
              console.log(responseJSON);
              console.log(this.state);
          })
    }

    //sends a post requests using the information that the user 
    //enters in the textinput fields as the body 
    UpdateInfo = async () => {
          const auth = await AsyncStorage.getItem('@token');
          const user_id = await AsyncStorage.getItem('@id');
          let updatedinfo = {
            first_name: this.state.firstnameU,
            last_name: this.state.lastnameU,
            email: this.state.emailU,
            password: this.state.passwordU
          }

          return fetch("http://localhost:3333/api/1.0.0/user/"+user_id, {
              method: 'PATCH',
              headers: {
                'X-Authorization':  auth,
              },
               
              body: JSON.stringify(updatedinfo)
              
          })
          .then( (response) => 
          {
              console.log(JSON.stringify(updatedinfo));
              console.log(response);
              if(response.status === 200){
                  alert("Profile has successfully upadated " +  JSON.stringify(updatedinfo));
                  return response.json();
              }
              else if(response.status === 400){
                  alert("No changes has been made please make sure you have updated something");
                  throw 'Bad Request';
              }
              else{
                  alert('something went wrong check console');
                  throw 'Something went wrong';
              }
          })
          .catch((error) => {
              console.log(error);
          })
    }

    render()
    {
        return(
        <View style={mainStyle.container}>
    
            <View style={mainStyle.InputView}>
              <TextInput
                    style={mainStyle.Input} 
                    type="text"
                    text={this.state.firstname}
                    placeholder={this.state.firstname}
                    onChangeText={text => this.setState({firstname: text})}
                    
                />
            </View>

            <View style={mainStyle.InputView}>
              <TextInput
                    style={mainStyle.Input}
                    type="text"
                    onChangeText={text => this.setState({lastname: text})}
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
                    onChangeText={text => this.setState({passwordU: text})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
            </View>
            <Pressable style={mainStyle.Button} onPress={() => {this.UpdateInfo()}}>
                    <Text style={mainStyle.ButtonText}>Update</Text>
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

export default EditProfile;