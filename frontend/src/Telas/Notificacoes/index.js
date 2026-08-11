import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';


import styles from './styles';

import useNotification from '../../Services/notifications';

export default function Notificacoes({ navigation }) {
  const notificacoes = useNotification((state) => state.notificacoes);
  const mensagem = useNotification((state) => state.mensagem);
  const carregaNotificacoes = useNotification((state) => state.carregaNotificacoes);

  const [expande, setExpande] = useState(false);
  const [requestExpande, setRequestExpande] = useState('')
  

  const mudaExpande = (requestId) => {
    setExpande(!expande);
    setRequestExpande(requestId)
    console.log(requestId)
  };  


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
            <TouchableOpacity
            onPress={() => {
              mudaExpande(item.requestId)
            }}
            >
              <View style={styles.item}>

                <Text style={styles.nome}>{item.username}</Text>
                <Text style={styles.mensagem}>{item.message}</Text>
                <Text>Pedido enviado às {item.createdAt}</Text>
                <Text style={[styles.mensagem, styles.status, item.status == 'approved'? (styles.statusAprovado) : item.status == 'pending'? (styles.statusPendente) : (styles.statusReprovado)]}>{item.status}</Text>

                {expande? item.requestId == requestExpande? (<View style={styles.resposta}>
                  <Text style={[styles.conteudoResposta, styles.mensagem]}>
                    {item.status == 'approved'? ("Aprovado por "+item.adminName) : (null)}
                    {item.status == 'rejected'? ("Negado por "+item.adminName) : (null)}
                    </Text>

                    <Text style={[styles.conteudoResposta, styles.mensagem]}>
                      Resposta: {item.responseMessage}
                      </Text>
                      <Text>Ás {item.createdAt}</Text>
                </View>) : (null)  : (null)}
                



              </View>
            </TouchableOpacity>

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