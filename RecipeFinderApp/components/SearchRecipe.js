import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchRecipe = ({searchRecipes}) => {
    const [text, setText] = useState('');
    const onChange = textValue => setText(textValue);

    return (
        <View>
            <TextInput placeholder="Search for a Recipe..." style={styles.input} onChangeText={onChange} value={text}/>
            <TouchableOpacity style={styles.btn} onPress={() => {
                searchRecipes();
            }}>
                <Text style={styles.btnText}>
                    <Icon name="search" size={20}/>Search
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

export default SearchRecipe;