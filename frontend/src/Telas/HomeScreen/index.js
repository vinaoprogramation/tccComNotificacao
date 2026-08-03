import react, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, Alert, Image } from 'react-native';

import useTokenStore from '../../Services/useTokenStore';
import useCatalogo from '../../Services/useCatalogo';
import useSiteConfig from '../../Services/useSiteConfig';
import useImagens from '../../Services/useImagens';

import styles from './styles';

export default function HomeScreen({ navigation }) {
  const thumb = useImagens((state) => state.load)
  const projetos = useCatalogo((state) => state.projetos);
  const informacoes = useSiteConfig((state) => state.informacoes);
  const loadInformacoes = useSiteConfig((state) => state.load)
  const loadCatalogo = useCatalogo((state) => state.load);
  const autenticado = useTokenStore((state) => state.autenticado);
  const logout = useTokenStore((state) => state.logout)

  useEffect(() => {
    if (autenticado) {
      loadCatalogo();
      loadInformacoes();
    }
  }, [autenticado]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {

      e.preventDefault();

      Alert.alert(
        'Sair da conta?',
        'Deseja realmente sair e deslogar do aplicativo?',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => { } },
          {
            text: 'Sair e Deslogar',
            style: 'destructive',
            onPress: () => {
              logout();
              navigation.dispatch(e.data.action);
              navigation.navigate('Inicial')
            },
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, logout]);

  return <>
    <Image
      source={{ uri: informacoes.logo_url }}
      style={styles.imagem}
    />
    <View style={styles.fundo}>

      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Image
            style={styles.imagemImpressao}
            source={{uri: thumb(item.foto_capa_id)}}
            />
            <Text>{item.nome_impressao}</Text>
            <Text>{item.foto_capa_id}</Text>
          </View>
        )}
      />
    </View>

  </>
}
