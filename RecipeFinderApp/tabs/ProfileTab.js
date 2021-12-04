import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable,
    LogBox,
    Alert
 } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons} from "@expo/vector-icons";
import { AuthContext } from '../component/context';

import ListAllergy from '../components/ListAllergy';
import AddAllergy from '../components/AddAllergy';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";




const ProfileTab = ({ navigation }) => {
   
  //Array use to store Allergies
  const [Allergies, setAllergies] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [profilePicutre, setProfilePicture] = useState('https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg');

  //Deletes Allergy Item from List
  const deleteItem = allergy => {
    setAllergies(prevAllergies => {
      return prevAllergies.filter(item => item.allergy !== allergy);
    });
  };

  //Stores and Retrieves Allergies data to Local Storage
  useEffect(() =>{
    getAllergiesFromUserDevice();
  }, []);

  useEffect(() => {
      getProfilePictureFromUserDevice();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])


  useEffect(() => {
    saveAllergiesToUserDevice(Allergies);
  }, [Allergies]);


  const saveAllergiesToUserDevice = async () => {
    try {
      const stringifyAllergies = JSON.stringify(Allergies);
      const userName = await AsyncStorage.getItem('userName');
      await AsyncStorage.setItem(userName +'\'s Allergies', stringifyAllergies);
    } catch (error){
      console.log(error);
    }
  };

  const saveProfilePictureToUserDevice = async () => {
    try {
      if(profilePicutre != null){
        const userName = await AsyncStorage.getItem('userName');
        await AsyncStorage.setItem(userName +'\'s Profile Image', profilePicutre);
      }
    } catch (error){
      console.log(error);
    }
  };

  const getProfilePictureFromUserDevice = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      const profileImageLink = await AsyncStorage.getItem(userName+'\'s Profile Image');
      if(profileImageLink != null){
        setProfilePicture(profileImageLink);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllergiesFromUserDevice = async () => {
    try {
      const userName = await AsyncStorage.getItem('userName');
      const Allergies = await AsyncStorage.getItem(userName+'\'s Allergies');
      if(Allergies != null){
        setAllergies(JSON.parse(Allergies))
      }
    } catch (error) {
      console.log(error);
    }
  };

//Adds Ingredient to Pantry List
  const addAllergy = text => {
    if (text == '') {
      Alert.alert(
        'No item entered',
        'Please enter an Allergy',
      );
    } else {
      setAllergies(prevAllergies => {
        return [{allergy:text}, ...prevAllergies];
      });
    }
  };

  





    const {signOut} = React.useContext(AuthContext);

    const retrieveData = async () => {
        try {
          const userName = await AsyncStorage.getItem('userName')
          if (userName !== null) {
            return userName;
          }
        } catch (error) {
          console.log(error);
        }
      };

    const [userData, setUserData] = useState('');

    retrieveData().then((data) => {
        setUserData(data);

    });

   

    
    
    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image 
                            source={{uri: profilePicutre}} 
                            style={{ height: 150, width: 150 ,}}>
                        </Image>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {setModalVisible(!modalVisible);}}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Select Profile Picture</Text>
                                <View style={styles.row}>
                                    <TouchableOpacity style={styles.inputWrap}  onPress={() => {setProfilePicture('https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg')}}>
                                        <Image 
                                            source={{uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg'}} 
                                            style={{ width: 100,
                                                height: 100,
                                                borderRadius: 100,
                                                overflow: "hidden",
                                                marginTop: 5,}}>
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                  
                                <View style={styles.row}>
                                    <TouchableOpacity style={styles.inputWrap} onPress={() => {setProfilePicture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsMrej5CJ9ieAshqft8Be6ZZ-IM5kINFCLxA&usqp=CAU')}}>
                                        <Image 
                                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsMrej5CJ9ieAshqft8Be6ZZ-IM5kINFCLxA&usqp=CAU'}} 
                                            style={{ width: 100,
                                                height: 100,
                                                borderRadius: 100,
                                                overflow: "hidden",
                                                marginTop: 10,}}>
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                  
                                <View style={styles.row}>
                                    <TouchableOpacity style={styles.inputWrap} onPress={() => {setProfilePicture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ22RH0VPMkUT_dbVaemZvDb4-yWBltik048A&usqp=CAU')}}>
                                        <Image 
                                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ22RH0VPMkUT_dbVaemZvDb4-yWBltik048A&usqp=CAU'}} 
                                            style={{ width: 100,
                                                height: 100,
                                                borderRadius: 100,
                                                overflow: "hidden",
                                                marginTop: 15,}}>
                                        </Image>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.row}>
                                    <TouchableOpacity style={styles.inputWrap} onPress={() => {setProfilePicture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5NOo5arvyDcVOvh6tkb6gUK_eyQwdn2ta2A&usqp=CAU')}}>
                                        <Image 
                                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5NOo5arvyDcVOvh6tkb6gUK_eyQwdn2ta2A&usqp=CAU'}} 
                                            style={{ width: 100,
                                                height: 100,
                                                borderRadius: 100,
                                                overflow: "hidden",
                                                marginTop: 20,}}>
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                                
                                <Pressable
                                    style={styles.Modalbtn}
                                    onPress={() => {setModalVisible(!modalVisible); saveProfilePictureToUserDevice();
                                    }}
                                >
                                    <Text style={styles.textStyle}>Done</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.add}>
                        <TouchableOpacity onPress={() => {setModalVisible(true); getProfilePictureFromUserDevice();}}>
                            <Ionicons name="ios-create-outline" size={15} color="white" style={{ marginTop: 0, marginLeft: 3 }}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{userData}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{userData}</Text>
                </View>


                <View style={styles.logout}>
                    <TouchableOpacity style={styles.button} onPress= {()=>signOut()}>
                        <Text style = {styles.btnText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                
                <View style={{ alignItems: "center" , marginTop: 10, marginRight: 250}}>
                    <Text style={styles.text}>Allergies: </Text>
                    <View style={styles.container2} behavior='height'>
                        <AddAllergy addAllergy={addAllergy} />
                        <FlatList
                            data={Allergies}
                            renderItem={({item, index}) => <ListAllergy item={item} deleteItem={deleteItem}/>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
               
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    container2: {
        width: 280,
        marginLeft: 240,
        backgroundColor: 'white',
        alignContent: 'center',
      },
      btn: {
        backgroundColor: '#F96300',
        padding: 9,
        margin: 10,
        borderRadius: 5,
      },
      Modalbtn: {
        backgroundColor: '#F96300',
        padding: 9,
        marginTop: 60,
        borderRadius: 5,
      },
      btnText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
      },
    button: {
        backgroundColor: '#F96300',
        padding: 9,
        margin: 5,
        borderRadius: 10,

    },
    text: {
        fontSize: 20,
        color: "black"
    },
    image: {
        flex: 1,
        height: 150,
        width: 150,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: 25,
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
        backgroundColor: "#F96300",
        position: "absolute",
        bottom: 0,
        right: -10,
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
    logout: {
        alignSelf: 'center',
        marginTop: 5,
        alignContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 40,
        height: 600,
        width: 500,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      row: {
        flex: 1,
        flexDirection: "row"
      },
      inputWrap: {
        flexDirection: 'row',
        borderColor: "#cccccc"
      },
      inputText:{
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
});

export default ProfileTab;