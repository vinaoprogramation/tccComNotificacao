import React, { useEffect } from "react";

import {
    View,
    Text,
    FlatList,
    Alert,
    Image,
    TouchableOpacity
} from "react-native";

import useTokenStore from "../../Services/useTokenStore";
import useCatalogo from "../../Services/useCatalogo";
import useSiteConfig from "../../Services/useSiteConfig";

import Menu from "../../ComponentesReutilzaveis/Menu";
import AbaLateral from "../../ComponentesReutilzaveis/AbaLateral";

import styles from "./styles";

export default function HomeScreen({ navigation }) {

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

    const logout = useTokenStore(
        (state) => state.logout
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

        const unsubscribe = navigation.addListener(
            "beforeRemove",
            (e) => {

                e.preventDefault();

                Alert.alert(
                    "Sair da conta?",
                    "Deseja realmente sair e deslogar do aplicativo?",
                    [
                        {
                            text: "Cancelar",
                            style: "cancel"
                        },

                        {
                            text: "Sair e Deslogar",
                            style: "destructive",

                            onPress: () => {

                                logout();

                                navigation.dispatch(
                                    e.data.action
                                );

                            }
                        }
                    ]
                );

            }
        );

        return unsubscribe;

    }, [
        navigation,
        logout
    ]);


    return (

        <View style={styles.fundo}>


            <Image
                source={{
                    uri: informacoes?.logo_url
                }}
                style={styles.imagem}
            />



            <Menu />



            <AbaLateral navigation={navigation}/>



            <FlatList

                style={styles.flatListImpressoes}

                data={projetos}

                maxToRenderPerBatch={5}

                keyExtractor={(item) =>
                    String(item.id)
                }

                renderItem={({ item }) => (

                    <View style={styles.item}>

                        <TouchableOpacity>

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

    );

}