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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  input: {
    height: 60,
    padding: 8,
    margin: 5,
    fontSize: 20
  },
  btn: {
    backgroundColor: '#F96300',
    padding: 9,
    margin: 5,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddIngredient;
