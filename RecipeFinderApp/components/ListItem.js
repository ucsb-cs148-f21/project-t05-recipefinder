import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ListItem = ({item, deleteItem}) => {
  return (
   <TouchableOpacity>
       <View style={styles.listItem}>
            <View style={styles.iconView}>
           <Icon 
           name="cancel" 
           size={20} 
           color="firebrick"
           onPress={() => deleteItem(item.id)}
           style={styles.iconView}></Icon>
           </View>
           <Text style={styles.listItemText}>{item.ingredient}</Text>
       </View>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    alignSelf: "flex-start",
    fontSize: 18,
  },
  iconView: {
    flexDirection: 'row',
    alignSelf: "flex-end",
    justifyContent: 'space-evenly',
    width: 70,
  },
});

export default ListItem;