import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, SafeAreaView} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native-elements/dist/image/Image';
import { useState, useEffect } from 'react';


const RecipeTab = ({route, navigation}) => {
  //route contains the Ingredients pass after Done is tapped
  //Array filterData stores the Search by Ingredient Response
  const [filterData, setFilterData] = useState([]);
  const [allData, setAllData] = useState([]);
  let ingredientsQuery = '';
  let apiURL = '';
  const pantryIngredients = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  const [textPrep, setTextPrep] = useState('');
  const [textTotal, setTextTotal] = useState('');
  const [textServings, setTextServings] = useState('');
  const onChangePrep = textValue => setTextPrep(textValue);
  const onChangeTotal = textValue => setTextTotal(textValue);
  const onChangeServings = textValue => setTextServings(textValue);

  const filterRecipes = (textPrep, textTotal, textServings) => {
    const newPrepData = [];
    if (textPrep == '') textPrep = 10000000
    if (textTotal == '') textTotal = 10000000
    if (textServings == '') textServings = 0
    for(var i=0; i < allData.length; i++){
      if (allData[i]['prep'] == null){
        newPrepData.push(allData[i])
      } else if (Number(allData[i]['prep'].split(" ")[0]) <= Number(textPrep) && Number(allData[i]['total'].split(" ")[0]) <= Number(textTotal) && Number(allData[i]['servings']) >= Number(textServings)) {
        newPrepData.push(allData[i]);
      }
    }
    setFilterData(newPrepData);
  }

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
  //  apiURL = 'http://localhost:19002/api/recipes/?ingredients=' + ingredientsQuery;
    apiURL = `https://n9nk4e4y95.execute-api.us-west-2.amazonaws.com/live/recipe/${ingredientsQuery}`;
    //apiURL = 'https://jsonplaceholder.typicode.com/photos';
    //apiURL = 'http://localhost:19002/api/login/?username=Royce&password=Pass'
    //apiURL = 'http://localhost:19002/api/signup/?username=yee&password=Pass'
    console.log(apiURL)
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        setAllData(responseJson);
        setFilterData(responseJson);
        console.log(responseJson);
    }).catch((error) => {
      console.error(error);
    })
  }
  return(
        <SafeAreaView style={{backgroundColor: '#ffffff', flex: 1}}>
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
      <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Filter Recipes</Text>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.btnText}>Prep Time: </Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        placeholder="Prep Time"
                        style={styles.btnText}
                        onChangeText={onChangePrep}
                        value={textPrep}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.btnText}>Total Time: </Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        placeholder="Total Time"
                        style={styles.btnText}
                        onChangeText={onChangeTotal}
                        value={textTotal}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.btnText}>Servings: </Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        placeholder="Servings"
                        style={styles.btnText}
                        onChangeText={onChangeServings}
                        value={textServings}
                      />
                    </View>
                  </View>
                  <Pressable
                    style={styles.btn}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      filterRecipes(textPrep, textTotal, textServings);
                    }}
                  >
                    <Text style={styles.textStyle}>Apply</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {setModalVisible(true)}}
            >
              <Text style={styles.btnText}>Filter Recipes</Text>
            </TouchableOpacity>
          </View>
           <FlatList
          data={filterData}
          contentContainerStyle={{padding: 10}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Recipe Details', item)}>
              <View style={{
                flexDirection: 'row', 
                padding:20, 
                marginBottom: 20, 
                backgroundColor:'#deb887', 
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
         
        </SafeAreaView>
    
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
  backgroundColor: '#F96300',
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
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 40,
  height: 250,
  width: 300,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  fontSize: 14,
  textAlign: 'center',
  fontWeight: 'bold'
},
textStyle: {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 20,
  textAlign: 'center',
  fontWeight: 'bold',
},
row: {
  flex: 1,
  flexDirection: "row"
},
inputWrap: {
  flex: 1,
  borderColor: "#cccccc"
}
});
