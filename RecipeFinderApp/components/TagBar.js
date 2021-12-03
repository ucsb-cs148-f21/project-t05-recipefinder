import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Icon,
  View
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TagInput from 'react-native-tags-input';



export default class Bar extends Component {
    constructor(props) {
      super(props);
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
        // const userName = await AsyncStorage.getItem('userName');
        // await AsyncStorage.setItem(userName +'\'s allergies', this.state.tagsArray);
      };
   
    render() {
      return (
          <TagInput
            updateState={this.updateTagState}
            tags={this.state.tags}
            placeholder="Tags..."                            
            label='Press comma & space to add a tag'
            labelStyle={{color: '#fff'}}
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
