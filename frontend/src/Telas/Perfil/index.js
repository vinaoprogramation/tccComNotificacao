import react, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';

import MenuRodape from '../../ComponentesReutilzaveis/MenuRodape';

import styles from './styles';

import useNotification from '../../Services/notifications';
import useTokenStore from '../../Services/useTokenStore';

export default function Perfil({ navigation }) {
  const notificacoes = useNotification((state) => state.notificacoes);
  const mensagem = useNotification((state) => state.mensagem);
  const user = useNotification((state) => state.user);

  const [expande, setExpande] = useState(false);
  const [requestExpande, setRequestExpande] = useState('');
  const [mensagemAdmin, setMensagemAdmin] = useState('');


  const mudaExpande = (requestId) => {
    if(requestId == requestExpande){
      setExpande(!expande)
    } else{
      setMensagemAdmin('')
      setExpande(true);
    setRequestExpande(requestId)
    }
    
  };
  return <>
    <Text>{user?.username}</Text>
  </>
}