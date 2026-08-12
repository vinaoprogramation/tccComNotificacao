import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import HomeScreen from '../Telas/HomeScreen';
import Inicial from '../Telas/Inicial';
import Login from '../Telas/Login';
import Registro from '../Telas/Registro';
import Notificacoes from '../Telas/Notificacoes';
import MeusPedidos from '../Telas/MeusPedidos';
import DetalhesImpressao from '../Telas/DetalhesImpressao';
import Lobby from '../Telas/Lobby';

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

        <Tab.Screen name="Lobby" options={{ headerShown: false }}
        component={Lobby}
        />

        <Tab.Screen name="HomeScreen" options={{ headerShown: false }}
        component={HomeScreen}
        />

        <Tab.Screen name="Notificacoes" options={{ headerShown: false }}
        component={Notificacoes}
        />

        <Tab.Screen name="MeusPedidos" options={{ headerShown: false }}
        component={MeusPedidos}
        />

        <Tab.Screen name="DetalhesImpressao" options={{ headerShown: false }}
        component={DetalhesImpressao}
        />




      </Tab.Navigator>
    </NavigationContainer>
  );
}
