import { View, Text , StyleSheet , SafeAreaView  ,FlatList, Button, ScrollView } from 'react-native'
import React , {useState , useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CheckOut from './CheckOut';
import * as axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Nigiri = () => {
  const navigation = useNavigation();

  const [nameInTheCart , setNamesInTheCart] = useState([]);
  const [prciesInTheCart , setPricesInTheCart] = useState([]);

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.8.105:3000/items/Nigiri`),
    ])
    .then(([{data: categoryResults}]) => {
      if(categoryResults) setItems(categoryResults);
    })
  }, []);

 // console.log(items)

   const addCart = (items) => {
      const item = {
        name : items.name ,
        price : items.price
      }
        setNamesInTheCart([...nameInTheCart,items.name]);
        setPricesInTheCart([...prciesInTheCart,items.price]);

        setCart([...cart,item]);
    };
    //console.log(cart)
   // console.log("names are ",nameInTheCart)
   // console.log("prices are ",prciesInTheCart)

const store = async(nameInTheCart , prciesInTheCart) => {
    try {
      var namescartItems = JSON.stringify(nameInTheCart) ;
      var pricescartItems = JSON.stringify(prciesInTheCart) ;
      console.log("names in the cart",namescartItems)
      console.log("prices in the cart",pricescartItems)

      await AsyncStorage.setItem("nigiriItemsNames", nameInTheCart)
      await AsyncStorage.setItem("nigiriItemsPrices", pricescartItems)

       console.log("stored successfully")
    } catch (error) {
        console.log("error in saving")
    }
  }
     const renderItem = ({ item: n }) => {
     return (
       <View style={styles.itemRow}>
         <Text style={styles.titleInput}>{n.name}</Text>
         <Text style={styles.textInput}>{n.price}  LE</Text>
         <Button  title='Add to Cart' style = {{fontWeight : "bold"}} onPress={() => addCart(n) } />
       </View>
     );
   };
   
   //store();
     return (
    <SafeAreaView>
      <Button title='Go CheckOut'  style={styles.checkOutButton}  onPress={() =>store(JSON.stringify(nameInTheCart ), JSON.stringify(prciesInTheCart)) && navigation.navigate(CheckOut)}  />
    <FlatList
      contentContainerStyle={{ alignItems: "stretch" }}
      data={items}
      renderItem={renderItem}
      keyExtractor={(n, index) => index.toString()}
    />
  </SafeAreaView>
  )

}


const styles = StyleSheet.create({
  
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5fcff",
  },
  
  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
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
  
  checkOutButton : {
    color : "#00FFFF" ,
    marginBottom : 20 ,
    backgroundColor : "#00FFFF"
    
  }
  
})



export default Nigiri

