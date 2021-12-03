import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const AddAllergy = ({addAllergy}) => {
  const [text, setText] = useState('');
  const onChange = textValue => setText(textValue);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add Allergy..."
        style={styles.input}
        onChangeText={onChange}
        value={text}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addAllergy(text);
          setText('');
        }}>
        
          <Icon name="add" size={20} color={'white'}/> 
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection:'row',
    marginTop: 5,
  },
  input: {
    height: 30,
    width: 250,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: '#F96300',
    padding: 5,
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AddAllergy;