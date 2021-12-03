import React, { Component, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Icon,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TagInput from 'react-native-tags-input';



export default class Bar extends Component {


    async retrieveAllergies(){
      try{
        const userName = await AsyncStorage.getItem('userName');
        allergies = await AsyncStorage.getItem(userName+'\'s allergies');
        return JSON.parse(allergies);

      }catch (error){
        console.log(error);
      }
    };

  
    constructor(props) {
      super(props);
      var allergyArr = this.retrieveAllergies();
      this.state = {
        tags: {
          tag: '',
          tagsArray: []
        },
        tagsColor: '#3ca897',
        tagsText: '#fff',
      };
    }
    
    updateTagState = async (state) => {
        this.setState({
          tags: state
        })
        console.log(state.tagsArray);
        // const userName = await AsyncStorage.getItem('userName');
        // try{
        // if(state.tagsArray){
        //   await AsyncStorage.setItem(userName+'\'s allergies', state.tagsArray);
        //   var text = AsyncStorage.getItem(userName+'\'s allergies');
        //   console.log(text)
        // }
        // } catch(error) {
        //   console.log(error);
        // }
      };
   
    render() {
      return (
          <TagInput
            updateState={this.updateTagState}
            tags={this.state.tags}
            placeholder="Allergies..."                            
            label='Enter Allergies one by one'
            labelStyle={{color: '#122'}}
            leftElementContainerStyle={{marginLeft: 3}}
            containerStyle={{width: (Dimensions.get('window').width - 40)}}
            inputContainerStyle={[styles.textInput, {backgroundColor: this.state.tagsColor}]}
            inputStyle={{color: this.state.tagsText}}
            onFocus={() => this.setState({tagsColor: '#fff', tagsText: '#3ca897'})}
            onBlur={() => this.setState({tagsColor: '#3ca897', tagsText: '#fff'})}
            autoCorrect={false}
            tagStyle={styles.tag}
            tagTextStyle={styles.tagText}
            keysForTag={', '}/>
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3ca897',
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
      },
      tag: {
          backgroundColor: '#fff'
        },
      tagText: {
          color: '#3ca897'
        },
  });
