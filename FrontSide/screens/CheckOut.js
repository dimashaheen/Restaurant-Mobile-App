import { SafeAreaView , ScrollView, View, Text , Button } from 'react-native'
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


 const sum = 0
 if (Data.length > 1 ) {
    while(Data<= Data.length) {
        sum += Data.price
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
               <Card.Title style={styles.title}> {d.name}  </Card.Title>
               <Text> {d.price} </Text>
    
              </Card>
            )   )
        }
        <Card>
            <Card.Title> Total : {sum}  </Card.Title>
            <Button title='Checkout' />
        </Card>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CheckOut