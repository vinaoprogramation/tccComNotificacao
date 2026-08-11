import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import Menu from '../../ComponentesReutilzaveis/Menu';

import styles from './styles';
export default function Inicial({ navigation }) {
  return (
    <ScrollView style={styles.fundo}>
      
      <View>
      
        <Text style={styles.titulo}>Bem Vindo</Text>

        <View>
          <TouchableOpacity style={styles.botao}
            onPress={() => {
              navigation.navigate('Login')
            }}
          >
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.registro}>
            <Text style={styles.textoChamada}>Primeiro Acesso?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Registro')
              }}
            >
              <Text style={styles.textoClicavel}>Registre-se</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}