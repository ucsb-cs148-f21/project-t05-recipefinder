import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    ScrollView,
    Icon,
    FlatList,
    ListItem,
    TextInput,
    TouchableOpacity
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AddAllergy from '../components/AddAllergy';
import { AuthContext } from '../component/context';
import TagBar from '../components/TagBar';

const EditProfile = ({navigation, route}) => {
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [allergies, setAllergies] = useState([]);


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
                <TagBar></TagBar>
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