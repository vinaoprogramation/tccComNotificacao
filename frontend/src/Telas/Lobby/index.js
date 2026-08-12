import react, { useState, useEffect } from "react";

import HomeScreen from "../HomeScreen";
import MeusPedidos from "../MeusPedidos";
import Notificacoes from "../Notificacoes";
import MenuRodape from "../../ComponentesReutilzaveis/MenuRodape";
import Perfil from "../Perfil";

import changeComponent from "../../Services/changeComponent";
import useTokenStore from "../../Services/useTokenStore";

import { Alert } from "react-native";

export default function Lobby({ navigation }) {
  const componente = changeComponent((state) => state.componente)


  const logout = useTokenStore(
    (state) => state.logout
  );



  useEffect(() => {

    const unsubscribe = navigation.addListener(
      "beforeRemove",
      (e) => {

        e.preventDefault();

        Alert.alert(
          "Sair da conta?",
          "Deseja realmente sair e deslogar do aplicativo?",
          [
            {
              text: "Cancelar",
              style: "cancel"
            },

            {
              text: "Sair e Deslogar",
              style: "destructive",

              onPress: () => {

                logout();

                navigation.dispatch(
                  e.data.action
                );

              }
            }
          ]
        );

      }
    );

    return unsubscribe;

  }, [
    navigation,
    logout
  ]);

  return <>
    {
      componente === 'HomeScreen' ? (<HomeScreen 
        navigation={navigation}
      />) :
        componente === 'Notificacoes' ? (<Notificacoes 
          navigation={navigation}
        />) :
          componente === 'MeusPedidos' ? (<MeusPedidos 
            navigation={navigation}
          />) :
          componente === 'Perfil' ? (<Perfil 
            navigation={navigation}
          />) :
           <Text>ERRO</Text>
    }
    <MenuRodape
      navigation={navigation}
    />
  </>
}