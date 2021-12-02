import React, { useState, useContext } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    ScrollView,
    LinearGradient,
    FlatList,
    TextInput,
    TouchableOpacity
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Users from '../Model/users';
import { AuthContext } from '../component/context';


const EditProfile = ({navigation, route}) => {
    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');
    const [allergies, setAllergies] = useState('');

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
            <TextInput
            style={{ 
            height: 40, 
            borderColor: 'gray', 
            borderWidth: 1,
            }}
            onChangeText={text => setAllergies(text)}
            value={allergies}
            placeholder="Allergies"
            />
        
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