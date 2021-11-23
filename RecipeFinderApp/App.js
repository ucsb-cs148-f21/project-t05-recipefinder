import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import RootStackScreen from './tabs/RootStackScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './component/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator(); 
const BottomTabs = createBottomTabNavigator();

export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(founduser)=>{
      const userToken = String(founduser[0].userToken) 
      const userName = founduser[0].useraame
    
      try {
        await AsyncStorage.setItem('userToken', userToken)
      } catch(e){
        console.log(e);
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    }, 
    signOut: async ()=>{
      // setUserToken(null);
      // setIsLoading(false); 
      try{
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e); 
      }
      dispatch({type: 'LOGOUT'});
    }, 
    signUp: ()=>{
      setUserToken('fgkj'); 
      setIsLoading(false); 
    }
  }), []);

  useEffect(()=> {
     setTimeout(async()=>{
        // setIsLoading(false)
        let userToken; 
        userToken = null
        try {
          userToken = await AsyncStorage.getItem('userToken')
        } catch(e) {
          console.log(e);
        }
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
     }, 1000); 
  }, []);

  if (loginState.isLoading){
    return (
      <View style={{flex:1, justifyContent: 'center', alignments: 'center'}}>
        <ActivityIndicator size = "large"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {loginState.userToken != null ? (
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
            <BottomTabs.Screen name="Ingredients" component={IngredientsTab} />
            <BottomTabs.Screen name="Recipes" component={RecipeTab} />
            <BottomTabs.Screen name="Profile" component={ProfileTab} />
            <BottomTabs.Screen name="Recipe Details" component={RecipeDetails}   options={{
        tabBarButton: (props) => null, //this is additional if you want to hide the tab element from the bottom nav
      }}/>
          </BottomTabs.Navigator>
          ):
            <RootStackScreen/>
          }       
      </NavigationContainer> 
    </AuthContext.Provider>
  );
}