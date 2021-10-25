import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import SearchRecipe from '../components/SearchRecipe';
import SeeAvailableRecipes from '../components/SeeAvailableRecipes';

const RecipeTab = () => {

  const searchRecipes = () => {

  };

  const goToRecipeListView = () =>{

  };

  /*const fetchPost = (recipesQuery) =>{
    apiURL = 'http://localhost:19002/api/recipes/?ingredients=' + recipesQuery;
    console.log(apiURL)
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
      setfilterData(responseJson);
      setmasterData(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }*/

  return (
    <View>
      <Header title="Search for a Recipe"/>
      <SearchRecipe searchRecipes={searchRecipes}/>
      <SeeAvailableRecipes goToRecipeListView={goToRecipeListView}/>
    </View>
  );
};

export default RecipeTab;