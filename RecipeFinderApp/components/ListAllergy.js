import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListAllergy = ({item, deleteItem}) => {
  return (
   <TouchableOpacity>
       <View style={styles.listItem}>
            <View style={styles.iconView}>
           <Icon 
           name="cancel" 
           size={20} 
           color="#F96300"
           onPress={() => deleteItem(item.allergy)}
           style={styles.iconView}></Icon>
           </View>
           <Text style={styles.listItemText}>{item.allergy}</Text>
       </View>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
        borderRadius: 30,
      },
      listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      listItemText: {
        position: 'relative',
        bottom: 12,
        alignSelf: "flex-start",
        fontSize: 18,
      },
      iconView: {
        position: 'relative',
        top: 5,
        left: 20,
        flexDirection: 'row',
        alignSelf: "flex-end",
        justifyContent: 'space-evenly',
        width: 70,
      },
});

export default ListAllergy;