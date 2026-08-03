import react, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import styles from './styles';


import useTokenStore from '../../Services/useTokenStore';
export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = useTokenStore((state) => state.login);
  const autenticado = useTokenStore((state) => state.autenticado);


  const handleLogin = async (username, password) => {
    if (username && password) {
      await login(username, password);
    } else {
      console.log('Username and password are required');
    }
  };

  useEffect(() => {
    if (autenticado) {
      setUsername('')
      setPassword('')
      navigation.navigate('HomeScreen')
    }
  }, [autenticado])

  return <>
    <ScrollView style={styles.fundo}>
      <View>
        <Text style={styles.titulo}>Login</Text>
        <View>

          <View style={styles.grupoEntrada}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder='usuário'
              style={styles.entrada}
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder='senha'
              secureTextEntry
              style={styles.entrada}
            />
          </View>



          <TouchableOpacity style={styles.botao}
            onPress={() => {
              handleLogin(username, password)
            }}
          >
            <Text style={styles.textoBotao}>Fazer Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  </>
}
