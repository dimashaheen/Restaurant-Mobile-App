import { View, Text , StyleSheet , SafeAreaView  ,FlatList, Button, Image, ScrollView, TouchableOpacity } from 'react-native'
import React , {useState , useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CheckOut from './CheckOut';
import * as axios from 'axios';
import { withTheme } from 'react-native-elements';

const baseUrl = `http://192.168.1.10:3000`;

const Nigiri = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.default.get(`${baseUrl}/Nigiri`),
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
        "img" : items.img,
      })
    }).then((res) => res.text())
      .then(resJson => {
        setCart([...cart , {name: items.name , price: items.price , img: items.img}])
      }).catch(e => { console.log(e) })
  }

     const renderItem = ({ item: n }) => {
     return (
      <SafeAreaView>
        <View style={styles.card}>
        <Image source={{uri: n.img}} style={styles.image} />
         <Text style={styles.titleInput}>{n.name}</Text>
         <Text style={styles.textInput}>{n.price}  LE</Text>
         <TouchableOpacity style= {styles.button} onPress={() => addToCart(n) }>
           <Text style={{color: "white" , fontSize: 16}}> Add to Cart 🛒 </Text>
         </TouchableOpacity>
       </View>
      </SafeAreaView>
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

  card: {
    alignItems: 'flex-start',
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  image: {
    resizeMode: 'contain',
    borderRadius: 15,
    width: 350,
    height: 200,
    marginTop: +3,
    marginLeft: -5,
    marginRight: -10
  },
  
  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  
  titleInput: {
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
  },

  button:  {
      width : "45%" ,
      backgroundColor:"#f96d6c",
      marginBottom : 20 ,
      marginLeft: 180,
      borderRadius: 20,
      alignItems:"center",
      justifyContent:"flex-end",
      fontWeight : "bold",
      padding: 5
  }
  
})



export default Nigiri

