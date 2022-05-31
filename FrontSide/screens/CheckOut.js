import { SafeAreaView , ScrollView, View, Text , Button , StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React , {useState , useEffect} from 'react'
 
const CheckOut = () => {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [cartItemsNames, setcartItemsNames] = useState([]);
  const [cartItemsPrices, setcartItemsPrices] = useState([]);
  const [friedRollsNames, setfriedRollsNames] = useState([])
  const [friedRollsPrices, setfriedRollsPrices] = useState([])
  const [uraMakiNames, seturaMakiNames] = useState([])
  const [uraMakiPrices, seturaMakiPrices] = useState([])
  const [specialuraMakiNames, setspecialuraMakiNames] = useState([])
  const [specialuraMakiPrices, setspecialuraMakiPrices] = useState([])
  const [drinksNames, setDrinksNames] = useState([])
  const [drinksPrices, setDrinksPrices] = useState([])

 
//const arr = cartItemsPrices.split('[')
//console.log("myArray is ",  cartItemsPrices)
//
//cartItemsPrices.slice()

 let sum = 0;

 if (cartItemsPrices.length > 1 ) {

for (let i = 0; i < cartItemsPrices.length; i++) {
    sum += cartItemsPrices[i]
}
   
}
 console.log(sum)


 useEffect(() => {
  getData();
  getDataa();
}, []);

const getData = () => {
  try {
      AsyncStorage.getItem('UserData')
          .then(value => {
              if (value != null) {
                  let user = JSON.parse(value);
                  setMobile(user.Mobile);
                  setAddress(user.Address);
              }
          })
  } catch (error) {
      console.log(error);
  }
}

const getDataa = async() => {
  try {
    const Nigirinames = await AsyncStorage.getItem("nigiriItemsNames")    
    const Nigiriprices = await AsyncStorage.getItem("nigiriItemsPrices")    
    const FriedRollsNames = await AsyncStorage.getItem("FriedRollsNames")    
    const FriedRollsPrices = await AsyncStorage.getItem("FriedRollsPrices") 
    const UraRollsNames = await AsyncStorage.getItem("UraNames") 
    const UraRollsPrices = await AsyncStorage.getItem("UraPrices")    
    const SpecialUraRollsNames = await AsyncStorage.getItem("SpecialUraNames") 
    const SpecialUraRollsPrices = await AsyncStorage.getItem("SpecialUraPrices")    
    const DrinksNames = await AsyncStorage.getItem("DrinksNames") 
    const DrinksPrices = await AsyncStorage.getItem("DrinksPrices")    

    const names = JSON.parse(Nigirinames)
    const prices = JSON.parse(Nigiriprices)
    const namesFried = JSON.parse(FriedRollsNames)
    const pricesFried = JSON.parse(FriedRollsPrices)
    const namesUra = JSON.parse(UraRollsNames)
    const pricesUra = JSON.parse(UraRollsPrices)
    const namesSpecialUra = JSON.parse(SpecialUraRollsNames)
    const pricesSpecialUra = JSON.parse(SpecialUraRollsPrices)
    const namesDrinks = JSON.parse(DrinksNames)
    const pricesDrinks = JSON.parse(DrinksPrices)
    
    //console.log("prices afet parcing are : " ,prices)
    setcartItemsNames(names)
    setcartItemsPrices(prices)
    setfriedRollsNames(namesFried)
    setfriedRollsPrices(pricesFried)
    seturaMakiPrices(pricesUra)
    seturaMakiNames(namesUra)
    setspecialuraMakiNames(namesSpecialUra)
    setspecialuraMakiPrices(pricesSpecialUra)
    setDrinksNames(namesDrinks)
    setDrinksPrices(pricesDrinks)

  } catch (error) {
     console.log("error in saving")
  }
}

const emptyTheCart = async () => {
try {
       await AsyncStorage.removeItem('nigiriItemsNames')
       await AsyncStorage.removeItem('nigiriItemsPrices')
       await AsyncStorage.removeItem('FriedRollsNames')
       await AsyncStorage.removeItem('FriedRollsPrices')
       await AsyncStorage.removeItem('UraNames')
       await AsyncStorage.removeItem('UraPrices')
       await AsyncStorage.removeItem('SpecialUraPrices')
       await AsyncStorage.removeItem('SpecialUraNames')
       await AsyncStorage.removeItem('DrinksNames')
       await AsyncStorage.removeItem('DrinksPrices')

        }
        catch (error) {
          console.log("error while deleting")
        }

}

return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        {
            cartItemsNames?.map( (d , number) => (
               <Card key={number}  >
               <Card.Title style={styles.titleInput}> {d}  </Card.Title>
               <Button title='remove item' style={{alignItems : "right"}}/>
              </Card>
            )   )
        }
         {
            friedRollsNames?.map( (d , number) => (
               <Card key={number}  >
               <Card.Title style={styles.titleInput}> {d}  </Card.Title>
               <Button title='remove item' style={{alignItems : "right"}}/>
             
              </Card>
            )   )
        }
         {
            uraMakiNames?.map( (d , number) => (
               <Card key={number}  >
               <Card.Title style={styles.titleInput}> {d}  </Card.Title>
               <Button title='remove item' style={{alignItems : "right"}}/>
    
              </Card>
            )   )
        }
         {
            specialuraMakiNames?.map( (d , number) => (
               <Card key={number}  >
               <Card.Title style={styles.titleInput}> {d}  </Card.Title>
               <Button title='remove item' style={{alignItems : "right"}}/>
    
              </Card>
            )   )
        }
        {
            drinksNames?.map( (d , number) => (
               <Card key={number}  >
               <Card.Title style={styles.titleInput}> {d}  </Card.Title>
               <Button title='remove item' style={{alignItems : "right"}}/>

              </Card>
            )   )
        }
        <Card>
            <Text style={styles.textInput}>Your Address: {address} </Text>
            <Text style={styles.textInput}>Contact Number: {mobile} </Text>
            <Card.Title style={{fontWeight : "bold" , fontSize : 20} } > 
            Total : {sum} LE
            </Card.Title>
            <Button title='Checkout' onPress={()=> emptyTheCart() &&  console.log(address, mobile)}/>
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
 
});
