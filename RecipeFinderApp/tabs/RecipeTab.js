import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/MaterialIcons';

const RecipeTab = ({route, navigation}) => {
  if(route.params != null){
    const item = route.params;
    console.log(item);
  return(
    <View>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.infoText}>Prep Time: {item.prep}</Text>
      <Text style={styles.infoText}>Total Time:{item.total}</Text>
      <Text style={styles.infoText}>Yield: {item.yield}</Text>
      <Text style={styles.infoText}>Nutritional Facts: {item['nutrition facts']}</Text>
      <Text style={styles.text}>Ingredients: </Text>
      <Text style={styles.text}>{item.db}</Text>
      <Text style={styles.text}>Steps: </Text>
      <Text style={styles.text}>{item.steps}</Text>
       
      <TouchableOpacity
      style={styles.btn}
      onPress={ () => navigation.navigate("Ingredients")}>
        <Text style={styles.btnText}>
          <Icon name="search" size={20} /> Go Back to Search
        </Text>
      </TouchableOpacity>
    </View>

  );
}
 else{
  return (
    <View>
      <Text>Begin Search to view Recipe Details</Text>
    <TouchableOpacity 
    style={styles.btn}
    onPress={()=> navigation.navigate("Ingredients")}>
      <Text style={StyleSheet.btnText}>
        <Icon name="search" size={20}/> Go to Search
      </Text>
    </TouchableOpacity>
    </View>
  )
}
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
