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
    TouchableOpacity
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Users from '../Model/users';
import { AuthContext } from '../component/context';

const ProfileTab = ({ navigation }) => {
    const {signOut} = React.useContext(AuthContext);

    async function filterItems(arr, query) {
        return arr.filter(function(el) {
          if (el.id== query){
            return el;
          }
        })
      }

    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userToken')
          if (value !== null) {
            const user_info = await filterItems(Users, value)
            return await user_info[0];
          }
        } catch (error) {
          console.log(error);
        }
      };

    const [userData, setUserData] = useState('');

    retrieveData().then((data) => {
        setUserData(data);

    });
    var allergies = userData.allergies

    
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.logout}>
                    <TouchableOpacity style={styles.button} onPress= {()=>signOut()}>
                            <Text style = {[styles.text, {color: "#AEB5BC", fontSize: 10}]}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../assets/profpic.png")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.add}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Edit Profile")}>
                            <Ionicons name="ios-create" size={15} color="#DFD8C8" style={{ marginTop: 0, marginLeft: 3 }}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userData.username}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{userData.email}</Text>
                </View>

                
                
                <View style={{ alignItems: "center" , marginRight: 100}}>
                <Text style={[styles.text]}>Allergies</Text>
                <SafeAreaView style={{flex: 1}}>
                <FlatList
                    data={allergies}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => ( <Text style={styles.text}>{item}</Text>)}>
                    </FlatList>
                </SafeAreaView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    button: {
        borderRadius: 10,

    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    favoriteText: {
       flexDirection: "row",
       justifyContent: "space-between",
       marginTop: 12,
       marginBottom: 6,
       textAlign: 'center'
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 175,
        height: 175,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    signIn: {
        width: 80,
        height: 40,
        borderRadius: 10, 
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    logout: {
        alignSelf: 'flex-end',
        backgroundColor: '#ee6e73',
        top: 20,
        right: 5,
    }
});

export default ProfileTab;