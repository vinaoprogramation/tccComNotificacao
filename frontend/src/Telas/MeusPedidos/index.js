import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import MenuRodape from '../../ComponentesReutilzaveis/MenuRodape';

import styles from './styles';

import useNotification from '../../Services/notifications';
import useTokenStore from '../../Services/useTokenStore';
export default function MeusPedidos({ navigation }) {
  const notificacoesUser = useNotification((state) => state.notificacoesUser);
  const carregaNotificacoesUser = useNotification((state) => state.carregaNotificacoesUser);
  const username = useNotification((state) => state.username);



  const [expande, setExpande] = useState(false);
  const [requestExpande, setRequestExpande] = useState('');
  const [mensagemAdmin, setMensagemAdmin] = useState('');


  const mudaExpande = (requestId) => {
    if (requestId == requestExpande) {
      setExpande(!expande)
    } else {
      setMensagemAdmin('')
      setExpande(true);
      setRequestExpande(requestId)
    }

  };

  const envia = (requestId, responseMessage, decision) => {
    if (!requestId || !responseMessage || !decision) {
      console.log("Faltam coisas")
      return;
    }
    if (decision == false) {
      enviaResposta(requestId, responseMessage, 'rejected');
      setMensagemAdmin('')
      return;
    } else {
      enviaResposta(requestId, responseMessage, 'approved');
      ('')
    }
  }



  useEffect(() => {
    if (carregaNotificacoesUser) {
      carregaNotificacoesUser();
      console.log(notificacoesUser)
    }
  }, [carregaNotificacoesUser])




    useEffect(() => {


  const carrega = () => {
    if (carregaNotificacoesUser) {
      carregaNotificacoesUser();
    }
  }

    const intervalo = setInterval(carrega, 3000);


    return () => clearInterval(intervalo)
  }, [])


  return <>
    {!notificacoesUser? (<ActivityIndicator/>) : (<View>
      <Text style={styles.titulo}>
        Meus Pedidos
      </Text>

      <FlatList

        data={notificacoesUser}

        maxToRenderPerBatch={5}

        keyExtractor={(item) =>
          String(item.requestId)
        }



        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              mudaExpande(item.requestId)
            }}
            activeOpacity={1}
          >
            <View style={styles.item}>
              <Text style={styles.mensagem}>{item.message}</Text>
              <Text>Pedido enviado às {item.createdAt}</Text>

              {expande ? item.requestId == requestExpande ? (<View style={styles.resposta}>
                <Text style={[styles.conteudoResposta, styles.mensagem]}>
                  {item.status == 'approved' ? ("Aprovado por " + item.adminName) : (null)}
                  {item.status == 'rejected' ? ("Negado por " + item.adminName) : (null)}
                </Text>

                <View style={styles.respostaConteudo}>
                  <Text style={[styles.conteudoResposta, styles.mensagem]}>
                    Resposta: {item.responseMessage}
                  </Text>
                  {item.responseMessage ? (null) : (<Text style={[styles.conteudoResposta, styles.mensagem]}>Pendente</Text>)}
                </View>



              </View>) : (null) : (null)}




            </View>
          </TouchableOpacity>

        )}
      />
    </View>)}

    
  </>
}