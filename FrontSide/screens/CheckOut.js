import { SafeAreaView , ScrollView, View, Text , FlatList , StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as axios from 'axios';
import React , {useState , useEffect} from 'react'
 
const CheckOut = () => {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [cart, setCart] = useState([]);

useEffect(() => {
  Promise.all([
    axios.default.get(`http://192.168.1.5:3000/Cart`),
    axios.default.get(`http://192.168.1.5:3000/Address`),
    axios.default.get(`http://192.168.1.5:3000/Mobile`)
  ])
  .then(([{data: cartResults} , {data: addressResults} , {data: mobileResults}]) => {
    if(cartResults) setCart(cartResults); 
    if(addressResults) setAddress(addressResults);
    if(mobileResults) setMobile(mobileResults);
  })
  
}, []);

// let sum = 0;

// if (cart.length > 1 ) {

//   for (let i = 0; i < cart.length; i++) {
//     sum += cart.price
//   }
// } else {
//   sum += cart.price
// }
// console.log(sum)


const handleDelete =  async () => { 
  try{  
    for (var i = 1 ; i <= cart.length ; i ++) {
      axios.default.delete(`http://192.168.1.5:3000/Cart/` + i)
    }
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
        <Text style={styles.textInput}>Your Address: {a.address} , {a.srea}, {a.city} , {a.zip} </Text>
        <Text style={styles.textInput}>Contact Number: {m.mobileNum} </Text>
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
   {/* <FlatList data={address} renderItem={renderItem} keyExtractor={(a, index) => index.toString()}/>
   <FlatList data={mobile} renderItem={renderItem} keyExtractor={(m, index) => index.toString()}/> */}
   <Button style={styles.checkOutButton} onPress={() => handleDelete()}>  Checkout </Button>
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
    marginBottom:10
  },
 
});
