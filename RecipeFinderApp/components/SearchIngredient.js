import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchIngredient = ({searchPantryIngredient}) => {
  return (
      <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
            searchPantryIngredient();
          }}
        >
        <Text style={styles.btnText}>
          <Icon name="search" size={20} /> Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
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

export default SearchIngredient;
