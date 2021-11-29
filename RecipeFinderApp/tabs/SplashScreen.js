import React from 'react';
import {
    View,
    Text, 
    Image, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const SplashScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.header} >
                <Animatable.Image
                animation = "bounceIn"
                duraton="1500"
                style={styles.logo}
                source = {require("../assets/recipeIcon.png")}
                resizeMode= "stretch"
                />
            </View>
            <Animatable.View 
                style={styles.footer}
                animation = "fadeInUpBig"
            > 
                <Text style={styles.title}>Log in to find amazing recipes!</Text>
                <Text style={styles.text}>Sign in with an account</Text>
                <View style = {styles.button}>
                    <TouchableOpacity onPress= {()=>navigation.navigate('SignInScreen')}>
                        <LinearGradient
                            colors = {['#F96300', '#F5C900']}
                            style = {styles.signIn}
                        >
                            <Text style = {styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name = "navigate-next"
                                color = "#fff"
                                size = {20} 
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            </KeyboardAwareScrollView>
        </View> 

    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen")
const height_logo = height * 0.25

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F96300'
    },
    header:{
        flex: 2,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo, 
        height: height_logo
    },
    title: {
        color: '#FD6300',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'orange', 
        marginTop: 5
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    signIn: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        flexDirection: 'row'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30, 
    },
    end: {
        backgroundColor: '#fff'
    }
});
