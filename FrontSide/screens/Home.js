import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Info from './Info';

const Home = () => {
    const navigation = useNavigation();

    return(
            <View style={styles.container}>
                <Image style={styles.Logo} source={require('../assets/welcomeLogo.png')} />
                <TouchableOpacity style={styles.loginBtn} onPress = {() => {navigation.navigate(Info)}}>
                <Text style={styles.loginText}> Let's Start </Text>
                </TouchableOpacity>
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
      },
      Image: {
        width: 400,
        height: 400,
        alignItems: 'center'
      },
    Logo: {
      width: 300,
      height: 300,
      resizeMode: "contain",
      alignItems: 'center'
    },
      inputView:{
        width:"80%",
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
      },
      inputText:{
        paddingLeft: 10 ,
        height:50,
        color:"black",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#bfbfbf"
      },
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginBtn2:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },
      loginText:{
        color:"white"
      }
  });

export default Home;