import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryMenu from './screens/CategoryMenu';
import Nigiri from './screens/Nigiri';

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