import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import IngredientsTab from '../RecipeFinderApp/tabs/IngredientsTab'
import RecipeTab from '../RecipeFinderApp/tabs/RecipeTab'
import ProfileTab from '../RecipeFinderApp/tabs/ProfileTab'
import RecipeDetails from './tabs/RecipeDetails';

import SplashScreen from './tabs/SplashScreen';
import SignInScreen from './tabs/SignInScreen';
import LogInTab from './tabs/LogInTab';

const BottomTabs = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator
        initialRouteName="SplashScreen"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if(route.name === 'Ingredients') {
                iconName = focused 
                 ? 'ios-nutrition' 
                 : 'ios-nutrition-outline';
              }else if(route.name === 'Recipes') {
                iconName = focused ? 'ios-book' : 'ios-book-outline';
              }else if(route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              }
              return  <Ionicons name={iconName} size={size} color={color} />
            },
          })}
          tabBarOption={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
            >
          <BottomTabs.Screen name="SplashScreen" component={SplashScreen} options={{
            tabBarStyle: {display: 'none'},
            header: (props) => null,
            tabBarButton: (props) => null
          }}/>
          <BottomTabs.Screen name="SignInScreen" component={SignInScreen} options={{
            tabBarStyle: {display: 'none'},
            header: (props) => null,
            tabBarButton: (props) => null
          }}/>
          <BottomTabs.Screen name="Ingredients" component={IngredientsTab} />
          <BottomTabs.Screen name="Recipes" component={RecipeTab} />
          <BottomTabs.Screen name="Profile" component={ProfileTab} />
          <BottomTabs.Screen name="Recipe Details" component={RecipeDetails}   options={{
          //tabBarStyle: {display: 'none'}, // this removes bottom nav bar 
      tabBarButton: (props) => null //this is additional if you want to hide the tab element from the bottom nav
      } }/>
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}




