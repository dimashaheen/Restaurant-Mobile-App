import { SafeAreaView , ScrollView, View, Text , FlatList , StyleSheet , Alert, TouchableOpacity} from 'react-native'
import { Button, Card } from 'react-native-elements'
import * as axios from 'axios';
import React , {useState , useEffect} from 'react'
 
const baseUrl = `http://172.20.10.3:3000` ;

const CheckOut = () => {
  const [address, setAddress] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);



useEffect(() => {
  Promise.all([
    axios.default.get(`${baseUrl}/Cart`),
    axios.default.get(`${baseUrl}/Address/1`),
    axios.default.get(`${baseUrl}/Mobile/1`)
  ])
  .then(([{data: cartResults} , {data: addressResults} , {data: mobileResults}]) => {
    if(cartResults) {
      let sum = 0 ;
      for(var i = 0 ; i < cartResults.length ; i ++){
        sum += cartResults[i].price ;
      }
      setTotal(sum) ;
      setCart(cartResults);
    }  
    if(addressResults){ 
      console.log("address response",addressResults);
      setAddress(addressResults);
      console.log("address ..",address);
        }
    if(mobileResults) setMobile(mobileResults);
  })
  
}, []);

const handleDelete =  async () => { 
  try{  
    for (var i = 1 ; i <= cart.length ; i ++) {
      await axios.default.delete(`${baseUrl}/Cart/` + i)
    }
     await axios.default.delete(`${baseUrl}/Address/1`)
     await axios.default.delete(`${baseUrl}/Mobile/1`)
    setCart([])
    setAddress([])
    setMobile([])
    setTotal(0)

    Alert.alert("Order is on its way")
  }catch(err){
    console.log(err.message);
  }

};


  const renderItem = ({ item: n  , item: a , item: m}) => {
    return (
        
      <ScrollView>
      <View style={styles.itemRow}>
        <Text style={styles.titleInput}>{n.name}</Text>
        <Text style={styles.textInput}>{n.price}  LE</Text>
      </View>
     {/* <View>
        <Text style={styles.textInput}>Your Address: {address.address} , {address.srea}, {address.city} , {address.zip} </Text>
        <Text style={styles.textInput}>Contact Number: {mobile.mobileNum} </Text>
    </View> */}
    </ScrollView>

    );
  };
  
    return (
   <SafeAreaView>
   <FlatList
     contentContainerStyle={{ alignItems: "stretch" }}
     data={cart}
     renderItem={renderItem}
     keyExtractor={(n, index) => index.toString()}
   />
      <View>
         <Text style={styles.textInput}>Your Address: {address.address} , {address.srea}, {address.city} , {address.zip} </Text>
        <Text style={styles.textInput}>Contact Number: {mobile.mobileNum} </Text> 
      </View> 
    <Text style={styles.textInput}>Total: {total} </Text> 
    <TouchableOpacity style={styles.checkOutButton} onPress={() => handleDelete()}>
      <Text style={{color: 'white'}}> Checkout </Text>
    </TouchableOpacity>
 </SafeAreaView>
 )
}

export default CheckOut

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#f5fcff",
  },
  titleInput: {
    backgroundColor : "#E6E6E3",
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
    padding: 5,
    textAlign : "left"
  },
  textInput: {
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
    padding: 5,
  },
   checkOutCard: {
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
    padding: 5,
  },

  checkOutButton:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    marginLeft: 40,
    fontSize: 16,
  },
 
});
