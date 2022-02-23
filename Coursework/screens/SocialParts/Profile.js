import React, { Component } from 'react';
import {Text, View, StyleSheet, Pressable } from 'react-native';
import {Avatar, Caption, Divider, Title} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';




class Profile extends Component{
  constructor(props)
  {
    super();
    this.state = {
      Friends: 0,
      FriendReq: 0,
    }
  }


  render(){
    return(
      
        <SafeAreaView style={ProfileStyle.container}>
            <View style={ProfileStyle.ProfileInfo}>
              <View style={{flexDirection: 'row', marginTop: 15}}>

                <Avatar.Image/>

                <View style={{marginLeft: 20}} >
                  <Title style={ProfileStyle.name}>Man lyke </Title>

                  <Caption>@ManLykeBobyuhNuh</Caption>

                </View>

              </View>


              <View style={ProfileStyle.ProfileBtns}>
                
                <Pressable style={ProfileStyle.Button}>
                      <Text style={ProfileStyle.btnTxt}>Friends: XX</Text>
                </Pressable>

                <Divider orientation="vertical" />

                <Pressable style={ProfileStyle.Button}>
                      <Text style={ProfileStyle.btnTxt}>Requests: XX</Text>
                </Pressable>

              </View>

              <Divider style={ProfileStyle.Divider} />

            </View>
        </SafeAreaView>

      
        
      
    );
  }
}

const ProfileStyle = StyleSheet.create(
  {
    container: 
    {
      flex:1,
    },
    Divider:
    {
      marginTop:10,
    },

    Button:
    {
      flex: 1,
      borderRadius: 4,
      marginLeft: 10,

    },

    btnTxt:
    {
      color: 'black',
      fontWeight:'bold'
    },

    ProfileBtns:
    {
      flexDirection: 'row', 
      marginTop: 15,
    },

    ProfileInfo: 
    {
      paddingHorizontal: 30,
      marginBottom:25,
    },
  }
)

export default Profile;