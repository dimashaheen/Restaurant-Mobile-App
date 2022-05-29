import { View, Text , StyleSheet , SafeAreaView  , Button, ScrollView} from 'react-native'
import React , {useState , useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CheckOut from './CheckOut';
import { Card, CardTitle, CardContent, CardImage } from 'react-native-material-cards'
import * as axios from 'axios';


const Nigiri = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState<Category[]>();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.1.11:3000/items/Nigiri`),
    ])
    .then(([{data: categoryResults}]) => {
      if(categoryResults) setItems(categoryResults);
    })
  }, []);

  // const items =  [
  //   {
  //       name : "Salmon" ,
  //       price : 18 , 
  //       img: ""
  //   } , 
  //   {
  //       name : "Tuna" ,
  //       price : 19 , 
  //       img : ""
  //   },
  //   {
  //       name : "Shrimp" ,
  //       price : 17 , 
  //       img : ""
  //   },
  //   {
  //       name : "Crab Sticks" ,
  //       price : 15 , 
  //       img : ""        
  //   },
  //    {
  //       name : "Shrimp Tempura" ,
  //       price : 24 , 
  //       img : ""        
  //   },
  //    {
  //       name : "Salmon Tempura" ,
  //       price : 24 , 
  //       img : ""        
  //   },
  //   {
  //     name : "Crispy Shrimp" ,
  //       price : 19 , 
  //       img : ""    
  //   },
  //   {
  //     name : "Crispy Spicy Tune" ,
  //       price : 22 , 
  //       img : ""    
  //   }
  // ]

   const addCart = (items) => {
      const item = {
        name : items.name ,
        price : items.price
      }
        setCart([...cart,item]);
    };
    console.log(cart)

  //   const renderItem = ({ items: it }) => {
  //   return (
  //     <View style={styles.itemRow}>
  //       <Text style={styles.titleInput}>{it.name}</Text>
  //       <Text style={styles.textInput}>{it.price}  LE</Text>
  //       <Button  title='Add to Cart' style = {{fontWeight : "bold"}} onPress={() => addCart(n) } />
  //     </View>
  //   );
  // };
  

  // return (
  //   <SafeAreaView>
  //     <Button title='Go CheckOut'  style={styles.checkOutButton}  onPress={() => navigation.navigate('CheckOut' as never)}  />
  //   <FlatList
  //     contentContainerStyle={{ alignItems: "stretch" }}
  //     data={items}
  //     renderItem={renderItem}
  //     keyExtractor={(it, index) => index.toString()}
  //   />
  // </SafeAreaView>
  // )

  return (
    <SafeAreaView>
    <Button title='Go CheckOut'  onPress={() => navigation.navigate(CheckOut as never)}  />
    <ScrollView>
      <View style={styles.itemRow}>
     { 
         items?.map((it , index: number) => (
           <Card key={index} style={{borderRadius: 20}}>
              <CardImage images={it.image} />  
              <CardTitle  title={it.name}/>
              <CardContent text={it.price}/>
              <Button  title='Add to Cart' onPress={() => addCart(it) } />
            </Card>
         ))
        }
      </View>
   </ScrollView>
    </SafeAreaView >
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

type Category = {
  name : string,
  price : number,
  image : string
}


export default Nigiri

