import React , {useState , useEffect} from 'react'
import { View, Text, Image, StyleSheet, TextInput ,TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import CategoryMenu from './CategoryMenu';

const Login = () => {
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");

    const navigation = useNavigation();

    const storeData = async () => {
     if (mobile.length == 11 ) {

         try {
             var user = {
                 Address : address,
                 Mobile: mobile
                }
                await AsyncStorage.setItem('userData', JSON.stringify(user));
                navigation.navigate(CategoryMenu);
            } catch (e) {
                console.log(e);
            }
        } else {
            Alert.alert('You must enter 11 numbers in mobile')
        }
      }

    const handleSubmit = () => {
        storeData();
    }


    return(
            <View style={styles.container}>
                <Image style={styles.Logo} source={require('../assets/welcomeLogo.png')} />
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Enter your address..." 
                    placeholderTextColor="#003f5c"
                    value={address}
                    onChangeText={(value) => setAddress(value)}/>
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Enter your mobile number..." 
                    placeholderTextColor="#003f5c"
                    value={mobile}
                    onChangeText={(value) => setMobile(value)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress = {handleSubmit}>
                <Text style={styles.loginText}> Continue </Text>
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

export default Login;