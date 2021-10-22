import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddIngredient = ({addPantryIngredient}) => {
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  return (
    <View>
      <TextInput
        placeholder="Add Ingredient to Pantry List..."
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addPantryIngredient(text);
          setText('');
        }}>
        <Text style={styles.btnText}>
          <Icon name="add" size={20} /> Add Ingredient
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
      >
        <Text style={styles.btnText}>
          <Icon name='search' size={20} /> Search
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

export default AddIngredient;
