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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Users from '../Model/users';
import { AuthContext } from '../component/context';

const SignUpScreen = ({navigation}) => {
    const {signUp} = React.useContext(AuthContext); 

    const [data, setData] = React.useState({
        username: "",
        password: "", 
        confirm_password: "", 
        secureTextEntry: true,
        confirm_securityTextEntry: true,
        isValidUser: true, 
        isValidPassword: true
    });
    
    const signUp_api = async (username, password) => {
        console.log(username, password)
        try {
          const response = await fetch(`https://n9nk4e4y95.execute-api.us-west-2.amazonaws.com/live/signup/${username},${password}`);
          const json = await response.json();
          console.log(json)
          return json;
        } catch (error) {
          console.error(error);
        }
    };

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

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data, 
            confirm_password: val
        }); 
    }

    const updateSecurityTextEntry =() =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecurityTextEntry =() =>{ 
        setData({
            ...data,
            confirm_securityTextEntry: !data.confirm_securityTextEntry
        });
    }

    const handleValidUser = (val) => {
        if(val.trim().length >= 4 ) {
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

    const signupHandle = async(username, password, confirm_password) =>{
        console.log(username, password, confirm_password)

        if (username.length == 0 || password.length == 0 || confirm_password.length == 0){
            Alert.alert('Error!', 'username or password field cannot be empty.', [
                {text: 'try again'}
            ]);
            return;
        }

        if (password != confirm_password){
            Alert.alert('Oops', "Password and Confirm Passowrd don't match.", [
                {text: 'try again'}
            ]);
            return;
        }

        if (password.length < 8 || confirm_password.length < 8){
            Alert.alert('Oops', 'The passoword has to be least 8 characters. Please pick a longer password.', [
                {text: 'try again'}
            ]);
            return;
        }

        var founduser = await signUp_api(username, password)
        console.log(founduser)
        if  (founduser.user_id == -1){
            Alert.alert('Oops!', 'Username is already taken. Please pick another name.', [
                {text: 'Okay'}
            ]);
            return;
        }

        var user = founduser.user_username; //uncomment when SignUp api returns username
        
        try {
            await AsyncStorage.setItem('userName', user);
            console.log('success');
          } catch (error){
            console.log(error);
        } 

        var token = founduser.user_id.toString();
        console.log(token, "151")



        signUp(username,token)
 
    }

    return (
        <View style = {styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style = {styles.header}>
                <Animatable.View animation="bounceInDown" duration={1000}>
                    <Text style={styles.text_header}>Register Now!</Text>
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
                        animation = 'bounceIn' >
                        <Feather
                        name = "check-circle"
                        color = "green"
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
                    <Text style={styles.errorMsg}>Password must be at least 8 characters long.</Text>
                </Animatable.View>
                }
                <Text style={[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Confirm Your Password"
                        secureTextEntry={data.confirm_securityTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecurityTextEntry}
                    >
                        {data.confirm_securityTextEntry ? 
                        <Feather 
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather 
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        By signing up you agree to our
                    </Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                    <Text style={styles.color_textPrivate}>{" "}and</Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                </View>
                <View style = {styles.button}>
                    <TouchableOpacity
                        // onPress ={()=>signupHandle(data.username, data.password, data.confirm_password)}
                        onPress = {()=>signupHandle(data.username, data.password, data.confirm_password)}
                    >
                        <LinearGradient
                        colors = {['#F96300', '#F5c900']}
                        style={styles.signIn}
                    >
                        <Text style = {[styles.textSign, {
                            color:'#fff'}]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> 
                <View style = {styles.button}>
                    <TouchableOpacity
                        onPress ={()=>navigation.goBack()}
                    >
                        <LinearGradient
                        colors = {['#f0f8ff', '#f0ffff']}
                        style={styles.signIn}
                    >
                        <Text style = {[styles.textSign, {
                            color:'#F96300'}]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> 
            </Animatable.View>
            </KeyboardAwareScrollView>
        </View>
    );
}

export default SignUpScreen;

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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
