import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import HomeScreen from '../Telas/HomeScreen';
import Inicial from '../Telas/Inicial';
import Login from '../Telas/Login';
import Registro from '../Telas/Registro';

const Tab = createNativeStackNavigator();


export default function Telas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>


        <Tab.Screen name="Inicial" options={{ headerShown: false }}
        component={Inicial}
        />

        <Tab.Screen name="Login" options={{ headerShown: false }}
        component={Login}
        />

        <Tab.Screen name="Registro" options={{ headerShown: false }}
        component={Registro}
        />

        <Tab.Screen name="HomeScreen" options={{ headerShown: false }}
        component={HomeScreen}
        />




      </Tab.Navigator>
    </NavigationContainer>
  );
}
