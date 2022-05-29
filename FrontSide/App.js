import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryMenu from './screens/CategoryMenu';
import Nigiri from './screens/Nigiri';
import FriedRolls from './screens/FriedRolls';
import UraMaki from './screens/UraMaki';
import SpecialUra from  './screens/SpecialUra';
import Drinks from  './screens/Drinks';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="CategoryMenu" 
        component={CategoryMenu}
        options={{
          headerShown: false,  
        }} 
      />
      <Stack.Screen 
        name="Nigiri" 
        component={Nigiri}
        options={{
          headerShown: true,
          title: '',
        }} 
      />
       <Stack.Screen 
        name="FriedRolls" 
        component={FriedRolls}
        options={{
          headerShown: true,
          title: '',
        }} 
      />
        <Stack.Screen 
        name="UraMaki" 
        component={UraMaki}
        options={{
          headerShown: true,
          title: '',
        }} 
      />
        <Stack.Screen 
        name="SpecialUra" 
        component={SpecialUra}
        options={{
          headerShown: true,
          title: '',
        }} 
      />
       <Stack.Screen 
        name="Drinks" 
        component={Drinks}
        options={{
          headerShown: true,
          title: '',
        }} 
      />

    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App