import React, { useEffect } from "react";

import {
    View,
    Text,
    FlatList,
    Alert,
    Image,
    TouchableOpacity
} from "react-native";

import MenuRodape from "../../ComponentesReutilzaveis/MenuRodape";

import useTokenStore from "../../Services/useTokenStore";
import useCatalogo from "../../Services/useCatalogo";
import useSiteConfig from "../../Services/useSiteConfig";

import styles from "./styles";



export default function HomeScreen({navigation}) {

    const projetos = useCatalogo(
        (state) => state.projetos
    );

    const informacoes = useSiteConfig(
        (state) => state.informacoes
    );

    const loadInformacoes = useSiteConfig(
        (state) => state.load
    );

    const loadCatalogo = useCatalogo(
        (state) => state.load
    );

    const autenticado = useTokenStore(
        (state) => state.autenticado
    );

    

    const user = useTokenStore(
        (state) => state.user
    );


    useEffect(() => {

        if (autenticado) {

            loadCatalogo();
            loadInformacoes();

        }

    }, [
        autenticado,
        loadCatalogo,
        loadInformacoes
    ]);


   useEffect(() => {
    console.log("HOMESCREEEN !")
   }, [])


    return <>
            

        <View style={styles.fundo}>

         



            <Image
                source={{
                    uri: informacoes?.logo_url
                }}
                style={styles.imagem}
            />



            


            <FlatList

                style={styles.flatListImpressoes}

                data={projetos}

                maxToRenderPerBatch={5}

                keyExtractor={(item) =>
                    String(item.id)
                }

                ListHeaderComponent={() => (
                    <Text style={styles.saudacao}>Olá, {user?.username}</Text>
                )}

                renderItem={({ item }) => (

                    <View style={styles.item}>

                        <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DetalhesImpressao', item)
                        }}
                        >

                            <Image
                                style={
                                    styles.imagemImpressao
                                }
                                source={{
                                    uri: item.thumbnailUrl
                                }}
                            />

                        </TouchableOpacity>


                        <View style={styles.conteudo}>

                            <Text style={styles.nome}>
                                {item.nome_impressao}
                            </Text>


                            <View style={styles.detalhes}>

                                <Text style={styles.material}>
                                    {item.material}
                                </Text>

                                <Text style={styles.cor_filamento}>
                                    {item.cor_filamento}
                                </Text>

                                <Text style={styles.gramas}>
                                    {item.gramas}g
                                </Text>

                                <Text style={styles.status}>
                                    {item.status}
                                </Text>

                                <Text style={styles.categoria}>
                                    {item.categoria}
                                </Text>

                            </View>

                        </View>


                        <TouchableOpacity
                            style={styles.botaoEncomenda}
                        >

                            <Text
                                style={
                                    styles.textoEncomenda
                                }
                            >
                                Encomendar
                            </Text>

                        </TouchableOpacity>

                    </View>

                )}

            />

        </View>

    </>;

}