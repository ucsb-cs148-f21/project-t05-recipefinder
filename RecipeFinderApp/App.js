import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


 import Header from './components/Header';
import ListItem from './components/ListItem';
import AddIngredient from './components/AddIngredient';

const App = () => {
  const [pantryIngredients, setPantryIngredients] = useState([]);
  const deleteItem = id => {
    setPantryIngredients(prevPantryIngredients => {
      return prevPantryIngredients.filter(item => item.id !== id);
    });
  };

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
      <Header title="Pantry List" />
      <AddIngredient addPantryIngredient={addPantryIngredient} />
      <FlatList
        data={pantryIngredients}
        renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem}
          />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;