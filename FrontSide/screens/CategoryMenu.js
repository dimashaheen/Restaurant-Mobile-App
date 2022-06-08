import { View, Text, SafeAreaView , StyleSheet, ScrollView} from 'react-native'
import React , {useState , useEffect} from 'react'
// import { Card , Button , Icon } from 'react-native-elements'
import { Button } from 'react-native-elements'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { useNavigation } from '@react-navigation/native'
import CheckOut from './CheckOut';

const CategoryMenu = () => {
    const Data = [
        {
            id : 1,
            name : 'Nigiri' ,
            screen : "Nigiri" ,
            uri : 'https://thumbor.thedailymeal.com/gUfAylED0IS1nuSLZSRV_Kt9AEc=/870x565/filters:format(webp)/https://www.thedailymeal.com/sites/default/files/recipe/2016/shutterstock_123733927.jpg'
        } , 
        {
            id : 2,
            name : 'Fried Rolls' ,
            screen : "FriedRolls" ,
            uri : 'https://media.istockphoto.com/photos/hot-tempura-roll-with-prawn-and-cheese-on-black-background-picture-id1144739441?k=20&m=1144739441&s=612x612&w=0&h=IzoCbpoz5WSDMEo6gQl4DdKHTum6SSzT02mAqKcjJtE='
        }, {
             id : 3,
            name : 'Ura Maki Rolls' ,
            screen : "UraMaki" ,
            uri : 'https://www.reyesgutierrez.com/wp-content/uploads/2020/07/Uramaki-mango-930x620.jpg'
        }, 
        {
            id : 4,
            name : 'Special Ura Maki Rolls' ,
            screen : "SpecialUra" ,
            uri : 'https://media-cdn.tripadvisor.com/media/photo-s/19/de/fc/f4/uramaki-tuna-special.jpg'
        }, {
            id : 5 ,
            name : 'Drinks' ,
            screen : "Drinks" ,
            uri : 'https://domf5oio6qrcr.cloudfront.net/medialibrary/8931/Smoothie-post.jpg'
        }
    ]
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Button title='Proceed to CheckOut' onPress={() => navigation.navigate(CheckOut)} />

        <ScrollView>
          <View>
        {
          Data?.map( (category , number) => (
            // <Card style={{borderRadius: 20 , marginTop: 15}} key={number} >
            //       <CardContent style={{marginTop: 10}}>
            //           <Text style={styles.title}>{category.name}</Text>
            //         </CardContent>
            //       <CardImage  style={styles.image} source= {{uri : category.uri}} />
            //       <CardButton title="View" color="white" style={styles.viewButton} onPress={() => navigation.navigate(category.screen)}/>
            // </Card>
                <Card
                  key={number}
                  mediaSource={{ uri:  category.uri }}
                  style={{ borderRadius: 20 , margin: 10 }}
                >
                  <CardTitle
                    style={styles.title}
                    subtitleAbove={false}
                    title={category.name}
                  />
                    <CardButton
                      title="View" color="white" 
                      style={styles.viewButton} 
                      onPress={() => navigation.navigate(category.screen)}
                    />
                </Card>
            )   )
          }
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CategoryMenu

  const styles = StyleSheet.create({

      container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'stretch',
        justifyContent: 'center' , 
      //  aspectRatio : 20
      },
      image: {
        resizeMode: 'contain',
        borderRadius: 15    
      },
      title: {
        fontSize: 20,
        fontWeight : "bold" , 
        color:'black',
      } ,
      viewButton : {
        width : "30%" ,
        alignItems: "center",
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: "#fb5b5a",
        padding: 10 ,
        borderRadius: 20

      },
      checkOutButton : {
        color : "#00FFFF" ,
        marginBottom : 20 ,
        backgroundColor : "#00FFFF"
    
  }
  });