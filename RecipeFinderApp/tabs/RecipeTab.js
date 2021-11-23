import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native-elements/dist/image/Image';
import { useState } from 'react';


const RecipeTab = ({route, navigation}) => {
  //route contains the Ingredients pass after Done is tapped
  //Array filterData stores the Search by Ingredient Response
  const [filterData, setfilterData] = useState([]);
  let ingredientsQuery = '';
  let apiURL = '';
  const pantryIngredients = route.params;

  //Does search based on Ingredient Query and calls Fetch for API
  const searchPantryIngredient = () => {
    if(route.params != null){
      ingredientsQuery = '';
      for(var i=0; i < pantryIngredients.length; i++){
        if(i == pantryIngredients.length-1){
        ingredientsQuery += pantryIngredients[i].ingredient;
        }
        else{
          ingredientsQuery += pantryIngredients[i].ingredient + ",";
        }
      }
      if(pantryIngredients.length){
        fetchPost(ingredientsQuery);
      }
      else{
        Alert.alert(
          'Empty Pantry List',
          'Please Add Ingredients to Your Pantry List',
        );
      }
    }
    else{
      Alert.alert(
        'Please Add Ingrediens to Your Pantry List and Select Done',
      );
    }
    console.log(ingredientsQuery);
  }

  const fetchPost = (ingredientsQuery) =>{
   apiURL = 'http://localhost:19002/api/recipes/?ingredients=' + ingredientsQuery;
    //apiURL = 'https://jsonplaceholder.typicode.com/photos';
    //apiURL = 'http://localhost:19002/api/login/?username=Royce&password=Pass'
    //apiURL = 'http://localhost:19002/api/signup/?username=yee&password=Pass'
    console.log(apiURL)
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
      setfilterData(responseJson);
      console.log(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }

  //Testing Data will remove later
       /*const filterDummyData = [{
        "name": "Tomato, Basil, and Corn Salad with Apple Cider Dressing", 
        "ingredients": ["2 cups frozen corn kernels, thawed", "1 pint grape tomatoes, halved", "10 fresh basil leaves, chopped", "3 tablespoons extra-virgin olive oil", "1 tablespoon apple cider vinegar", "xbc teaspoon salt (Optional)"], 
        "nutrition facts": "120 calories; protein 2.1g; carbohydrates 13.7g; fat 7.3g; sodium 103.2mg", 
        "db": "2 cups frozen corn kernels, thawed 1 pint grape tomatoes, halved 10 fresh basil leaves, chopped 3 tablespoons extra-virgin olive oil 1 tablespoon apple cider vinegar xbc teaspoon salt (Optional)", 
        "yield": "6 servings", 
        "id": "240001", 
        "url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1578799.jpg", 
        "servings": "6", 
        "steps": ["Five ingredients and five minutes is all you need to make this easy and nutritious summer salad! If you have extra time, you can use 4 ears of fresh corn, cooked and shucked, instead of the frozen corn. You can vary the amount of basil, olive oil, and apple cider vinegar to your taste.", "Mix corn, tomatoes, and basil leaves together in a bowl; add olive oil, vinegar, and salt and mix until evenly coated.", "If you make this 30 minutes before serving, you can use frozen corn and leave it at room temperature until serving. This way you will not have to defrost it ahead of time."], 
        "total": "10 mins", 
        "prep": "10 mins"},
    
        {"name": "Tomato, Basil, and Corn Salad with Apple Cider Dressing", 
        "ingredients": ["2 cups frozen corn kernels, thawed", "1 pint grape tomatoes, halved", "10 fresh basil leaves, chopped", "3 tablespoons extra-virgin olive oil", "1 tablespoon apple cider vinegar", "xbc teaspoon salt (Optional)"], 
        "nutrition facts": "120 calories; protein 2.1g; carbohydrates 13.7g; fat 7.3g; sodium 103.2mg", 
        "db": "2 cups frozen corn kernels, thawed 1 pint grape tomatoes, halved 10 fresh basil leaves, chopped 3 tablespoons extra-virgin olive oil 1 tablespoon apple cider vinegar xbc teaspoon salt (Optional)", 
        "yield": "6 servings", 
        "id": "240000", 
        "url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1649244.jpg&w=596&h=596&c=sc&poi=face&q=85", 
        "servings": "6", 
        "steps": ["Five ingredients and five minutes is all you need to make this easy and nutritious summer salad! If you have extra time, you can use 4 ears of fresh corn, cooked and shucked, instead of the frozen corn. You can vary the amount of basil, olive oil, and apple cider vinegar to your taste.", "Mix corn, tomatoes, and basil leaves together in a bowl; add olive oil, vinegar, and salt and mix until evenly coated.", "If you make this 30 minutes before serving, you can use frozen corn and leave it at room temperature until serving. This way you will not have to defrost it ahead of time."], 
        "total": "10 mins", 
        "prep": "10 mins"},
    
        {"name": "Tomato, Basil, and Corn Salad with Apple Cider Dressing", 
        "ingredients": ["2 cups frozen corn kernels, thawed", "1 pint grape tomatoes, halved", "10 fresh basil leaves, chopped", "3 tablespoons extra-virgin olive oil", "1 tablespoon apple cider vinegar", "xbc teaspoon salt (Optional)"], 
        "nutrition facts": "120 calories; protein 2.1g; carbohydrates 13.7g; fat 7.3g; sodium 103.2mg", 
        "db": "2 cups frozen corn kernels, thawed 1 pint grape tomatoes, halved 10 fresh basil leaves, chopped 3 tablespoons extra-virgin olive oil 1 tablespoon apple cider vinegar xbc teaspoon salt (Optional)", 
        "yield": "6 servings", 
        "id": "240002", 
        "url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1649244.jpg&w=596&h=596&c=sc&poi=face&q=85", 
        "servings": "6", 
        "steps": ["Five ingredients and five minutes is all you need to make this easy and nutritious summer salad! If you have extra time, you can use 4 ears of fresh corn, cooked and shucked, instead of the frozen corn. You can vary the amount of basil, olive oil, and apple cider vinegar to your taste.", "Mix corn, tomatoes, and basil leaves together in a bowl; add olive oil, vinegar, and salt and mix until evenly coated.", "If you make this 30 minutes before serving, you can use frozen corn and leave it at room temperature until serving. This way you will not have to defrost it ahead of time."], 
        "total": "10 mins", 
        "prep": "10 mins"},
    
        {"name": "Tomato, Basil, and Corn Salad with Apple Cider Dressing", 
        "ingredients": ["2 cups frozen corn kernels, thawed", "1 pint grape tomatoes, halved", "10 fresh basil leaves, chopped", "3 tablespoons extra-virgin olive oil", "1 tablespoon apple cider vinegar", "xbc teaspoon salt (Optional)"], 
        "nutrition facts": "120 calories; protein 2.1g; carbohydrates 13.7g; fat 7.3g; sodium 103.2mg", 
        "db": "2 cups frozen corn kernels, thawed 1 pint grape tomatoes, halved 10 fresh basil leaves, chopped 3 tablespoons extra-virgin olive oil 1 tablespoon apple cider vinegar xbc teaspoon salt (Optional)", 
        "yield": "6 servings", 
        "id": "240003", 
        "url": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1649244.jpg&w=596&h=596&c=sc&poi=face&q=85", 
        "servings": "6", 
        "steps": ["Five ingredients and five minutes is all you need to make this easy and nutritious summer salad! If you have extra time, you can use 4 ears of fresh corn, cooked and shucked, instead of the frozen corn. You can vary the amount of basil, olive oil, and apple cider vinegar to your taste.", "Mix corn, tomatoes, and basil leaves together in a bowl; add olive oil, vinegar, and salt and mix until evenly coated.", "If you make this 30 minutes before serving, you can use frozen corn and leave it at room temperature until serving. This way you will not have to defrost it ahead of time."], 
        "total": "10 mins", 
        "prep": "10 mins"}
    
      ];   */
      
      return(
        <View style={{backgroundColor: '#ffffff', flex: 1}}>
           <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            searchPantryIngredient();
            }}>
          <Text style={styles.btnText}>
            <Icon name="search" size={20} /> Search By Ingredient
          </Text>
        </TouchableOpacity>
      </View>
           <FlatList
          //data={filterDummyData}
          data={filterData}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Recipe Details', item)}>
              <View style={{
                flexDirection: 'row', 
                padding:20, 
                marginBottom: 20, 
                backgroundColor:'#e6e6fa', 
                borderRadius: 30 ,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset:{
                  width: 0,
                  height: 10,
                },
                shadowRadius: 20,
                }}>
                  <Image
              source={{uri: item.imgUrl}}
              style={{ 
                height: 150, 
                width: 150 ,
                marginRight: 10,
                borderRadius: 10
              }}
              resizeMode ="cover"/>
              <View style={{flexShrink: 1}}>
              <Text style={{fontSize: 22, fontWeight: '700', textAlign:'auto'}}>{item.name}</Text>
              <Text style={{fontSize: 15, opacity: 0.7 , fontWeight: '600'}}>Prep Time: {item.prep}</Text>
              <Text style={{fontSize: 15, opacity: 0.7 , fontWeight: '600'}}>Total Time: {item.total}</Text>
              <Text style={{fontSize: 15, opacity: 0.7, fontWeight: '600' }}>Servings: {item.servings}</Text>
               </View>
               </View>
            </TouchableOpacity>
          )}
          >
          </FlatList>
         
        </View>
    
      );
} 

 
    
export default RecipeTab;
    
const styles = StyleSheet.create({
container: {
  flex: 1, 
  alignItems: 'center', 
  justifyContent: 'center'
},
text: {
  color: 'black',
  fontSize: 19,

},
title: {
textAlign: 'center',
fontSize: 23,
fontWeight: 'bold',
},
infoText: {
fontSize: 14,
textAlign: 'center',
fontWeight: 'bold',
},
btn: {
  backgroundColor: '#8a2be2',
  padding: 9,
  margin: 5,
  borderRadius: 5,
  alignItems: 'center'
},
btnText: {
  color: 'white',
  fontSize: 20,
  textAlign: 'center',
},
});