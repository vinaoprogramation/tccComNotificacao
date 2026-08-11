import React, {
    useEffect,
    useRef
} from "react";

import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    PanResponder
} from "react-native";

import useMenu from "../../Services/menu";

import styles, {
    LARGURA_ABA
} from "./styles";


export default function AbaLateral({navigation}) {

    const mostra = useMenu(
        (state) => state.mostra
    );

    const mudaMostraFuncao = useMenu(
        (state) => state.mudaMostraFuncao
    );

    const translateX = useRef(
        new Animated.Value(-LARGURA_ABA)
    ).current;


    const posicaoInicial = useRef(
        -LARGURA_ABA
    );

    const mostraRef = useRef(mostra);


    useEffect(() => {

        mostraRef.current = mostra;

    }, [mostra]);


    useEffect(() => {

        if (mostra) {

            Animated.spring(
                translateX,
                {
                    toValue: 0,

                    useNativeDriver: true,

                    friction: 8,

                    tension: 50
                }
            ).start();

        }

        else {

            Animated.timing(
                translateX,
                {
                    toValue: -LARGURA_ABA,

                    duration: 250,

                    useNativeDriver: true
                }
            ).start();

        }

    }, [mostra]);


    const panResponder = useRef(

        PanResponder.create({


            onMoveShouldSetPanResponder: (
                _,
                gestureState
            ) => {

                return (

                    mostraRef.current &&

                    gestureState.dx < -10 &&

                    Math.abs(gestureState.dx) >
                    Math.abs(gestureState.dy)

                );

            },

            onPanResponderGrant: () => {

                translateX.stopAnimation(
                    (valorAtual) => {

                        posicaoInicial.current =
                            valorAtual;

                    }
                );

            },


            onPanResponderMove: (
                _,
                gestureState
            ) => {

                const novaPosicao =
                    posicaoInicial.current +
                    gestureState.dx;


                const limitada = Math.max(

                    -LARGURA_ABA,

                    Math.min(
                        0,
                        novaPosicao
                    )

                );


                translateX.setValue(
                    limitada
                );

            },


            onPanResponderRelease: (
                _,
                gestureState
            ) => {


                if (
                    gestureState.dx <
                    -(LARGURA_ABA / 3)
                ) {

                    mudaMostraFuncao(false);

                }

                else {

        

                    Animated.spring(
                        translateX,
                        {
                            toValue: 0,

                            useNativeDriver: true,

                            friction: 8,

                            tension: 50
                        }
                    ).start();

                }

            },


            onPanResponderTerminate: () => {

                Animated.spring(
                    translateX,
                    {
                        toValue: 0,

                        useNativeDriver: true,

                        friction: 8,

                        tension: 50
                    }
                ).start();

            }

        })

    ).current;


    return (

        <Animated.View

            style={[
                styles.fundo,

                {
                    transform: [
                        {
                            translateX
                        }
                    ]
                }
            ]}

            {...panResponder.panHandlers}

        >

            <View>

                <Text style={styles.titulo}>
                    Reni 3D
                </Text>


                <View style={styles.conteudo}>

                    <TouchableOpacity
                        style={
                            styles.botaoConteudo
                        }
                    >

                        <Text
                            style={[
                                styles.texto,
                                styles.perfil
                            ]}
                        >
                            Perfil
                        </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={
                            styles.botaoConteudo
                        }

                        onPress={() => {
                            navigation.navigate('Notificacoes')
                        }}
                    >

                        <Text
                            style={[
                                styles.texto,
                                styles.notificacoes
                            ]}
                        >
                            Notificações
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </Animated.View>

    );

}