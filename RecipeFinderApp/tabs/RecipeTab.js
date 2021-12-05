import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Pressable, SafeAreaView, Switch, Dimensions, Platform} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native-elements/dist/image/Image';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RecipeTab = ({route, navigation}) => {
  //route contains the Ingredients pass after Done is tapped
  //Array filterData stores the Search by Ingredient Response
  const [filterData, setFilterData] = useState([]);
  const [allData, setAllData] = useState([]);
  let ingredientsQuery = '';
  let apiURL = '';
  const pantryIngredients = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [userData, setUserData] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [textPrep, setTextPrep] = useState('');
  const [textTotal, setTextTotal] = useState('');
  const [textServings, setTextServings] = useState('');
  const onChangePrep = textValue => setTextPrep(textValue);
  const onChangeTotal = textValue => setTextTotal(textValue);
  const onChangeServings = textValue => setTextServings(textValue);

  const getAllergiesFromUserDevice = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      const Allergies = await AsyncStorage.getItem(userName+'\'s Allergies');
      if(Allergies != null){
        return (Allergies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getAllergiesFromUserDevice().then(data => {
      if (isMounted) {
		  try{
			  let allergyData = JSON.parse(data);
			  if (allergyData)
				setUserData(allergyData);    // add conditional check
			  else
				console.log("allergy data is undefined");
		  }
        catch{
			console.log("no data");
		}
        
      }
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, [userData]); 

 
  const filterRecipes = (textPrep, textTotal, textServings, isEnabled) => {
    const newPrepData = [];
    var prepTime = 0;
    var totalTime = 0;
    if (textPrep == '') textPrep = 10000000000
    if (textTotal == '') textTotal = 10000000000
    if (textServings == '') textServings = 0
    for(var i=0; i < allData.length; i++){
      var inPrep = false;
      var inTotal = false;
      var hasAllergies = false;
	  console.log("enable:", isEnabled);
      if (isEnabled) {
		  console.log(allData[i]['ingredients']);
        for(var j=0; j < allData[i]['ingredients'].length; j++) {
			console.log("userdata:", userData);
          for(var k=0; k < userData.length; k++) {
			  console.log(userData[k].allergy);
            if (allData[i]['ingredients'][j].toLowerCase().search(userData[k].allergy.toLowerCase()) != -1) {
              hasAllergies = true;
			  
			  console.log("Yes");
              break;
            }
          }
          if (hasAllergies) break;
        }
      }
	  if (!hasAllergies)
	  {
		  console.log("No");
	  }
      if (allData[i]['prep'] == null){
        inPrep = true;
      }
      else {
        if (allData[i]['prep'].search("hr") != -1) {
          prepTime = Number(allData[i]['prep'].split(" ")[0]) * 60 + Number(allData[i]['prep'].split(" ")[2]);
        }
        else {prepTime = Number(allData[i]['prep'].split(" ")[0])}
        if (prepTime <= Number(textPrep)) {
          inPrep = true;
        }
      }
      if (allData[i]['total'] == null) {
        inTotal = true;
      } 
      else {
        if (allData[i]['total'].search("hr") != -1) {
          totalTime = Number(allData[i]['total'].split(" ")[0]) * 60 + Number(allData[i]['total'].split(" ")[2]);
        }
        else {totalTime = Number(allData[i]['total'].split(" ")[0])}
        if (totalTime <= Number(textTotal)) {
          inTotal = true;
        }
      }
      if (Number(allData[i]['servings']) >= Number(textServings) && inPrep && inTotal && !hasAllergies) {
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
            setTextPrep('');
            setTextTotal('');
            setTextServings('');
            setIsEnabled(false);
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
                  <View style={styles.switchRow}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.switchText}>Allergies</Text>
                    </View>
                    
                      <Switch
                        trackColor={{ false: "#767577", true: "#ffdab9" }}
                        thumbColor={isEnabled ? "#F96300" : "#f4f3f4"}
                        ios_backgroundColor="white"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ transform: [{ scaleX: .65 }, { scaleY: .65 }, { translateX: -100}]}}
                      />
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.inputText}>Prep Time: </Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        placeholder="Prep Time"
                        style={styles.inputText}
                        onChangeText={onChangePrep}
                        value={textPrep}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.inputText}>Total Time: </Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        placeholder="Total Time"
                        style={styles.inputText}
                        onChangeText={onChangeTotal}
                        value={textTotal}
                      />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.inputWrap}>
                      <Text style={styles.inputText}>Servings: </Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        placeholder="Servings"
                        style={styles.inputText}
                        onChangeText={onChangeServings}
                        value={textServings}
                      />
                    </View>
                  </View>
                  <Pressable
                    style={styles.btn}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      filterRecipes(textPrep, textTotal, textServings, isEnabled);
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
                backgroundColor:'#ffdab9', 
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

const {height} = Dimensions.get("screen")
const {width} = Dimensions.get("screen")
    
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
inputText:{
  color: 'black',
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
  height: height * 0.5,
  width: width * 0.8,
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
},
switchRow: {
  flex: 1,
  flexDirection: "row",
  marginBottom: 10,
  alignItems: 'center'
},
switchWrap: {
  borderColor: "#cccccc"
},
switchText: {
  color: 'black',
  fontSize: 20,
  transform: Platform.OS == 'ios' ? [{translateX: 45}] : [{translateX: 25}]
}
});