/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';
import Home from './app/Screens/Home';
import Info from './app/Screens/Info';
const Stack = createStackNavigator();
const App = () => {
  return (
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
         <Stack.Navigator>
            <Stack.Screen  name="Home" component={Home} options={{title:'Home'}}/>
            <Stack.Screen  name="Info" component={Info} options={{title:'Info'}}/>
         </Stack.Navigator>
      </NavigationContainer>
      
      
    
  );
};



export default App;
