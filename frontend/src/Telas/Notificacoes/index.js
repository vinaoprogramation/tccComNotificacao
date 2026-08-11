import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';


import styles from './styles';

import useNotification from '../../Services/notifications';

export default function Notificacoes({ navigation }) {
  const notificacoes = useNotification((state) => state.notificacoes);
  const carregaNotificacoes = useNotification((state) => state.carregaNotificacoes);

  useEffect(() => {
    if (carregaNotificacoes) {
      carregaNotificacoes();
    }
  }, [carregaNotificacoes])

  return <>
    <ScrollView>
      <View>
        <Text style={styles.texto}>Teste</Text>
      </View>

      <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}

        style={{ backgroundColor: 'red' }}

      >
        <FlatList

          data={notificacoes}

          maxToRenderPerBatch={5}

          keyExtractor={(item) =>
            String(item.requestId)
          }

          renderItem={({ item }) => (
            <View>
              <Text>{item.message}</Text>
            </View>
          )}
        />

        <Text>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  </>
}