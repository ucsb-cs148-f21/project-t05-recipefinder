import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    ScrollView,
    LinearGradient,
    FlatList,
    ListItem,
    TextInput,
    TouchableOpacity
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AddAllergy from '../components/AddAllergy';
import { AuthContext } from '../component/context';


const EditProfile = ({navigation, route}) => {
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [allergies, setAllergies] = useState([]);

    const deleteItem = id => {
        setAllergies(prevAllergies => {
          return prevAllergies.filter(item => item.id !== id);
        });
    };

    useEffect(() =>{
        getAllergiesFromUserDevice();
    }, []);
    
    useEffect(() => {
        saveAllergiesToUserDevice(allergies);
    }, [allergies]);

    const saveAllergiesToUserDevice = async todos => {
        try {
          const stringifyAllergies = JSON.stringify(allergies);
          await AsyncStorage.setItem('allergies', stringifyAllergies);
        } catch (error){
          console.log(error);
        }
      };

    const getAllergiesFromUserDevice = async () => {
        try {
          const allergies = await AsyncStorage.getItem('allergies');
          if(allergies != null){
            setAllergies(JSON.parse(allergies))
          }
        } catch (error) {
          console.log(error);
        }
      };
      const addAllergy = text => {
        if (text == '') {
          Alert.alert(
            'No item entered',
            'Please enter an allergy',
          );
        } else {
          setAllergies(prevAllergies => {
            return [{id: Math.random(), allergy: text}, ...prevAllergies];
          });
        }
      };

    return (
        <View>
            <TextInput
            style={{ 
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            }}
            onChangeText={text => setNewUsername(text)}
            value={newUsername}
            placeholder="Enter new username"
            />
            <TextInput
            style={{ 
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            }}
            onChangeText={text => setNewBio(text)}
            value={newBio}
            placeholder="Enter new Bio"
            />
            
            <View style={styles.container}>
                <FlatList
                data={allergies}
                renderItem={({item, index}) => <ListItem item={item} deleteItem={deleteItem}
                />}
                keyExtractor={(item, index) => index.toString()}
                />
                 <AddAllergy addAllergy={addAllergy} />
                 {/* <View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            navigation.navigate('Profile', pantryIngredients)
                        }}
                        >
                        <Text style={styles.btnText}>
                            <Icon name="done" size={20} /> Done
                        </Text>
                    </TouchableOpacity>
                </View>  */}
            </View>
        
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
})