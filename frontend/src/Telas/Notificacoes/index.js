import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import MenuRodape from '../../ComponentesReutilzaveis/MenuRodape';

import styles from './styles';

import useNotification from '../../Services/notifications';
import useTokenStore from '../../Services/useTokenStore';
export default function Notificacoes({ navigation }) {
  const notificacoes = useNotification((state) => state.notificacoes);
  const mensagem = useNotification((state) => state.mensagem);
  const carregaNotificacoes = useNotification((state) => state.carregaNotificacoes);
  const enviaResposta = useNotification((state) => state.enviaResposta);
  const user = useTokenStore((state) => state.user);

  const [expande, setExpande] = useState(false);
  const [requestExpande, setRequestExpande] = useState('');
  const [mensagemAdmin, setMensagemAdmin] = useState('');

  useEffect(() => {
    console.log(user?.username)
  }, [])


  const mudaExpande = (requestId) => {
    if(requestId == requestExpande){
      setExpande(!expande)
    } else{
      setMensagemAdmin('')
      setExpande(true);
    setRequestExpande(requestId)
    }
    
  };

  const envia = (requestId, responseMessage, decision) => {
    if(!requestId || !responseMessage || decision==null){

      return;
    }
    if(decision == false){
      enviaResposta(requestId, responseMessage, 'rejected');
      setMensagemAdmin('')
      carregaNotificacoes();
      return;
    } else{
      enviaResposta(requestId, responseMessage, 'approved');
      ('')
      carregaNotificacoes();
      return;
    }

  }

  useEffect(() => {


  const carrega = () => {
    if (carregaNotificacoes) {
      carregaNotificacoes();
    }
  }

    const intervalo = setInterval(carrega, 3000);


    return () => clearInterval(intervalo)
  }, [])


  useEffect(() => {
    if (carregaNotificacoes) {
      carregaNotificacoes();
    }
  }, [carregaNotificacoes])



  return <>

    {!mensagem ? (<View>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Notificações</Text>


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
              activeOpacity={1}
            >
              <View style={styles.item}>
                {item.adminName == user?.username? (<Text style={styles.nome}>Você</Text>) : (<Text style={styles.nome}>{item.username}</Text>)}
                <Text style={styles.mensagem}>{item.message}</Text>
                <Text>Pedido enviado às {item.createdAt}</Text>
                <Text style={[styles.mensagem, styles.status, item.status == 'approved' ? (styles.statusAprovado) : item.status == 'pending' ? (styles.statusPendente) : (styles.statusReprovado)]}>{item.status}</Text>

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

                  {item.responseMessage? (null) : 
                  item.username == user?.username? (null) :
                  (
                    <View>

                    <TextInput
                    value={mensagemAdmin}
                    onChangeText={setMensagemAdmin}
                    placeholder='Envie a resposta da requisição por aqui'
                    style={[styles.input]}
                    multiline={true}
                  />

                  <TouchableOpacity style={[styles.botaoDecisao, styles.botaoAprova]}
                  onPress={() => {
                    envia(item.requestId, mensagemAdmin, true)
                  }}
                  >
                    <Text style={styles.textoBotaoDecisao}>Aprovar</Text>
                  </TouchableOpacity>


                  <TouchableOpacity 
                  style={[styles.botaoDecisao, styles.botaoRecusa]}
                  onPress={() => {
                    envia(item.requestId, mensagemAdmin, false)
                  }}
                  >
                  

                    <Text style={styles.textoBotaoDecisao}>Recusar</Text>
                  </TouchableOpacity>
                  
                  </View>
                  )}

                  

                  



                </View>) : (null) : (null)}




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
    </View>) : (

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