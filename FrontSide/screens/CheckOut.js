import { SafeAreaView , ScrollView, View, Text , FlatList , StyleSheet , Alert, TouchableOpacity, Image} from 'react-native'
import * as axios from 'axios';
import React , {useState , useEffect} from 'react'
 
const baseUrl = `http://192.168.1.10:3000` ;

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
      setAddress(addressResults);
        }
    if(mobileResults) setMobile(mobileResults);
  })
  
}, []);

const handleDelete =  async () => { 

  try{  

    await Promise.all(cart.map(item => axios.default.delete(`${baseUrl}/Cart/` + item.id) ))
    console.log("Cart Deleted")
    await axios.default.delete(`${baseUrl}/Address/1`)
    console.log("Address Deleted")
    await axios.default.delete(`${baseUrl}/Mobile/1`)
    console.log("Mobile Deleted")


    setCart([])
    setAddress([])
    setMobile([])
    setTotal(0)

    Alert.alert("Order is on its way")
  }catch(err){
    console.log(err.message);
  }
} ;

const handleRemove = async (id, price) => {
  try {
    
    var prevCart = [...cart];
    setCart(prevCart.filter(cart => cart.id != id)); 

    setTotal(total - price) ;
    
    await axios.default.delete(`${baseUrl}/Cart/` + id) ;
  
  } catch (error) {
    console.log(err.message);
  }
};

  const renderItem = ({ item: n  , item: a , item: m}) => {
    return (
    <ScrollView>
      <View style={styles.mainCardView}>
        <View style={styles.subCardView}>
          <Image source={{uri: n.img}} resizeMode="contain" style={styles.image} />
        </View>
        <View style={{marginLeft: 12}}>
          <Text style={styles.titleInput}>{n.name}</Text>
          <Text style={styles.textInput}>{n.price}  LE</Text>
        </View>
          <TouchableOpacity onPress={() => handleRemove(n.id, n.price)} >
            <Text> ❌ </Text>
          </TouchableOpacity> 
      </View>
    </ScrollView>

    );
  };
  
    return (
     <SafeAreaView>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}> Checkout </Text>
        <FlatList
          contentContainerStyle={{ alignItems: "stretch" }}
          data={cart}
          renderItem={renderItem}
          keyExtractor={(n, index) => index.toString()}
          ListFooterComponent={
            <ScrollView>
              <View>
              <Text style={styles.textInput}>Your Address: {address.address} , {address.srea}, {address.city} , {address.zip} </Text>
              <Text style={styles.textInput}>Contact Number: {mobile.mobileNum} </Text> 
              <Text style={styles.textInput}>Total: {total} LE </Text> 
              </View>
              <TouchableOpacity style={styles.checkOutButton} onPress={() => handleDelete()}>
                  <Text style={{color: 'white'}}> Checkout </Text>
              </TouchableOpacity> 
            </ScrollView> 
      }
          />
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
  } ,
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight : "bold" , 
    color:'black',
  } ,
  titleInput: {
    fontSize: 20,
    color: "black",
    fontWeight: 'bold',
    alignItems: 'flex-start',
    textTransform: 'capitalize'
  },
  image: {
    marginLeft: 50,
    borderRadius: 700 ,
    height: 100,
    width: 100,
  },
  textInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    padding: 5,
    marginLeft: 30
  },
  checkOutButton:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10,
    marginLeft: 45,
    fontSize: 16,
    
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
