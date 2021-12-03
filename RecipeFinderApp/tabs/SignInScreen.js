import React from 'react';
import {
    View,
    Text, 
    Image, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    textInput,
    Platform,
    TextInput,
    Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../component/context';
import Users from '../Model/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
    const {signIn} = React.useContext(AuthContext); 

    const login_api = async (username, password) => {
        console.log(username, password)
        try {
          const response = await fetch(`https://n9nk4e4y95.execute-api.us-west-2.amazonaws.com/live/login/${username},${password}`);
          const json = await response.json();
          console.log(json)
          return json;
        } catch (error) {
          console.error(error);
        }
    };

    const [data, setData] = React.useState({
        username: "",
        password: "", 
        secureTextEntry: true, 
        isValidUser: true,
        isValidPassword: true
    });
    
    const textInputChange = (val) =>{
        setData({
            ...data, 
            username: val
        }); 
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >=8){
            setData({
                ...data, 
                password: val, 
                isValidPassword: true
            });
        } else {
            setData({
                ...data, 
                password: val,
                isValidPassword: false 
            }); 
        }
    }

    const updateSecurityTextEntry =() =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async(username, password) => {
        if (username.length == 0 || password.length == 0){
            Alert.alert('Oops!', 'username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        var founduser = await login_api(username, password)
        if  (founduser.length == 0){
            Alert.alert('Oops!', 'Wrong username or password. Please try again.', [
                {text: 'Okay'}
            ]);
            return;
        }

        var user = founduser[0].user_username;
        var token = founduser[0].user_id.toString();

        //add this to help persist Ingredient List based on UserName
        try {
            await AsyncStorage.setItem('userName', user);
            console.log('success');
          } catch (error){
            console.log(error);
        }

        // let founduser = Users.filter(element => {
        //     return username == element.username && password== element.password
        // })
       
        signIn(user, token); 
    }

    return (
        <View style = {styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style = {styles.header}>
                <Animatable.View animation="tada" duration={1000}>
                    <Text style={styles.text_header}>Welcome to Recipe Finder!</Text>
                </Animatable.View>
            </View>
            <Animatable.View style = {styles.footer} animation = "fadeInUpBig" duration ={1000}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name = "user-o" 
                        color = "#05375a"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Your Username"
                        style = {styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.username.length > 0 &&
                    <Animatable.View 
                        animation = 'bounceIn'>
                        <Feather
                        name = "check-circle"
                        color = "purple"
                        size = {20} 
                        />
                    </Animatable.View>}
                </View>
                { data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be at least 4 characters long.</Text>
                </Animatable.View>
                }
                <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name = "lock"
                        color = "#05375a"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Your Password"
                        secureTextEntry = {data.secureTextEntry ? true : false}  
                        style = {styles.textInput}
                        autoCapitalize="none"
                        onChangeText ={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress = {updateSecurityTextEntry}
                    >
                        {data.secureTextEntry ?
                        <Feather
                            name = "eye-off"
                            color = "grey"
                            size = {20}
                        />
                        :
                        <Feather
                            name = "eye"
                            color = "grey"
                            size = {20}
                        />
                        }
                    </TouchableOpacity>
                </View>
                { data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be at least 8 characters long</Text>
                </Animatable.View>
                }
                <View style = {styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress ={()=>(loginHandle(data.username, data.password))}
                    >
                        <LinearGradient
                        colors = {['#F96300', '#F5c900']}
                        style={styles.signIn}
                    >
                        <Text style = {[styles.textSign, {
                            color:'#fff'}]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> 
                <View style = {styles.button}>
                    <TouchableOpacity
                        onPress ={()=>navigation.navigate('SignUpScreen')}
                    >
                        <LinearGradient
                        colors = {['#f0f8ff', '#f0ffff']}
                        style={styles.signIn}
                    >
                        <Text style = {[styles.textSign, {
                            color:'#F96300'}]}>Create account</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> 
            </Animatable.View>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#F96300',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 45, 
    },
    signIn: {
        width: 350,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
