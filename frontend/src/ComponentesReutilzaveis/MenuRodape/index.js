import React,{useState, useEffect} from "react";

import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import home from '../../../assets/home.png'
import bell from '../../../assets/bell.png'
import box from '../../../assets/box.png'
import user from '../../../assets/user.png'

import changeComponent from "../../Services/changeComponent";

export default function MenuRodape({navigation}){
  const mudarComponente = changeComponent((state) => state.mudarComponente);

  const muda = (componenteIr) => {
    if(componenteIr){
      mudarComponente(componenteIr)
    } else{
      console.log("Selecione um componente para ir")
    }
  }

  return <>
    <View style={styles.fundoMenu}>
      <TouchableOpacity
      onPress={() => {
          muda('Perfil')
        }}
      >
        <Image
        source={user}
        style={styles.icon}
        

        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          muda('HomeScreen')
        }}
      >
        <Image
        source={home}
        style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => {
          muda('Notificacoes')
        }}
      >
        <Image
        source={bell}
        style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => {
          muda('MeusPedidos')
        }}
      >

        <Image
        source={box}
        style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  </>
};