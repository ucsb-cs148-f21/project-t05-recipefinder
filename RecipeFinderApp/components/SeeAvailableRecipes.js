import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SeeAvailableRecipes = ({goToRecipeListView}) => {
    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={() => {
                goToRecipeListView();
            }}>
                <Text style={styles.btnText}>
                    <Icon name="view-agenda" size={20}/> See Available Recipes
                </Text>
            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({
      btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
      },
      btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
      },
});

export default SeeAvailableRecipes;