import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import IngredientsTab from '../RecipeFinderApp/tabs/IngredientsTab'
import RecipeTab from '../RecipeFinderApp/tabs/RecipeTab'

const BottomTabs = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if(route.name === 'Ingredients') {
                iconName = focused 
                 ? 'ios-nutrition' 
                 : 'ios-nutrition-outline';
              }else if(route.name === 'Recipes') {
                iconName = focused ? 'ios-book' : 'ios-book-outline';
              }
              return  <Ionicons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOption={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
            >
          <BottomTabs.Screen name="Ingredients" component={IngredientsTab} />
          <BottomTabs.Screen name="Recipes" component={RecipeTab} />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}




