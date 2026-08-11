import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';


import styles from './styles';

import useNotification from '../../Services/notifications';

export default function Notificacoes({ navigation }) {
  const notificacoes = useNotification((state) => state.notificacoes);
  const mensagem = useNotification((state) => state.mensagem);
  const carregaNotificacoes = useNotification((state) => state.carregaNotificacoes);

  useEffect(() => {
    if (carregaNotificacoes) {
      carregaNotificacoes();
    }
  }, [carregaNotificacoes])

  return <>
    {!mensagem ? (<ScrollView>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Teste</Text>


        <FlatList

          data={notificacoes}

          maxToRenderPerBatch={5}

          keyExtractor={(item) =>
            String(item.requestId)
          }

          style={styles.mensagems}

          renderItem={({ item }) => (
            <View style={styles.item}>

              <Text style={styles.nome}>{item.username}</Text>
              <Text style={styles.mensagem}>{item.message}</Text>

              <View style={styles.resposta}>
                <Text style={[styles.conteudoResposta, styles.mensagem]}>{item.status}</Text>
                <Text style={[styles.conteudoResposta, styles.mensagem]}>{item.responseMessage}</Text>
                <Text style={[styles.conteudoResposta, styles.mensagem]}>{item.adminName}</Text>
              </View>



            </View>
          )}
        />

      </View>


      <TouchableOpacity onPress={() => {
        navigation.goBack();
      }}

        style={styles.botaoVoltar}
      >

        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>) : (

      <View style={styles.conteudo}>
        <Text style={styles.mensagem}>{mensagem}</Text>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}
          style={styles.botaoVoltar}

        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>)}

  </>
}