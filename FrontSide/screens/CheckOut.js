import { SafeAreaView , ScrollView, View, Text , Button , StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'

import React from 'react'
 const Data = [
     {
    name: "Salmon Tempura",
    price: 24,
  },
   {
    name: "Tuna",
    price: 19,
  },

 ]


 let sum = 0;
 if (Data.length > 1 ) {
for (let i = 0; i < Data.length; i++) {
    sum += Data[i].price
}
   
}
 console.log(sum)

const CheckOut = () => {
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        {
            Data?.map( (d , number) => (
               <Card key={number}  >
               <Card.Title style={styles.titleInput}> {d.name}  </Card.Title>
               <Text  style={styles.textInput} > {d.price} LE </Text>
    
              </Card>
            )   )
        }
        <Card>
            <Card.Title style={{fontWeight : "bold"} ,{fontSize : 20} } > 
            Total : {sum} LE
            </Card.Title>
            <Button title='Checkout' />
        </Card>
        </ScrollView>
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
  checkOutButton : {
    color : "#00FFFF" ,
    marginBottom : 20 ,
    backgroundColor : "#00FFFF"
    
  }
 
})