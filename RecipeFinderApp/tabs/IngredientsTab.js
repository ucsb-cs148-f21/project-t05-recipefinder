import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert, InteractionManager, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


import ListItem from '../components/ListItem';
import AddIngredient from '../components/AddIngredient';


const IngredientsTab = ({navigation}) => {
  const [pantryIngredients, setPantryIngredients] = useState([]);
  const [filterData, setfilterData] = useState([]);
  let ingredientsQuery = '';
  let apiURL = '';
  
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

  const searchPantryIngredient = () => {
    ingredientsQuery = '';
    for(var i=0; i < pantryIngredients.length; i++){
      if(i == pantryIngredients.length-1){
      ingredientsQuery += pantryIngredients[i].ingredient;
      }else{
        ingredientsQuery += pantryIngredients[i].ingredient + ",";
      }
    }
    fetchPost(ingredientsQuery);
    console.log(ingredientsQuery);
  }

  const fetchPost = (ingredientsQuery) =>{
    //apiURL = 'http://localhost:19002/api/recipes/?ingredients=' + ingredientsQuery;
    apiURL = 'https://jsonplaceholder.typicode.com/photos';
    console.log(apiURL)
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
      setfilterData(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={pantryIngredients}
        renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem}
          />}
      />
      <AddIngredient addPantryIngredient={addPantryIngredient} />
      <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
            searchPantryIngredient();
            navigation.navigate('Recipes', filterData)
          }}
        >
        <Text style={styles.btnText}>
          <Icon name="search" size={20} /> Search By Ingredients
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    fontSize: 18,
  },
  btn: {
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
    fontSize: 20,
    textAlign: 'center',
  },

});

export default IngredientsTab;
