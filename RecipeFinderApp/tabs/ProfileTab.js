import React, { useState, useContext } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    ScrollView,
    LinearGradient,
    TouchableOpacity
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Users from '../Model/users';
import { AuthContext } from '../component/context';

export default function ProfileTab() {
    const {signOut} = React.useContext(AuthContext);

    async function filterItems(arr, query) {
        return arr.filter(function(el) {
          if (el.userToken == query){
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

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
 
    retrieveData().then((data) => {
        setUserName(data.username);
        setUserEmail(data.email);

    });

    

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
                        <Ionicons name="ios-create" size={15} color="#DFD8C8" style={{ marginTop: 0, marginLeft: 3 }}></Ionicons>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userName}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{userEmail}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>783</Text>
                        <Text style={[styles.text, styles.subText]}>Recipes Used</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>4,844</Text>
                        <Text style={[styles.text, styles.subText]}>Ingredients Used</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                  <Text style = {[styles.favoriteText, {fontSize: 16}]}>Favorites</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/pasta.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/bread.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/icon.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                </View>
                <Text style={[styles.subText, styles.recent]}>Allergies</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>Peanuts</Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>Grass</Text>
                        </View>
                    </View>
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