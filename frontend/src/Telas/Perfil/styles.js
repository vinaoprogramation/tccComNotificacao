import {
    StyleSheet,
    Dimensions
} from "react-native";


const {
    width,
    height
} = Dimensions.get("screen");



export const LARGURA_ABA =
    width * 0.8;


const styles = StyleSheet.create({
    saudacaoContainer: {
        flexDirection: 'row',
        top: 50,
        left: 20,
        gap: 20,
        position: 'absolute'

    },
    saudacao: {
        fontSize: 40,

    },
    nomeUsuario: {
        fontSize: 40,
        top: 30
    },
    containerImagem:{
        alignSelf: 'center',
        position: 'absolute',
        width: 310,
        height: 310,
        top: 60,
        justifyContent: 'center'
    },
    fotoPerfil:{
        backgroundColor: 'grey',
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 100,
        padding: 20
    }
    
});


export default styles;