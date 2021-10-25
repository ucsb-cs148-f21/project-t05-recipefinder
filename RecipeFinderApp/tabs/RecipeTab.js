import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import SearchRecipe from '../components/SearchRecipe';

const RecipeTab = () => {

  const searchRecipes = () => {

  };

  return (
    <View>
      <Header title="Search for a Recipe"/>
      <SearchRecipe searchRecipes={searchRecipes}/>
    </View>
  );
};

export default RecipeTab;