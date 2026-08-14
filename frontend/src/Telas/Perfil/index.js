import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { File, Directory } from 'expo-file-system';

import useTokenStore from '../../Services/useTokenStore';
import useUser from '../../Services/useUser';

import styles from './styles';

export default function Perfil({ navigation }) {
  const user = useTokenStore((state) => state.user);
  const enviaFoto = useUser((state) => state.enviaFoto)

  const [foto, setFoto] = useState(user?.avatar || null);

  useEffect(() => {
    if (foto) {
      console.log(foto)
      enviaFoto(foto)
    }
  }, [foto])

  useEffect(() => {
    if (user) {
      console.log("USUARIO: " + user.foto)
      if (user.foto) {
        setFoto(user.foto)
      }
    }

  }, [user])

  const escolherImagem = async () => {
    const permissaoResultado = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissaoResultado.granted === false) {
      alert("Você precisa permitir o acesso!");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!resultado.canceled) {
      const uriTemporaria = resultado.assets[0].uri; // Garante o acesso correto ao array do Expo
  
      try {
        // 1. Cria a referência para o arquivo temporário
        const arquivoTemporario = new File(uriTemporaria);
  
        // 2. Define o nome único e o destino na pasta permanente de documentos do app
        const nomeArquivo = `perfil_${Date.now()}.jpg`;
        const arquivoDestino = new File(Directory.documentDirectory, nomeArquivo);
  
        // 3. Copia os bytes do arquivo temporário para o destino permanente
        await arquivoTemporario.copyToAsync(arquivoDestino);
  
        // 4. Salva a nova URI permanente no estado da tela
        setFoto(arquivoDestino.uri);
        alert("Foto salva com sucesso no dispositivo!");
  
      } catch (error) {
        console.log("Erro ao salvar imagem localmente:", error);
      }
  };
  };
  return (
    <>
      <View>
        <View style={styles.saudacaoContainer}>
          <Text style={styles.saudacao}>Olá,</Text>
          <Text style={styles.nomeUsuario}>{user?.username}</Text>


        </View>


        <TouchableOpacity onPress={escolherImagem} activeOpacity={0.7}>
          <View style={styles.containerImagem}>
            <Image
              source={foto ? { uri: foto } : { uri: foto }}
              style={styles.fotoPerfil}
            />

          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
