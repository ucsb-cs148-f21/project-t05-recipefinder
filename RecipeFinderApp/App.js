import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import IngredientsTab from '../RecipeFinderApp/tabs/IngredientsTab'
import RecipeTab from '../RecipeFinderApp/tabs/RecipeTab'

const BottomTabs = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen name = "Ingredients" component={IngredientsTab} />
          <BottomTabs.Screen name = "Recipes" component={RecipeTab} />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}




