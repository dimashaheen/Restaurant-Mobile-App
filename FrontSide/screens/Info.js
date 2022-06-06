import React , {useState} from 'react'
import { View, Text, Image, StyleSheet, TextInput ,TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CategoryMenu from './CategoryMenu';

const baseUrl = `http://172.20.10.3:3000`; 

const Info = () => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [zip, setZip] = useState("");
    const [mobile, setMobile] = useState("");

    const navigation = useNavigation();

      const storeAddress = () => {
        fetch(`${baseUrl}/Address`, {
          method: "POST",
          headers:{'Content-type' : 'application/json'  ,'Accept': 'application/json'}, 
          body: JSON.stringify({
            "address": address,
            "city": city,
            "srea" : area,
            "zip" : zip
          })
        }).then((res) => res.text())
          .then(resJson => {
            console.log("Address:" , resJson)
          }).catch(e => { console.log(e) })
      }

      const storeMobile = () => {
        fetch(`${baseUrl}/Mobile`, {
          method: "POST",
          headers:{'Content-type' : 'application/json'  ,'Accept': 'application/json'}, 
          body: JSON.stringify({
            "mobileNum": mobile
          })
        }).then((res) => res.text())
          .then(resJson => {
            console.log("Mobile:" , resJson)
          }).catch(e => { console.log(e) })
      }

    const handleSubmit = () => {
       storeAddress();
       storeMobile();
       navigation.navigate(CategoryMenu);
    }


    return(
            <View style={styles.container}>
                <Image style={styles.Logo} source={require('../assets/welcomeLogo.png')} />
                <Text style={{color: "#fb5b5a" , fontWeight: "bold" , fontSize: 16}}> Address Information </Text>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Enter Your Address" 
                    placeholderTextColor="#003f5c"
                    value={address}
                    onChangeText={(value) => setAddress(value)}/>
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Cairo, Alexandria..." 
                    placeholderTextColor="#003f5c"
                    value={city}
                    onChangeText={(value) => setCity(value)}
                    />
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Fifth Settlement,Nasr City... " 
                    placeholderTextColor="#003f5c"
                    value={area}
                    onChangeText={(value) => setArea(value)}
                    />
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="ZIP/Postal Code..." 
                    placeholderTextColor="#003f5c"
                    value={zip}
                    onChangeText={(value) => setZip(value)}
                    />
                </View>
                <Text style={{color: "#fb5b5a" , fontWeight: "bold" , fontSize: 16}}> Contact Information </Text>
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
        width: 200,
        height: 200,
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

export default Info;