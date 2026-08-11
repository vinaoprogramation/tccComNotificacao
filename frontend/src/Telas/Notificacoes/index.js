import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';


import styles from './styles';

import Notification from '../../Services/notifications';

export default function Notificacoes({ navigation }) {
  return <>
    <ScrollView>
        <View>
            <Text style={styles.texto}>Teste</Text>
        </View>

        <TouchableOpacity onPress={() => {
          navigation.goBack();  
        }}

        style={{backgroundColor: 'red'}}
        
        >
          <Text>Voltar</Text>
        </TouchableOpacity>
    </ScrollView>
  </>
}