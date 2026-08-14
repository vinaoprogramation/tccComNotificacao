import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";


import styles from "./styles";

import useNotification from "../../Services/notifications";

import MenuRodape from "../../ComponentesReutilzaveis/MenuRodape";
export default function DetalhesImpressao({ navigation, route }) {
  const item = route.params

  const enviaRequest = useNotification((state) => state.enviaRequest);

  const [material, setMaterial] = useState(null);
  const [filamentColor, setFilamentColor] = useState(null);
  const [weight, setWeight] = useState(null);

  const handleEnvio = (message) => {
    if (!material || !filamentColor || !weight) {
      return ("PROPRIEDADES NECESSÁRIAS");
    } else {
      enviaRequest(material, filamentColor, weight)
    }
  }

  return <>
    <ScrollView style={styles.fundo}>

      <View >
        <Text style={styles.titulo}>Detalhes</Text>

        <View style={styles.item}>

          <View style={styles.cabecalhoImpressao}>
            <Image
              source={{ uri: item.fotoPerfil }}
              style={styles.fotoPerfil}
            />

            <View style={styles.textosCabecalho}>
              <Text style={[styles.textoCabecalho]}>Feito por: </Text>
              <Text style={[styles.textoCabecalho, styles.negrito]}>{item.usuario_nome}</Text>
            </View>
          </View>
          <Image
            style={
              styles.imagemImpressao
            }
            resizeMode="cover"

            source={{
              uri: item.thumbnailUrl
            }}
          />

          <View style={styles.detalhes}>
            <View style={styles.principais}>
              <Text style={[styles.textosPrincipais, styles.tituloPrincipais]}>{item.nome_impressao}</Text>
              <Text style={[styles.textosPrincipais, styles.textoOutro]}>{item.material}</Text>
              <Text style={[styles.textosPrincipais, styles.textoOutro]}>{item.cor_filamento}</Text>
            </View>

            <View style={styles.adicionais}>
              <Text style={styles.tituloAdicionais}>Detalhes da Impressão</Text>

              <Text style={styles.textosAdicionais}>Eixo: {item.categoria}</Text>
              <Text style={styles.textosAdicionais}>Gramas: {item.gramas}g</Text>
              <Text style={styles.textosAdicionais}>Tempo de Impressão: {item.tempo_impressao}</Text>
              <Text style={styles.textosAdicionais}>Valor total: {item.valor_final}R$</Text>
              <Text style={styles.textosAdicionais}>Data de Impresão: {item.data}</Text>
            </View>

          </View>


          <View style={styles.containerEncomendas}>
            <View style={styles.encomendas}>
              <Text style={styles.tituloEncomendas}>ENCOMENDAR</Text>
            </View>

            <View style={styles.entradaEncomendas}>
              <View style={styles.textosChamada}>
                <Text style={styles.chamada}>Gostaria de ter uma impressão dessa? </Text>
                <Text style={styles.chamada}>Selecione as varáveis com base no seu gosto e clique em 'Encomendar'</Text>
              </View>

              <View style={styles.inputs}>
                <Text style={styles.tituloInputs}>Opções</Text>
                <View style={styles.containerInputs}>
                  <TouchableOpacity
                  onPress={() => {
                    setMaterial(item.material)
                  }}
                  >
                    <Text style={styles.input}>{item.material}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={() => {
                    setFilamentColor(item.cor_filamento)
                  }}
                  >
                    <Text style={styles.input}>{item.cor_filamento}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={() => {
                    setWeight(item.gramas)
                  }}
                  >
                    <Text style={styles.input}>{item.gramas}</Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.containerValores}>
                  <Text style={styles.valor}>Material: {material}</Text>
                  <Text style={styles.valor}>Cor: {filamentColor}</Text>
                  <Text style={styles.valor}>Peso: {weight}</Text>
                </View>



                <TouchableOpacity style={styles.botaoEncomendar}
                  onPress={() => {
                    handleEnvio(material, filamentColor, weight)
                  }}
                >
                  <Text style={styles.textoEncomendar}>Encomendar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>



        </View>
      </View>
    </ScrollView>
  </>

}