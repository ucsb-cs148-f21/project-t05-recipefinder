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
    TextInput
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignInScreen = () => {

    const [data, setData] = React.useState({
        email: "",
        password: "", 
        secureTextEntry: true
    });
    
    const textInputChange = (val) =>{
        setData({
            ...data, 
            email: val
        }); 
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data, 
            password: val
        }); 
    }

    const updateSecurityTextEntry =() =>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
        console.log("click")
    }

    return (
        <View style = {styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style = {styles.header}>
                <Text style={styles.text_header}>Welcome to recipe finder!</Text>
            </View>
            <View style = {styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name = "user-o" 
                        color = "#05375a"
                        size = {20}
                    />
                    <TextInput
                        placeholder = "Your Email"
                        style = {styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>textInputChange(val)}
                    />
                    {data.email.length > 0 &&
                    <Animatable.View 
                        animation = 'bounceIn' >
                        <Feather
                        name = "check-circle"
                        corlor = "purple"
                        size = {20} 
                        />
                    </Animatable.View>}
                </View>
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
                            corlor = "grey"
                            size = {20}
                        />
                        :
                        <Feather
                            name = "eye"
                            corlor = "grey"
                            size = {20}
                        />
                        }
                    </TouchableOpacity>
                </View>
                <View style = {styles.button}>
                    <TouchableOpacity
                        onPress ={()=>alert('click')}
                    >
                        <LinearGradient
                        colors = {['#8a2be2', '#483d8b']}
                        style={styles.signIn}
                    >
                        <Text style = {[styles.textSign, {
                            color:'#fff'}]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> 
            </View>
            </KeyboardAwareScrollView>
        </View>

     
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#8a2be2'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
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
        fontSize: 30
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
        marginTop: 50
    },
    signIn: {
        width: 350,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });