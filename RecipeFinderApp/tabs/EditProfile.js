import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    Alert,
    View, 
    SafeAreaView, 
    Image, 
    ScrollView,
    Icon,
    FlatList,
    ListItem,
    TextInput,
    TouchableOpacity
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AddAllergy from '../components/AddAllergy';
import { AuthContext } from '../component/context';
import TagBar from '../components/TagBar';

const EditProfile = ({navigation, route}) => {
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [allergies, setAllergies] = useState([]);

  //Deletes Ingredient Item from List
  const deleteItem = id => {
    setAllergies(prevAllergies => {
      return prevAllergies.filter(item => item.id !== id);
    });
  };

  //Stores and Retrieves Ingredients data to Local Storage
  useEffect(() =>{
    getAllergiesFromUserDevice();
  }, []);

  useEffect(() => {
    saveAllergiesToUserDevice(allergies);
  }, [allergies]);

  const saveAllergiesToUserDevice = async () => {
    try {
      const stringifyAllergies = JSON.stringify(allergies);
      const userName = await AsyncStorage.getItem('userName');
      await AsyncStorage.setItem(userName +'\'s allergies', stringifyAllergies);
    } catch (error){
      console.log(error);
    }
  };

  const getAllergiesFromUserDevice = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      const allergiesDevice = await AsyncStorage.getItem(userName+'\'s allergies');
      if(allergiesDevice != null){
        setAllergies(JSON.parse(allergiesDevice))
      }
    } catch (error) {
      console.log(error);
    }
  };

//Adds Ingredient to Pantry List
  const addAllergy = text => {
    if (text == '') {
      Alert.alert(
        'No item entered',
        'Please enter an allergy',
      );
    } else {
      setAllergies(prevAllergies => {
        return [{id: Math.random(), ingredient: text}, ...prevAllergies];
      });
    }
  };


    return (
        <View>
            <TextInput
            style={{ 
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            }}
            onChangeText={text => setNewUsername(text)}
            value={newUsername}
            placeholder="Enter new username"
            />
            
            {/* <FlatList
                data={allergies}
                renderItem={({item, index}) => <ListItem item={item} deleteItem={deleteItem}
            />}
            keyExtractor={(item, index) => index.toString()}
            /> */}
            <AddAllergy addAllergy={addAllergy} />
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
})