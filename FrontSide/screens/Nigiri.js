import { View, Text , StyleSheet , FlatList , SafeAreaView  , Button, ScrollView} from 'react-native'
import React , {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import CheckOut from './CheckOut';

const Nigiri = () => {
  const navigation = useNavigation();

  const [cart, setCart] = useState([])
  const items =  [
    {
        name : "Salmon" ,
        price : 18 , 
        img: ""
    } , 
    {
        name : "Tuna" ,
        price : 19 , 
        img : ""
    },
    {
        name : "Shrimp" ,
        price : 17 , 
        img : ""
    },
    {
        name : "Crab Sticks" ,
        price : 15 , 
        img : ""        
    },
     {
        name : "Shrimp Tempura" ,
        price : 24 , 
        img : ""        
    },
     {
        name : "Salmon Tempura" ,
        price : 24 , 
        img : ""        
    },
    {
      name : "Crispy Shrimp" ,
        price : 19 , 
        img : ""    
    },
    {
      name : "Crispy Spicy Tune" ,
        price : 22 , 
        img : ""    
    }
  ]
   const addCart = (n) => {
      const item = {
        name : n.name ,
        price : n.price
      }
        setCart([...cart,item]);
    };
    console.log(cart)

    const renderItem = ({ item: n }) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.titleInput}>{n.name}</Text>
        <Text style={styles.textInput}>{n.price}  LE</Text>
        <Button  title='Add to Cart' style = {{fontWeight : "bold"}} onPress={() => addCart(n) } />
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

export default Nigiri

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