import { View, Text , StyleSheet , SafeAreaView ,  FlatList, Button, Image} from 'react-native'
import React , {useState , useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CheckOut from './CheckOut';
import { Card, CardTitle, CardContent, CardImage } from 'react-native-material-cards'
import * as axios from 'axios';

const baseUrl = `http://172.20.10.3:3000` ;

const SpecialUra = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.default.get(`${baseUrl}/Special-Ura-Maki-Rolls`),
    ])
    .then(([{data: categoryResults}]) => {
      if(categoryResults) setItems(categoryResults);
    })
  }, []);


  const addToCart = (items) => {
    fetch(`${baseUrl}/Cart`, {
      method: "POST",
      headers:{'Content-type' : 'application/json'  ,'Accept': 'application/json'}, 
      body: JSON.stringify({
        "name": items.name,
        "price": items.price,
      })
    }).then((res) => res.text())
      .then(resJson => {
        console.log("cartItem:" , resJson)
        setCart([...cart , {name: items.name , price: items.price}])
      }).catch(e => { console.log(e) })
  }
     const renderItem = ({ item: n }) => {
     return (
       <View style={styles.itemRow}>
          <Image source={{uri: n.img}} style={styles.image} />
         <Text style={styles.titleInput}>{n.name}</Text>
         <Text style={styles.textInput}>{n.price}  LE</Text>
         <Button  title='Add to Cart' style = {{fontWeight : "bold"}} onPress={() => addToCart(n) } />
       </View>
     );
   };
  

     return (
    <SafeAreaView>
      <Button title='Go CheckOut'  style={styles.checkOutButton}  onPress={() => navigation.navigate(CheckOut)}  />
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
  
});



export default SpecialUra

