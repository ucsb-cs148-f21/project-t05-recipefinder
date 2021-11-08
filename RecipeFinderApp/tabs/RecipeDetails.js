import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SectionList} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-navigation';

const RecipeDetails = ({route, navigation}) => {
  if(route.params != null){
      console.log("NOT NULL");
    const item = route.params;
    var steps = route.params.steps;
    var ingredients = route.params.ingredients;
      console.log(item);
  return(
    <SafeAreaView>

    <View style={{flexDirection: 'column', backgroundColor:"#fff", padding: 15}}>

        <FlatList
          data={ingredients}
          contentContainerStyle={{padding: 10}}
          renderItem={({item}) => (  
            <View style={{
                alignItems: 'center', 
                padding:10, 
                marginBottom: 10, 
                backgroundColor:'#e6e6fa', 
                borderRadius: 10 ,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset:{
                  width: 0,
                  height: 5,
                },
                shadowRadius: 5,}}>
      
              <Text style={{marginTop: 5, textAlign: 'center'}}>{item}</Text>
              </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={({ListHeaderComponent}) => (
            <View>
            <View style={{
                alignItems: 'center', 
                padding:20, 
                marginBottom: 10, 
                backgroundColor:'#e6e6fa', 
                borderRadius: 30 ,
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset:{
                  width: 0,
                  height: 5,
                },
                shadowRadius: 5,}}>
                    <Image
                    source={{uri: item.url}}
                    style={{ 
                      height: 300, 
                      width: 300 ,
                    marginRight: 10,
                    borderRadius: 10,
                    }}
                    resizeMode ="cover"/>
                    <Text style={{fontWeight: '700', fontSize: 20, textAlign: 'center'}}>{item.name}</Text>
                    <Text style={{marginTop: 5, fontWeight: '500', fontSize: 13}}>Prep Time: {item.prep}</Text>
                    <Text style={{fontWeight: '600', fontSize: 13}}>Total Time: {item.total}</Text>
                    <Text style={{fontWeight: '600', fontSize: 13}}>Yield: {item.yield}</Text>
                  </View>
                  <Text>Ingredients:</Text>
                  </View>
          )}
          ListFooterComponent={({ListFooterComponent}) => (
            <View> 

                <Text>Steps:</Text>

                <View
                style={{
                alignItems: 'center', 
                padding:20, 
                marginBottom: 10, 
                backgroundColor:'#e6e6fa', 
                borderRadius: 30 ,
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowOffset:{
                    width: 0,
                    height: 5,
                },
                shadowRadius: 5,}}> 
             
                    <FlatList
                    data={steps}
                    contentContainerStyle={{padding: 10}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => ( <Text style={{marginTop: 10}}>{item}</Text>)}>
                    </FlatList>
                </View>
                
                <View>
                    <TouchableOpacity
                    style={styles.btn}
                    onPress={ () => navigation.navigate("Ingredients")}>
                        <Text style={styles.btnText}>
                         <Icon name="search" size={20} /> Search By Ingredients 
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )}>
        </FlatList>
    </View>

    </SafeAreaView>

  );
}
 else{
     console.log("NULL");
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

export default RecipeDetails;

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
  borderRadius: 10,
},
btnText: {
  color: 'darkslateblue',
  fontSize: 20,
  textAlign: 'center',
},
});