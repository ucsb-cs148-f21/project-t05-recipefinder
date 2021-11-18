import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, InteractionManager, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';



import ListItem from '../components/ListItem';
import AddIngredient from '../components/AddIngredient';


const IngredientsTab = ({navigation}) => {
  //Array use to store Ingredients 
  const [pantryIngredients, setPantryIngredients] = useState([]);

  //Deletes Ingredient Item from List
  const deleteItem = id => {
    setPantryIngredients(prevPantryIngredients => {
      return prevPantryIngredients.filter(item => item.id !== id);
    });
  };

  //Stores and Retrieves Ingredients data to Local Storage
  useEffect(() =>{
    getPantryIngredientsFromUserDevice();
  }, []);

  useEffect(() => {
    savePantryIngredientsToUserDevice(pantryIngredients);
  }, [pantryIngredients]);

  const savePantryIngredientsToUserDevice = async todos => {
    try {
      const stringifyPantryIngredients = JSON.stringify(pantryIngredients);
      await AsyncStorage.setItem('pantryIngredients', stringifyPantryIngredients);
    } catch (error){
      console.log(error);
    }
  };

  const getPantryIngredientsFromUserDevice = async () => {
    try {
      const pantryIngredients = await AsyncStorage.getItem('pantryIngredients');
      if(pantryIngredients != null){
        setPantryIngredients(JSON.parse(pantryIngredients))
      }
    } catch (error) {
      console.log(error);
    }
  };

//Adds Ingredient to Pantry List
  const addPantryIngredient = text => {
    if (text == '') {
      Alert.alert(
        'No item entered',
        'Please enter an ingredient when adding to your pantry list',
      );
    } else {
      setPantryIngredients(prevPantryIngredients => {
        return [{id: Math.random(), ingredient: text}, ...prevPantryIngredients];
      });
    }
  };

  


  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={({item, index}) => <ListItem item={item} deleteItem={deleteItem}
          />}
        keyExtractor={(item, index) => index.toString()}
      />
      <AddIngredient addPantryIngredient={addPantryIngredient} />
      <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
            navigation.navigate('Recipes', pantryIngredients)
          }}
        >
        <Text style={styles.btnText}>
          <Icon name="done" size={20} /> Done
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text:{
    fontSize: 18,
  },
  btn: {
    backgroundColor: '#8a2be2',
    padding: 9,
    margin: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

});

export default IngredientsTab;
