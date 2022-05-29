import { View, Text , StyleSheet , FlatList , SafeAreaView  , Button} from 'react-native'
import React from 'react'

const Nigiri = () => {
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
    const renderItem = ({ item: n }) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.titleInput}>{n.name}</Text>
        <Text style={styles.textInput}>{n.price}  LE</Text>
        <Button  title='Add to Cart' style = {{fontWeight : "bold"}} />
      </View>
    );
  };
  
  return (
    <SafeAreaView>
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
 
})