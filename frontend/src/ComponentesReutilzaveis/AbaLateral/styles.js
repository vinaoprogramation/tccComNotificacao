import {
    StyleSheet,
    Dimensions
} from "react-native";


const {
    width,
    height
} = Dimensions.get("screen");


/*
 * Largura usada tanto pelo StyleSheet
 * quanto pela animação.
 */

export const LARGURA_ABA =
    width * 0.8;


const styles = StyleSheet.create({

    fundo: {

        zIndex: 2,

        elevation: 5,

        backgroundColor: "#ffffff",

        height: height,

        width: LARGURA_ABA,

        position: "absolute"

    },


    titulo: {

        fontSize: 30,

        marginTop: 20,

        marginLeft: 200

    },


    botaoConteudo: {

        borderRadius: 5,

        backgroundColor: "#cb9bde",

        padding: 10

    },


    texto: {

        fontSize: 22

    },


    conteudo: {

        padding: 20,

        gap: 10

    },
    


    perfil: {},


    notificacoes: {}

});


export default styles;